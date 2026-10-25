"use client"
/* eslint-disable @next/next/no-img-element -- banners/ícones locais já otimizados (webp), dimensões fixas como na referência */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react"
import { LEGAL } from "./terms"

/* ------------------------------------------------------------------ */
/* Ícones Font Awesome Free 6 (CC BY 4.0 — https://fontawesome.com/license/free) */
const FA = {
  cart: ["576 512", "M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"],
  info: ["512 512", "M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"],
  minus: ["448 512", "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"],
  plus: ["448 512", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"],
  calendar: ["448 512", "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"],
  coins: ["512 512", "M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"],
  check: ["512 512", "M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"],
  play: ["384 512", "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"],
  back: ["320 512", "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"],
} as const
type IconName = keyof typeof FA
// fw = largura fixa de 1.25em (classe fa-fw da referência)
function Icon({ name, h, fw = false }: { name: IconName; h: number; fw?: boolean }) {
  const [box, d] = FA[name]
  const [vw, vh] = box.split(" ").map(Number)
  return (
    <svg
      className="hm-icon"
      viewBox={`0 0 ${vw} ${vh}`}
      width={fw ? h * 1.25 : (h * vw) / vh}
      height={h}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Relógio compartilhado: o servidor renderiza com uma data-âncora fixa e  */
/* o cliente passa a usar a hora real logo após a hidratação.            */
const ANCHOR = new Date(2026, 9, 25, 7, 20, 20).getTime()
let clock = 0
let timer: ReturnType<typeof setInterval> | undefined
const listeners = new Set<() => void>()
function subscribe(cb: () => void) {
  listeners.add(cb)
  if (!timer)
    timer = setInterval(() => {
      clock = Math.floor(Date.now() / 1000) * 1000
      listeners.forEach((l) => l())
    }, 1000)
  return () => {
    listeners.delete(cb)
    if (!listeners.size && timer) {
      clearInterval(timer)
      timer = undefined
    }
  }
}
const getSnapshot = () => clock || (clock = Math.floor(Date.now() / 1000) * 1000)
const getServerSnapshot = () => ANCHOR
const useNow = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

const DAY = 86400000
const pad = (n: number) => String(n).padStart(2, "0")
const money = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
const dmy = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
const startOfDay = (t: number) => {
  const d = new Date(t)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}
const daysLabel = (n: number) => `${n} ${n === 1 ? "dia" : "dias"}`

/* ------------------------------------------------------------------ */
/* Sorteios (dados fictícios). `name`/`price` também são usados pelo checkout. */
type DrawBase = {
  id: number
  name: string
  title: string
  price: number
  qty: number
  step: number
  edition: string
  susep: string
  banner: string
}
type HomeDraw = DrawBase &
  ({ kind: "hero" } | { kind: "hora" | "dia"; days: number; time: string })

const HERO: HomeDraw = {
  id: 1,
  kind: "hero",
  name: "Viva Sorte de Domingo",
  title: "Viva Sorte",
  price: 0.99,
  qty: 20,
  step: 10,
  edition: "012",
  susep: "15414.900112/2026-16",
  banner: "/banners/home-banner-200-mil.webp",
}
const HORA: HomeDraw[] = [
  { id: 2, kind: "hora", days: 1, time: "12:30", name: "Hora do Viva 12:30", title: "Hora do Viva", price: 0.05, qty: 50, step: 50, edition: "3179", susep: "15414.900293/2026-64", banner: "/banners/home-banner-3-mil.webp" },
  { id: 3, kind: "hora", days: 1, time: "19:30", name: "Hora do Viva 19:30", title: "Hora do Viva", price: 0.1, qty: 25, step: 25, edition: "3180", susep: "15414.900294/2026-17", banner: "/banners/home-banner-10-mil-1.webp" },
  { id: 4, kind: "hora", days: 3, time: "19:30", name: "Hora do Viva 19:30", title: "Hora do Viva", price: 0.1, qty: 25, step: 25, edition: "3184", susep: "15414.900664/2026-64", banner: "/banners/home-banner-10-mil-2.webp" },
  { id: 5, kind: "hora", days: 6, time: "12:30", name: "Hora do Viva 12:30", title: "Hora do Viva", price: 0.05, qty: 50, step: 50, edition: "3189", susep: "15414.900883/2026-22", banner: "/banners/home-banner-3-mil.webp" },
  { id: 6, kind: "hora", days: 6, time: "19:30", name: "Hora do Viva 19:30", title: "Hora do Viva", price: 0.1, qty: 25, step: 25, edition: "3190", susep: "15414.900884/2026-77", banner: "/banners/home-banner-10-mil-1.webp" },
]
const DIA: HomeDraw[] = [
  { id: 7, kind: "dia", days: 4, time: "20:30", name: "Viva Sorte do Dia", title: "Viva Sorte do Dia", price: 0.05, qty: 100, step: 100, edition: "191", susep: "15414.900752/2026-22", banner: "/banners/home-banner-gabigol.webp" },
]
export const draws: HomeDraw[] = [HERO, ...HORA, ...DIA]

// Sorteio principal: todo domingo às 11h (o próximo a partir de agora).
function heroDate(now: number) {
  const d = new Date(now)
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7))
  d.setHours(11, 0, 0, 0)
  if (d.getTime() <= now) d.setDate(d.getDate() + 7)
  return d
}
function drawDate(draw: HomeDraw, now: number) {
  if (draw.kind === "hero") return heroDate(now)
  const [h, m] = draw.time.split(":").map(Number)
  const d = new Date(startOfDay(now) + draw.days * DAY + 12 * 3600000)
  d.setHours(h, m, 0, 0)
  return d
}
const WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]
const MONTH = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
const MONTH_LONG = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]

