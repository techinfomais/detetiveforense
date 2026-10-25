"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowLeft, CreditCard, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { IdentifyForm, onlyDigits } from "./checkout-identify"
import { PaymentPanel, type PayMethod } from "./checkout-payment"
import { ProfileForm } from "./checkout-profile"
import {
  customerForCpf,
  loadCustomer,
  purchaseMessage,
  sameCpf,
  saveCustomer,
  type Customer,
} from "./customer"
import { draws } from "./home"
import { LEGAL } from "./terms"

// /checkout — replica o checkout da referência:
// 1. Identificação (CPF → seus dados) → 2. Carrinho (revisão, quantidades, forma de pagamento) → pagamento
// demonstrativo (Pix/cartão simulados no navegador) → concluído.

export type Cart = Record<string, number>
type Draw = (typeof draws)[number]
type Stage = "identify" | "profile" | "cart" | "payment" | "done"

// a mensagem leva o CPF digitado para o bot identificar o cliente no WhatsApp
const purchaseWhatsAppUrl = (cpf: string) =>
  `https://wa.me/${LEGAL.whatsapp}?text=${encodeURIComponent(purchaseMessage(cpf))}`

type Order = {
  id: string
  items: { draw: Draw; qty: number }[]
  total: number
  method: PayMethod
}

const money = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
// nº de pedido fictício (fora do render: só é chamado no clique)
const newOrderId = () => String(Date.now()).slice(-8)
const hideCpf = (cpf: string) => {
  const d = onlyDigits(cpf)
  return `***.${d.slice(3, 6)}.${d.slice(6, 9)}-**`
}

/* Font Awesome Free 6 — fa-circle-check (CC BY 4.0) */
function CircleCheck() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
  )
}
/* Font Awesome Free 6 — fa-pix (CC BY 4.0) */
function PixIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.76C231.1-7.586 280.3-7.586 310.6 22.76L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.78L22.76 310.6C-7.586 280.3-7.586 231.1 22.76 200.8L80.78 142.7H112.6z" />
    </svg>
  )
}

function Stepper({
  stage,
  onBack,
}: {
  stage: Exclude<Stage, "done">
  onBack: () => void
}) {
  const steps = ["Identificação", stage === "payment" ? "Pagamento" : "Carrinho"]
  const active = stage === "identify" || stage === "profile" ? 0 : 1
  return (
    <div className="ck-steps-wrap">
      <ol className="ck-steps" aria-label="Etapas do checkout">
        {steps.map((label, i) =>
          i === active ? (
            <li key={i} className="ck-step is-active" aria-current="step">
              <div className="ck-step-inner">
                <div className="ck-step-track">
                  <div className="ck-step-label">
                    <span>{i + 1}.</span> {label}
                  </div>
                </div>
              </div>
            </li>
          ) : i < active ? (
            <li key={i} style={{ display: "contents" }}>
              <button
                type="button"
                className="ck-step is-done"
                onClick={onBack}
                disabled={stage !== "cart"}
                aria-label={`${i + 1}. ${label} (concluída)${stage === "cart" ? " — alterar" : ""}`}
              >
                <span className="ck-step-inner">
                  <CircleCheck />
                </span>
              </button>
            </li>
          ) : (
            <li key={i} className="ck-step" aria-label={`${i + 1}. ${label}`}>
              <div className="ck-step-inner">
                <div>{i + 1}</div>
              </div>
            </li>
          )
        )}
      </ol>
    </div>
  )
}

function CartItem({
  draw,
  qty,
  setQty,
  remove,
}: {
  draw: Draw
  qty: number
  setQty: (n: number) => void
  remove: () => void
}) {
  const step = Math.max(1, draw.step)
  return (
    <li className="ck-item">
      <Image
        className="ck-item-img"
        src={draw.banner}
        alt=""
        width={128}
        height={72}
        unoptimized
      />
      <div className="ck-item-info">
        <span className="ck-chip">
          Edição nº <b>{draw.edition}</b>
        </span>
        <h3>{draw.name}</h3>
        <small>{money(draw.price)} por título</small>
      </div>
      <div className="ck-item-qty">
        <button
          type="button"
          className="ck-qty-btn"
          aria-label={`Diminuir ${step} títulos de ${draw.name}`}
          disabled={qty <= step}
          onClick={() => setQty(Math.max(step, qty - step))}
        >
          <Minus size={16} strokeWidth={3} aria-hidden="true" />
        </button>
        <strong className="ck-qty" aria-live="polite" aria-label={`${qty} títulos`}>
          {qty}
        </strong>
        <button
          type="button"
          className="ck-qty-btn"
          aria-label={`Aumentar ${step} títulos de ${draw.name}`}
          disabled={qty + step > 999}
          onClick={() => setQty(Math.min(999, qty + step))}
        >
          <Plus size={16} strokeWidth={3} aria-hidden="true" />
        </button>
      </div>
      <strong className="ck-item-sub">{money(draw.price * qty)}</strong>
      <button
        type="button"
        className="ck-remove"
        aria-label={`Remover ${draw.name} do carrinho`}
        onClick={remove}
      >
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </li>
  )
}

