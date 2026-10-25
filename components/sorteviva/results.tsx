"use client"

import { useState } from "react"

// Ícone "chevron-right" Font Awesome Free 6 (CC BY 4.0 — https://fontawesome.com/license/free)
const chevron =
  "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"

type Result = { draw: string; edition: string; date: string; numbers: number[] }

// Resultados fictícios, apenas demonstrativos.
const n = (...v: number[]) => v
const regional = (region: string, base: number): Result[] => [
  { draw: `Hora ${region}`, edition: String(base), date: "24/10/2026", numbers: n(4, 11, 19, 27, 33, 48) },
  { draw: `Hora ${region}`, edition: String(base - 1), date: "23/10/2026", numbers: n(2, 15, 21, 30, 41, 57) },
  { draw: `Hora ${region}`, edition: String(base - 2), date: "22/10/2026", numbers: n(7, 13, 26, 35, 44, 59) },
]

const categories: {
  slug: string
  name: string
  text: string
  icon: string
  results: Result[]
}[] = [
  {
    slug: "sorte-viva",
    name: "Sorte Viva",
    text: "Sorteios Filantropia Premiável",
    icon: "hora-sorte-logo-icon",
    results: [
      { draw: "Especial de domingo", edition: "011", date: "18/10/2026", numbers: n(3, 9, 14, 22, 38, 51) },
      { draw: "Sextou com sorte", edition: "013", date: "23/10/2026", numbers: n(6, 17, 25, 31, 46, 58) },
      { draw: "Sorte em dobro", edition: "012", date: "21/10/2026", numbers: n(1, 12, 20, 29, 40, 55) },
    ],
  },
  {
    slug: "hora-da-sorte",
    name: "Hora da Sorte",
    text: "Sorteios Filantropia Premiável",
    icon: "hora-sorte-relogio-icon",
    results: [
      { draw: "Noite de milhões", edition: "3176", date: "24/10/2026", numbers: n(5, 18, 23, 34, 42, 60) },
      { draw: "Tarde premiada", edition: "3175", date: "24/10/2026", numbers: n(8, 10, 24, 37, 45, 53) },
      { draw: "Hora da sorte", edition: "3174", date: "24/10/2026", numbers: n(2, 16, 28, 32, 47, 56) },
    ],
  },
  {
    slug: "sorte-viva-do-dia",
    name: "Sorte Viva do Dia",
    text: "Multiplique o valor pago em até 100.000x",
    icon: "hora-sorte-calendario-icon",
    results: [
      { draw: "Sorte Viva do Dia", edition: "298", date: "24/10/2026", numbers: n(11, 14, 27, 39, 43, 52) },
      { draw: "Sorte Viva do Dia", edition: "297", date: "23/10/2026", numbers: n(1, 9, 21, 36, 49, 58) },
      { draw: "Sorte Viva do Dia", edition: "296", date: "22/10/2026", numbers: n(6, 13, 22, 30, 44, 50) },
    ],
  },
  {
    slug: "hora-norte",
    name: "Hora Norte",
    text: "Muito dinheiro somente para a região Norte do Brasil!",
    icon: "hora-sorte-norte-icon",
    results: regional("Norte", 412),
  },
  {
    slug: "hora-centro-oeste",
    name: "Hora Centro-Oeste",
    text: "Muito dinheiro somente para a região Centro-Oeste do Brasil!",
    icon: "hora-sorte-centrooeste-icon",
    results: regional("Centro-Oeste", 388),
  },
  {
    slug: "hora-sudeste",
    name: "Hora Sudeste",
    text: "Muito dinheiro somente para a região Sudeste do Brasil!",
    icon: "hora-sorte-sudeste-icon",
    results: regional("Sudeste", 405),
  },
  {
    slug: "hora-sul",
    name: "Hora Sul",
    text: "Muito dinheiro somente para a região Sul do Brasil!",
    icon: "hora-sorte-sul-icon",
    results: regional("Sul", 397),
  },
  {
    slug: "hora-nordeste",
    name: "Hora Nordeste",
    text: "Muito dinheiro somente para a região Nordeste do Brasil!",
    icon: "hora-sorte-nordeste-icon",
    results: regional("Nordeste", 420),
  },
  {
    slug: "sorte-viva-parana",
    name: "Sorte Viva Paraná",
    text: "O título de capitalização somente para o interior do Paraná.",
    icon: "hora-sorte-parana-icon",
    results: [
      { draw: "Sorte Viva Paraná", edition: "087", date: "18/10/2026", numbers: n(4, 12, 26, 33, 41, 57) },
      { draw: "Sorte Viva Paraná", edition: "086", date: "11/10/2026", numbers: n(7, 15, 19, 35, 48, 54) },
      { draw: "Sorte Viva Paraná", edition: "085", date: "04/10/2026", numbers: n(3, 10, 23, 31, 46, 60) },
    ],
  },
]

// /resultados — mesmas medidas de vivasorteoficial.com.br/resultados
export function ResultsPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-bar">
          <h1>Resultados</h1>
        </div>
      </div>
      <section className="container results-intro">
        Selecione uma categoria abaixo para visualizar os resultados dos sorteios.
        <ul className="results-list">
          {categories.map((c) => {
            const expanded = open === c.slug
            return (
              <li key={c.slug} className="results-item">
                <button
                  type="button"
                  className="results-card"
                  aria-expanded={expanded}
                  aria-controls={`results-${c.slug}`}
                  onClick={() => setOpen(expanded ? null : c.slug)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/icons/${c.icon}.webp`} alt="" width={48} height={48} />
                  <span className="results-text">
                    <strong>{c.name}</strong>
                    <small>{c.text}</small>
                  </span>
                  <span className="results-chevron">
                    <svg viewBox="0 0 320 512" width={20} height={16} aria-hidden="true" fill="currentColor">
                      <path d={chevron} />
                    </svg>
                  </span>
                </button>
                {expanded && (
                  <div id={`results-${c.slug}`} className="results-panel">
                    {c.results.map((r) => (
                      <div key={r.draw + r.edition} className="results-row">
                        <div>
                          <strong>{r.draw}</strong>
                          <small>
                            Edição {r.edition} · {r.date}
                          </small>
                        </div>
                        <ol className="results-numbers" aria-label="Números sorteados">
                          {r.numbers.map((num) => (
                            <li key={num}>{String(num).padStart(2, "0")}</li>
                          ))}
                        </ol>
                      </div>
                    ))}
                    <p className="results-note">Resultados fictícios, apenas para demonstração.</p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
