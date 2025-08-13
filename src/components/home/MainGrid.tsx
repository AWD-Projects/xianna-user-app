'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Instagram,
  Palette,
  Sparkles as CatalogIcon,
} from 'lucide-react';
import * as React from 'react';

/* ---------- UI atoms ---------- */

function Badge({
  children,
  className = '',
}: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium',
        'backdrop-blur border',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}

function IconChip({
  children,
  className = '',
}: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={[
        'inline-flex h-11 w-11 items-center justify-center rounded-xl',
        'shadow-sm',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}

function CTAArrow() {
  return (
    <span
      className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
      aria-hidden="true"
    >
      Ver más
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
        <ArrowRight className="h-4 w-4" />
      </span>
    </span>
  );
}

/* ---------- Page ---------- */

export function MainGrid(): JSX.Element {
  const router = useRouter()
  return (
    <div className="h-screen w-full max-w-7xl mx-auto p-4 grid gap-4 grid-cols-12 grid-rows-6 overflow-hidden">
      {/* HERO — 8x4 */}
      <Card
        className={[
          'col-span-8 row-span-4 relative overflow-hidden border-0 rounded-3xl text-white',
          'bg-gradient-to-br from-pink-600 via-pink-500 to-fuchsia-600',
          // brillo diagonal sutil
          'before:absolute before:inset-0 before:bg-[radial-gradient(60rem_30rem_at_-10%_-10%,rgba(255,255,255,0.22),transparent_60%)] before:content-[""]',
          'shadow-[0_20px_60px_-20px_rgba(236,72,153,0.45)]',
        ].join(' ')}
        role="region"
        aria-label="Hero"
      >
        <div className="absolute top-6 right-6 opacity-25">
          <Sparkles className="w-36 h-36" />
        </div>

        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
          <Badge className="bg-white/10 border-white/20 text-white/90">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-md bg-white/20">
              <Heart className="h-3 w-3" />
            </span>
            XIANNA
          </Badge>

          <h1 className="mt-4 text-[40px] leading-tight md:text-5xl font-extrabold tracking-tight">
            Descubre tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-white">
              estilo único
            </span>
          </h1>

          <p className="mt-3 max-w-lg text-pink-50/95">
            Tu guía personal en moda y estilo, celebrando la singularidad y el talento mexicano.
          </p>

          <div className="mt-auto flex flex-wrap gap-3">
            <Button
              className="bg-white text-pink-700 hover:bg-white/90 border-0 rounded-xl h-10 px-6 shadow-sm focus-visible:ring-2 focus-visible:ring-pink-200"
              onClick={() => router.push('/auth/register')}
            >
              Comenzar ahora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-xl h-10 px-6 focus-visible:ring-2 focus-visible:ring-pink-200"
              onClick={() => router.push('/blog')}
            >
              Explorar blog
            </Button>
          </div>
        </div>
      </Card>

      {/* CATÁLOGO — 4x2 */}
      <Link
        href="/catalogo"
        className="col-span-4 row-span-2 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-200 rounded-3xl"
        aria-label="Abrir catálogo"
      >
        <Card
          className={[
            'h-full w-full p-6 rounded-3xl border-0 text-black',
            'bg-gradient-to-br from-yellow-300 to-yellow-400',
            'shadow-[0_14px_40px_-18px_rgba(234,179,8,0.55)]',
            'transition-transform duration-200 group-hover:scale-[1.02]',
          ].join(' ')}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between">
              <IconChip className="bg-black/10">
                <CatalogIcon className="h-5 w-5" />
              </IconChip>

              <Badge className="bg-white/25 border-white/30 text-black/80">Nuevo</Badge>
            </div>

            <div className="mt-auto space-y-1">
              <h3 className="text-xl font-semibold">Catálogo</h3>
              <p className="text-sm text-black/80">Outfits increíbles</p>
              <div className="pt-2 text-black/80">
                <CTAArrow />
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* BLOG — 4x2 */}
      <Link
        href="/blog"
        className="col-span-4 row-span-2 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-200 rounded-3xl"
        aria-label="Abrir blog"
      >
        <Card
          className={[
            'h-full w-full p-6 rounded-3xl border-0 text-white relative overflow-hidden',
            'bg-gradient-to-br from-pink-300 via-pink-400 to-rose-400',
            'shadow-[0_14px_40px_-18px_rgba(244,114,182,0.55)]',
            'transition-transform duration-200 group-hover:scale-[1.02]',
          ].join(' ')}
        >
          {/* overlay sutil para legibilidad */}
          <div className="absolute inset-0 bg-white/5 mix-blend-soft-light pointer-events-none" />
          <div className="relative h-full flex flex-col">
            <IconChip className="bg-white/20">
              <Heart className="h-5 w-5" />
            </IconChip>

            <div className="mt-auto space-y-1">
              <h3 className="text-xl font-semibold">Blog</h3>
              <p className="text-sm text-white/90">Tendencias y tips</p>
              <div className="pt-2 text-white/90">
                <CTAArrow />
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* FRASE — 4x2 */}
      <Card
        className={[
          'col-span-4 row-span-2 p-6 rounded-3xl border-0 text-white relative overflow-hidden',
          'bg-gradient-to-br from-violet-500 to-purple-600',
          'shadow-[0_14px_40px_-18px_rgba(139,92,246,0.55)]',
        ].join(' ')}
        role="note"
        aria-label="Frase de moda"
      >
        {/* textura sutil */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background:radial-gradient(circle_at_20%_20%,white_6%,transparent_7%),radial-gradient(circle_at_80%_30%,white_6%,transparent_7%),radial-gradient(circle_at_40%_70%,white_6%,transparent_7%)] bg-[length:20px_20px]" />
        <div className="relative h-full w-full flex items-center justify-center text-center px-2">
          <blockquote className="text-[15px] leading-relaxed italic max-w-xs">
            “La moda es la armadura para sobrevivir a la realidad cotidiana.” — Bill Cunningham
          </blockquote>
        </div>
      </Card>

      {/* REDES — 4x2 */}
      <Card
        className={[
          'col-span-4 row-span-2 rounded-3xl border-0 text-white relative overflow-hidden',
          'bg-[#0f1420]',
          'shadow-[0_14px_40px_-18px_rgba(2,6,23,0.6)]',
        ].join(' ')}
        role="region"
        aria-label="Redes sociales"
      >
        <div className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_120%_-20%,rgba(236,72,153,0.2),transparent)]" />
        <div className="relative h-full w-full px-6 py-5 flex flex-col">
          <Badge className="bg-white/10 border-white/15 text-white/90">Comunidad</Badge>

          <div className="mt-auto space-y-1">
            <h3 className="text-lg font-semibold">Síguenos</h3>
            <p className="text-sm text-white/70">Únete a la comunidad</p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <Link
              href="https://www.instagram.com/xianna.mx"
              target="_blank"
              className="inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors"
              aria-label="Abrir Instagram @xianna.mx"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="text-sm">@xianna.mx</span>
            </Link>

            <Button 
              className="bg-pink-500 hover:bg-pink-600 border-0 rounded-xl h-9 px-4"
              onClick={() => router.push('/auth/register')}
            >
              <span className="inline-flex items-center gap-2">
                Comenzar
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </Card>

      {/* TEST DE ESTILO — 4x2 */}
      <Link
        href="/formulario"
        className="col-span-4 row-span-2 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200 rounded-3xl"
        aria-label="Abrir Test de Estilo"
      >
        <Card
          className={[
            'h-full w-full p-6 rounded-3xl border-0 text-white relative overflow-hidden',
            'bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500',
            'shadow-[0_14px_40px_-18px_rgba(79,70,229,0.55)]',
            'transition-transform duration-200 group-hover:scale-[1.02]',
          ].join(' ')}
        >
          <div className="absolute inset-0 bg-[radial-gradient(35rem_18rem_at_-20%_-20%,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="relative h-full flex flex-col">
            <IconChip className="bg-white/20">
              <Palette className="h-5 w-5" />
            </IconChip>

            <div className="mt-auto space-y-1">
              <h3 className="text-xl font-semibold">Test de Estilo</h3>
              <p className="text-sm text-white/90">Descubre tu arquetipo en ~5 min</p>
              <div className="pt-2 text-white/90">
                <CTAArrow />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