export function CheckoutPage({
  cart,
  setCart,
}: {
  cart: Cart
  setCart: (cart: Cart) => void
}) {
  const [stage, setStage] = useState<Stage>("identify")
  const [cpf, setCpf] = useState("")
  const [customer, setCustomer] = useState<Customer | null>(null)
  // cliente salvo em visita anterior: só pré-preenche o CPF; o cliente confirma (ou corrige) e continua
  const [restored, setRestored] = useState(false)
  const [method, setMethod] = useState<PayMethod>("pix")
  const [order, setOrder] = useState<Order | null>(null)
  const [whatsAppUrl, setWhatsAppUrl] = useState("")
  const top = useRef<HTMLElement>(null)

  useEffect(() => {
    const saved = loadCustomer()
    const timer = setTimeout(() => {
      if (saved) setCpf(saved.cpf)
      setRestored(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // sem cliente válido não há carrinho/pagamento: volta para a identificação
  useEffect(() => {
    if ((stage === "cart" || stage === "payment") && !customer) {
      const timer = setTimeout(() => setStage("identify"), 0)
      return () => clearTimeout(timer)
    }
  }, [stage, customer])

  // ao trocar de etapa, volta ao topo da etapa e move o foco para o título
  useEffect(() => {
    if (stage === "identify") return
    top.current?.scrollIntoView({ block: "start" })
    top.current?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true })
  }, [stage])

  const items = draws.filter((d) => cart[d.id] > 0).map((draw) => ({ draw, qty: cart[draw.id] }))
  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.qty * i.draw.price, 0)

  const goPay = () => {
    if (!items.length) return
    setOrder({
      id: newOrderId(),
      items,
      total,
      method,
    })
    setStage("payment")
  }
  const paid = () => {
    // revalida o cliente salvo: o CPF da mensagem é sempre o CPF atual e válido
    const saved = loadCustomer()
    const buyer = saved && sameCpf(saved.cpf, cpf) ? saved : null
    if (!buyer) {
      setCustomer(null)
      setStage("identify")
      return
    }
    const url = purchaseWhatsAppUrl(buyer.cpf)
    setWhatsAppUrl(url)
    setCart({})
    setStage("done")
    // toda compra concluída segue para o atendimento no WhatsApp
    window.location.assign(url)
  }

  return (
    <section className="checkout-page" aria-label="Checkout" ref={top}>
      <div className="container">
        {stage !== "done" && (
          <Stepper stage={stage} onBack={() => setStage("identify")} />
        )}

        {stage === "identify" && restored && (
          <IdentifyForm
            id="checkout-cpf"
            initialCpf={cpf}
            onIdentified={(value) => {
              // mesmo CPF já cadastrado → segue; CPF diferente → os dados anteriores são descartados
              const existing = customerForCpf(value)
              setCpf(value)
              setCustomer(existing)
              setStage(existing ? "cart" : "profile")
            }}
          />
        )}

        {stage === "profile" && (
          <ProfileForm
            id="checkout-profile"
            initial={customer && sameCpf(customer.cpf, cpf) ? customer : undefined}
            onSubmit={(values) => {
              const saved = saveCustomer({ cpf, ...values })
              if (!saved) return
              setCustomer(saved)
              setStage("cart")
            }}
          />
        )}

        {stage === "cart" && (
          <>
            <div className="ck-head">
              <h2 tabIndex={-1}>{items.length ? "Seu carrinho" : "Seu carrinho está vazio"}</h2>
              <p>
                {items.length
                  ? "Confira seus títulos antes de pagar"
                  : "Escolha um sorteio e adicione títulos para continuar"}
              </p>
              <div className="ck-identified">
                <span>
                  {customer ? `${customer.name.split(" ")[0]}, i` : "I"}dentificado pelo CPF{" "}
                  <b>{hideCpf(cpf)}</b>
                </span>
                <button type="button" className="ck-link" onClick={() => setStage("identify")}>
                  Alterar CPF
                </button>
                <button type="button" className="ck-link" onClick={() => setStage("profile")}>
                  Editar dados
                </button>
              </div>
            </div>
            {items.length ? (
              <div className="ck-layout">
                <ul className="ck-items" aria-label="Títulos no carrinho">
                  {items.map(({ draw, qty }) => (
                    <CartItem
                      key={draw.id}
                      draw={draw}
                      qty={qty}
                      setQty={(n) => setCart({ ...cart, [draw.id]: n })}
                      remove={() => {
                        const next = { ...cart }
                        delete next[draw.id]
                        setCart(next)
                      }}
                    />
                  ))}
                </ul>
                <div className="ck-summary">
                  <div className="ck-total" aria-live="polite">
                    <span>
                      <small>Total</small>
                      <strong>{money(total)}</strong>
                    </span>
                    <span>
                      {count} {count === 1 ? "título" : "títulos"}
                    </span>
                  </div>
                  <fieldset className="ck-methods">
                    <legend>Forma de pagamento</legend>
                    <label className="ck-method">
                      <input
                        type="radio"
                        name="ck-method"
                        value="pix"
                        checked={method === "pix"}
                        onChange={() => setMethod("pix")}
                      />
                      <span className="ck-method-icon">
                        <PixIcon />
                      </span>
                      <span className="ck-method-text">
                        <b>Pix</b>
                        <small>Aprovação imediata</small>
                      </span>
                      <span className="ck-method-radio" aria-hidden="true" />
                    </label>
                    <label className="ck-method">
                      <input
                        type="radio"
                        name="ck-method"
                        value="card"
                        checked={method === "card"}
                        onChange={() => setMethod("card")}
                      />
                      <span className="ck-method-icon">
                        <CreditCard aria-hidden="true" />
                      </span>
                      <span className="ck-method-text">
                        <b>Cartão de crédito</b>
                        <small>À vista</small>
                      </span>
                      <span className="ck-method-radio" aria-hidden="true" />
                    </label>
                  </fieldset>
                  <button type="button" className="ck-btn" onClick={goPay}>
                    <span>
                      <ShoppingCart size={18} aria-hidden="true" />
                      Ir para o pagamento
                    </span>
                  </button>
                  <p className="ck-demo">
                    Ambiente demonstrativo: nenhum pagamento real é solicitado ou processado.
                  </p>
                  <Link href="/" className="ck-more">
                    <Plus size={16} aria-hidden="true" /> Adicionar mais títulos
                  </Link>
                </div>
              </div>
            ) : (
              <div className="ck-empty">
                <span className="ck-empty-icon">
                  <ShoppingCart size={28} aria-hidden="true" />
                </span>
                <h3>Nenhum título por aqui ainda</h3>
                <p>
                  Os títulos que você adicionar na página inicial aparecem aqui para revisão e
                  pagamento.
                </p>
                <Link href="/" className="ck-btn">
                  <span>Escolher sorteios</span>
                </Link>
              </div>
            )}
          </>
        )}

        {stage === "payment" && order && (
          <>
            <div className="ck-head">
              <h2 tabIndex={-1}>Pagamento</h2>
              <p>{order.method === "pix" ? "Pague com Pix para confirmar seus títulos" : "Informe os dados do cartão"}</p>
              <div className="ck-identified">
                <button type="button" className="ck-link" onClick={() => setStage("cart")}>
                  <ArrowLeft size={14} aria-hidden="true" />
                  Voltar ao carrinho
                </button>
              </div>
            </div>
            <div className="ck-pay">
              <PaymentPanel
                method={order.method}
                orderId={order.id}
                total={order.total}
                onPaid={paid}
              />
              <div className="ck-pay-card">
                <h3>Resumo do pedido nº {order.id}</h3>
                <OrderList order={order} />
              </div>
            </div>
          </>
        )}

        {stage === "done" && order && (
          <div className="ck-done" role="status">
            <span className="ck-done-icon">
              <svg viewBox="0 0 512 512" width={40} height={40} fill="currentColor" aria-hidden="true">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg>
            </span>
            <h2 tabIndex={-1}>Pagamento aprovado!</h2>
            <p>
              Pronto! Nesta demonstração nenhum título foi emitido e nenhuma cobrança foi
              realizada.
            </p>
            <div className="ck-pay-card">
              <h3>Pedido nº {order.id}</h3>
              <OrderList order={order} />
            </div>
            <a href={whatsAppUrl} className="ck-btn">
              <span>Abrir o WhatsApp</span>
            </a>
            <Link href="/" className="ck-link">
              Voltar ao início
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function OrderList({ order }: { order: Order }) {
  return (
    <ul className="ck-order">
      {order.items.map(({ draw, qty }) => (
        <li key={draw.id}>
          <span>
            {qty}× {draw.name} — ed. {draw.edition}
          </span>
          <span>{money(qty * draw.price)}</span>
        </li>
      ))}
      <li>
        <span>Forma de pagamento</span>
        <span>{order.method === "pix" ? "Pix" : "Cartão de crédito"}</span>
      </li>
      <li className="is-total">
        <span>Total</span>
        <span>{money(order.total)}</span>
      </li>
    </ul>
  )
}
