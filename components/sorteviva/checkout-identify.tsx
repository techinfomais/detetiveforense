"use client"

import { useState, type FormEvent } from "react"

// Etapa "Identificação" (CPF) — mesma tela do /checkout, /autenticar e /institucional/de-todos
// da referência. Tudo acontece no navegador: o CPF não é enviado a nenhum servidor.

export const onlyDigits = (v: string) => v.replace(/\D/g, "").slice(0, 11)

export const maskCpf = (v: string) =>
  onlyDigits(v)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")

// Valida os dígitos verificadores do CPF (o botão só habilita com CPF válido).
export function isValidCpf(value: string) {
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

type IdentifyFormProps = {
  /** id do campo (único na página) */
  id: string
  /** chamado depois do "carregando" simulado, com o CPF já mascarado */
  onIdentified: (cpf: string) => void
  /** CPF inicial (ex.: ao voltar para a etapa 1) */
  initialCpf?: string
  autoFocus?: boolean
  /** duração do estado "carregando" simulado (ms) */
  delay?: number
}

export function IdentifyForm({
  id,
  onIdentified,
  initialCpf = "",
  autoFocus = true,
  delay = 900,
}: IdentifyFormProps) {
  const [cpf, setCpf] = useState(initialCpf)
  const [loading, setLoading] = useState(false)
  const valid = isValidCpf(cpf)
  // 11 dígitos, mas dígitos verificadores errados → mensagem de erro no lugar da dica
  const invalid = onlyDigits(cpf).length === 11 && !valid

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!valid || loading) return
    setLoading(true)
    window.setTimeout(() => onIdentified(cpf), delay)
  }

  return (
    <form className="identify-form" onSubmit={submit} noValidate>
      <div className="identify-head">
        <h2>
          <span>Olá, boas vindas!</span>
        </h2>
        <span>Identifique-se usando seu CPF</span>
      </div>
      <div className="identify-field">
        <div className={`identify-input${invalid ? " is-invalid" : ""}`}>
          <label className="identify-input-control" htmlFor={id}>
            <input
              id={id}
              name="cpf"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              aria-label="CPF"
              aria-invalid={invalid}
              aria-describedby={`${id}-hint`}
              placeholder="Digite o seu CPF"
              maxLength={14}
              value={cpf}
              autoFocus={autoFocus}
              readOnly={loading}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
            />
          </label>
          <span className="identify-input-label" aria-hidden="true">
            CPF
          </span>
        </div>
        <p
          id={`${id}-hint`}
          className={`identify-hint${invalid ? " is-error" : ""}`}
          role={invalid ? "alert" : undefined}
        >
          {invalid ? "CPF inválido. Confira os números digitados." : "Insira o número do seu CPF"}
        </p>
      </div>
      <div className="identify-actions">
        <button
          type="submit"
          className={`identify-submit${valid && !loading ? " is-ready" : ""}`}
          disabled={!valid || loading}
          aria-busy={loading}
        >
          <span>
            {loading && <span className="identify-spinner" aria-hidden="true" />}
            Continuar
          </span>
        </button>
        <p className="identify-secure">
          <span>Este site é protegido por serviços de verificação de segurança.</span>
        </p>
      </div>
    </form>
  )
}
