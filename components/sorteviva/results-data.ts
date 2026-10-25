// Resultados FICTÍCIOS (apenas demonstrativos) das categorias de /resultados.
// Mesmo formato e quantidade da referência: até 30 sorteios mais recentes por
// categoria, agrupados por mês, e o detalhe de cada sorteio (prêmios,
// dezenas sorteadas e contemplados). Tudo é gerado de forma determinística
// (mesma saída no servidor e no cliente) a partir de datas fixas.

export type Winner = {
  name: string
  city: string
  number: string
  prize?: string
  seller?: string
}
export type Prize = { title: string; balls?: string[]; winners: Winner[] }
export type Draw = {
  id: string
  title: string
  /** dd/mm/aaaa */
  day: string
  /** "DOM, 25 OUT · 2026" */
  long: string
  month: string
  year: number
  edition: string
  banner: string
  summary: string
  prizes: () => Prize[]
}
export type ResultCategory = {
  slug: string
  name: string
  text: string
  icon: string
  draws: Draw[]
}

// ---------------------------------------------------------------- utilidades
const WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]
const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
const MONTH_NAMES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
]
const DAY = 86_400_000
const pad = (n: number, size = 2) => String(n).padStart(size, "0")

// Datas em UTC para não depender do fuso de quem renderiza.
const utc = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d)
/** As `count` datas mais recentes (a partir de `from`, inclusive) nos dias da semana pedidos. */
function backwards(from: number, count: number, weekdays: (t: number) => number[]) {
  const out: number[] = []
  for (let t = from; out.length < count; t -= DAY) {
    if (weekdays(t).includes(new Date(t).getUTCDay())) out.push(t)
  }
  return out
}
const fmt = (t: number) => {
  const d = new Date(t)
  return {
    ymd: `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`,
    day: `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`,
    long: `${WEEK[d.getUTCDay()]}, ${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]} · ${d.getUTCFullYear()}`,
    month: MONTH_NAMES[d.getUTCMonth()],
    year: d.getUTCFullYear(),
    weekday: d.getUTCDay(),
  }
}

