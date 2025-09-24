import type { Metadata } from 'next'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Correo confirmado',
  description: 'Tu dirección de correo electrónico ha sido verificada correctamente.',
}

type SearchParams = {
  status?: 'success' | 'error'
  email?: string
}

export default function CorreoConfirmadoPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const status = searchParams?.status ?? 'success'
  const email = searchParams?.email
  const isSuccess = status === 'success'

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-white to-indigo-50">
      {/* blobs decorativos */}
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      {/* card centrada */}
      <div className="relative mx-auto max-w-2xl rounded-3xl border border-slate-100/70 bg-white/70 p-10 text-center shadow-xl backdrop-blur">
        {/* heading con gradiente */}
        <h1 className="mx-auto mb-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span
            className={cn(
              'bg-gradient-to-r bg-clip-text text-transparent',
              isSuccess
                ? 'from-fuchsia-600 via-pink-600 to-rose-500'
                : 'from-rose-600 via-orange-600 to-amber-600'
            )}
          >
            {isSuccess ? '¡Correo confirmado!' : 'Ocurrió un problema'}
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-700">
          {isSuccess ? (
            <>
              {email ? (
                <>
                  La dirección <span className="font-semibold text-slate-900">{email}</span> ha sido
                  verificada correctamente. Ahora puedes regresar a la pantalla principal para iniciar sesión.
                </>
              ) : (
                <>Tu dirección de correo electrónico ha sido verificada con éxito. Regresa a la pantalla principal para iniciar sesión.</>
              )}
            </>
          ) : (
            <>No pudimos completar la verificación. Revisa el enlace o intenta nuevamente desde tu bandeja de entrada.</>
          )}
        </p>

        {/* pills alineadas con la landing */}
        <div className="mb-2 flex flex-wrap items-center justify-center gap-3">
          <Badge icon="🎯" text="Estilo Personalizado" />
          <Badge icon="🧠" text="Análisis Experto" />
          <Badge icon="👗" text="Outfits Grandiosos" />
        </div>
      </div>
    </div>
  )
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
      <span aria-hidden="true">{icon}</span>
      <span>{text}</span>
    </div>
  )
}
