"use client"

import { useState, type ChangeEvent, type ReactNode } from "react"
import Link from "next/link"
import { LEGAL } from "./terms"

// /seja-um-revendedor e /seja-um-influenciador — mesmo layout e medidas de vivasorteoficial.com.br
// (formulário de cadastro em card branco sobre fundo primário). Formulário demonstrativo:
// nenhum dado é enviado a servidor algum.

type Kind = "revendedor" | "influenciador"

// Ícones Font Awesome Free 6 (CC BY 4.0 — https://fontawesome.com/license/free)
const icons = {
  eye: {
    viewBox: "0 0 576 512",
    d: "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z",
  },
  eyeSlash: {
    viewBox: "0 0 640 512",
    d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5z",
  },
  angleRight: {
    viewBox: "0 0 320 512",
    d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z",
  },
}

function Icon({ name, className }: { name: keyof typeof icons; className: string }) {
  const { viewBox, d } = icons[name]
  return (
    <svg className={className} viewBox={viewBox} aria-hidden="true" focusable="false">
      <path fill="currentColor" d={d} />
    </svg>
  )
}

const copy: Record<Kind, { title: string; intro: ReactNode }> = {
  revendedor: {
    title: "Seja um revendedor Sorte Viva",
    intro: (
      <>
        Que tal ganhar uma renda extra?
        <br />
        Revenda Sorte Viva sem sair de casa e aproveite essa oportunidade!
        <br />
        Preencha o formulário abaixo e torne-se um revendedor!
      </>
    ),
  },
  influenciador: {
    title: "Seja um influenciador Sorte Viva",
    intro: (
      <>
        Que tal transformar seu público em renda?
        <br />
        Divulgue Sorte Viva nas suas redes e aproveite essa oportunidade!
        <br />
        Preencha o formulário abaixo e torne-se um influenciador!
      </>
    ),
  },
}

const SOCIAL_NETWORKS = [
  ["INSTAGRAM", "Instagram"],
  ["TIKTOK", "TikTok"],
  ["YOUTUBE", "YouTube"],
  ["FACEBOOK", "Facebook"],
  ["KWAI", "Kwai"],
  ["OTHER", "Outra"],
] as const

// Máscaras iguais às da referência
const digits = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max)

function maskPhone(v: string) {
  const d = digits(v, 11)
  if (!d) return ""
  if (d.length <= 2) return `(${d}`
  const rest = d.slice(2)
  const split = d.length === 11 ? 5 : 4
  return rest.length > split
    ? `(${d.slice(0, 2)}) ${rest.slice(0, split)}-${rest.slice(split)}`
    : `(${d.slice(0, 2)}) ${rest}`
}

function maskDocument(v: string) {
  const d = digits(v, 14)
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
}

function maskCep(v: string) {
  return digits(v, 8)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,3})$/, "$1-$2")
}

type FieldProps = {
  label: string
  required?: boolean
  hint?: string
  className?: string
  children: ReactNode
  boxClassName?: string
}

function Field({ label, required, hint, className, children, boxClassName }: FieldProps) {
  return (
    <div className={`partner-field${className ? ` ${className}` : ""}`}>
      <label className="partner-control">
        <span className="partner-label">
          {label}
          {required && <span className="partner-required">*</span>}
        </span>
        <span className={`partner-box${boxClassName ? ` ${boxClassName}` : ""}`}>{children}</span>
      </label>
      {hint && (
        <div className="partner-hint">
          <p>{hint}</p>
        </div>
      )}
    </div>
  )
}

