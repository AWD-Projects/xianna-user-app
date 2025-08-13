'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'
import type { Question } from '@/types'

interface QuestionStepProps {
  questions: Question[]
  answers: Record<number, string>
  onAnswerChange: (questionId: number, answer: string) => void
}

export function QuestionStep({ questions, answers, onAnswerChange }: QuestionStepProps) {
  const colors = ['bg-pink-100', 'bg-blue-100', 'bg-yellow-100']

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Preguntas sobre tu estilo
        </h2>
        <p className="text-gray-600">
          Responde honestamente para obtener los mejores resultados
        </p>
      </div>

      {questions.map((question, index) => (
        <Card key={question.id} className={`p-6 ${colors[index % colors.length]} border-0`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {question.pregunta}
          </h3>
          
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <label
                key={answer.id}
                className="flex items-center p-4 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={answer.respuesta}
                  checked={answers[question.id] === answer.respuesta}
                  onChange={() => onAnswerChange(question.id, answer.respuesta)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                  answers[question.id] === answer.respuesta
                    ? 'border-pink-500 bg-pink-500'
                    : 'border-gray-300'
                }`}>
                  {answers[question.id] === answer.respuesta && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                  )}
                </div>
                <span className="text-gray-700">{answer.respuesta}</span>
              </label>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
