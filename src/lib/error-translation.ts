/**
 * Utility to translate Supabase authentication error messages to Spanish
 */

export function translateAuthError(error: any): string {
  // If it's already a Spanish message, return as is
  if (typeof error === 'string' && error.includes('Error al')) {
    return error
  }

  // Get error message from different possible structures
  const errorMessage = error?.message || error?.error_description || error?.msg || String(error)
  const errorCode = error?.error_code || error?.code

  // Handle specific error codes
  if (errorCode) {
    switch (errorCode) {
      case 'email_not_confirmed':
        return 'Email no confirmado. Por favor, revisa tu bandeja de entrada y confirma tu dirección de email.'
      case 'phone_not_confirmed':
        return 'Teléfono no confirmado. Por favor, confirma tu número de teléfono.'
      case 'invalid_credentials':
        return 'Credenciales inválidas. Verifica tu email y contraseña.'
      case 'email_exists':
        return 'Este email ya está registrado. Intenta iniciar sesión.'
      case 'user_not_found':
        return 'Usuario no encontrado. Verifica tu email.'
      case 'weak_password':
        return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.'
      case 'signup_disabled':
        return 'El registro de nuevos usuarios está deshabilitado temporalmente.'
      case 'too_many_requests':
      case 'over_request_rate_limit':
        return 'Demasiados intentos. Por favor, espera un momento antes de intentar nuevamente.'
      case 'email_address_invalid':
        return 'La dirección de email no es válida.'
      default:
        break
    }
  }

  // Handle common error message patterns
  if (errorMessage) {
    const lowerMessage = errorMessage.toLowerCase()
    
    if (lowerMessage.includes('email not confirmed')) {
      return 'Email no confirmado. Por favor, revisa tu bandeja de entrada y confirma tu dirección de email.'
    }
    
    if (lowerMessage.includes('invalid credentials') || lowerMessage.includes('invalid login')) {
      return 'Credenciales inválidas. Verifica tu email y contraseña.'
    }
    
    if (lowerMessage.includes('user not found')) {
      return 'Usuario no encontrado. Verifica tu email.'
    }
    
    if (lowerMessage.includes('email already') && lowerMessage.includes('registered')) {
      return 'Este email ya está registrado. Intenta iniciar sesión.'
    }
    
    if (lowerMessage.includes('password') && (lowerMessage.includes('weak') || lowerMessage.includes('short'))) {
      return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.'
    }
    
    if (lowerMessage.includes('rate limit') || lowerMessage.includes('too many')) {
      return 'Demasiados intentos. Por favor, espera un momento antes de intentar nuevamente.'
    }
    
    if (lowerMessage.includes('network') || lowerMessage.includes('connection')) {
      return 'Error de conexión. Verifica tu conexión a internet.'
    }
  }

  // Fallback generic messages
  return 'Ocurrió un error durante la autenticación. Por favor, intenta nuevamente.'
}