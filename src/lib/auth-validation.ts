import { createClient } from '@/lib/supabase/client'

/**
 * Check if an email already exists in the user_details table
 * This provides early validation before attempting signup
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/user-details?email=${encodeURIComponent(email)}`)
    
    if (response.ok) {
      return true // Email exists
    } else if (response.status === 404 || response.status === 500) {
      return false // Email doesn't exist or error occurred
    }
    
    return false // Default to allowing signup
  } catch (error) {
    console.error('Error checking email existence:', error)
    return false // In case of error, allow the signup to proceed
  }
}

/**
 * Validate email format and check for existence
 */
export async function validateEmailForSignup(email: string): Promise<{ 
  isValid: boolean; 
  error?: string 
}> {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Formato de email inválido' }
  }
  
  // Check if email already exists
  const emailExists = await checkEmailExists(email)
  if (emailExists) {
    return { isValid: false, error: 'Este email ya está registrado. Intenta iniciar sesión.' }
  }
  
  return { isValid: true }
}