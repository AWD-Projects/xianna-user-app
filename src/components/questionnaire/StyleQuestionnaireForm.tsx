'use client'

import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { PersonalInfoStep } from './PersonalInfoStep'
import { QuestionStep } from './QuestionStep'
import { ResultsStep } from './ResultsStep'
import { fetchQuestionnaire, fetchStyles, submitQuestionnaire } from '@/store/slices/userSlice'
import { createClient } from '@/lib/supabase/client'
import { 
  trackQuestionnaireStart, 
  trackQuestionnaireStep, 
  trackQuestionnaireComplete 
} from '@/lib/gtm'
import type { AppDispatch, RootState } from '@/store'

export function StyleQuestionnaireForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { questions, styles, loading } = useSelector((state: RootState) => state.user)
  const { user } = useSelector((state: RootState) => state.auth)

  const [currentStep, setCurrentStep] = useState(0)
  const [personalData, setPersonalData] = useState({})
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<any>(null)
  const [loadingUserData, setLoadingUserData] = useState(false)
  const hasTrackedStart = useRef(false)

  const questionsPerStep = 1 // Show one question at a time for better focus
  const questionSteps = Math.ceil(questions.length / questionsPerStep)
  const totalSteps = 1 + questionSteps + 1 // Personal info + Questions + Results
  const progress = ((currentStep + 1) / totalSteps) * 100

  useEffect(() => {
    dispatch(fetchQuestionnaire())
    dispatch(fetchStyles())
  }, [dispatch])

  useEffect(() => {
    if (hasTrackedStart.current) return
    trackQuestionnaireStart(!!user)
    hasTrackedStart.current = true
  }, [user])

  // Auto-fill personal data for logged-in users
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email && Object.keys(personalData).length === 0) {
        setLoadingUserData(true)
        try {
          const response = await fetch(`/api/user-details?email=${encodeURIComponent(user.email)}`)
          if (response.ok) {
            const userData = await response.json()
            console.log('[QUESTIONNAIRE] Auto-filling user data:', userData)

            // Map user_details fields to questionnaire personal data format
            const mappedData = {
              name: userData.nombre || '',
              age: userData.edad || '',
              gender: userData.genero || '',
              occupation: userData.ocupacion || '',
              state: userData.estado || '',
              size: userData.talla || ''
            }

            setPersonalData(mappedData)
          }
        } catch (error) {
          console.error('[QUESTIONNAIRE] Error fetching user data:', error)
        } finally {
          setLoadingUserData(false)
        }
      }
    }

    fetchUserData()
  }, [user, personalData])

  const handlePersonalDataSubmit = (data: any) => {
    setPersonalData(data)
    trackQuestionnaireStep(Math.min(totalSteps, 2), totalSteps)
    setCurrentStep(1)
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      const nextStep = currentStep + 1
      const stepNumber = Math.min(totalSteps, nextStep + 1)
      trackQuestionnaireStep(stepNumber, totalSteps)
      setCurrentStep(nextStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateTemporaryStyle = async () => {
    // Calculate style for non-logged users to show preview
    const supabase = createClient()
    const styleCount: Record<number, number> = {}
    const allAnswers = Object.values(answers)
    
    // Get answer objects to find style IDs
    const { data: answerData } = await supabase
      .from('respuestas')
      .select('respuesta, id_estilo')
      .in('respuesta', allAnswers)
    
    answerData?.forEach(answer => {
      const styleId = answer.id_estilo
      styleCount[styleId] = (styleCount[styleId] || 0) + 1
    })
    
    // Find most selected style
    let mostSelectedStyleId = 1 // Default style
    let maxCount = 0
    
    Object.entries(styleCount).forEach(([styleId, count]) => {
      if (count > maxCount) {
        maxCount = count
        mostSelectedStyleId = parseInt(styleId)
      }
    })
    
    return { tipo_estilo: mostSelectedStyleId }
  }

  const handleSubmit = async () => {
    const finalStepIndex = totalSteps - 1
    const trackFinalStep = () => trackQuestionnaireStep(totalSteps, totalSteps)
    if (!user?.email) {
      // Si no hay usuario autenticado, calcular estilo temporal y mostrar resultados
      try {
        const tempResult = await calculateTemporaryStyle()
        localStorage.setItem('pendingQuestionnaire', JSON.stringify({ personalData, answers }))
        setResult(tempResult)
        setCurrentStep(finalStepIndex)
        trackFinalStep()
        const styleName = styles.find(style => style.id === tempResult.tipo_estilo)?.tipo || 'desconocido'
        trackQuestionnaireComplete(styleName, false)
      } catch (error) {
        console.error('Error calculating style:', error)
      }
      return
    }

    try {
      const result = await dispatch(submitQuestionnaire({
        email: user.email,
        personalData,
        answers
      })).unwrap()
      
      setResult(result)
      setCurrentStep(finalStepIndex)
      trackFinalStep()
      const styleName = styles.find(style => style.id === result.tipo_estilo)?.tipo || 'desconocido'
      trackQuestionnaireComplete(styleName, true)
      
      // No auto-redirect, let user stay on results page
      
    } catch (error) {
      console.error('Error submitting questionnaire:', error)
    }
  }

  const getCurrentQuestions = () => {
    const startIndex = (currentStep - 1) * questionsPerStep
    const endIndex = startIndex + questionsPerStep
    return questions.slice(startIndex, endIndex)
  }

  const isStepComplete = () => {
    if (currentStep === 0) {
      return Object.keys(personalData).length > 0
    }
    
    if (currentStep >= 1 && currentStep < totalSteps - 1) {
      const currentQuestions = getCurrentQuestions()
      return currentQuestions.every(q => answers[q.id])
    }
    
    return true
  }

  const getStepTitle = () => {
    if (currentStep === 0) return 'Cuéntanos sobre ti'
    if (currentStep === totalSteps - 1) return '¡Tu estilo te espera!'
    return `Pregunta ${currentStep} de ${questionSteps}`
  }

  if (loading || loadingUserData) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#FDE12D] rounded-full mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {loadingUserData ? 'Cargando tu información' : 'Cargando cuestionario'}
          </h2>
          <p className="text-gray-600">
            {loadingUserData ? 'Preparando tus datos...' : 'Preparando tu experiencia personalizada...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Descubre tu <span className="text-[#E61F93]">estilo único</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Un cuestionario rápido y personalizado
          </p>
          <Link 
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{getStepTitle()}</h2>
          <p className="text-gray-600">Paso {currentStep + 1} de {totalSteps}</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
          <div 
            className="h-full bg-gradient-to-r from-[#E61F93] to-[#FDE12D] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-12">
          {currentStep === 0 && (
            <>
              {user && Object.keys(personalData).length > 0 && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center text-green-800 text-sm">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>
                      Hemos precargado tu información. Puedes editarla si es necesario.
                    </span>
                    </div>
                </div>
              )}
              <PersonalInfoStep
                onSubmit={handlePersonalDataSubmit}
                initialData={personalData}
              />
            </>
          )}

          {currentStep >= 1 && currentStep < totalSteps - 1 && (
            <QuestionStep
              questions={getCurrentQuestions()}
              answers={answers}
              onAnswerChange={handleAnswerChange}
            />
          )}

          {currentStep === totalSteps - 1 && result && (
            <ResultsStep 
              result={result} 
              styles={styles}
            />
          )}

          {/* Navigation */}
          {currentStep < totalSteps - 1 && (
            <div className="flex items-center justify-between mt-12 pt-8">
              {currentStep > 0 ? (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                onClick={currentStep === totalSteps - 2 ? handleSubmit : handleNext}
                disabled={!isStepComplete()}
                className={`px-8 py-3 font-semibold transition-all ${
                  currentStep === totalSteps - 2 
                    ? 'bg-gradient-to-r from-[#E61F93] to-[#FDE12D] hover:from-[#E61F93]/90 hover:to-[#FDE12D]/90 text-gray-900'
                    : 'bg-[#E61F93] hover:bg-[#E61F93]/90 text-white'
                } disabled:opacity-50`}
              >
                {currentStep === totalSteps - 2 ? (
                  'Descubrir mi estilo'
                ) : (
                  <>
                    Continuar
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