export function PartnerPage({ kind }: { kind: Kind }) {
  const [sent, setSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState("")
  const [doc, setDoc] = useState("")
  const [cep, setCep] = useState("")
  const masked =
    (set: (v: string) => void, mask: (v: string) => string) => (e: ChangeEvent<HTMLInputElement>) =>
      set(mask(e.target.value))
  const { title, intro } = copy[kind]

  return (
    <div className="partner-bg">
      <div className="container">
        <div className="partner-card">
          {sent ? (
            <div className="partner-form" role="status">
              <div className="partner-head">
                <h1>Cadastro demonstrativo concluído!</h1>
                <p>
                  Nenhum dado foi enviado. Em produção, nosso time entraria em contato pelo
                  e-mail {LEGAL.email} ou pelo telefone {LEGAL.supportPhone}.
                </p>
              </div>
              <button
                type="button"
                className="partner-submit"
                onClick={() => {
                  setSent(false)
                  setPhone("")
                  setDoc("")
                  setCep("")
                }}
              >
                Fazer novo cadastro
              </button>
            </div>
          ) : (
            <form
              className="partner-form"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              <div className="partner-head">
                <h1>{title}</h1>
                <p>{intro}</p>
              </div>

              <Field label="Nome completo" required>
                <input
                  className="partner-input"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Digite seu nome completo"
                />
              </Field>
              <Field label="Endereço de e-mail" required>
                <input
                  className="partner-input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Digite seu endereço de e-mail"
                />
              </Field>
              <Field label="Crie uma senha" required>
                <input
                  className="partner-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Digite uma senha"
                />
                <button
                  type="button"
                  className="partner-eye"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword((v) => !v)
                  }}
                >
                  <Icon name={showPassword ? "eyeSlash" : "eye"} className="partner-eye-icon" />
                </button>
              </Field>
              <Field
                label="Celular / WhatsApp"
                required
                hint="Será enviada uma mensagem por SMS para confirmar o seu número."
              >
                <input
                  className="partner-input"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  minLength={14}
                  placeholder="Digite seu número de telefone com DDD"
                  value={phone}
                  onChange={masked(setPhone, maskPhone)}
                />
              </Field>
              <Field label="CPF ou CNPJ" required>
                <input
                  className="partner-input"
                  name="document"
                  inputMode="numeric"
                  required
                  minLength={14}
                  placeholder="Digite seu CPF ou CNPJ"
                  value={doc}
                  onChange={masked(setDoc, maskDocument)}
                />
              </Field>

              {kind === "influenciador" && (
                <div className="partner-pair">
                  <Field
                    label="Rede social"
                    required
                    hint="Selecione a rede social que você mais utiliza"
                  >
                    <select className="partner-input partner-select" name="network" required defaultValue="">
                      <option value="">Selecione uma opção</option>
                      {SOCIAL_NETWORKS.map(([value, name]) => (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Perfil"
                    required
                    hint="Informe o seu perfil na rede social selecionada"
                  >
                    <input
                      className="partner-input partner-input-lg"
                      name="profile"
                      required
                      placeholder="Seu perfil"
                    />
                  </Field>
                </div>
              )}

              <Field label="CEP" required>
                <input
                  className="partner-input"
                  name="cep"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  minLength={10}
                  placeholder="Digite o CEP do seu endereço"
                  value={cep}
                  onChange={masked(setCep, maskCep)}
                />
              </Field>
              <Field label="Endereço" required>
                <input
                  className="partner-input"
                  name="address"
                  autoComplete="address-line1"
                  required
                  placeholder="Digite o seu endereço"
                />
              </Field>
              <Field label="Número" required>
                <input
                  className="partner-input"
                  name="number"
                  required
                  placeholder="Digite o número da sua casa"
                />
              </Field>
              {/* Preenchidos automaticamente pelo CEP na referência; sem consulta externa aqui. */}
              <Field label="Bairro" boxClassName="is-disabled">
                <input className="partner-input" name="district" disabled />
              </Field>
              <Field label="Cidade" boxClassName="is-disabled">
                <input className="partner-input" name="city" disabled />
              </Field>
              <Field label="Estado" boxClassName="is-disabled">
                <input className="partner-input" name="state" disabled />
              </Field>

              <div className="partner-notes">
                <p className="partner-note">
                  <span className="partner-note-icon">
                    <Icon name="angleRight" className="partner-angle" />
                  </span>
                  <span>
                    Ao realizar o cadastro, você concorda com os{" "}
                    <Link href="/institucional/termos-de-uso">Termos do Contrato de Adesão</Link>.
                  </span>
                </p>
                <div className="partner-note">
                  <span className="partner-note-icon">
                    <Icon name="angleRight" className="partner-angle" />
                  </span>
                  <p>Este site é protegido por serviços de verificação de segurança.</p>
                </div>
              </div>

              <button type="submit" className="partner-submit">
                Realizar cadastro
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
