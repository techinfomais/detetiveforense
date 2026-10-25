"use client"

import { useRef, useState, type FormEvent } from "react"
import {
  birthDateError,
  maskDate,
  maskPhone,
  nameError,
  phoneError,
  type Customer,
} from "./customer"

// Etapa "Seus dados" do checkout (depois do CPF): nome, nascimento e celular/WhatsApp.
// Usa os mesmos campos com rótulo flutuante da identificação.

type Values = Omit<Customer, "cpf">
type Key = keyof Values

const FIELDS: {
  key: Key
  label: string
  placeholder: string
  hint: string
  inputMode?: "numeric" | "tel" | "text"
  type?: string
  autoComplete: string
  maxLength?: number
  mask?: (v: string) => string
  error: (v: string) => string
}[] = [
  {
    key: "name",
    label: "Nome completo",
    placeholder: "Digite o seu nome completo",
    hint: "Como está no seu documento",
    autoComplete: "name",
    maxLength: 120,
    error: nameError,
  },
  {
    key: "birthDate",
    label: "Data de nascimento",
    placeholder: "dd/mm/aaaa",
    hint: "Participação permitida somente a maiores de 16 anos",
    inputMode: "numeric",
    autoComplete: "bday",
    maxLength: 10,
    mask: maskDate,
    error: birthDateError,
  },
  {
    key: "phone",
    label: "Celular / WhatsApp",
    placeholder: "(00) 00000-0000",
    hint: "Usaremos este número para falar com você sobre a sua compra",
    inputMode: "tel",
    type: "tel",
    autoComplete: "tel-national",
    maxLength: 15,
    mask: maskPhone,
    error: phoneError,
  },
]

export function ProfileForm({
  id,
  initial,
  onSubmit,
}: {
  id: string
  initial?: Partial<Values>
  onSubmit: (values: Values) => void
}) {
  const [values, setValues] = useState<Values>({
    name: initial?.name ?? "",
    birthDate: initial?.birthDate ?? "",
    phone: initial?.phone ?? "",
  })
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({})
  const form = useRef<HTMLFormElement>(null)

  const errors = Object.fromEntries(FIELDS.map((f) => [f.key, f.error(values[f.key])])) as Record<Key, string>
  const valid = FIELDS.every((f) => !errors[f.key])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!valid) {
      setTouched({ name: true, birthDate: true, phone: true })
      const first = FIELDS.find((f) => errors[f.key])
      if (first) form.current?.querySelector<HTMLInputElement>(`#${id}-${first.key}`)?.focus()
      return
    }
    onSubmit({ ...values, name: values.name.trim().replace(/\s+/g, " ") })
  }

  return (
    <form className="identify-form ck-profile" onSubmit={submit} noValidate ref={form}>
      <div className="identify-head">
        <h2 tabIndex={-1}>
          <span>Seus dados</span>
        </h2>
        <span>Complete seu cadastro para continuar</span>
      </div>
      {FIELDS.map((f) => {
        const showError = touched[f.key] && !!errors[f.key]
        const inputId = `${id}-${f.key}`
        return (
          <div key={f.key} className="identify-field">
            <div className={`identify-input${showError ? " is-invalid" : ""}`}>
              <label className="identify-input-control" htmlFor={inputId}>
                <input
                  id={inputId}
                  name={f.key}
                  type={f.type ?? "text"}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  aria-label={f.label}
                  aria-invalid={showError}
                  aria-describedby={`${inputId}-hint`}
                  placeholder={f.placeholder}
                  maxLength={f.maxLength}
                  value={values[f.key]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [f.key]: f.mask ? f.mask(e.target.value) : e.target.value }))
                  }
                  onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))}
                />
              </label>
              <span className="identify-input-label" aria-hidden="true">
                {f.label}
              </span>
            </div>
            <p
              id={`${inputId}-hint`}
              className={`identify-hint${showError ? " is-error" : ""}`}
              role={showError ? "alert" : undefined}
            >
              {showError ? errors[f.key] : f.hint}
            </p>
          </div>
        )
      })}
      <div className="identify-actions">
        <button type="submit" className={`identify-submit${valid ? " is-ready" : ""}`}>
          <span>Continuar</span>
        </button>
      </div>
    </form>
  )
}
