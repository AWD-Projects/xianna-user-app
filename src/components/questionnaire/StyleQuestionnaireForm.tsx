'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CloseButton } from '@/components/ui/close-button'
import { ArrowLeft, ArrowRight, Palette, Sparkles } from 'lucide-react'
import { PersonalInfoStep } from './PersonalInfoStep'
import { QuestionStep } from './QuestionStep'
import { ResultsStep } from './ResultsStep'
import { fetchQuestionnaire, fetchStyles, submitQuestionnaire } from '@/store/slices/userSlice'
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

  const questionsPerStep = 3
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

  const handleSubmit = async () => {
    if (!user?.email) {
      // Si no hay usuario autenticado, guardar datos y redirigir a registro
      localStorage.setItem('pendingQuestionnaire', JSON.stringify({ personalData, answers }))
      router.push('/auth/register')
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
      
      // Redirigir al perfil después de un breve delay para mostrar resultados
      setTimeout(() => {
        router.push('/perfil')
      }, 3000) // 3 segundos para ver el resultado
      
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
    if (currentStep === 0) return 'Información Personal'
    if (currentStep === totalSteps - 1) return 'Resultados'
    return `Preguntas ${currentStep}`
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Palette className="w-8 h-8 text-pink-600" />
          </div>
          <p className="text-gray-600">Cargando cuestionario...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cuestionario de Estilo</h1>
            <p className="text-gray-600">Descubre tu estilo único en unos minutos</p>
          </div>
        </div>
        
        <CloseButton 
          onClick={() => router.push('/')}
          size="lg"
        />
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">{getStepTitle()}</span>
          <span className="text-sm text-gray-500">
            Paso {currentStep + 1} de {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Content */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
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
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              )}

              <Button
                onClick={currentStep === totalSteps - 2 ? handleSubmit : handleNext}
                disabled={!isStepComplete()}
                className="ml-auto bg-pink-500 hover:bg-pink-600 rounded-xl"
              >
                {currentStep === totalSteps - 2 ? (
                  <>
                    Finalizar
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
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
