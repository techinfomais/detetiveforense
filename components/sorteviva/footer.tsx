import Image from "next/image"
import Link from "next/link"
import { LEGAL } from "./terms"

// Ícones Font Awesome Free 6 (CC BY 4.0 — https://fontawesome.com/license/free)
const socialIcons = {
  instagram: { viewBox: "0 0 448 512", d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" },
  facebook: { viewBox: "0 0 512 512", d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" },
  x: { viewBox: "0 0 512 512", d: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" },
  youtube: { viewBox: "0 0 576 512", d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" },
}

const socialLabels = { instagram: "Instagram", facebook: "Facebook", x: "X", youtube: "YouTube" }

const links = [
  { label: "Termos de Uso", href: "/institucional/termos-de-uso/" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade/" },
  { label: "Perguntas frequentes", href: "/institucional/perguntas-frequentes/" },
  { label: "Jogo Responsável", href: "/institucional/jogo-responsavel/" },
  { label: "Contato", href: "/contato/" },
]

const tel = (phone: string) => `tel:${phone.replace(/\D/g, "")}`

// Rodapé — mesma estrutura e medidas de vivasorteoficial.com.br
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-logo">
          <Image src="/logos/principal-logo.webp" alt="Sorte Viva" width={180} height={23} unoptimized />
        </div>
        <div className="site-footer-about">
          <div className="site-footer-social">
            {(Object.keys(socialIcons) as (keyof typeof socialIcons)[]).map((name) => {
              const { viewBox, d } = socialIcons[name]
              const icon = (
                <svg viewBox={viewBox} width={20} height={16} fill="currentColor" aria-hidden="true">
                  <path d={d} />
                </svg>
              )
              const url = LEGAL.social[name]
              return url ? (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={socialLabels[name]}>
                  {icon}
                </a>
              ) : (
                <span key={name} title={socialLabels[name]}>
                  {icon}
                </span>
              )
            })}
          </div>
          <p className="site-footer-disclaimer">
            Os sorteios da Sorte Viva são títulos de capitalização da modalidade filantropia premiável, de
            pagamento único, emitidos pela {LEGAL.issuer}, CNPJ nº {LEGAL.issuerCnpj}. O subscritor pode ceder
            voluntariamente 100% do direito de resgate à {LEGAL.charity}, CNPJ nº {LEGAL.charityCnpj}. Leia as
            Condições Gerais antes de contratar: a compra implica adesão automática a elas, e o subscritor declara
            conhecê-las. A aprovação do plano pela Susep não representa incentivo ou recomendação de compra por
            parte da Autarquia, apenas sua conformidade com as normas em vigor. É proibida a venda de títulos de
            capitalização a menores de 16 (dezesseis) anos (art. 3º do Código Civil); os títulos da Sorte Viva
            são destinados exclusivamente a maiores de 16 anos. A distribuição é feita pela {LEGAL.company},
            que atua somente como intermediadora entre o subscritor e a sociedade de capitalização.
          </p>
        </div>
        <hr />
        <div className="site-footer-partners">
          <section>
            <span>Títulos emitidos por:</span>
            <Image src="/logos/viapp-logo.webp" alt={LEGAL.issuer} width={131} height={32} unoptimized />
          </section>
          <section>
            <span>Instituição Beneficiada:</span>
            <Image src="/logos/apae-brasil-logo.webp" alt={LEGAL.charity} width={148} height={32} unoptimized />
          </section>
          <section>
            <span>Desenvolvimento:</span>
            <Image
              className="site-footer-dev"
              src="/logos/even-tecnologialogo.png"
              alt="Even Tecnologia"
              width={138}
              height={32}
              unoptimized
            />
          </section>
          <section className="site-footer-seal">
            <Image src="/logos/google-safe-logo.png" alt="Google Safe Browsing" width={125} height={37} unoptimized />
          </section>
        </div>
        <hr />
        <nav className="site-footer-links" aria-label="Links institucionais">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <a href={tel(LEGAL.sacPhone)}>Sac {LEGAL.issuerShort} - {LEGAL.sacPhone}</a>
          <a href={tel(LEGAL.ombudsmanPhone)}>
            Ouvidoria {LEGAL.issuerShort} - {LEGAL.ombudsmanPhone}
          </a>
          <span>
            {LEGAL.company} — {LEGAL.companyCnpj}
          </span>
        </nav>
      </div>
    </footer>
  )
}
