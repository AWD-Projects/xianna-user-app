'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Question } from '@/types'

interface QuestionStepProps {
  questions: Question[]
  answers: Record<number, string>
  onAnswerChange: (questionId: number, answer: string) => void
}

export function QuestionStep({ questions, answers, onAnswerChange }: QuestionStepProps) {
  const brandColors = [
    { bg: 'bg-[#E61F93]/10', border: 'border-[#E61F93]', accent: 'bg-[#E61F93]' },
    { bg: 'bg-[#FDE12D]/10', border: 'border-[#FDE12D]', accent: 'bg-[#FDE12D]' },
    { bg: 'bg-[#00D1ED]/10', border: 'border-[#00D1ED]', accent: 'bg-[#00D1ED]' }
  ]

  return (
    <div className="space-y-8">

      {questions.map((question, index) => {
        const colorScheme = brandColors[index % brandColors.length]
        
        return (
          <div key={question.id} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                {question.pregunta}
              </h3>
            </div>
            
            <div className="space-y-4">
              {question.answers.map((answer, answerIndex) => {
                const isSelected = answers[question.id] === answer.respuesta
                
                return (
                  <label
                    key={answer.id}
                    className={`group flex items-center p-6 rounded-lg cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? `${colorScheme.bg} border-2 ${colorScheme.border}`
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={answer.respuesta}
                      checked={isSelected}
                      onChange={() => onAnswerChange(question.id, answer.respuesta)}
                      className="sr-only"
                    />
                    
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 transition-all ${
                      isSelected
                        ? `${colorScheme.accent} border-transparent`
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    
                    <span className="text-lg font-medium text-gray-900">
                      {answer.respuesta}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
