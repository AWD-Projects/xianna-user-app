import type { Metadata } from 'next'
import { StyleQuestionnaireForm } from '@/components/questionnaire/StyleQuestionnaireForm'

export const metadata: Metadata = {
  title: 'Cuestionario de Estilo',
  description: 'Descubre tu estilo único respondiendo nuestro cuestionario personalizado',
}

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <div className="container mx-auto px-4 py-8">
        <StyleQuestionnaireForm />
      </div>
    </div>
  )
}
