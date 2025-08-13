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
          
          // Submit the questionnaire automatically
          dispatch(submitQuestionnaire({
            email: user.email,
            personalData,
            answers
          })).then(() => {
            // Clear pending data
            localStorage.removeItem('pendingQuestionnaire')
            // Redirect to profile
            router.push('/perfil')
          }).catch((error) => {
            console.error('Error submitting pending questionnaire:', error)
            // Keep data for retry
          })
        } catch (error) {
          console.error('Error parsing pending questionnaire:', error)
          localStorage.removeItem('pendingQuestionnaire')
        }
      }
    }
  }, [user, dispatch, router])
}
