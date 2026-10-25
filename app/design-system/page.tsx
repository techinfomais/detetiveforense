import type { Metadata } from "next"
import {
  Calendar,
  ChevronRight,
  CircleCheck,
  Info,
  Minus,
  Plus,
  ShoppingCart,
  Trophy,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Design System - Sorte Viva",
  description: "Conferência visual dos tokens do DESIGNSYSTEM.md em Tailwind.",
}

// §2.3 — valores do doc, para comparar com o swatch renderizado pelo token
const scales: Record<string, string[]> = {
  primary: ["#D9E5F6", "#B3CAED", "#81A7E2", "#4E84D6", "#2869CD", "#024FC4", "#0243A7", "#013789", "#012862", "#011C45"],
  secondary: ["#D9DCF8", "#B3B9F1", "#808AE7", "#4D5BDD", "#2638D6", "#0015CF", "#0012B0", "#000F91", "#000B68", "#000748"],
  success: ["#E5F4E0", "#CBE9C1", "#A9DA97", "#86CB6D", "#6CC04E", "#52B52F", "#469A28", "#397F21", "#295B18", "#1D3F10"],
  info: ["#FFEBDB", "#FFD7B8", "#FFBC88", "#FFA158", "#FF8C35", "#FF7811", "#D9660E", "#B3540C", "#803C09", "#592A06"],
  danger: ["#F6DDDF", "#EDBABF", "#E18C94", "#D45E69", "#CB3C48", "#C21928", "#A51522", "#88121C", "#610D14", "#44090E"],
  warning: ["#FEF2DE", "#FCE4BD", "#FAD391", "#F8C165", "#F7B344", "#F5A623", "#D08D1E", "#AC7419", "#7B5312", "#563A0C"],
  muted: ["#EBEBEB", "#D7D7D7", "#BDBDBD", "#A3A3A3", "#8F8F8F", "#7B7B7B", "#696969", "#565656", "#3E3E3E", "#2B2B2B"],
  dark: ["#E0E0E1", "#C0C2C3", "#97999C", "#6D7074", "#4D5156", "#2E3238", "#272B30", "#202327", "#17191C", "#101214"],
  neutral: ["#FEFEFE", "#FCFCFC", "#FAFAFA", "#F8F8F8", "#F7F7F7", "#F5F5F5", "#D0D0D0", "#ACACAC", "#7B7B7B", "#565656"],
  pix: ["#EBF4F2", "#D6E9E5", "#BBDBD4", "#A0CCC2", "#8BC1B5", "#77B6A8", "#659B8F", "#537F76", "#3C5B54", "#2A403B"],
}
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

// Classes literais para o scanner do Tailwind gerar cada utility
const bg: Record<string, string[]> = {
  primary: ["bg-primary-50", "bg-primary-100", "bg-primary-200", "bg-primary-300", "bg-primary-400", "bg-primary-500", "bg-primary-600", "bg-primary-700", "bg-primary-800", "bg-primary-900"],
  secondary: ["bg-secondary-50", "bg-secondary-100", "bg-secondary-200", "bg-secondary-300", "bg-secondary-400", "bg-secondary-500", "bg-secondary-600", "bg-secondary-700", "bg-secondary-800", "bg-secondary-900"],
  success: ["bg-success-50", "bg-success-100", "bg-success-200", "bg-success-300", "bg-success-400", "bg-success-500", "bg-success-600", "bg-success-700", "bg-success-800", "bg-success-900"],
  info: ["bg-info-50", "bg-info-100", "bg-info-200", "bg-info-300", "bg-info-400", "bg-info-500", "bg-info-600", "bg-info-700", "bg-info-800", "bg-info-900"],
  danger: ["bg-danger-50", "bg-danger-100", "bg-danger-200", "bg-danger-300", "bg-danger-400", "bg-danger-500", "bg-danger-600", "bg-danger-700", "bg-danger-800", "bg-danger-900"],
  warning: ["bg-warning-50", "bg-warning-100", "bg-warning-200", "bg-warning-300", "bg-warning-400", "bg-warning-500", "bg-warning-600", "bg-warning-700", "bg-warning-800", "bg-warning-900"],
  muted: ["bg-muted-50", "bg-muted-100", "bg-muted-200", "bg-muted-300", "bg-muted-400", "bg-muted-500", "bg-muted-600", "bg-muted-700", "bg-muted-800", "bg-muted-900"],
  dark: ["bg-dark-50", "bg-dark-100", "bg-dark-200", "bg-dark-300", "bg-dark-400", "bg-dark-500", "bg-dark-600", "bg-dark-700", "bg-dark-800", "bg-dark-900"],
  neutral: ["bg-neutral-50", "bg-neutral-100", "bg-neutral-200", "bg-neutral-300", "bg-neutral-400", "bg-neutral-500", "bg-neutral-600", "bg-neutral-700", "bg-neutral-800", "bg-neutral-900"],
  pix: ["bg-pix-50", "bg-pix-100", "bg-pix-200", "bg-pix-300", "bg-pix-400", "bg-pix-500", "bg-pix-600", "bg-pix-700", "bg-pix-800", "bg-pix-900"],
}

