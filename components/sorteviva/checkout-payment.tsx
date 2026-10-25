"use client"

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react"
import { Clock, Copy, Check } from "lucide-react"

// Pagamento DEMONSTRATIVO: Pix e cartão simulados no navegador.
// Nenhum gateway, antifraude ou serviço externo é chamado; nada é enviado.

export type PayMethod = "pix" | "card"

const money = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
const pad = (n: number) => String(n).padStart(2, "0")

// gerador pseudoaleatório determinístico (mulberry32) — o "QR" depende só do pedido
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hash = (s: string) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7)

/** QR Code ILUSTRATIVO (padrão visual de QR, não decodificável). */
function SampleQr({ seed }: { seed: string }) {
  const N = 29
  const cells = useMemo(() => {
    const rand = rng(hash(seed))
    const finder = (x: number, y: number) => {
      for (const [fx, fy] of [
        [0, 0],
        [N - 7, 0],
        [0, N - 7],
      ]) {
        const dx = x - fx
        const dy = y - fy
        if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) {
          if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return 0
          const ring = Math.min(dx, dy, 6 - dx, 6 - dy)
          return ring === 1 ? 0 : 1
        }
      }
      return -1
    }
    const out: [number, number][] = []
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const f = finder(x, y)
        if (f === 1 || (f === -1 && rand() > 0.52)) out.push([x, y])
      }
    return out
  }, [seed])
  return (
    <svg
      className="ck-qr is-sample"
      viewBox={`0 0 ${N} ${N}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR Code ilustrativo do Pix (demonstração)"
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="rgb(16, 18, 20)" />
      ))}
    </svg>
  )
}

function PixPanel({
  orderId,
  total,
  onPaid,
}: {
  orderId: string
  total: number
  onPaid: () => void
}) {
  const [left, setLeft] = useState(15 * 60)
  const [copied, setCopied] = useState(false)
  const [paying, setPaying] = useState(false)
  useEffect(() => {
    const t = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(t)
  }, [])
  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2500)
    return () => window.clearTimeout(t)
  }, [copied])
  // código "copia e cola" fictício (não é um BR Code válido)
  const code = `00020126DEMONSTRACAO0014SORTEVIVA.PIX52040000530398654${String(
    Math.round(total * 100)
  ).padStart(6, "0")}5802BR5910VIVA SORTE62${orderId}6304DEMO`
  const expired = left === 0
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      /* sem permissão de área de transferência: o campo continua selecionável */
    }
    setCopied(true)
  }
  return (
    <div className="ck-pay-card">
      <div className="ck-pix-top">
        <h3>Pague {money(total)} com Pix</h3>
        <SampleQr seed={orderId} />
        <span className={`ck-timer${expired ? " is-expired" : ""}`} role="timer">
          <Clock size={14} aria-hidden="true" />
          {expired
            ? "Código expirado"
            : `Expira em ${pad(Math.floor(left / 60))}:${pad(left % 60)}`}
        </span>
      </div>
      <div className="ck-copy">
        <input
          readOnly
          value={code}
          aria-label="Código Pix copia e cola (fictício)"
          onFocus={(e) => e.currentTarget.select()}
        />
        <button type="button" className="ck-btn is-outline" onClick={copy}>
          <span>
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? "Copiado!" : "Copiar"}
          </span>
        </button>
      </div>
      <ol className="ck-howto">
        <li>Abra o app do seu banco e escolha pagar com Pix.</li>
        <li>Escaneie o QR Code ou cole o código copiado.</li>
        <li>Confirme o valor e conclua — a aprovação é imediata.</li>
      </ol>
      <p className="ck-demo">
        Demonstração: este QR Code e o código acima são ilustrativos e não podem ser pagos.
        Use o botão abaixo para simular a confirmação.
      </p>
      <button
        type="button"
        className="ck-btn"
        disabled={paying}
        aria-busy={paying}
        onClick={() => {
          setPaying(true)
          window.setTimeout(onPaid, 1200)
        }}
      >
        <span>
          {paying && <span className="identify-spinner" aria-hidden="true" />}
          {paying ? "Confirmando pagamento…" : "Simular pagamento aprovado"}
        </span>
      </button>
    </div>
  )
}

/* ---------- Cartão (fictício) ---------- */
const digits = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max)
const maskCard = (v: string) => digits(v, 16).replace(/(\d{4})(?=\d)/g, "$1 ")
const maskExpiry = (v: string) => digits(v, 4).replace(/(\d{2})(\d)/, "$1/$2")
function luhn(v: string) {
  const d = digits(v, 19)
  if (d.length < 13) return false
  let sum = 0
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i])
    if (i % 2) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }
  return sum % 10 === 0
}
function validExpiry(v: string) {
  const d = digits(v, 4)
  if (d.length !== 4) return false
  const m = Number(d.slice(0, 2))
  const y = 2000 + Number(d.slice(2))
  if (m < 1 || m > 12) return false
  const now = new Date()
  return y > now.getFullYear() || (y === now.getFullYear() && m >= now.getMonth() + 1)
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  half,
  inputMode,
  maxLength,
  autoComplete = "off",
  children,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  hint?: string
  half?: boolean
  inputMode?: "numeric" | "text"
  maxLength?: number
  autoComplete?: string
  children?: ReactNode
}) {
  return (
    <div className={`identify-field${half ? " is-half" : ""}`}>
      <div className={`identify-input${error ? " is-invalid" : ""}`}>
        <label className="identify-input-control" htmlFor={id}>
          <input
            id={id}
            type="text"
            inputMode={inputMode}
            autoComplete={autoComplete}
            aria-label={label}
            aria-invalid={!!error}
            aria-describedby={error || hint ? `${id}-hint` : undefined}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
        <span className="identify-input-label" aria-hidden="true">
          {label}
        </span>
      </div>
      {(error || hint) && (
        <p id={`${id}-hint`} className={`identify-hint${error ? " is-error" : ""}`}>
          {error || hint}
        </p>
      )}
      {children}
    </div>
  )
}

function CardPanel({ total, onPaid }: { total: number; onPaid: () => void }) {
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [paying, setPaying] = useState(false)
  const numberDone = digits(number, 16).length === 16
  const errors = {
    number: numberDone && !luhn(number) ? "Número de cartão inválido." : "",
    expiry: digits(expiry, 4).length === 4 && !validExpiry(expiry) ? "Validade inválida." : "",
  }
  const ok =
    numberDone &&
    !errors.number &&
    name.trim().length >= 3 &&
    validExpiry(expiry) &&
    digits(cvv, 4).length >= 3
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!ok || paying) return
    setPaying(true)
    window.setTimeout(onPaid, 1500)
  }
  return (
    <form className="ck-pay-card" onSubmit={submit} noValidate>
      <h3>Pague {money(total)} com cartão de crédito</h3>
      <div className="ck-card-grid">
        <Field
          id="ck-card-number"
          label="Número do cartão"
          placeholder="0000 0000 0000 0000"
          inputMode="numeric"
          maxLength={19}
          value={number}
          onChange={(v) => setNumber(maskCard(v))}
          error={errors.number}
          hint="Teste com 4111 1111 1111 1111"
        />
        <Field
          id="ck-card-name"
          label="Nome impresso no cartão"
          placeholder="Como está no cartão"
          maxLength={40}
          value={name}
          onChange={(v) => setName(v.replace(/[^\p{L} ]/gu, "").toUpperCase())}
        />
        <Field
          id="ck-card-expiry"
          label="Validade"
          placeholder="MM/AA"
          inputMode="numeric"
          maxLength={5}
          value={expiry}
          onChange={(v) => setExpiry(maskExpiry(v))}
          error={errors.expiry}
          half
        />
        <Field
          id="ck-card-cvv"
          label="CVV"
          placeholder="000"
          inputMode="numeric"
          maxLength={4}
          value={cvv}
          onChange={(v) => setCvv(digits(v, 4))}
          half
        />
      </div>
      <p className="ck-demo">
        Demonstração: os dados do cartão ficam só nesta tela e não são enviados nem armazenados.
        Use apenas números fictícios.
      </p>
      <button type="submit" className="ck-btn" disabled={!ok || paying} aria-busy={paying}>
        <span>
          {paying && <span className="identify-spinner" aria-hidden="true" />}
          {paying ? "Processando…" : `Pagar ${money(total)}`}
        </span>
      </button>
    </form>
  )
}

export function PaymentPanel({
  method,
  orderId,
  total,
  onPaid,
}: {
  method: PayMethod
  orderId: string
  total: number
  onPaid: () => void
}) {
  return method === "pix" ? (
    <PixPanel orderId={orderId} total={total} onPaid={onPaid} />
  ) : (
    <CardPanel total={total} onPaid={onPaid} />
  )
}
