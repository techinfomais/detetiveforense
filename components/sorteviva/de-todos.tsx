"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { IdentifyForm } from "./checkout-identify"

// /institucional/de-todos — "Viva Sorte de Todos".
// Na referência esta rota exige identificação: o visitante cai na tela
// "Olá, boas vindas!" (identificação por CPF) com o personagem ao lado.
// Replicamos essa tela (formulário compartilhado em checkout-identify.tsx); ao continuar,
// seguimos para o fluxo de login do app. /autenticar usa este mesmo layout.

export function DeTodosPage({
  label = "Viva Sorte de Todos",
  onIdentified,
}: {
  label?: string
  /** padrão: segue para /autenticar (fluxo de login do app) */
  onIdentified?: (cpf: string) => void
}) {
  const router = useRouter()

  return (
    <section className="detodos-page" aria-label={label}>
      <div className="detodos-row">
        <div className="detodos-hero">
          <div className="detodos-hero-box">
            <Image
              className="detodos-hero-person"
              src="/avatars/person-login-avatar.webp"
              alt=""
              width={384}
              height={660}
              priority
              unoptimized
            />
            <div className="detodos-hero-logo">
              <Image
                src="/logos/principal-logo.webp"
                alt="Viva Sorte"
                width={257}
                height={32}
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="detodos-spacer" aria-hidden="true" />
        <div className="detodos-main">
          <div className="detodos-main-inner container">
            <div className="detodos-form-wrap">
              <IdentifyForm
                id="detodos-cpf"
                onIdentified={onIdentified ?? (() => router.push("/autenticar/"))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