// PRNG determinístico (mulberry32) semeado pelo id do sorteio.
function rng(seed: string) {
  let h = 1779033703
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
  let a = h >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
type Rand = ReturnType<typeof rng>
const pick = <T,>(r: Rand, list: readonly T[]) => list[Math.floor(r() * list.length)]

// Nomes abreviados genéricos (combinações fictícias) e cidades por região.
const FIRST = [
  "Ana", "Bruno", "Carla", "Diego", "Elaine", "Fábio", "Gisele", "Hélio", "Irene", "João",
  "Karina", "Luiz", "Márcia", "Nelson", "Olívia", "Paulo", "Rita", "Sérgio", "Tânia", "Vítor",
  "Adriana", "Cláudio", "Denise", "Edson", "Fernanda", "Gilberto", "Joana", "Leandro", "Mirela", "Rogério",
]
const INITIALS = "ABCDFGLMNOPRSTV"
const SELLERS = [
  "Marcos Tavares", "Juliana Prado", "Renato Albuquerque", "Simone Farias",
  "Otávio Rangel", "Patrícia Moura", "Wagner Lacerda", "Luciana Freitas",
]
type Region = "N" | "CO" | "SE" | "S" | "NE" | "PR" | "BR"
const CITIES: Record<Exclude<Region, "BR">, string[]> = {
  N: ["Manaus / AM", "Belém / PA", "Porto Velho / RO", "Palmas / TO", "Santarém / PA", "Boa Vista / RR", "Macapá / AP", "Rio Branco / AC", "Marabá / PA", "Ji-Paraná / RO"],
  CO: ["Goiânia / GO", "Cuiabá / MT", "Campo Grande / MS", "Brasília / DF", "Anápolis / GO", "Rondonópolis / MT", "Dourados / MS", "Rio Verde / GO", "Sinop / MT", "Aparecida de Goiânia / GO"],
  SE: ["São Paulo / SP", "Campinas / SP", "Belo Horizonte / MG", "Rio de Janeiro / RJ", "Vitória / ES", "Uberlândia / MG", "Niterói / RJ", "Santos / SP", "Juiz de Fora / MG", "Serra / ES"],
  S: ["Curitiba / PR", "Porto Alegre / RS", "Florianópolis / SC", "Londrina / PR", "Joinville / SC", "Caxias do Sul / RS", "Maringá / PR", "Blumenau / SC", "Pelotas / RS", "Chapecó / SC"],
  NE: ["Recife / PE", "Salvador / BA", "Fortaleza / CE", "São Luís / MA", "Natal / RN", "João Pessoa / PB", "Maceió / AL", "Teresina / PI", "Aracaju / SE", "Caruaru / PE"],
  PR: ["Cascavel / PR", "Toledo / PR", "Ponta Grossa / PR", "Guarapuava / PR", "Londrina / PR", "Maringá / PR", "Foz do Iguaçu / PR", "Umuarama / PR", "Pato Branco / PR", "Apucarana / PR"],
}
const city = (r: Rand, region: Region) =>
  region === "BR" ? pick(r, pick(r, Object.values(CITIES))) : pick(r, CITIES[region])

function winner(r: Rand, region: Region, sellerRate: number, prize?: string): Winner {
  const parts = 1 + Math.floor(r() * 3)
  const initials = Array.from({ length: parts }, () => pick(r, INITIALS.split("")) + ".").join(" ")
  return {
    name: `${pick(r, FIRST)} ${initials}`,
    city: city(r, region),
    number: pad(Math.floor(r() * 10_000_000), 7),
    prize,
    seller: r() < sellerRate ? pick(r, SELLERS) : undefined,
  }
}
/** `count` dezenas distintas de 1..max, na ordem em que "saíram". */
function balls(r: Rand, count: number, max = 60, sorted = false) {
  const pool = Array.from({ length: max }, (_, i) => i + 1)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const out = pool.slice(0, count)
  if (sorted) out.sort((a, b) => a - b)
  return out.map((n) => pad(n))
}

type Spec = { title: string; winners: number; balls?: boolean }
const build = (seed: string, region: Region, sellerRate: number, specs: Spec[]) => () => {
  const r = rng(seed)
  return specs.map<Prize>((s) => ({
    title: s.title,
    balls: s.balls ? balls(r, 34 + Math.floor(r() * 10)) : undefined,
    winners: Array.from({ length: s.winners }, () => winner(r, region, sellerRate)),
  }))
}
const rep = (n: number, s: Spec) => Array.from({ length: n }, () => s)

// ---------------------------------------------------------------- categorias
const BANNER = {
  big: "/banners/home-banner-200-mil.webp",
  three: "/banners/home-banner-3-mil.webp",
  ten1: "/banners/home-banner-10-mil-1.webp",
  ten2: "/banners/home-banner-10-mil-2.webp",
  day: "/banners/home-banner-gabigol.webp",
}

// Viva Sorte: todo domingo; até 02/08 também havia o "Cliente Fiel Premiado".
function sorteViva(): Draw[] {
  const sundays = backwards(utc(2026, 10, 25), 30, () => [0])
  const out: Draw[] = []
  sundays.forEach((t, i) => {
    const f = fmt(t)
    out.push({
      id: f.ymd,
      title: `Viva Sorte - ${f.day}`,
      ...f,
      edition: pad(52 - i, 3),
      banner: BANNER.big,
      summary: "3 prêmios de R$ 200MIL | 1 prêmio de R$ 100MIL | 5 prêmios de R$ 20MIL",
      prizes: build(f.ymd, "BR", 0, [
        { title: "R$ 20.000,00 - valor líquido (cada)", winners: 5 },
        ...rep(3, { title: "R$ 200.000,00 - valor líquido", winners: 1 }),
        { title: "Prêmio Extra: R$ 100.000,00 - valor líquido", winners: 1 },
      ]),
    })
    if (t <= utc(2026, 8, 2)) {
      out.push({
        id: `${f.ymd}-cf`,
        title: `Cliente Fiel Premiado - ${f.day}`,
        ...f,
        edition: pad(Math.max(1, Math.round((t - utc(2026, 6, 7)) / (7 * DAY)) + 1), 3),
        banner: BANNER.ten2,
        summary: "10 prêmios de R$ 10MIL para quem é cliente fiel",
        prizes: build(`${f.ymd}-cf`, "BR", 0, [{ title: "R$ 10.000,00 - valor líquido (cada)", winners: 10 }]),
      })
    }
  })
  return out.slice(0, 30)
}

// Hora da Sorte: segunda a sábado, 12:30 e 19:30 (e 17:30 até 10/10).
function horaDaSorte(): Draw[] {
  const days = backwards(utc(2026, 10, 24), 20, () => [1, 2, 3, 4, 5, 6])
  const out: Draw[] = []
  let edition = 3178
  for (const t of days) {
    const f = fmt(t)
    const times = t >= utc(2026, 10, 13) ? ["19:30", "12:30"] : ["19:30", "17:30", "12:30"]
    for (const time of times) {
      const name =
        time === "19:30" && (f.weekday === 6 || f.weekday === 3)
          ? "Hora de Ouro"
          : time === "12:30" && f.weekday === 6
            ? "Especial de Sábado"
            : "Hora da Sorte"
      const id = `${f.ymd}-${time.replace(":", "")}`
      out.push({
        id,
        title: `${name} - ${time}h ${f.day}`,
        ...f,
        edition: String(edition--),
        banner: time === "12:30" ? BANNER.three : time === "17:30" ? BANNER.ten2 : BANNER.ten1,
        summary:
          "1º PRÊMIO - R$ 1.000,00 / 2º PRÊMIO - R$ 1.000,00 / 3º PRÊMIO - R$ 1.000,00 / 4º PRÊMIO R$ 5.000,00 + 20 PIX DE R$ 100,00",
        prizes: build(id, "BR", 0.1, [
          ...rep(3, { title: "R$ 1.000,00 - Valor líquido", winners: 1, balls: true }),
          { title: "R$ 5.000,00 - Valor líquido", winners: 1, balls: true },
          ...rep(2, { title: "R$ 100,00 - Valor líquido", winners: 10 }),
        ]),
      })
    }
  }
  return out.slice(0, 30)
}

// Viva Sorte do Dia: às quintas desde agosto; antes, segunda/quarta/sexta.
function sorteVivaDoDia(): Draw[] {
  const days = backwards(utc(2026, 10, 22), 30, (t) => (t >= utc(2026, 8, 6) ? [4] : [1, 3, 5]))
  return days.map((t, i) => {
    const f = fmt(t)
    return {
      id: f.ymd,
      title: `Viva Sorte do Dia - ${f.day}`,
      ...f,
      edition: String(190 - i),
      banner: BANNER.day,
      summary: "Multiplique o valor pago em até 100.000x",
      prizes: () => {
        const r = rng(f.ymd)
        const n = 1 + Math.floor(r() * 3)
        const values = ["R$ 500,00", "R$ 1.000,00", "R$ 2.500,00", "R$ 5.000,00", "R$ 10.000,00"]
        return [
          {
            title: "O valor pago no seu título multiplicado em ATÉ 100.000 X",
            balls: balls(r, 7, 80, true),
            winners: Array.from({ length: n }, () => winner(r, "BR", 0, pick(r, values))),
          },
        ]
      },
    }
  })
}

// Regionais: segunda, quarta e sexta, últimas 15 edições (até 29/05/2026).
function regional(region: Exclude<Region, "BR" | "PR">, label: string, time: string): Draw[] {
  const days = backwards(utc(2026, 5, 29), 15, () => [1, 3, 5])
  return days.map((t, i) => {
    const f = fmt(t)
    const id = `${f.ymd}-${time.replace(":", "")}`
    return {
      id,
      title: `Hora ${label} - ${f.day} - ${time}h`,
      ...f,
      edition: pad(29 - i, 3),
      banner: i % 2 ? BANNER.ten2 : BANNER.ten1,
      summary: `Muito dinheiro somente para a região ${label} do Brasil!`,
      prizes: build(id + region, region, 0.15, [
        { title: "R$ 500,00 - Valor líquido", winners: 4, balls: true },
        { title: "R$ 500,00 - Valor líquido", winners: 1, balls: true },
        { title: "R$ 5.000,00 - Valor líquido", winners: 1, balls: true },
        ...rep(2, { title: "R$ 50,00 - Valor líquido", winners: 10 }),
      ]),
    }
  })
}

// Viva Sorte Paraná: domingos, últimas 4 edições (até 17/05/2026).
function sorteVivaParana(): Draw[] {
  const days = backwards(utc(2026, 5, 17), 4, () => [0])
  return days.map((t, i) => {
    const f = fmt(t)
    return {
      id: f.ymd,
      title: `Viva Sorte Paraná - ${f.day}`,
      ...f,
      edition: pad(4 - i, 3),
      banner: BANNER.big,
      summary: "Prêmios para trocar de carro, de moto ou colocar as contas em dia!",
      prizes: build(`${f.ymd}-pr`, "PR", 1, [
        { title: "1º prêmio - R$ 8.000,00 (valor líquido) dividido", winners: 2, balls: true },
        { title: "2º prêmio - R$ 8.000,00 (valor líquido)", winners: 1, balls: true },
        { title: "3º prêmio - R$ 12.000,00 (valor líquido)", winners: 1, balls: true },
        { title: "4º prêmio - R$ 100.000,00 (valor líquido)", winners: 1, balls: true },
        { title: "Giro da Sorte - R$ 2.000,00 (valor líquido)", winners: 1 },
        { title: "Giro da Sorte - R$ 3.000,00 (valor líquido)", winners: 1 },
        { title: "Giro da Sorte - R$ 5.000,00 (valor líquido)", winners: 1 },
      ]),
    }
  })
}

const regionText = (r: string) => `Muito dinheiro somente para a região ${r} do Brasil!`

// Mesma ordem e mesmos slugs da referência.
export const RESULT_CATEGORIES: ResultCategory[] = [
  { slug: "viva-sorte", name: "Viva Sorte", text: "Sorteios Filantropia Premiável", icon: "hora-sorte-logo-icon", draws: sorteViva() },
  { slug: "hora-do-viva", name: "Hora da Sorte", text: "Sorteios Filantropia Premiável", icon: "hora-sorte-relogio-icon", draws: horaDaSorte() },
  { slug: "vivasortedodia", name: "Viva Sorte do Dia", text: "Multiplique o valor pago em até 100.000x", icon: "hora-sorte-calendario-icon", draws: sorteVivaDoDia() },
  { slug: "hora-norte", name: "Hora Norte", text: regionText("Norte"), icon: "hora-sorte-norte-icon", draws: regional("N", "Norte", "21:00") },
  { slug: "hora-centro-oeste", name: "Hora Centro-Oeste", text: regionText("Centro-Oeste"), icon: "hora-sorte-centrooeste-icon", draws: regional("CO", "Centro-Oeste", "20:30") },
  { slug: "hora-sudeste", name: "Hora Sudeste", text: regionText("Sudeste"), icon: "hora-sorte-sudeste-icon", draws: regional("SE", "Sudeste", "20:00") },
  { slug: "hora-sul", name: "Hora Sul", text: regionText("Sul"), icon: "hora-sorte-sul-icon", draws: regional("S", "Sul", "19:00") },
  { slug: "hora-nordeste", name: "Hora Nordeste", text: regionText("Nordeste"), icon: "hora-sorte-nordeste-icon", draws: regional("NE", "Nordeste", "18:30") },
  { slug: "vivapr", name: "Viva Sorte Paraná", text: "O título de capitalização somente para o interior do Paraná.", icon: "hora-sorte-parana-icon", draws: sorteVivaParana() },
]

/** Todas as rotas estáticas de /resultados (lista para generateStaticParams). */
export const resultsPaths = () =>
  RESULT_CATEGORIES.flatMap((c) => [`resultados/${c.slug}`, ...c.draws.map((d) => `resultados/${c.slug}/${d.id}`)])
