"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Gift,
  Heart,
  LockKeyhole,
  Menu,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Ticket,
  Trash2,
  Trophy,
  UserRound,
  X,
  Zap,
  Mail,
  Phone,
  MapPin,
  LogIn,
  House,
  MessageCircle,
  Handshake,
  Columns2,
  CircleQuestionMark,
  Gavel,
  Section,
  Book,
  type LucideIcon,
} from "lucide-react"
import { HelpCenter } from "./faq"
import { TermsOfUse } from "./terms"

const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
const draws = [
  {
    id: 1,
    name: "Especial de domingo",
    prize: "800",
    unit: "MIL",
    price: 0.99,
    qty: 20,
    date: "25 OUT",
    time: "10:00",
    tone: "blue",
    label: "O SEU DOMINGO PODE MUDAR",
    edition: "012",
  },
  {
    id: 2,
    name: "Hora da sorte",
    prize: "10",
    unit: "MIL",
    price: 0.1,
    qty: 25,
    date: "HOJE",
    time: "12:30",
    tone: "purple",
    label: "UMA PAUSA PARA A SUA SORTE",
    edition: "3177",
  },
  {
    id: 3,
    name: "Tarde premiada",
    prize: "20",
    unit: "MIL",
    price: 0.2,
    qty: 25,
    date: "HOJE",
    time: "16:30",
    tone: "orange",
    label: "A SUA TARDE VALE MUITO",
    edition: "3178",
  },
  {
    id: 4,
    name: "Noite de milhões",
    prize: "50",
    unit: "MIL",
    price: 0.5,
    qty: 20,
    date: "HOJE",
    time: "19:30",
    tone: "navy",
    label: "TERMINE O DIA SONHANDO ALTO",
    edition: "3179",
  },
  {
    id: 5,
    name: "Sorte em dobro",
    prize: "100",
    unit: "MIL",
    price: 0.99,
    qty: 10,
    date: "28 OUT",
    time: "19:30",
    tone: "teal",
    label: "MAIS CHANCES. NOVAS HISTÓRIAS.",
    edition: "013",
  },
  {
    id: 6,
    name: "Sextou com sorte",
    prize: "200",
    unit: "MIL",
    price: 1.99,
    qty: 10,
    date: "30 OUT",
    time: "19:30",
    tone: "pink",
    label: "SEU FIM DE SEMANA COMEÇA AQUI",
    edition: "014",
  },
]
type Draw = (typeof draws)[number]
type Cart = Record<string, number>
function Banner({ draw, hero = false }: { draw: Draw; hero?: boolean }) {
  return (
    <div className={`prize-art ${draw.tone} ${hero ? "hero-art" : ""}`}>
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <span className="art-star star-one">✦</span>
      <span className="art-star star-two">✦</span>
      <span className="art-kicker">{draw.label}</span>
      <div className="art-title">
        {hero ? (
          <>
            Domingo de
            <br />
            <em>possibilidades.</em>
          </>
        ) : (
          draw.name
        )}
      </div>
      <div className="prize-value">
        <span>R$</span>
        {draw.prize}
        <strong>
          {draw.unit}
          <small>EM PRÊMIOS*</small>
        </strong>
      </div>
      <div className="art-bottom">
        <span>
          A partir de <b>{money(draw.price)}</b>
        </span>
        <span className="art-ticket">
          <Ticket size={16} />{" "}
          {hero ? "EDIÇÃO DE DOMINGO" : `EDIÇÃO ${draw.edition}`}
        </span>
      </div>
      <span className="art-seal">
        <ShieldCheck size={12} /> Edição demonstrativa · valor líquido
      </span>
    </div>
  )
}
function Quantity({ value, set }: { value: number; set: (n: number) => void }) {
  return (
    <div className="quantity">
      <button
        aria-label="Diminuir quantidade"
        disabled={value <= 1}
        onClick={() => set(Math.max(1, value - 1))}
      >
        <Minus size={17} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        aria-label="Aumentar quantidade"
        disabled={value >= 999}
        onClick={() => set(Math.min(999, value + 1))}
      >
        <Plus size={17} />
      </button>
    </div>
  )
}
function Purchase({
  draw,
  add,
  main = false,
}: {
  draw: Draw
  add: (id: number, qty: number, go?: boolean) => void
  main?: boolean
}) {
  const [qty, setQty] = useState(draw.qty)
  return (
    <>
      <div className="payment">
        <div>
          <small>TOTAL</small>
          <strong>{money(qty * draw.price)}</strong>
        </div>
        <Quantity value={qty} set={setQty} />
      </div>
      {main && (
        <div className="quick-quantities">
          {[10, 20, 50, 100].map((n) => (
            <button
              className={qty === n ? "selected" : ""}
              key={n}
              onClick={() => setQty(n)}
            >
              {n} títulos {n === 20 && <span>POPULAR</span>}
            </button>
          ))}
        </div>
      )}
      <button className="btn buy" onClick={() => add(draw.id, qty, main)}>
        <ShoppingCart size={18} />
        {main ? "Quero participar" : "Adicionar ao carrinho"}
        <ArrowRight size={18} />
      </button>
    </>
  )
}
function SectionTitle({
  title,
  sub,
  icon = "ticket",
}: {
  title: string
  sub: string
  icon?: string
}) {
  return (
    <div className="section-title">
      <div className={`section-icon ${icon}`}>
        {icon === "zap" ? <Zap size={23} /> : <Ticket size={23} />}
      </div>
      <div>
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
    </div>
  )
}

