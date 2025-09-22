import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createClient } from '@/lib/supabase/client'
import type { UserProfile, Question, Style } from '@/types'

interface UserState {
  profile: UserProfile | null
  questions: Question[]
  styles: Style[]
  loading: boolean
  error: string | null
  questionnaireCompleted: boolean
}

const initialState: UserState = {
  profile: null,
  questions: [],
  styles: [],
  loading: false,
  error: null,
  questionnaireCompleted: false
}

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (email: string) => {
    try {
      const response = await fetch(`/api/user-details?email=${encodeURIComponent(email)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ email, updates }: { email: string; updates: Partial<UserProfile> }) => {
    try {
      const response = await fetch('/api/user-details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          ...updates
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }
)

export const fetchQuestionnaire = createAsyncThunk(
  'user/fetchQuestionnaire',
  async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('preguntas')
      .select(`
        id,
        pregunta,
        respuestas(
          id,
          respuesta,
          identificador,
          id_estilo,
          id_pregunta
        )
      `)
      .order('id')

    if (error) throw error
    
    return data.map(question => ({
      id: question.id,
      pregunta: question.pregunta,
      answers: question.respuestas
    }))
  }
)

export const fetchStyles = createAsyncThunk(
  'user/fetchStyles',
  async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('estilos')
      .select('*')
      .order('id')

    if (error) throw error
    return data
  }
)

export const submitQuestionnaire = createAsyncThunk(
  'user/submitQuestionnaire',
  async ({ 
    email, 
    personalData, 
    answers 
  }: { 
    email: string; 
    personalData: any; 
    answers: Record<number, string>;
  }) => {
    const supabase = createClient()
    
    // Calculate style based on answers
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
    
    try {
      // Map form fields to database fields
      const updates = {
        correo: email, // Include email for upsert
        nombre: personalData.name,
        edad: personalData.age,
        genero: personalData.gender,
        ocupacion: personalData.occupation,
        estado: personalData.state,
        talla: personalData.size,
        tipo_estilo: mostSelectedStyleId,
      }
      
      // Use API route instead of direct Supabase call
      const response = await fetch('/api/user-details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API error:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      return data
    } catch (error) {
      console.error('Error in submitQuestionnaire:', error)
      throw error
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearProfile: (state) => {
      state.profile = null
      state.questionnaireCompleted = false
    },
    setQuestionnaireCompleted: (state, action) => {
      state.questionnaireCompleted = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.questionnaireCompleted = !!action.payload.tipo_estilo
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar perfil'
      })
      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al actualizar perfil'
      })
      // Fetch questionnaire
      .addCase(fetchQuestionnaire.fulfilled, (state, action) => {
        state.questions = action.payload
      })
      // Fetch styles
      .addCase(fetchStyles.fulfilled, (state, action) => {
        state.styles = action.payload
      })
      // Submit questionnaire
      .addCase(submitQuestionnaire.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitQuestionnaire.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.questionnaireCompleted = true
      })
      .addCase(submitQuestionnaire.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al enviar cuestionario'
      })
  },
})

export const { clearError, clearProfile, setQuestionnaireCompleted } = userSlice.actions
export default userSlice.reducer
