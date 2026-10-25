"use client"

/* eslint-disable @next/next/no-img-element -- banners/logos locais (webp) com dimensões fixas, como na referência */
import Link from "next/link"
import { RESULT_CATEGORIES, type Draw, type Prize, type ResultCategory } from "./results-data"

// Ícones Font Awesome Free 6 (users, print, location-dot, trophy) — CC BY 4.0, https://fontawesome.com/license/free
const FA = {
  users: {
    w: 640,
    d: "M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z",
  },
  print: {
    w: 512,
    d: "M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zm-16-88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z",
  },
  pin: {
    w: 384,
    d: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
  },
  trophy: {
    w: 576,
    d: "M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z",
  },
}
// Ícones FA "fixed width": caixa de 1.25em × 1em, desenho centralizado.
function Fa({ icon }: { icon: keyof typeof FA }) {
  const { w, d } = FA[icon]
  return (
    <svg className="rcat-fa" viewBox={`0 0 ${w} 512`} aria-hidden="true" focusable="false">
      <path fill="currentColor" d={d} />
    </svg>
  )
}

// Sem foto do contemplado: ícone de usuário padrão de public/icons.
function Avatar() {
  return <img src="/icons/user.webp" alt="" width={146} height={146} loading="lazy" draggable={false} />
}

const plural = (n: number) => `${n} ${n === 1 ? "contemplado" : "contemplados"}`

export function ResultsCategoryPage({ path }: { path: string }) {
  const [slug, id] = path.replace(/\/+$/, "").split("/")
  const category = RESULT_CATEGORIES.find((c) => c.slug === slug)
  const draw = id ? category?.draws.find((d) => d.id === id) : undefined
  if (!category || (id && !draw)) return <NotFound />
  return draw ? <DrawDetail category={category} draw={draw} /> : <DrawList category={category} />
}

function NotFound() {
  return (
    <div className="rcat-page">
      <div className="container">
        <div className="rcat-bar">
          <h1>Resultados</h1>
        </div>
        <p className="rcat-empty">
          Resultado não encontrado. <Link href="/resultados/">Ver todas as categorias</Link>
        </p>
      </div>
    </div>
  )
}