type MenuLink = { label: string; href: string; icon: LucideIcon }
type MenuItem =
  | (MenuLink & { children?: undefined })
  | { label: string; href?: undefined; children: MenuLink[] }

// Mesma estrutura do menu de vivasorteoficial.com.br
const MENU: MenuItem[] = [
  { label: "Início", href: "/", icon: House },
  { label: "Resultados", href: "/resultados/", icon: Trophy },
  {
    label: "Revendedor",
    children: [
      { label: "Seja um revendedor", href: "/seja-um-revendedor/", icon: Handshake },
      { label: "Seja um influenciador", href: "/seja-um-influenciador/", icon: Handshake },
      {
        label: "Portal do Revendedor",
        href: "https://portal.revendavivasorte.com.br/",
        icon: Columns2,
      },
    ],
  },
  {
    label: "Institucional",
    children: [
      {
        label: "Perguntas frequentes",
        href: "/institucional/perguntas-frequentes/",
        icon: CircleQuestionMark,
      },
      { label: "Termos de uso", href: "/institucional/termos-de-uso/", icon: Gavel },
      { label: "Regulamento", href: "/institucional/regulamento/", icon: Section },
      { label: "Viva Sorte de Todos", href: "/institucional/de-todos/", icon: Book },
    ],
  },
  { label: "Contato", href: "/contato/", icon: MessageCircle },
]

