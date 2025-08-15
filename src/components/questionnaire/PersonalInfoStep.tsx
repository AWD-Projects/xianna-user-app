'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const personalInfoSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  age: z.number().min(16, 'Debes ser mayor de 16 años').max(100, 'Edad no válida'),
  gender: z.string().min(1, 'Selecciona tu género'),
  occupation: z.string().min(1, 'Selecciona tu ocupación'),
  state: z.string().min(1, 'Selecciona tu estado'),
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
              Género
            </label>
            <select
              {...register('gender')}
              className={`w-full h-12 border rounded-lg pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#E61F93] ${errors.gender ? 'border-red-400' : 'border-gray-300'}`}
            >
              <option value="">Selecciona tu género</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="no-binario">No binario</option>
              <option value="prefiero-no-decir">Prefiero no decir</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ocupación
            </label>
            <select
              {...register('occupation')}
              className={`w-full h-12 border rounded-lg pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#E61F93] ${errors.occupation ? 'border-red-400' : 'border-gray-300'}`}
            >
              <option value="">Selecciona tu ocupación</option>
              <option value="estudiante">Estudiante</option>
              <option value="profesionista-oficina">Profesionista en oficina (contadora, abogada, ejecutiva)</option>
              <option value="profesionista-creativa">Profesionista creativa (diseñadora, fotógrafa, artista)</option>
              <option value="profesionista-salud">Profesionista en sector salud</option>
              <option value="profesionista-educativo">Profesionista en sector educativo</option>
              <option value="emprendedora">Dueña de negocio / Emprendedora</option>
              <option value="ama-casa">Ama de casa / Cuidadora</option>
            </select>
            {errors.occupation && (
              <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              {...register('state')}
              className={`w-full h-12 border rounded-lg pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#E61F93] ${errors.state ? 'border-red-400' : 'border-gray-300'}`}
            >
              <option value="">Selecciona tu estado</option>
              <option value="aguascalientes">Aguascalientes</option>
              <option value="baja-california">Baja California</option>
              <option value="baja-california-sur">Baja California Sur</option>
              <option value="campeche">Campeche</option>
              <option value="chiapas">Chiapas</option>
              <option value="chihuahua">Chihuahua</option>
              <option value="coahuila">Coahuila</option>
              <option value="colima">Colima</option>
              <option value="durango">Durango</option>
              <option value="guanajuato">Guanajuato</option>
              <option value="guerrero">Guerrero</option>
              <option value="hidalgo">Hidalgo</option>
              <option value="jalisco">Jalisco</option>
              <option value="mexico">Estado de México</option>
              <option value="michoacan">Michoacán</option>
              <option value="morelos">Morelos</option>
              <option value="nayarit">Nayarit</option>
              <option value="nuevo-leon">Nuevo León</option>
              <option value="oaxaca">Oaxaca</option>
              <option value="puebla">Puebla</option>
              <option value="queretaro">Querétaro</option>
              <option value="quintana-roo">Quintana Roo</option>
              <option value="san-luis-potosi">San Luis Potosí</option>
              <option value="sinaloa">Sinaloa</option>
              <option value="sonora">Sonora</option>
              <option value="tabasco">Tabasco</option>
              <option value="tamaulipas">Tamaulipas</option>
              <option value="tlaxcala">Tlaxcala</option>
              <option value="veracruz">Veracruz</option>
              <option value="yucatan">Yucatán</option>
              <option value="zacatecas">Zacatecas</option>
              <option value="cdmx">Ciudad de México</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>



          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Talla
            </label>
            <select
              {...register('size')}
              className={`w-full h-12 border rounded-lg pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#E61F93] ${errors.size ? 'border-red-400' : 'border-gray-300'}`}
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
            <p className="text-xs text-gray-500 mt-2">
              Este dato lo queremos para personalizar tu experiencia de acuerdo a tus necesidades
            </p>
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