/* ------------------------------------------------------------------ */
type Add = (id: number, qty: number, go?: boolean) => void

function Countdown({ now }: { now: number }) {
  const left = Math.max(0, heroDate(now).getTime() - now)
  const s = Math.floor(left / 1000)
  const parts = [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(pad)
  return (
    <div className="hm-countdown">
      <div className="hm-countdown-bar" role="timer" aria-label="Tempo para o próximo sorteio">
        <div className="hm-countdown-label">
          <span>+ de 1 milhão por 99 centavos:</span>
        </div>
        <div className="hm-countdown-digits">
          {parts.map((p, i) => (
            <span key={i} className="hm-countdown-group">
              {i > 0 && <span className="hm-countdown-sep">:</span>}
              <span className="hm-countdown-box">
                <span>{p}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const MARQUEE = "+de 1 MILHÃO em prêmios por R$ 0,99 centavos!"
function Marquee() {
  return (
    <section className="hm-marquee" aria-label={MARQUEE}>
      <div className="hm-marquee-track" aria-hidden="true">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i}>{MARQUEE}</span>
        ))}
      </div>
    </section>
  )
}

function Susep({ code }: { code: string }) {
  return (
    <span className="hm-susep">
      <Icon name="info" h={12} fw />
      <span>Processo SUSEP {code}</span>
    </span>
  )
}

function Stepper({
  value,
  set,
  min,
  step,
  input = false,
  big,
}: {
  value: number
  set: (n: number) => void
  min: number
  step: number
  input?: boolean
  big: boolean
}) {
  return (
    <div className="hm-stepper">
      <button
        type="button"
        className="hm-step"
        aria-label="Diminuir quantidade"
        disabled={value <= min}
        onClick={() => set(Math.max(min, value - step))}
      >
        <Icon name="minus" h={big ? 24 : 18} />
      </button>
      {input ? (
        <input
          className="hm-qty-input"
          type="number"
          inputMode="numeric"
          aria-label="Quantidade de títulos"
          min={min}
          max={999}
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value.replace(/\D/g, ""))
            set(Math.min(999, Math.max(0, n)))
          }}
          onBlur={() => set(Math.min(999, Math.max(min, value)))}
        />
      ) : (
        <strong className="hm-qty" aria-live="polite">
          {pad(value)}
        </strong>
      )}
      <button
        type="button"
        className="hm-step"
        aria-label="Aumentar quantidade"
        disabled={value + step > 999}
        onClick={() => set(Math.min(999, value + step))}
      >
        <Icon name="plus" h={big ? 24 : 18} />
      </button>
    </div>
  )
}

function Payment({
  draw,
  qty,
  setQty,
  input,
}: {
  draw: HomeDraw
  qty: number
  setQty: (n: number) => void
  input?: boolean
}) {
  return (
    <div className="hm-pay">
      <div className="hm-pay-grid">
        <div className="hm-pay-total">
          <small>TOTAL</small>
          <strong>{money(qty * draw.price)}</strong>
        </div>
        <Stepper value={qty} set={setQty} min={draw.step} step={draw.step} input={input} big />
      </div>
    </div>
  )
}