const typeScale = [
  ["text-xs", "12 / 16", "Chips, badges, disclaimers, Processo SUSEP"],
  ["text-sm", "14 / 20", "Descrições de prêmio, labels, stepper"],
  ["text-base", "16 / 24", "Links do menu, título do sorteio (h4)"],
  ["text-lg", "18 / 28", "Títulos de seção, subtítulo do login"],
  ["text-xl", "20 / 28", "Títulos de CTA em bloco, valor no carrinho"],
  ["text-2xl", "24 / 32", "Data do sorteio (desktop), H2 de página"],
  ["text-[1.75rem]", "28", "Quantidade no seletor"],
]
const weights = [
  ["font-light", "300"],
  ["font-normal", "400"],
  ["font-medium", "500"],
  ["font-bold", "700"],
]
const spacing = [
  ["w-0.5", "0.5", "4"],
  ["w-1", "1", "8"],
  ["w-1.5", "1.5", "6"],
  ["w-2", "2", "12"],
  ["w-2.5", "2.5", "10"],
  ["w-3", "3", "16"],
  ["w-4", "4", "24"],
  ["w-5", "5", "32"],
  ["w-6", "6", "48"],
  ["w-8", "8", "60"],
  ["w-10", "10", "40"],
  ["w-12", "12", "48"],
]
const radii = [
  ["rounded", "4", "—"],
  ["rounded-md", "6", "Ícones de categoria, sub-chips"],
  ["rounded-lg", "8", "Botões CTA, caixa de total, chips"],
  ["rounded-xl", "12", "Carrinho flutuante"],
  ["rounded-2xl", "16", "Badge SUSEP, footer, Adicionar todos"],
  ["rounded-3xl", "24", "Cards de sorteio, banners, login"],
  ["rounded-full", "∞", "Botões +/–, badges de tempo"],
]
const shadows = ["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-t-2xl"]
const zIndex = [
  ["z-1", "1"],
  ["z-10", "10"],
  ["z-20", "20"],
  ["z-header", "40"],
  ["z-[45]", "45"],
  ["z-app-footer", "50"],
  ["z-modal", "60 (inferido)"],
  ["z-preloader", "9999"],
]

const btnBase =
  "relative block w-full overflow-hidden rounded-lg px-4 py-2.5 text-center! font-medium text-white transition-all! duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 bg-linear-to-br before:absolute before:inset-0 before:bg-linear-to-tr before:from-white/0 before:via-white/10 before:to-white/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 disabled:shadow-none"

