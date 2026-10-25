"use client"

import { useState } from "react"
import { LEGAL } from "./terms"

// Ícone "caret-right" do Font Awesome Free 6 (CC BY 4.0 — https://fontawesome.com/license/free)
function CaretRight() {
  return (
    <svg className="regulation-caret-icon" viewBox="0 0 256 512" aria-hidden="true" fill="currentColor">
      <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
    </svg>
  )
}

// Sorteios FICTÍCIOS (mesmos nomes de `draws` em app.tsx); a referência lista 7 regulamentos.
const regulations = [
  { name: "Especial de domingo", time: null, date: "25/10/2026", version: "V.120", process: "15414.000120/2026-01" },
  { name: "Hora da sorte", time: "12:30h", date: "26/10/2026", version: "V.11", process: "15414.000311/2026-02" },
  { name: "Noite de milhões", time: "19:30h", date: "26/10/2026", version: "V.12", process: "15414.000312/2026-03" },
  { name: "Sorte em dobro", time: "19:30h", date: "28/10/2026", version: "V.13", process: "15414.000313/2026-04" },
  { name: "Tarde premiada", time: null, date: "29/10/2026", version: "V.07", process: "15414.000207/2026-05" },
  { name: "Sextou com sorte", time: "12:30h", date: "31/10/2026", version: "V.14", process: "15414.000314/2026-06" },
  { name: "Sorte em dobro", time: "19:30h", date: "31/10/2026", version: "V.15", process: "15414.000315/2026-07" },
]

type Regulation = (typeof regulations)[number]