function Hero({ now, add }: { now: number; add: Add }) {
  const [qty, setQty] = useState(HERO.qty)
  const date = heroDate(now)
  const hours = (date.getTime() - now) / 3600000
  const rel =
    hours < 1
      ? `em ${Math.max(1, Math.round(hours * 60))} minutos`
      : hours < 24
        ? `em ${Math.floor(hours)} ${Math.floor(hours) === 1 ? "hora" : "horas"}`
        : `em ${daysLabel(Math.round(hours / 24))}`
  return (
    <div className="hm-hero-wrap">
      <div className="hm-hero container">
        <div className="hm-hero-banner">
          <img
            src={HERO.banner}
            alt="Viva Sorte: mais de 1 milhão em prêmios por R$ 0,99"
            width={923}
            height={519}
          />
          <Susep code={HERO.susep} />
        </div>
        <div className="hm-hero-panel">
          <div className="hm-hero-head">
            <div className="hm-hero-title">
              <h4>
                {HERO.title} - {dmy(date)}
              </h4>
              <small>Por apenas {money(HERO.price)}</small>
            </div>
            <small className="hm-hero-when">
              <span className="hm-only-lg">
                {WEEK[date.getDay()]}, {pad(date.getDate())} {MONTH[date.getMonth()]} |{" "}
                {date.getFullYear()}
              </span>
              <span className="hm-only-sm">{rel}</span>
            </small>
          </div>
          <p className="hm-hero-prizes">
            3 prêmios de R$ 200MIL | 1 prêmio de R$ 100MIL | 5 prêmios de R$ 20MIL
          </p>
          <div className="hm-hero-buy">
            <Payment draw={HERO} qty={qty} setQty={setQty} input />
            <button type="button" className="hm-btn hm-hero-cta" onClick={() => add(HERO.id, qty, true)}>
              <Icon name="cart" h={16} fw />
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DrawCard({ draw, now, add }: { draw: HomeDraw; now: number; add: Add }) {
  const [qty, setQty] = useState(draw.qty)
  if (draw.kind === "hero") return null
  const date = drawDate(draw, now)
  const days = Math.round((startOfDay(date.getTime()) - startOfDay(now)) / DAY)
  const inDays = days <= 0 ? "Hoje" : `Em ${daysLabel(days)}`
  return (
    <article className="hm-card">
      <div className="hm-card-media">
        <img src={draw.banner} alt={`${draw.title} — edição ${draw.edition}`} loading="lazy" />
        <span className="hm-card-badge">
          <Icon name="calendar" h={12} fw />
          <span>{inDays}</span>
        </span>
        <Susep code={draw.susep} />
      </div>
      <div className="hm-card-body">
        <div className="hm-chips hm-only-lg">
          <div className="hm-chip">
            <span>Edição nº</span>
            <span>{draw.edition}</span>
          </div>
          <div className="hm-chip-wrap">
            <div className="hm-chip">
              <span>Sorteio em</span>
              <span>{days <= 0 ? "Hoje" : daysLabel(days)}</span>
            </div>
          </div>
        </div>
        <div className="hm-card-when hm-only-lg">
          <p>
            {draw.title} - {draw.kind === "hora" ? `${draw.time}h ` : ""}
            {dmy(date)}
          </p>
          <div>
            <span>
              {pad(date.getDate())}/{pad(date.getMonth() + 1)}
            </span>
            <h3>ÀS {draw.time}</h3>
          </div>
        </div>
        <div className="hm-card-meta hm-only-sm">
          <div>
            <span className="hm-card-meta-icon">
              <Icon name="calendar" h={14} fw />
            </span>
            {inDays}
          </div>
          <small>{money(draw.price)}</small>
        </div>
        <div className="hm-card-buy">
          <Payment draw={draw} qty={qty} setQty={setQty} />
          <button type="button" className="hm-btn hm-card-cta" onClick={() => add(draw.id, qty)}>
            <Icon name="cart" h={16} fw />
            <span className="hm-only-lg">Adicione ao carrinho</span>
            <span className="hm-only-sm">Adicione +{qty}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

function Category({ icon, title, sub, tone }: { icon: string; title: string; sub: string; tone: "hora" | "dia" }) {
  return (
    <div className={`hm-cat hm-cat-${tone}`}>
      <img src={icon} alt="" width={32} height={32} />
      <div>
        <h2>
          {title}
          <span>{sub}</span>
        </h2>
      </div>
    </div>
  )
}

function Bulk({ addMany }: { addMany: (items: [number, number][]) => void }) {
  const sentinel = useRef<HTMLDivElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const [docked, setDocked] = useState(false)
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setDocked(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const addAll = () => addMany([...HORA, ...DIA].map((d) => [d.id, d.qty]))
  return (
    <>
      <div className={`hm-upsell${docked ? " is-docked" : ""}`}>
        <div className="hm-upsell-inner">
          <div className="hm-upsell-text">
            <span>
              <Icon name="coins" h={16} fw />
            </span>
            <span>Deseja obter mais chances de ganhar?</span>
          </div>
          <div className="hm-upsell-action">
            <button
              type="button"
              onClick={() => box.current?.scrollIntoView({ behavior: "smooth", block: "end" })}
            >
              Sim
              <Icon name="check" h={12} fw />
            </button>
          </div>
        </div>
      </div>
      <div ref={sentinel} className="hm-upsell-sentinel" aria-hidden="true" />
      <div ref={box} className="hm-bulk">
        <div className="hm-bulk-inner">
          <div className="hm-bulk-text">
            <div>
              <h3>
                <span>Adicione todos os sorteios ao carrinho!</span>
              </h3>
              <p>Adicione todos de uma vez e não perca tempo!</p>
            </div>
          </div>
          <div className="hm-bulk-action">
            <button type="button" className="hm-bulk-btn" onClick={addAll}>
              <Icon name="cart" h={14} fw />
              Adicionar todos
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Ganhadores (pessoas e valores fictícios) */
// `video`: ID do depoimento no YouTube (youtube.com/watch?v=<id>). Os ganhadores com vídeo usam o nome
// e a cidade que aparecem no próprio depoimento; os demais são fictícios.
type Winner = { name: string; city: string; prize: string; video?: string }
const W5 = "R$ 5.000,00 - valor líquido (cada)"
const W10 = "R$ 10.000,00 - valor líquido (cada)"
const WINNERS: Winner[] = [
  { name: "Carlos A. P. A.", city: "São José de Mipibu/RN", prize: W5, video: "eO-kMaOQro0" },
  { name: "Denise P. R.", city: "São Paulo/SP", prize: W5 },
  { name: "Francisco P. F. A.", city: "Guarulhos/SP", prize: W5, video: "4CQz_pINcJk" },
  { name: "Robson L. P.", city: "São Gonçalo/RJ", prize: W5, video: "1sl59lMIURA" },
  { name: "Rui N. G.", city: "Santo André/SP", prize: W5 },
  { name: "Marcos S.", city: "Caramujo/MT", prize: W5, video: "2eAsErP93JY" },
  { name: "Gilmar R. L.", city: "São Paulo/SP", prize: W5, video: "gpgXbpK8aIc" },
  { name: "Edineuza A. V. O.", city: "Maceió/AL", prize: W5, video: "pn2N-JK-Uj8" },
  { name: "Maria A. G. S.", city: "Rio Largo/AL", prize: W5, video: "SKJ1THDWlQ4" },
  { name: "Valter L. O.", city: "Recife/PE", prize: W5 },
  { name: "Viviane T. S.", city: "Bauru/SP", prize: W10 },
  { name: "Antônio M. D.", city: "Londrina/PR", prize: W10 },
  { name: "Bruna C. I.", city: "Marília/SP", prize: W10 },
  { name: "Alex S. S.", city: "Diadema/SP", prize: W10 },
  { name: "Edna D. M.", city: "Belém/PA", prize: W10 },
  { name: "Janaína O.", city: "Araraquara/SP", prize: "R$ 50.000,00 - valor líquido" },
  { name: "Osmar J. P.", city: "Brasília/DF", prize: "R$ 50.000,00 - valor líquido" },
  { name: "Mirela G.", city: "Sorocaba/SP", prize: "R$ 500.000,00 - valor líquido" },
  { name: "???", city: "Joinville/SC", prize: "Avião dos Sonhos: R$ 100.000,00 - valor líquido" },
]

// Com vídeo: miniatura do YouTube (como na referência). Sem vídeo: ícone de usuário de public/icons.
function WinnerPhoto({ winner }: { winner: Winner }) {
  const src = winner.video ? `https://img.youtube.com/vi/${winner.video}/maxresdefault.jpg` : "/icons/user.webp"
  return <img className="hm-winner-img" src={src} alt={`Foto de ${winner.name}`} loading="lazy" draggable={false} />
}

function Winners({ now, open }: { now: number; open: (w: Winner) => void }) {
  const last = new Date(heroDate(now).getTime() - 7 * DAY)
  const edition = pad(Number(HERO.edition) - 1).padStart(3, "0")
  const scroller = useRef<HTMLDivElement>(null)
  const drag = useRef({ x: 0, left: 0, moved: false, active: false })
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !scroller.current) return
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, moved: false, active: true }
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active || !scroller.current) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 4) d.moved = true
    scroller.current.scrollLeft = d.left - dx
  }
  const onUp = () => {
    drag.current.active = false
  }
  return (
    <section className="hm-winners container" aria-labelledby="hm-winners-title">
      <div className="hm-winners-head">
        <h2 id="hm-winners-title">
          <span>Ganhadores recentes</span>
        </h2>
        <p>
          Confira os ganhadores do sorteio da edição <strong>{edition}</strong> de{" "}
          <strong>
            domingo, {last.getDate()} de {MONTH_LONG[last.getMonth()]} de {last.getFullYear()}
          </strong>
        </p>
      </div>
      <div
        className="hm-winners-track"
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {WINNERS.map((w) => {
          // como na referência, só os cards com vídeo são clicáveis
          const Card = w.video ? "button" : "div"
          const action = w.video
            ? {
                type: "button" as const,
                "aria-label": `Assistir ao depoimento de ${w.name}, ${w.city}: ${w.prize}`,
                onClick: () => {
                  if (!drag.current.moved) open(w)
                  drag.current.moved = false
                },
              }
            : {}
          return (
            <Card key={w.name + w.city} className="hm-winner" {...action}>
              <span className="hm-winner-photo">
                <WinnerPhoto winner={w} />
              </span>
              <span className="hm-winner-top">
                <span>
                  <span>{w.prize}</span>
                </span>
              </span>
              {w.video && (
                <span className="hm-winner-play">
                  <Icon name="play" h={14} fw />
                </span>
              )}
              <span className="hm-winner-info">
                <span>
                  <b>{w.name}</b>
                  <small>{w.city}</small>
                </span>
              </span>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

function WinnerModal({ winner, close }: { winner: Winner; close: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [close])
  return (
    <div className="hm-modal-backdrop" onClick={close}>
      <div
        className="hm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hm-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hm-modal-head">
          <button type="button" autoFocus onClick={close} aria-label="Voltar">
            <Icon name="back" h={16} />
          </button>
        </div>
        <div className="hm-modal-body">
          <div className="hm-modal-media">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${winner.video}?autoplay=1&rel=0`}
              title={`Depoimento de ${winner.name}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
          <div className="hm-modal-info">
            <h2 id="hm-modal-title">{winner.name}</h2>
            <p>{winner.prize}</p>
            <a href={`https://www.youtube.com/watch?v=${winner.video}`} target="_blank" rel="noopener noreferrer">
              Assistir no YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
export function Home({ add, addMany }: { add: Add; addMany: (items: [number, number][]) => void }) {
  const now = useNow()
  const [winner, setWinner] = useState<Winner | null>(null)
  const closeWinner = useCallback(() => setWinner(null), [])
  return (
    <div className="hm">
      <section className="hm-top">
        <Countdown now={now} />
        <Marquee />
        <Hero now={now} add={add} />
        <div className="hm-disclaimer">
          <p>
            <span>
              Os materiais de divulgação desta página seguem as orientações vigentes da SUSEP para a
              comunicação de títulos de capitalização (Ofício Circular nº 2/2026).
            </span>
          </p>
        </div>
      </section>
      <section className="hm-draws" id="sorteios">
        <div className="container">
          <div className="hm-grid">
            <Category
              tone="hora"
              icon="/icons/hora-sorte-relogio-icon.webp"
              title="Hora do Viva"
              sub="Sorteios Filantropia Premiável"
            />
            {HORA.map((d) => (
              <DrawCard key={d.id} draw={d} now={now} add={add} />
            ))}
            <Category
              tone="dia"
              icon="/icons/hora-sorte-calendario-icon.webp"
              title="Viva Sorte do Dia"
              sub="Multiplique o valor pago em até 100.000x"
            />
            {DIA.map((d) => (
              <DrawCard key={d.id} draw={d} now={now} add={add} />
            ))}
          </div>
          <Bulk addMany={addMany} />
        </div>
      </section>
      <Winners now={now} open={setWinner} />
      <section className="hm-charity container" aria-labelledby="hm-charity-title">
        <div className="hm-charity-inner">
          <h2 id="hm-charity-title">Instituição beneficiada</h2>
          <div className="hm-charity-body">
            <img src="/logos/apae-brasil-logo.webp" alt={LEGAL.charity} width={91} height={36} />
            <h5>{LEGAL.charity}</h5>
            <div className="hm-charity-text">
              <p>
                A Federação Nacional das Apaes, ou Apae Brasil, é uma rede nacional
                dedicada à defesa e à garantia de direitos das pessoas com deficiência intelectual e
                múltipla, com apoio às famílias em todo o país.
              </p>
            </div>
          </div>
        </div>
      </section>
      {winner && <WinnerModal winner={winner} close={closeWinner} />}
    </div>
  )
}