function Section({
  id,
  title,
  doc,
  children,
}: {
  id: string
  title: string
  doc: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex flex-col gap-2 border-t border-muted-100 pt-5 pb-3">
      <header className="flex items-center gap-1">
        <span className="aspect-square w-[20px] rounded-md bg-primary" />
        <div>
          <h2 className="text-lg font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted">DESIGNSYSTEM.md {doc}</p>
        </div>
      </header>
      {children}
    </section>
  )
}

function QtyButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid aspect-square h-[2.3rem] touch-none place-items-center rounded-full border-2 border-contrast bg-primary text-contrast lg:h-[2.7rem]"
    >
      {children}
    </button>
  )
}

export default function DesignSystemPage() {
  return (
    <main className="bg-background font-sans text-base text-dark">
      {/* breakpoint ativo (§5) */}
      <div className="fixed top-1 right-1 z-preloader rounded-full bg-dark px-2 py-0.5 text-xs font-medium text-white">
        <span className="sm:hidden">base &lt;640</span>
        <span className="hidden sm:inline md:hidden">sm ≥640</span>
        <span className="hidden md:inline lg:hidden">md ≥768</span>
        <span className="hidden lg:inline xl:hidden">lg ≥1024</span>
        <span className="hidden xl:inline 2xl:hidden">xl ≥1280</span>
        <span className="hidden 2xl:inline">2xl ≥1536</span>
      </div>

      <div className="container px-2">
        <header className="flex flex-col gap-1 pt-5">
          <h1 className="text-2xl font-bold">Design System — conferência</h1>
          <p className="text-sm text-muted">
            Tudo nesta página é renderizado só com utilities Tailwind geradas de{" "}
            <code>app/design-tokens.css</code>. Compare com <code>DESIGNSYSTEM.md</code> e{" "}
            <code>docs/referencia/*.png</code>. O selo no canto superior direito mostra o breakpoint ativo.
          </p>
        </header>

        <Section id="cores" title="Paleta semântica 50 → 900" doc="§2.2 / §2.3">
          <p className="text-sm text-muted">
            Swatch = token renderizado · rótulo = hex do doc · texto do swatch usa{" "}
            <code>text-contrast</code> (contraste automático).
          </p>
          <div className="flex flex-col gap-1 overflow-x-auto">
            {Object.entries(scales).map(([name, hexes]) => (
              <div key={name} className="grid min-w-[720px] grid-cols-[96px_repeat(10,1fr)] items-stretch gap-0.5">
                <div className="flex items-center text-sm font-medium">{name}</div>
                {hexes.map((hex, i) => (
                  <div
                    key={hex + i}
                    className={`${bg[name][i]} flex h-12 flex-col justify-end rounded-md p-0.5 text-[10px] leading-tight text-contrast ${shades[i] === 500 ? "ring-2 ring-dark ring-offset-1" : ""}`}
                  >
                    <b>{shades[i]}</b>
                    <span>{hex}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 text-sm">
            <div className="rounded-lg border border-muted-200 bg-background px-2 py-1">background #FFFFFF</div>
            <div className="bg-gold rounded-lg px-2 py-1 text-contrast">gold #F7B917 → #DBA100</div>
            <div className="rounded-lg bg-primary/40 px-2 py-1">bg-primary/40 (opacidade)</div>
          </div>
        </Section>

        <Section id="tipografia" title="Tipografia — Ubuntu" doc="§3">
          <div className="flex flex-wrap gap-3">
            {weights.map(([cls, w]) => (
              <span key={cls} className={`${cls} text-xl`}>
                Aa {w} <small className="text-xs text-muted">{cls}</small>
              </span>
            ))}
          </div>
          <div className="flex flex-col divide-y divide-muted-100">
            {typeScale.map(([cls, size, use]) => (
              <div key={cls} className="grid grid-cols-1 gap-0.5 py-1 md:grid-cols-[140px_80px_1fr] md:items-baseline">
                <code className="text-xs text-muted">{cls}</code>
                <span className="text-xs text-muted">{size}px</span>
                <span className={cls}>{use}</span>
              </div>
            ))}
          </div>
          <p className="text-sm">
            Countdown <span className="font-bold text-primary tabular-nums">01:09:58</span> (tabular-nums) ·
            quantidade mono <span className="font-mono">20</span> · line-height base 1.5
          </p>
        </Section>

        <Section id="espacamento" title="Espaçamento remapeado (base 8px)" doc="§4.1">
          <div className="flex flex-col gap-0.5">
            {spacing.map(([cls, key, px]) => (
              <div key={cls} className="grid grid-cols-[72px_56px_1fr] items-center text-sm">
                <code className="text-xs text-muted">*-{key}</code>
                <span className="text-xs">{px}px</span>
                <span className={`${cls} h-2 rounded bg-primary`} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="raios" title="Raios (base 1rem)" doc="§4.2">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-7">
            {radii.map(([cls, px, use]) => (
              <div key={cls} className="flex flex-col gap-0.5">
                <div className={`${cls} grid h-16 place-items-center bg-secondary text-xs text-contrast`}>{px}px</div>
                <code className="text-xs">{cls}</code>
                <span className="text-xs text-muted">{use}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="sombras" title="Sombras e camadas" doc="§4.3 / §4.4">
          <div className="grid grid-cols-2 gap-4 py-3 md:grid-cols-3 lg:grid-cols-6">
            {shadows.map((cls) => (
              <div key={cls} className={`${cls} grid h-16 place-items-center rounded-lg bg-white text-xs`}>
                {cls}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 text-xs">
            {zIndex.map(([cls, v]) => (
              <span key={cls} className="rounded-lg border border-muted-200 px-1 py-0.5">
                <code>{cls}</code> = {v}
              </span>
            ))}
          </div>
        </Section>

        <Section id="layout" title="Container, breakpoints e grid" doc="§5">
          <div className="rounded-lg border-2 border-dashed border-primary-300 p-1 text-sm">
            <code>container</code> (centralizado; max 640 → 768 → 1024 → 1280 → 1536). Gutter mobile 12px (
            <code>px-2</code>).
          </div>
          <div className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-2 lg:grid-cols-3">
            {["1 col (base)", "2 col (md)", "3 col (lg)"].map((t) => (
              <div key={t} className="grid h-12 place-items-center rounded-3xl bg-primary-50 text-sm">
                {t}
              </div>
            ))}
          </div>
          <div className="aspect-banner-mobile grid max-w-xl place-items-center rounded-3xl bg-primary text-contrast lg:aspect-banner">
            <span className="text-sm">aspect-banner-mobile (2:1) → lg:aspect-banner (16:9)</span>
          </div>
        </Section>

        <Section id="botoes" title="Botões" doc="§8.1">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
            <button type="button" className={`${btnBase} from-success to-success-600 hover:from-success-600 hover:to-success-700`}>
              <span className="relative z-10 flex items-center justify-center gap-1">
                <ShoppingCart className="size-4" /> Comprar
              </span>
            </button>
            <button type="button" className={`${btnBase} rounded-3xl! from-secondary to-secondary-600 hover:from-secondary-600 hover:to-secondary-700`}>
              <span className="relative z-10">entre ou cadastre-se</span>
            </button>
            <button type="button" className={`${btnBase} from-gold-from to-gold-to`}>
              <span className="relative z-10">Continuar</span>
            </button>
            <button
              type="button"
              disabled
              className={`${btnBase} from-gray-200 to-gray-300 text-dark-900!`}
            >
              <span className="relative z-10">Continuar (disabled)</span>
            </button>
            <button type="button" disabled className={`${btnBase} from-success-200 to-success-300 text-white/70!`}>
              <span className="relative z-10">Comprar (disabled)</span>
            </button>
            <div className="rounded-2xl bg-success p-2">
              <button type="button" className="w-full rounded-full border-2 border-white px-3 py-1 font-medium text-white">
                <span className="flex items-center justify-center gap-1">
                  <ShoppingCart className="size-4" /> Adicionar todos
                </span>
              </button>
            </div>
          </div>
        </Section>

        <Section id="componentes" title="Componentes-chave" doc="§8">
          {/* §8.5 countdown */}
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-lg bg-primary px-2 py-1 text-sm font-bold text-contrast uppercase">
            800 mil por 99 centavos:
            {["01", "09", "58"].map((n, i) => (
              <span key={i} className="flex items-center gap-0.5">
                {i > 0 && ":"}
                <span className="rounded border border-black bg-white px-0.5 text-primary tabular-nums">{n}</span>
              </span>
            ))}
          </div>

          {/* §8.6 marquee */}
          <div className="h-[28px] overflow-hidden bg-info text-contrast">
            <div className="flex w-max animate-marquee items-center gap-4 py-0.5 font-medium whitespace-nowrap motion-reduce:animate-none">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i}>+de 1 MILHÃO em prêmios por R$ 0,99 centavos!</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-2 lg:grid-cols-3">
            {/* §8.3 card de sorteio */}
            <article className="flex flex-col gap-y-2 rounded-3xl bg-white">
              <div className="relative aspect-banner-mobile overflow-hidden rounded-3xl bg-primary-200 lg:aspect-banner">
                <span className="absolute top-1 right-1 z-10 flex animate-head-shake items-center gap-0.5 rounded-full bg-secondary px-1 py-0.5 text-xs text-contrast">
                  <Calendar className="size-3" /> Em 10 horas
                </span>
                <span className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-t-2xl bg-secondary px-2 py-0.5 text-xs whitespace-nowrap text-contrast">
                  <Info className="size-3" /> Processo SUSEP 15414.000000/2026-00
                </span>
              </div>
              <div className="flex gap-1">
                <span className="flex items-center gap-0.5 rounded-lg bg-primary p-1 text-xs font-medium text-contrast">
                  Edição nº <span className="rounded-md bg-white/20 px-1">3177</span>
                </span>
                <span className="flex items-center gap-0.5 rounded-lg bg-primary p-1 text-xs font-medium text-contrast">
                  Sorteio em <span className="rounded-md bg-white/20 px-1">10 h</span>
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="truncate text-xs">Especial de Graça - 12:30h</span>
                <span className="text-right">
                  <span className="block text-xs">HOJE</span>
                  <span className="text-xl font-bold text-primary">ÀS 12:30</span>
                </span>
              </div>
              {/* §8.2 payment sheet completo */}
              <div className="grid min-h-[3.7rem] grid-cols-2 items-center rounded-lg bg-secondary px-2 text-contrast">
                <div>
                  <span className="block text-xs font-extralight uppercase">Total</span>
                  <span className="font-medium" aria-live="polite">R$ 2,50</span>
                </div>
                <div className="flex items-center justify-end gap-0.5">
                  <QtyButton label="Diminuir quantidade"><Minus className="size-4" /></QtyButton>
                  <span className="min-w-[4rem] text-center text-[1.75rem] font-medium">50</span>
                  <QtyButton label="Aumentar quantidade"><Plus className="size-4" /></QtyButton>
                </div>
              </div>
              <button type="button" className={`${btnBase} from-success to-success-600 hover:from-success-600 hover:to-success-700`}>
                <span className="relative z-10 flex items-center justify-center gap-1">
                  <ShoppingCart className="size-4" /> Adicione ao carrinho
                </span>
              </button>
            </article>

            <div className="flex flex-col gap-2">
              {/* §8.13 input com label flutuante */}
              <div className="relative rounded-md border-2 border-muted-100 bg-slate-50 duration-300 focus-within:border-primary focus-within:bg-white">
                <input
                  id="ds-cpf"
                  inputMode="numeric"
                  autoComplete="username"
                  placeholder="Digite o seu CPF"
                  className="w-full border-none! bg-transparent px-4 pt-4 pb-1 text-lg outline-0!"
                />
                <label htmlFor="ds-cpf" className="absolute top-0 left-0 mt-0.5 ml-3 px-1 text-xs font-medium text-muted">
                  CPF
                </label>
              </div>
              <small className="text-xs text-slate-500">Insira o número do seu CPF</small>

              {/* §8.14 stepper */}
              <div className="flex gap-1 text-sm">
                <span className="grid aspect-square w-10 place-items-center rounded-lg text-success">
                  <CircleCheck className="size-5" />
                </span>
                <span className="grow rounded-lg border border-primary px-2 py-1 text-primary">1. Identificação</span>
                <span className="grid aspect-square w-10 place-items-center rounded-lg bg-gray-100 text-gray-400">2</span>
              </div>

              {/* §8.15 chips / badges */}
              <div className="flex flex-wrap gap-1">
                <span className="rounded-lg bg-primary p-1 text-xs font-medium text-contrast">chip-primary</span>
                <span className="flex items-center gap-0.5 rounded-full bg-secondary px-1 py-0.5 text-xs text-contrast">
                  <Calendar className="size-3" /> badge de tempo
                </span>
                <span className="rounded-full bg-pix px-1 py-0.5 text-xs text-contrast">PIX</span>
                <span className="rounded-full bg-danger px-1 py-0.5 text-xs text-contrast">erro</span>
                <span className="rounded-full bg-warning px-1 py-0.5 text-xs text-contrast">alerta</span>
              </div>

              {/* §7.4 list item navegável */}
              <a href="#componentes" className="flex items-center gap-2 rounded-lg border border-muted-100 bg-white p-2">
                <span className="grid aspect-square w-10 place-items-center rounded-md bg-primary text-contrast">
                  <Trophy className="size-5" />
                </span>
                <span className="grow">
                  <b className="block">Categoria</b>
                  <span className="text-xs text-muted">Subtítulo da categoria</span>
                </span>
                <ChevronRight className="size-5 text-muted" />
              </a>
            </div>

            <div className="flex flex-col gap-2">
              {/* §8.8 bloco CTA em massa */}
              <div className="flex flex-col gap-1 rounded-2xl bg-success p-3 text-contrast">
                <b className="text-xl font-bold">Adicione todos os sorteios ao carrinho!</b>
                <span className="text-xs">Mais chances em um clique.</span>
              </div>

              {/* §8.9 card de ganhador */}
              <div className="flex gap-2 overflow-x-auto rounded-3xl bg-primary p-2 text-contrast">
                {[0, 1].map((i) => (
                  <div key={i} className="relative h-52 w-32 shrink-0 overflow-hidden rounded-3xl bg-primary-300">
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-1 py-0.5 text-[10px] whitespace-nowrap text-white backdrop-blur-md">
                      R$ 5.000,00 - valor líquido
                    </span>
                    <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent p-1 text-xs text-white">
                      <b className="block">Carlos A. P. A.</b>São Paulo/SP
                    </span>
                  </div>
                ))}
              </div>

              {/* §8.17 preloader */}
              <div className="relative h-1 overflow-hidden rounded-full bg-primary-100">
                <span className="absolute inset-0 origin-left animate-indeterminate bg-primary" />
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* §8.11 carrinho flutuante — barra mobile / aba md+ */}
      <div className="sticky bottom-0 z-app-footer mt-5 flex items-center justify-between bg-secondary px-2 py-1 text-contrast md:ml-auto md:w-max md:gap-3 md:rounded-t-xl md:rounded-l-xl">
        <span className="text-xl font-extrabold">R$ 19,80</span>
        <span className="rounded-full bg-linear-to-br from-success to-success-600 px-3 py-1 text-sm font-medium text-white">
          <span className="md:hidden">Ver carrinho</span>
          <span className="hidden md:inline">Ir p/ o carrinho</span>
        </span>
      </div>
    </main>
  )
}
