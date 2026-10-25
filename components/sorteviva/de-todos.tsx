"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

// /institucional/de-todos — "Viva Sorte de Todos".
// Na referência esta rota exige identificação: o visitante cai na tela
// "Olá, boas vindas!" (identificação por CPF) com o personagem ao lado.
// Replicamos essa tela; ao continuar, seguimos para o fluxo de login do app.

const onlyDigits = (v: string) => v.replace(/\D/g, "").slice(0, 11)

const maskCpf = (v: string) =>
  onlyDigits(v)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")

// Valida os dígitos verificadores do CPF (o botão só habilita com CPF válido).
function isValidCpf(value: string) {
  const d = onlyDigits(value)
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false
  const check = (len: number) => {
    let sum = 0
    for (let i = 0; i < len; i++) sum += Number(d[i]) * (len + 1 - i)
    const r = (sum * 10) % 11
    return r === 10 ? 0 : r
  }
  return check(9) === Number(d[9]) && check(10) === Number(d[10])
}

export function DeTodosPage() {
  const router = useRouter()
  const [cpf, setCpf] = useState("")
  const [loading, setLoading] = useState(false)
  const valid = isValidCpf(cpf)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!valid || loading) return
    setLoading(true)
    window.setTimeout(() => router.push("/autenticar/"), 900)
  }

  return (
    <section className="detodos-page" aria-label="Viva Sorte de Todos">
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
                alt="Sorte Viva"
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
              <form className="detodos-form" onSubmit={submit} noValidate>
                <div className="detodos-head">
                  <h2>Olá, boas vindas!</h2>
                  <span>Identifique-se usando seu CPF</span>
                </div>
                <div className="detodos-field">
                  <div className="detodos-input">
                    <label className="detodos-input-control" htmlFor="detodos-cpf">
                      <input
                        id="detodos-cpf"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        aria-label="CPF"
                        placeholder="Digite o seu CPF"
                        maxLength={14}
                        value={cpf}
                        autoFocus
                        aria-describedby="detodos-cpf-hint"
                        onChange={(e) => setCpf(maskCpf(e.target.value))}
                      />
                    </label>
                    <span className="detodos-input-label" aria-hidden="true">
                      CPF
                    </span>
                  </div>
                  <p id="detodos-cpf-hint" className="detodos-hint">
                    Insira o número do seu CPF
                  </p>
                </div>
                <div className="detodos-actions">
                  <button
                    type="submit"
                    className={`detodos-submit${valid && !loading ? " is-ready" : ""}`}
                    disabled={!valid || loading}
                    aria-busy={loading}
                  >
                    <span>
                      {loading && <span className="detodos-spinner" aria-hidden="true" />}
                      Continuar
                    </span>
                  </button>
                  <p className="detodos-secure">
                    <span>Este site é protegido por serviços de verificação de segurança.</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
