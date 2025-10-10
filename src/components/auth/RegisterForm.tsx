'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, UserCheck, Mail } from 'lucide-react'
import { signupUser } from '@/store/slices/authSlice'
import { validateEmailForSignup } from '@/lib/auth-validation'
import type { AppDispatch, RootState } from '@/store'

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [emailValidationError, setEmailValidationError] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { error } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setEmailValidationError('')
    
    try {
      // Validate email before attempting signup
      const validation = await validateEmailForSignup(data.email)
      if (!validation.isValid) {
        setEmailValidationError(validation.error || 'Email inválido')
        toast.error('Email no válido', {
          description: validation.error || 'Por favor verifica tu dirección de email',
          duration: 5000,
          icon: <Mail className="w-5 h-5 text-red-600" />
        })
        return
      }

      await dispatch(signupUser({
        email: data.email,
        password: data.password,
        name: data.name
      })).unwrap()

      setShowSuccess(true)

      // Show success notification
      toast.success('¡Bienvenido a Xianna!', {
        description: 'Tu cuenta ha sido creada exitosamente. Redirigiendo a tu perfil...',
        duration: 3000,
        icon: <UserCheck className="w-5 h-5 text-green-600" />,
        style: {
          background: '#4ade80',
          color: 'white',
          border: 'none'
        }
      })

      // Redirect to profile after successful registration and auto-login
      setTimeout(() => {
        router.push('/perfil')
      }, 2000)
    } catch (error) {
      console.error('Register error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Nombre completo"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={errors.email || emailValidationError ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        {emailValidationError && !errors.email && (
          <p className="text-red-500 text-sm mt-1">{emailValidationError}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            {...register('password')}
            className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirmar contraseña"
            {...register('confirmPassword')}
            className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-700 text-sm">
            ¡Cuenta creada exitosamente! Redirigiendo a tu perfil...
          </p>
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isLoading || showSuccess} 
        className="w-full"
      >
        {isLoading ? 'Creando cuenta...' : showSuccess ? 'Cuenta creada' : 'Crear cuenta'}
      </Button>
    </form>
  )
}
