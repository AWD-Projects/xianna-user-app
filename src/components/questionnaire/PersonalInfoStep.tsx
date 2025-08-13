'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const personalInfoSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  age: z.number().min(16, 'Debes ser mayor de 16 años').max(100, 'Edad no válida'),
  profession: z.string().min(2, 'La profesión es requerida'),
  city: z.string().min(2, 'La ciudad es requerida'),
  bodyType: z.string().min(1, 'Selecciona tu tipo de cuerpo'),
  size: z.string().min(1, 'Selecciona tu talla')
})

type PersonalInfoData = z.infer<typeof personalInfoSchema>

interface PersonalInfoStepProps {
  onSubmit: (data: PersonalInfoData) => void
  initialData?: any
}

export function PersonalInfoStep({ onSubmit, initialData }: PersonalInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData
  })

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Cuéntanos <span className="text-[#E61F93]">sobre ti</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Esta información nos ayudará a personalizar tus recomendaciones
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <Input
              {...register('name')}
              placeholder="Tu nombre"
              className={`h-12 text-base ${errors.name ? 'border-red-400 focus:border-red-400' : 'focus:border-[#E61F93]'}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad
            </label>
            <Input
              type="number"
              {...register('age', { valueAsNumber: true })}
              placeholder="Tu edad"
              className={`h-12 text-base ${errors.age ? 'border-red-400 focus:border-red-400' : 'focus:border-[#E61F93]'}`}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profesión
            </label>
            <Input
              {...register('profession')}
              placeholder="¿A qué te dedicas?"
              className={`h-12 text-base ${errors.profession ? 'border-red-400 focus:border-red-400' : 'focus:border-[#E61F93]'}`}
            />
            {errors.profession && (
              <p className="text-red-500 text-sm mt-1">{errors.profession.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad
            </label>
            <Input
              {...register('city')}
              placeholder="¿Dónde vives?"
              className={`h-12 text-base ${errors.city ? 'border-red-400 focus:border-red-400' : 'focus:border-[#E61F93]'}`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de cuerpo
            </label>
            <select
              {...register('bodyType')}
              className={`w-full h-12 border rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-[#E61F93] ${errors.bodyType ? 'border-red-400' : 'border-gray-300'}`}
            >
              <option value="">Selecciona tu tipo</option>
              <option value="pera">Pera</option>
              <option value="manzana">Manzana</option>
              <option value="reloj-arena">Reloj de arena</option>
              <option value="rectangulo">Rectángulo</option>
              <option value="triangulo-invertido">Triángulo invertido</option>
            </select>
            {errors.bodyType && (
              <p className="text-red-500 text-sm mt-1">{errors.bodyType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Talla
            </label>
            <select
              {...register('size')}
              className={`w-full h-12 border rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-[#E61F93] ${errors.size ? 'border-red-400' : 'border-gray-300'}`}
            >
              <option value="">Selecciona tu talla</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            {errors.size && (
              <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>
            )}
          </div>
        </div>

        <div className="pt-8">
          <Button
            type="submit"
            className="w-full bg-[#E61F93] hover:bg-[#E61F93]/90 text-white py-3 text-lg font-semibold"
          >
            Comenzar cuestionario
          </Button>
        </div>
      </form>
    </div>
  )
}
