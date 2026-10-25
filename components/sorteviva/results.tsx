import Link from "next/link"
import { RESULT_CATEGORIES } from "./results-data"

// Ícone "chevron-right" Font Awesome Free 6 (CC BY 4.0 — https://fontawesome.com/license/free)
const chevron =
  "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"

// /resultados — mesmas medidas de vivasorteoficial.com.br/resultados.
// Cada card leva à página da categoria (/resultados/<slug>/), como na referência.
export function ResultsPage() {
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
          {RESULT_CATEGORIES.map((c) => (
            <li key={c.slug} className="results-item">
              <Link href={`/resultados/${c.slug}/`} className="results-card">
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
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