// /resultados/<categoria> — sorteios agrupados por mês, cada card abre o detalhe.
function DrawList({ category }: { category: ResultCategory }) {
  const months: { key: string; month: string; year: number; draws: Draw[] }[] = []
  for (const d of category.draws) {
    const key = `${d.year}-${d.month}`
    const last = months.at(-1)
    if (last?.key === key) last.draws.push(d)
    else months.push({ key, month: d.month, year: d.year, draws: [d] })
  }
  return (
    <div className="rcat-page">
      <div className="container">
        <div className="rcat-bar">
          <h1>{category.name}</h1>
        </div>
        <div className="rcat-months">
          {months.map((m) => (
            <section key={m.key} className="rcat-month">
              <h2>
                Sorteios de <span>{m.month}</span> de {m.year}
              </h2>
              <ul className="rcat-cards">
                {m.draws.map((d) => (
                  <li key={d.id}>
                    <Link href={`/resultados/${category.slug}/${d.id}/`} className="rcat-card">
                      <span className="rcat-card-media">
                        <img src={d.banner} alt="" width={304} height={171} loading="lazy" />
                        <span className="rcat-card-shade">
                          <span className="rcat-card-title">{d.title}</span>
                          <span className="rcat-card-date">{d.day}</span>
                        </span>
                      </span>
                      <span className="rcat-card-cta">
                        <span>Ver resultados</span>
                        <svg width="16" height="17" fill="none" viewBox="0 0 16 17" aria-hidden="true">
                          <path d="M9.333 3.335 14 8.002m0 0-4.667 4.667M14 8.002H2" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

// /resultados/<categoria>/<sorteio> — cabeçalho do sorteio + prêmios e contemplados.
function DrawDetail({ draw }: { category: ResultCategory; draw: Draw }) {
  const prizes = draw.prizes()
  const total = prizes.reduce((n, p) => n + p.winners.length, 0)
  return (
    <>
      <div className="rcat-detail container">
        <div className="rcat-hero">
          <div className="rcat-hero-media">
            <img src={draw.banner} alt="" />
            <span className="rcat-hero-shade" />
            <div className="rcat-hero-caption">
              <div>
                <small>{draw.long}</small>
                {draw.title}
              </div>
            </div>
          </div>
          <div className="rcat-hero-info">
            <div className="rcat-hero-tags">
              <div className="rcat-edition">
                <span>Edição:</span>
                <span>{draw.edition}</span>
              </div>
              <span className="rcat-hero-count">
                <Fa icon="users" />
                {plural(total)}
              </span>
            </div>
            <div>
              <div className="rcat-hero-heads">
                <h1>{draw.title}</h1>
                <p className="rcat-hero-date">{draw.long}</p>
              </div>
              <p className="rcat-hero-summary">{draw.summary}</p>
            </div>
            <button type="button" className="rcat-print-btn" onClick={() => window.print()}>
              <span className="rcat-print-icon">
                <Fa icon="print" />
              </span>
              <span>Imprimir</span>
            </button>
          </div>
        </div>
        <section className="rcat-prizes" aria-label="Prêmios e contemplados">
          <div className="rcat-prize-list">
            {prizes.map((p, i) => (
              <PrizeBlock key={i} prize={p} />
            ))}
          </div>
        </section>
      </div>
      <PrintSheet draw={draw} prizes={prizes} />
    </>
  )
}

function PrizeBlock({ prize }: { prize: Prize }) {
  return (
    <div className="rcat-prize">
      <div className="rcat-prize-head">
        <div className="rcat-prize-row">
          <div className="rcat-prize-text">
            <h2>{prize.title}</h2>
            <div className="rcat-prize-pills">
              <span className="rcat-pill">
                <Fa icon="users" />
                {plural(prize.winners.length)}
              </span>
            </div>
          </div>
          {prize.balls && (
            <div className="rcat-balls">
              <span className="rcat-balls-label">Dezenas sorteadas</span>
              <ol className="rcat-balls-grid" aria-label="Dezenas sorteadas">
                {prize.balls.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
      <ul className="rcat-winners">
        {prize.winners.map((w, i) => (
          <li key={i} className="rcat-winner">
            <div className="rcat-winner-top">
              <h3>{w.name}</h3>
              <div className="rcat-chips">
                <span className="rcat-chip">
                  <Fa icon="pin" />
                  {w.city}
                </span>
                {w.prize && (
                  <span className="rcat-chip rcat-chip-prize">
                    <Fa icon="trophy" />
                    {w.prize}
                  </span>
                )}
              </div>
            </div>
            <div className="rcat-avatar">
              <Avatar />
            </div>
            <div className="rcat-lucky">
              <span className="rcat-lucky-label">Número da sorte</span>
              <div className="rcat-lucky-number">{w.number}</div>
              {w.seller && (
                <div className="rcat-seller">
                  <div>Revendido por</div>
                  <span>{w.seller}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Versão para impressão (só aparece em @media print), como o "Imprimir" da referência.
function PrintSheet({ draw, prizes }: { draw: Draw; prizes: Prize[] }) {
  return (
    <div className="rcat-print" aria-hidden="true">
      <header>
        <img src="/logos/principal-logo.webp" alt="Viva Sorte" width={100} height={13} />
        <div>
          <p className="rcat-print-title">{draw.title}</p>
          <p className="rcat-print-sub">Resultados</p>
        </div>
        <img src="/logos/viapp-logo.webp" alt="" width={100} height={24} />
      </header>
      {prizes.map((p, i) => (
        <div key={i} className="rcat-print-group">
          <p className="rcat-print-prize">{p.title}</p>
          {p.balls && (
            <div className="rcat-print-balls">
              {p.balls.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>N.º</th>
                <th style={{ width: "35%" }}>Nome</th>
                <th style={{ width: "30%" }}>Cidade / Estado</th>
                <th style={{ width: "25%" }}>Revendedor</th>
              </tr>
            </thead>
            <tbody>
              {p.winners.map((w, j) => (
                <tr key={j}>
                  <td>{w.number}</td>
                  <td>{w.name}</td>
                  <td>{w.city}</td>
                  <td>{w.seller ?? "Não informado"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