export function SorteApp({ page }: { page: string }) {
  const router = useRouter()
  const [menu, setMenu] = useState(false)
  const [cart, setCart] = useState<Cart>({})
  const [ready, setReady] = useState(false)
  const [toast, setToast] = useState("")
  const [modal, setModal] = useState("")
  const [category, setCategory] = useState("Todos")
  const [step, setStep] = useState(1)
  const [cpf, setCpf] = useState("")
  const [sent, setSent] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem("sorteviva-cart") || "{}")
        if (saved && typeof saved === "object")
          setCart(
            Object.fromEntries(
              Object.entries(saved).filter(
                ([id, n]) =>
                  draws.some((d) => String(d.id) === id) &&
                  typeof n === "number" &&
                  n > 0 &&
                  n <= 999
              )
            ) as Cart
          )
      } catch {}
      setReady(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (ready) localStorage.setItem("sorteviva-cart", JSON.stringify(cart))
  }, [cart, ready])
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(""), 3500)
    return () => clearTimeout(timer)
  }, [toast])
  useEffect(() => {
    if (!modal && !menu) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal("")
        setMenu(false)
      }
    }
    window.addEventListener("keydown", close)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", close)
    }
  }, [modal, menu])
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = draws.reduce((sum, d) => sum + (cart[d.id] || 0) * d.price, 0)
  function add(id: number, qty: number, go = false) {
    const updated = { ...cart, [id]: Math.min(999, (cart[id] || 0) + qty) }
    setCart(updated)
    localStorage.setItem("sorteviva-cart", JSON.stringify(updated))
    if (go) router.push("/checkout/")
    else setToast("Títulos adicionados ao seu carrinho!")
  }
  const isHome = page === "inicio"
  const current = (href: string) =>
    href.replace(/^\/|\/$/g, "") === (isHome ? "" : page) ? "page" : undefined
  const navigation = (
    <>
      {MENU.map((item) =>
        item.href ? (
          <Link
            key={item.label}
            className="nav-item"
            href={item.href}
            aria-current={current(item.href)}
          >
            <span>{item.label}</span>
          </Link>
        ) : (
          <div key={item.label} className="nav-item nav-group" tabIndex={0}>
            <span>{item.label}</span>
            <div className="dropdown">
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  aria-current={current(child.href)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )
      )}
    </>
  )
  const menuCard = ({ label, href, icon: Icon }: MenuLink) => (
    <Link
      key={label}
      href={href}
      className="menu-card"
      aria-current={current(href)}
      onClick={() => setMenu(false)}
    >
      <span className="menu-card-icon">
        <Icon size={18} />
      </span>
      <span className="menu-card-label">{label}</span>
      <ChevronRight size={12} className="menu-card-arrow" />
    </Link>
  )
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <div className="topline">
        <ShieldCheck size={13} /> Sua próxima conquista começa com uma chance.{" "}
        <span>Ambiente demonstrativo</span>
      </div>
      <header className="header container">
        <Link href="/" className="home-shortcut" aria-label="Página inicial">
          <Ticket size={24} />
          <span>Sorteios e possibilidades</span>
        </Link>
        <nav aria-label="Principal">{navigation}</nav>
        <Link href="/autenticar/" className="login">
          <UserRound size={19} />
          <span>
            Boas-vindas!<b>Entre ou cadastre-se</b>
          </span>
          <ArrowUpRight size={16} />
        </Link>
        <button
          className="mobile-toggle"
          aria-label={menu ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <ChevronLeft /> : <Menu />}
        </button>
      </header>
      {menu && (
        <div className="menu-backdrop" onClick={() => setMenu(false)}>
          <nav
            className="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-group">
              {menuCard({ label: "Entrar", href: "/autenticar/", icon: LogIn })}
              {MENU.flatMap((item) => (item.href ? [menuCard(item)] : []))}
            </div>
            {MENU.map((item) =>
              item.children ? (
                <div key={item.label} className="menu-group">
                  <h3>{item.label}</h3>
                  {item.children.map(menuCard)}
                </div>
              ) : null
            )}
          </nav>
        </div>
      )}
      <main id="conteudo">
        {isHome ? (
          <>
            <div className="container">
              <div className="countdown">
                <span>
                  <Clock3 size={17} /> O PRÓXIMO GRANDE SORTEIO ESTÁ CHEGANDO
                </span>
                <div>
                  <b>25</b>
                  <small>OUT</small>
                  <i />
                  DOMINGO, ÀS 10H <ArrowRight size={17} />
                </div>
              </div>
            </div>
            <div className="promo">
              <Sparkles size={15} />
              <span>
                Grandes sonhos, pequenas chances.{" "}
                <b>Mais de R$ 1 milhão em prêmios por apenas R$ 0,99!</b>
              </span>
              <Sparkles size={15} />
            </div>
            <section className="hero container">
              <Banner draw={draws[0]} hero />
              <div className="hero-panel">
                <div className="eyebrow">
                  <span className="live-dot" /> EDIÇÃO ESPECIAL{" "}
                  <span className="edition">Nº 012</span>
                </div>
                <h1>
                  Uma chance de transformar
                  <br />o seu domingo.
                </h1>
                <div className="draw-date">
                  <CalendarDays size={21} />
                  <strong>
                    DOM, 25 OUT <span>| 2026</span>
                  </strong>
                  <span>ÀS 10H</span>
                </div>
                <div className="hero-prizes">
                  <div>
                    <Trophy />
                    <span>
                      <b>R$ 800 mil</b> no prêmio principal
                    </span>
                  </div>
                  <div>
                    <Gift />
                    <span>
                      + 40 giros de <b>R$ 5 mil</b>
                    </span>
                  </div>
                </div>
                <div className="price-line">
                  Seu próximo sonho começa com <b>R$ 0,99</b>
                </div>
                <Purchase draw={draws[0]} add={add} main />
                <div className="secure">
                  <LockKeyhole size={12} /> Compra segura <span>•</span>{" "}
                  Pagamento via Pix <span className="pix-mark">❖</span>
                </div>
              </div>
            </section>
            <div className="hero-footnote container">
              *Valores e sorteios ilustrativos. Esta é uma experiência
              demonstrativa, sem venda de títulos ou pagamentos reais.
            </div>
            <div className="trust-strip container">
              <span>
                <ShieldCheck />
                Transparência em cada etapa
              </span>
              <span>
                <Zap />
                Praticidade para participar
              </span>
              <span>
                <Heart />
                Uma chance de fazer o bem
              </span>
              <Link href="/institucional/perguntas-frequentes/">
                Entenda como funciona <ArrowUpRight size={15} />
              </Link>
            </div>
            <section className="section container" id="sorteios">
              <div className="section-heading">
                <SectionTitle
                  title="Todo dia é dia de sorte"
                  sub="Pequenos valores. Grandes possibilidades."
                  icon="zap"
                />
                <span className="section-note">
                  <Clock3 size={14} /> Novas chances ao longo do dia
                </span>
              </div>
              <div className="draw-grid">
                {draws.slice(1, 4).map((draw) => (
                  <article className="draw-card" key={draw.id}>
                    <Banner draw={draw} />
                    <div className="card-content">
                      <div className="card-meta">
                        <span>
                          Edição <b>{draw.edition}</b>
                        </span>
                        <span>
                          <Clock3 size={12} /> Hoje
                        </span>
                      </div>
                      <div className="card-name">
                        <div>
                          <h3>{draw.name}</h3>
                          <p>Títulos a partir de {money(draw.price)}</p>
                        </div>
                        <div>
                          <small>{draw.date}</small>
                          <b>{draw.time}</b>
                        </div>
                      </div>
                      <Purchase draw={draw} add={add} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section className="section container">
              <div className="section-heading">
                <SectionTitle
                  title="O próximo sonho pode ser seu"
                  sub="Programe a sua sorte para os próximos dias."
                />
                <Link className="text-link" href="/resultados/">
                  Confira os resultados <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="draw-grid future-grid">
                {draws.slice(4).map((draw) => (
                  <article className="draw-card" key={draw.id}>
                    <Banner draw={draw} />
                    <div className="card-content">
                      <div className="card-name">
                        <div>
                          <h3>{draw.name}</h3>
                          <p>A partir de {money(draw.price)}</p>
                        </div>
                        <div>
                          <small>{draw.date}</small>
                          <b>{draw.time}</b>
                        </div>
                      </div>
                      <Purchase draw={draw} add={add} />
                    </div>
                  </article>
                ))}
                <div className="how-card">
                  <span className="round-icon">
                    <Sparkles />
                  </span>
                  <small>SIMPLES ASSIM</small>
                  <h3>
                    Seu sonho está
                    <br />a poucos passos.
                  </h3>
                  {[
                    "Escolha seu sorteio favorito",
                    "Selecione quantas chances quer",
                    "Acompanhe e torça por você",
                  ].map((s, i) => (
                    <p key={s}>
                      <b>0{i + 1}</b>
                      {s}
                    </p>
                  ))}
                  <Link href="/institucional/perguntas-frequentes/">
                    Tire suas dúvidas <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </section>
            <section className="container">
              <div className="bulk">
                <div className="bulk-icon">
                  <ShoppingCart size={33} />
                  <span>+</span>
                </div>
                <div>
                  <h2>Mais possibilidades em um só clique.</h2>
                  <p>
                    Adicione os sorteios do dia ao carrinho e espalhe sua sorte.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const next = { ...cart }
                    draws
                      .slice(1, 4)
                      .forEach(
                        (d) =>
                          (next[d.id] = Math.min(
                            999,
                            (next[d.id] || 0) + d.qty
                          ))
                      )
                    setCart(next)
                    setToast("Todos os sorteios do dia foram adicionados!")
                  }}
                >
                  Adicionar todos <ArrowRight size={18} />
                </button>
              </div>
            </section>
            <section className="winners">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <div className="eyebrow">HISTÓRIAS QUE INSPIRAM</div>
                    <h2>A sorte já mudou o dia deles.</h2>
                    <p>Conheça algumas histórias que poderiam ser a sua.</p>
                  </div>
                  <Link href="/resultados/">
                    Ver resultados <ArrowUpRight size={17} />
                  </Link>
                </div>
                <div className="winner-grid">
                  {[
                    {
                      name: "Maria A.",
                      city: "Campinas · SP",
                      value: "50.000",
                      color: "lavender",
                      initial: "M",
                    },
                    {
                      name: "Carlos R.",
                      city: "Curitiba · PR",
                      value: "10.000",
                      color: "peach",
                      initial: "C",
                    },
                    {
                      name: "Ana P.",
                      city: "Belo Horizonte · MG",
                      value: "5.000",
                      color: "mint",
                      initial: "A",
                    },
                    {
                      name: "João S.",
                      city: "Salvador · BA",
                      value: "20.000",
                      color: "sky",
                      initial: "J",
                    },
                  ].map((w) => (
                    <button
                      key={w.name}
                      className={`winner ${w.color}`}
                      onClick={() =>
                        setModal(
                          `${w.name} — ${w.city}. História ilustrativa de ganhador. Os resultados desta plataforma são dados demonstrativos.`
                        )
                      }
                    >
                      <span className="winner-tag">
                        <Trophy size={12} /> R$ {w.value}
                      </span>
                      <span className="winner-avatar">
                        {w.initial}
                        <Sparkles size={34} />
                      </span>
                      <div className="winner-info">
                        <div>
                          <b>{w.name}</b>
                          <small>{w.city}</small>
                        </div>
                        <ArrowUpRight size={21} />
                      </div>
                    </button>
                  ))}
                </div>
                <small className="winner-disclaimer">
                  Personagens e premiações ilustrativos para apresentação da
                  plataforma.
                </small>
              </div>
            </section>
            <section className="purpose container">
              <div className="purpose-art">
                <Heart size={80} strokeWidth={1} />
                <span className="purpose-spark">✦</span>
                <div>
                  Uma pequena atitude.
                  <br />
                  <b>Um grande impacto.</b>
                </div>
              </div>
              <div>
                <div className="eyebrow">SORTE QUE FAZ O BEM</div>
                <h2>
                  Quando você participa,
                  <br />a esperança vai mais longe.
                </h2>
                <p>
                  Acreditamos que grandes mudanças começam com pequenas
                  atitudes. Este espaço é dedicado à instituição beneficiada e
                  às histórias de quem recebe esse cuidado.
                </p>
                <Link href="/institucional/regulamento/" className="text-link">
                  Conheça o propósito <ArrowUpRight size={16} />
                </Link>
              </div>
            </section>
          </>
        ) : page === "checkout" || page === "autenticar" ? (
          <section className="interior container">
            <div className="breadcrumb">
              <Link href="/">Início</Link>
              <ChevronRight size={13} />
              {page === "checkout" ? "Finalizar participação" : "Minha conta"}
            </div>
            <div className="checkout-layout">
              <div className="auth-box">
                <div className="steps">
                  <span className={step === 1 ? "current" : ""}>
                    1. Identificação
                  </span>
                  <span className={step === 2 ? "current" : ""}>
                    2. Carrinho
                  </span>
                  <span className={step === 3 ? "current" : ""}>
                    3. Confirmação
                  </span>
                </div>
                {step === 1 ? (
                  <>
                    <div className="auth-icon">
                      <UserRound />
                    </div>
                    <h1>Olá, boas-vindas!</h1>
                    <p>Identifique-se para continuar sua participação.</p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setStep(2)
                      }}
                    >
                      <label htmlFor="cpf">CPF</label>
                      <input
                        id="cpf"
                        inputMode="numeric"
                        placeholder="000.000.000-00"
                        value={cpf}
                        maxLength={14}
                        onChange={(e) => {
                          const n = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 11)
                          setCpf(
                            n
                              .replace(/(\d{3})(\d)/, "$1.$2")
                              .replace(/(\d{3})(\d)/, "$1.$2")
                              .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                          )
                        }}
                      />
                      <small>
                        Use um número fictício com 11 dígitos nesta
                        demonstração.
                      </small>
                      <button
                        className="btn gold"
                        disabled={cpf.replace(/\D/g, "").length !== 11}
                      >
                        Continuar <ArrowRight size={18} />
                      </button>
                    </form>
                    <div className="secure">
                      <ShieldCheck size={14} /> Seus dados não são enviados a um
                      servidor.
                    </div>
                  </>
                ) : step === 2 ? (
                  <>
                    <h1>Seu carrinho</h1>
                    <p>Revise suas chances antes de continuar.</p>
                    {count ? (
                      draws
                        .filter((d) => cart[d.id])
                        .map((d) => (
                          <div className="cart-row" key={d.id}>
                            <div>
                              <b>{d.name}</b>
                              <small>{money(d.price)} por título</small>
                              <Quantity
                                value={cart[d.id]}
                                set={(n) => setCart({ ...cart, [d.id]: n })}
                              />
                            </div>
                            <strong>{money(d.price * cart[d.id])}</strong>
                            <button
                              aria-label={`Remover ${d.name}`}
                              onClick={() => {
                                const next = { ...cart }
                                delete next[d.id]
                                setCart(next)
                              }}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        ))
                    ) : (
                      <div className="empty">
                        <ShoppingCart />
                        <h3>Seu carrinho está esperando por você</h3>
                        <Link href="/" className="text-link">
                          Explore os sorteios <ArrowRight size={16} />
                        </Link>
                      </div>
                    )}
                    {count > 0 && (
                      <>
                        <div className="cart-total">
                          Total <b>{money(total)}</b>
                        </div>
                        <div className="demo-note">
                          Simulação: nenhum pagamento será solicitado ou
                          processado.
                        </div>
                        <button
                          className="btn buy"
                          onClick={() => {
                            setStep(3)
                            setCart({})
                          }}
                        >
                          Concluir demonstração <Check size={18} />
                        </button>
                      </>
                    )}
                    <button className="back-button" onClick={() => setStep(1)}>
                      <ChevronLeft size={15} /> Voltar
                    </button>
                  </>
                ) : (
                  <div className="success-panel">
                    <span>
                      <Check size={40} />
                    </span>
                    <h1>Tudo certo por aqui!</h1>
                    <p>
                      Você concluiu a experiência demonstrativa. Nenhum título
                      foi emitido e nenhuma cobrança foi realizada.
                    </p>
                    <Link href="/" className="btn buy">
                      Voltar ao início <ArrowRight size={17} />
                    </Link>
                  </div>
                )}
              </div>
              <aside className="checkout-aside">
                <Ticket size={42} />
                <h2>
                  O próximo capítulo
                  <br />
                  pode surpreender.
                </h2>
                <p>Pequenas chances abrem espaço para grandes sonhos.</p>
                <ShieldCheck />
                <small>Experiência estática e demonstrativa</small>
              </aside>
            </div>
          </section>
        ) : page === "resultados" ? (
          <section className="interior container">
            <div className="eyebrow">CADA RESULTADO, UMA NOVA HISTÓRIA</div>
            <h1>Resultados dos sorteios</h1>
            <p className="intro">
              Confira os números e as premiações das últimas edições.
            </p>
            <div className="filters">
              {["Todos", "Especial de domingo", "Sorteios diários"].map((c) => (
                <button
                  className={category === c ? "selected" : ""}
                  key={c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="result-list">
              {draws
                .filter(
                  (d) =>
                    category === "Todos" ||
                    (category === "Especial de domingo"
                      ? d.id === 1
                      : d.id !== 1)
                )
                .map((d) => (
                  <article className="result-card" key={d.id}>
                    <div className={`result-icon ${d.tone}`}>
                      <Trophy />
                    </div>
                    <div>
                      <small>EDIÇÃO {d.edition} · 18 OUT 2026</small>
                      <h2>{d.name}</h2>
                      <p>
                        Premiação ilustrativa de {money(Number(d.prize) * 1000)}
                      </p>
                    </div>
                    <div className="result-numbers">
                      {[
                        4 + d.id,
                        12 + d.id,
                        23 + d.id,
                        35 + d.id,
                        48 + d.id,
                      ].map((n) => (
                        <span key={n}>{String(n).padStart(2, "0")}</span>
                      ))}
                    </div>
                    <button
                      className="text-link"
                      onClick={() =>
                        setModal(
                          `Edição ${d.edition} · ${d.name}. Números e premiações fictícios, apresentados apenas como exemplo da tela de resultados.`
                        )
                      }
                    >
                      Detalhes <ArrowUpRight size={16} />
                    </button>
                  </article>
                ))}
            </div>
            <p className="demo-note">
              Todos os resultados apresentados são fictícios e não representam
              sorteios realizados.
            </p>
          </section>
        ) : page.includes("perguntas-frequentes") ? (
          <HelpCenter />
        ) : page === "contato" || page.startsWith("seja-um-") ? (
          <section className="interior container">
            <div className="eyebrow">VAMOS CONVERSAR</div>
            <h1>
              {page === "contato"
                ? "Estamos por aqui para ajudar."
                : "Vamos crescer juntos?"}
            </h1>
            <p className="intro">
              {page === "contato"
                ? "Envie sua mensagem. Sua experiência importa para a gente."
                : "Faça parte dessa história e conheça as possibilidades de parceria."}
            </p>
            <div className="contact-grid">
              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                {sent ? (
                  <div className="success-panel">
                    <Check size={40} />
                    <h2>Mensagem demonstrativa concluída!</h2>
                    <p>
                      Nenhum dado foi enviado. Em produção, este formulário será
                      conectado ao atendimento.
                    </p>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => setSent(false)}
                    >
                      Escrever outra mensagem
                    </button>
                  </div>
                ) : (
                  <>
                    <label htmlFor="name">Seu nome</label>
                    <input
                      id="name"
                      required
                      placeholder="Como podemos chamar você?"
                    />
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      required
                      type="email"
                      placeholder="voce@exemplo.com"
                    />
                    <label htmlFor="message">Mensagem</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Conte como podemos ajudar"
                    />
                    <small>
                      Formulário demonstrativo. Nenhum dado será enviado.
                    </small>
                    <button className="btn primary">
                      {page === "contato"
                        ? "Enviar mensagem"
                        : "Tenho interesse"}
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </form>
              <aside className="contact-aside">
                <Mail />
                <h3>Seu contato faz a diferença</h3>
                <p>
                  Os canais oficiais de atendimento serão disponibilizados no
                  lançamento.
                </p>
                <p>
                  <Phone size={17} /> Atendimento em dias úteis
                </p>
                <p>
                  <MapPin size={17} /> Plataforma brasileira
                </p>
                <Link
                  href="/institucional/perguntas-frequentes/"
                  className="text-link"
                >
                  Acesse as perguntas frequentes <ArrowUpRight size={16} />
                </Link>
              </aside>
            </div>
          </section>
        ) : page === "institucional/termos-de-uso" ? (
          <TermsOfUse />
        ) : page.startsWith("usuario/") ? (
          <section className="interior narrow container">
            <div className="auth-icon">
              <UserRound />
            </div>
            <h1>{page.endsWith("perfil") ? "Minha conta" : "Meus títulos"}</h1>
            <p className="intro">
              Entre na sua conta para acompanhar suas participações.
            </p>
            <div className="empty">
              <Ticket size={36} />
              <h3>Suas próximas histórias começam aqui.</h3>
              <p>Esta versão demonstrativa não emite títulos ou cria contas.</p>
              <Link href="/autenticar/" className="btn primary">
                Conhecer o acesso <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        ) : (
          <section className="interior narrow container">
            <div className="eyebrow">INFORMAÇÃO E TRANSPARÊNCIA</div>
            <h1>
              {(
                {
                  "institucional/termos-de-uso": "Termos de uso",
                  "institucional/regulamento": "Regulamento",
                  "institucional/jogo-responsavel": "Jogo responsável",
                  "institucional/de-todos": "Viva Sorte de Todos",
                  "politica-de-privacidade": "Política de privacidade",
                  assinaturas: "Sua sorte, todo mês",
                  "clube-beneficios": "Clube de benefícios",
                } as Record<string, string>
              )[page] || "Sobre a plataforma"}
            </h1>
            <p className="intro">
              Uma experiência construída com clareza e cuidado.
            </p>
            {page === "assinaturas" || page === "clube-beneficios" ? (
              <div className="empty">
                <Gift size={40} />
                <h2>Novas possibilidades estão chegando.</h2>
                <p>
                  Os planos e benefícios serão apresentados no lançamento da
                  plataforma.
                </p>
                <Link href="/" className="btn primary">
                  Explorar sorteios
                </Link>
              </div>
            ) : (
              <div className="prose">
                <h2>
                  {page.includes("jogo-responsavel")
                    ? "Participe com equilíbrio"
                    : "Sobre esta demonstração"}
                </h2>
                <p>
                  {page.includes("jogo-responsavel")
                    ? "A participação deve ser uma forma de entretenimento. Estabeleça limites, respeite seu orçamento e nunca comprometa recursos essenciais. Participação destinada a maiores de 18 anos."
                    : "Esta é uma aplicação estática de apresentação. Sorteios, valores, resultados e personagens são ilustrativos. Não há venda de títulos, emissão de documentos, cadastro de usuários ou processamento de pagamentos."}
                </p>
                <h2>
                  {page.includes("privacidade")
                    ? "Dados e armazenamento local"
                    : "Informações para o lançamento"}
                </h2>
                <p>
                  {page.includes("privacidade")
                    ? "O carrinho é armazenado apenas neste navegador, usando armazenamento local. Os formulários demonstrativos não enviam dados a um servidor. Para remover o carrinho salvo, exclua os dados deste site nas configurações do navegador."
                    : "Antes de uma operação real, esta página deverá receber os documentos oficiais, informações da sociedade emissora, regras de participação, critérios de premiação e identificação da instituição beneficiada."}
                </p>
                <h2>Dúvidas e atendimento</h2>
                <p>
                  Consulte nossas perguntas frequentes ou acesse a página de
                  contato para conhecer os canais previstos.
                </p>
                <Link
                  href="/institucional/perguntas-frequentes/"
                  className="text-link"
                >
                  Perguntas frequentes <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </section>
        )}
      </main>
      <footer>
        <div className="container">
          <div className="footer-top">
            <div>
              <h2>
                Abra espaço para
                <br />
                novas possibilidades.
              </h2>
              <p>Uma chance. Uma história. Um novo começo.</p>
            </div>
            <div>
              <h3>Explore</h3>
              <Link href="/">Sorteios</Link>
              <Link href="/resultados/">Resultados</Link>
              <Link href="/usuario/meus-titulos/">Meus títulos</Link>
            </div>
            <div>
              <h3>Conte com a gente</h3>
              <Link href="/institucional/perguntas-frequentes/">
                Perguntas frequentes
              </Link>
              <Link href="/seja-um-revendedor/">Seja um parceiro</Link>
              <Link href="/contato/">Fale conosco</Link>
            </div>
            <div className="footer-security">
              <ShieldCheck size={27} />
              <b>Você em primeiro lugar.</b>
              <p>
                Transparência, cuidado
                <br />e navegação segura.
              </p>
              <span>18+ · Participe com responsabilidade</span>
            </div>
          </div>
          <div className="footer-legal">
            <div>
              <Link href="/institucional/termos-de-uso/">Termos de uso</Link>
              <Link href="/politica-de-privacidade/">Privacidade</Link>
              <Link href="/institucional/regulamento/">Regulamento</Link>
              <Link href="/institucional/jogo-responsavel/">
                Jogo responsável
              </Link>
            </div>
            <p>
              Aplicação demonstrativa. Sem comercialização de títulos. Imagens,
              valores e resultados ilustrativos.
            </p>
            <div className="copyright">
              <span>© 2026 · Todos os direitos reservados.</span>
              <span>
                Feito para transformar possibilidades em histórias.{" "}
                <Heart size={12} />
              </span>
            </div>
          </div>
        </div>
      </footer>
      {count > 0 && page !== "checkout" && (
        <Link href="/checkout/" className="floating-cart">
          <span className="cart-badge">
            <ShoppingCart size={21} />
            <b>{count}</b>
          </span>
          <div>
            <small>SEU CARRINHO</small>
            <strong>{money(total)}</strong>
          </div>
          <span>
            Ver carrinho <ArrowRight size={16} />
          </span>
        </Link>
      )}
      {toast && (
        <div className="toast" role="status">
          <span>
            <Check size={16} />
          </span>
          {toast}
          <button aria-label="Fechar aviso" onClick={() => setToast("")}>
            <X size={16} />
          </button>
        </div>
      )}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal("")}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              autoFocus
              className="close"
              onClick={() => setModal("")}
              aria-label="Fechar detalhes"
            >
              <X />
            </button>
            <Trophy size={32} />
            <h2 id="modal-title">Detalhes da demonstração</h2>
            <p>{modal}</p>
            <button className="btn primary" onClick={() => setModal("")}>
              Entendi <Check size={17} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
