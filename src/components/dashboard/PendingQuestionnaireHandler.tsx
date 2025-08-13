'use client'

import { usePendingQuestionnaire } from '@/hooks/usePendingQuestionnaire'

export function PendingQuestionnaireHandler() {
  usePendingQuestionnaire()
  return null // This component doesn't render anything, just handles the logic
}