function RegulationText({ reg }: { reg: Regulation }) {
  const product = `${reg.name.toUpperCase()} ${reg.version}`
  return (
    <div>
      <p>
        O {product} é um título de capitalização da modalidade Filantropia Premiável, de pagamento
        único, emitido pela {LEGAL.issuer}, sociedade de capitalização inscrita no CNPJ sob o nº{" "}
        {LEGAL.issuerCnpj}, com sede na {LEGAL.issuerAddress}.{" "}
        <strong>
          Este título é voltado a quem deseja apoiar entidades beneficentes de assistência social
          certificadas na forma da lei e, ao mesmo tempo, participar de sorteios. A entidade
          beneficiada pode custear a divulgação e a promoção das campanhas de arrecadação, como
          permite o art. 3º da Lei nº 14.332/2022.
        </strong>{" "}
        Ao adquirir o {product}, você participa dos sorteios previstos neste título e cede 100% do
        direito de resgate à {LEGAL.charity}, inscrita no CNPJ sob o nº {LEGAL.charityCnpj}, que
        aplicará os recursos em seus projetos e atividades de assistência social, salvo manifestação
        contrária à sociedade de capitalização. O preenchimento correto da ficha de cadastro é
        obrigatório no momento da compra. Antes de contratar, leia as Condições Gerais do título,
        disponíveis na íntegra no site{" "}
        <a href="https://www.susep.gov.br" target="_blank" rel="noopener noreferrer nofollow">
          www.susep.gov.br
        </a>
        . Título aprovado pela Superintendência de Seguros Privados – SUSEP – no Processo SUSEP nº{" "}
        {reg.process}. <strong>1 – SORTEIOS: </strong>O subscritor concorre aos sorteios da
        modalidade “Giro da Sorte”. Cada título traz 1 Número da Sorte, sem repetição na mesma série,
        entre “0.000.000” e “9.999.999”. Na apuração são gerados números aleatórios e distintos no
        mesmo intervalo, e é contemplado o título cujo Número da Sorte coincidir com o número gerado.{" "}
        <strong>
          Os títulos contemplados em qualquer das premiações são resgatados antecipadamente na data
          do respectivo sorteio e deixam de concorrer aos sorteios seguintes. 2 – SÉRIES E
          PROBABILIDADES:
        </strong>{" "}
        Cada série reúne 10.000.000 de títulos, e a probabilidade mínima de contemplação, considerando
        todos os títulos da série, é de uma chance em 10.000.000 em cada sorteio. Da contribuição
        única, 50,00000% vão para a capitalização, formando um capital mínimo de resgate de 50,16013%
        ao fim da vigência; 10,77441% custeiam os sorteios; e a quota de carregamento é de 39,22559%,
        que inclui os custos de promoção e distribuição (1% da contribuição única), podendo haver
        remuneração adicional conforme o desempenho do produto, nos termos do contrato de
        distribuição. <strong>3 – VIGÊNCIA:</strong> 2 meses. <strong>4 – RESGATE:</strong> o valor
        de resgate fica disponível ao titular do direito de resgate após a carência de 2 meses.{" "}
        <strong>5 – DATA, HORA E LOCAL DOS SORTEIOS:</strong> os sorteios são realizados pela{" "}
        {LEGAL.issuer}, acompanhados por auditor independente, no dia e horário indicados neste
        título{reg.time ? ` (${reg.date}, às ${reg.time})` : ` (${reg.date})`}, em local de livre
        acesso aos adquirentes do {product}. <strong>6 – PRÊMIOS:</strong> para receber o prêmio, o
        contemplado deve apresentar o título ou o comprovante de compra no site/aplicativo, RG e CPF
        válidos, comprovante de residência atualizado e dados bancários. Os valores informados já
        são líquidos de imposto de renda, e o pagamento é feito em moeda corrente, em até 15 (quinze)
        dias corridos após a entrega da documentação, em conta de titularidade do subscritor.{" "}
        <strong>7 – DISPOSIÇÕES GERAIS:</strong> a compra implica adesão automática às Condições
        Gerais do título, das quais o subscritor declara ter tomado conhecimento antes da aquisição.
        Os direitos e obrigações deste título prescrevem no prazo previsto em lei. Em caso de
        extravio do título, a responsabilidade é exclusiva do subscritor. Fica eleito o foro do
        domicílio do subscritor para resolver questões relativas a este regulamento. É proibida a
        venda de títulos de capitalização a menores de 16 (dezesseis) anos. A aprovação deste plano
        pela SUSEP não representa incentivo ou recomendação à sua compra, indicando apenas sua
        adequação às normas vigentes. Os dados pessoais coletados na contratação são tratados
        conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Mais informações pelo{" "}
        <strong>SAC: {LEGAL.phone}</strong>.
      </p>
      {/* Na referência, "clicando aqui" abre o PDF das Condições Gerais (externo); sem destino interno ainda. */}
      <p className="regulation-justify">
        Consulte as condições gerais <u>clicando aqui</u>.
      </p>
    </div>
  )
}

export function RegulationPage() {
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const toggle = (i: number) => setOpen((o) => ({ ...o, [i]: !o[i] }))

  return (
    <section className="legal-page container">
      <div className="legal-title">
        <h1>Regulamento</h1>
      </div>
      <div className="regulation-list">
        {regulations.map((reg, i) => {
          const isOpen = !!open[i]
          const label = `${reg.name} - ${reg.time ? `${reg.time} ` : ""}${reg.date}`
          return (
            <div key={label} className="regulation-item">
              <button
                type="button"
                id={`regulation-${i}-header`}
                className={`regulation-header${isOpen ? " is-open" : ""}`}
                aria-expanded={isOpen}
                aria-controls={`regulation-${i}`}
                onClick={() => toggle(i)}
              >
                <span className="regulation-caret">
                  <CaretRight />
                </span>
                <span className="regulation-label">{label}</span>
              </button>
              <div
                id={`regulation-${i}`}
                role="region"
                aria-labelledby={`regulation-${i}-header`}
                className="regulation-panel"
                hidden={!isOpen}
              >
                <div className="regulation-panel-body">
                  <RegulationText reg={reg} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
