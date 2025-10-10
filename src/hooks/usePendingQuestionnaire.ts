import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { submitQuestionnaire } from '@/store/slices/userSlice'
import type { AppDispatch, RootState } from '@/store'

export function usePendingQuestionnaire() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user?.email) {
      const pendingData = localStorage.getItem('pendingQuestionnaire')
      if (pendingData) {
        try {
          const { personalData, answers } = JSON.parse(pendingData)

          console.log('[PENDING QUESTIONNAIRE] Submitting pending questionnaire for:', user.email)

          // Submit the questionnaire automatically
          dispatch(submitQuestionnaire({
            email: user.email,
            personalData,
            answers
          })).then(() => {
            console.log('[PENDING QUESTIONNAIRE] Submission successful, clearing data and refreshing')
            // Clear pending data
            localStorage.removeItem('pendingQuestionnaire')

            // Force a hard refresh to reload server component with new data
            router.refresh()

            // Show a success message
            setTimeout(() => {
              window.location.reload()
            }, 500)
          }).catch((error) => {
            console.error('[PENDING QUESTIONNAIRE] Error submitting:', error)
            // Keep data for retry
          })
        } catch (error) {
          console.error('[PENDING QUESTIONNAIRE] Error parsing pending data:', error)
          localStorage.removeItem('pendingQuestionnaire')
        }
      }
    }
  }, [user, dispatch, router])
}
