"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Gift,
  Menu,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Ticket,
  Trash2,
  Trophy,
  UserRound,
  X,
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
import { CartButton } from "./cart-button"
import { DeTodosPage } from "./de-todos"
import { Home, draws } from "./home"
import { HelpCenter } from "./faq"
import { SiteFooter } from "./footer"
import { PartnerPage } from "./partners"
import { RegulationPage } from "./regulation"
import { ResultsPage } from "./results"
import { ResultsCategoryPage } from "./results-category"
import { TermsOfUse } from "./terms"

const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
type Cart = Record<string, number>
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
  const [step, setStep] = useState(1)
  const [cpf, setCpf] = useState("")
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
  function addMany(items: [number, number][]) {
    const updated = { ...cart }
    items.forEach(([id, qty]) => (updated[id] = Math.min(999, (updated[id] || 0) + qty)))
    setCart(updated)
    localStorage.setItem("sorteviva-cart", JSON.stringify(updated))
    setToast("Todos os sorteios foram adicionados ao carrinho!")
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
      <header className="header container">
        <Link href="/" className="header-logo" aria-label="Página inicial">
          <Image
            src="/logos/principal-logo.webp"
            alt="Sorte Viva"
            width={144}
            height={48}
            priority
            unoptimized
          />
        </Link>
        <nav aria-label="Principal">{navigation}</nav>
        <Link href="/autenticar/" className="login">
          <span className="login-icon">
            {/* Font Awesome Free 6 — fa-user (CC BY 4.0) */}
            <svg viewBox="0 0 448 512" width={20} height={16} fill="currentColor" aria-hidden="true">
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </span>
          <span className="login-text">
            entre ou <span>cadastre-se</span>
          </span>
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
          <Home add={add} addMany={addMany} />
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
          <ResultsPage />
        ) : page.startsWith("resultados/") ? (
          <ResultsCategoryPage path={page.slice("resultados/".length)} />
        ) : page === "contato" || page.includes("perguntas-frequentes") ? (
          <HelpCenter />
        ) : page.startsWith("seja-um-") ? (
          <PartnerPage
            kind={page === "seja-um-influenciador" ? "influenciador" : "revendedor"}
          />
        ) : page === "institucional/regulamento" ? (
          <RegulationPage />
        ) : page === "institucional/de-todos" ? (
          <DeTodosPage />
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
      <SiteFooter />
      {count > 0 && page !== "checkout" && (
        <CartButton count={count} total={money(total)} />
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
