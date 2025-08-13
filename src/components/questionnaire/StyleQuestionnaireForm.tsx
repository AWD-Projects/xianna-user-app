'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { PersonalInfoStep } from './PersonalInfoStep'
import { QuestionStep } from './QuestionStep'
import { ResultsStep } from './ResultsStep'
import { fetchQuestionnaire, fetchStyles, submitQuestionnaire } from '@/store/slices/userSlice'
import { createClient } from '@/lib/supabase/client'
import type { AppDispatch, RootState } from '@/store'

export function StyleQuestionnaireForm() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { questions, styles, loading } = useSelector((state: RootState) => state.user)
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [currentStep, setCurrentStep] = useState(0)
  const [personalData, setPersonalData] = useState({})
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<any>(null)

  const questionsPerStep = 1 // Show one question at a time for better focus
  const questionSteps = Math.ceil(questions.length / questionsPerStep)
  const totalSteps = 1 + questionSteps + 1 // Personal info + Questions + Results
  const progress = ((currentStep + 1) / totalSteps) * 100

  useEffect(() => {
    dispatch(fetchQuestionnaire())
    dispatch(fetchStyles())
  }, [dispatch])

  const handlePersonalDataSubmit = (data: any) => {
    setPersonalData(data)
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
      setCurrentStep(currentStep + 1)
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
    if (!user?.email) {
      // Si no hay usuario autenticado, calcular estilo temporal y mostrar resultados
      try {
        const tempResult = await calculateTemporaryStyle()
        localStorage.setItem('pendingQuestionnaire', JSON.stringify({ personalData, answers }))
        setResult(tempResult)
        setCurrentStep(totalSteps - 1)
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
      setCurrentStep(totalSteps - 1)
      
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

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#FDE12D] rounded-full mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cargando cuestionario</h2>
          <p className="text-gray-600">Preparando tu experiencia personalizada...</p>
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
            <PersonalInfoStep 
              onSubmit={handlePersonalDataSubmit}
              initialData={personalData}
            />
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
