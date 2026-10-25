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

// Beneficiárias citadas nos regulamentos oficiais (vivasorteoficial.com.br/institucional/regulamento)
const CHARITIES = {
  apae: {
    name: "APAE BRASIL - FEDERAÇÃO NACIONAL DAS APAES",
    cnpj: "62.388.566/0001-90",
    address: "ST SDS Bloco Q, Ed. Venâncio IV, 44, Cobertura, Asa Sul – Brasília/DF, CEP 70.393-903",
    site: "www.apaebrasil.org.br",
  },
  hcl: {
    name: "HOSPITAL DO CÂNCER DE LONDRINA - HCL",
    cnpj: "78.633.088/0001-76",
    address: "Rua Lucilla Ballalai, 212, Jardim Petrópolis, Londrina/PR, CEP 86.015-520",
    site: "hcl.org.br",
  },
}

const LONDRINA = "Av. Maringá, nº 1765, Bairro Vitória, Londrina/PR – Sala Hora do Viva"

type Regulation = {
  name: string
  time: string | null
  date: string
  // item sem regulamento próprio: a referência mostra só a tabela de prêmios
  prizesOnly?: string
  product?: string
  version?: string
  process?: string
  charity?: keyof typeof CHARITIES
  series?: string
  capitalization?: string
  redemption?: string
  draw?: string
  loading?: string
  globo?: { numbers: number; max: number }
  giro?: boolean
  place?: string
  law?: boolean
  terms?: string
}

// Regulamentos oficiais vigentes (dados da referência; texto redigido para o app)
const regulations: Regulation[] = [
  { name: "Hora do Viva", time: "12:30h", date: "26/10/2026", product: "HORA DO VIVA", version: "V.11", process: "15414.630293/2023-64", charity: "apae", series: "800.000", capitalization: "50,00000%", redemption: "50,16013%", draw: "1,02041%", loading: "48,97959%", globo: { numbers: 20, max: 60 }, giro: true, place: LONDRINA },
  { name: "Hora do Viva", time: "19:30h", date: "26/10/2026", product: "HORA DO VIVA", version: "V.12", process: "15414.630294/2023-17", charity: "apae", series: "800.000", capitalization: "50,00000%", redemption: "50,16013%", draw: "0,84175%", loading: "49,15825%", globo: { numbers: 20, max: 60 }, giro: true, place: LONDRINA },
  { name: "Hora do Rico", time: "19:30h", date: "28/10/2026", prizesOnly: "1º PRÊMIO - R$ 1.000,00 / 2º PRÊMIO - R$ 1.000,00 / 3º PRÊMIO - R$ 1.000,00 / 4º PRÊMIO R$ 5.000,00 + 20 PIX DE R$ 100,00" },
  { name: "Viva Sorte do Dia", time: null, date: "29/10/2026", product: "VIVA SORTE DO DIA", version: "V.02", process: "15414.652752/2025-22", charity: "apae", series: "8.000.000", capitalization: "49,17667%", redemption: "49,33416%", draw: "1,66667%", loading: "49,15666%", globo: { numbers: 7, max: 75 }, place: LONDRINA, law: true },
  { name: "Especial de Graça", time: "12:30h", date: "31/10/2026", product: "HORA DO VIVA", version: "V.63", process: "15414.601883/2026-22", charity: "hcl", series: "10.000.000", capitalization: "50,00000%", redemption: "50,16013%", draw: "0,80000%", loading: "49,20000%", globo: { numbers: 20, max: 60 }, giro: true, place: LONDRINA, law: true },
  { name: "Hora do Rico", time: "19:30h", date: "31/10/2026", product: "HORA DO VIVA", version: "V.62", process: "15414.601884/2026-77", charity: "hcl", series: "10.000.000", capitalization: "50,00000%", redemption: "50,16013%", draw: "1,33333%", loading: "48,66667%", globo: { numbers: 20, max: 60 }, giro: true, place: LONDRINA, law: true },
  { name: "Viva Sorte", time: null, date: "01/11/2026", product: "VIVA SORTE", version: "V.120", process: "15414.652415/2026-16", charity: "apae", series: "10.000.000", capitalization: "50,00000%", redemption: "50,16013%", draw: "10,77441%", loading: "39,22559%", giro: true, place: "Rua Carlos Cyrillo Júnior, 92 – Morumbi, São Paulo/SP – Rede Bandeirantes", law: true, terms: "https://drive.google.com/file/d/1nuXTC5Hh7aoTwedlm_22phHayhrq8Ucv/view?usp=drive_link" },
]

// SAC e Ouvidoria informados nos regulamentos da emissora
const REG_SAC = "0800 740 7819"
const REG_OMBUDSMAN = "0800 874 1505"

function RegulationText({ reg }: { reg: Regulation }) {
  if (reg.prizesOnly) return <p>{reg.prizesOnly}</p>
  const product = `${reg.product} ${reg.version}`
  const charity = CHARITIES[reg.charity!]
  const modes = [reg.globo && "“Globo da Sorte”", reg.giro && "“Giro da Sorte”"].filter(Boolean).join(" e ")
  return (
    <div>
      <p>
        O {product} é um título de capitalização da modalidade Filantropia Premiável, de pagamento
        único, emitido pela {LEGAL.issuer} (VIACAP), sociedade de capitalização inscrita no CNPJ sob o
        nº {LEGAL.issuerCnpj}, com sede na {LEGAL.issuerAddress}.{" "}
        <strong>
          Este título é voltado a quem deseja apoiar entidades beneficentes de assistência social
          certificadas na forma da lei e, ao mesmo tempo, participar de sorteios.
          {reg.law &&
            " A entidade beneficiada pode custear a divulgação e a promoção das campanhas de arrecadação, como permite o art. 3º da Lei nº 14.332/2022."}
        </strong>{" "}
        Ao adquirir o {product}, você participa dos sorteios previstos neste título e cede 100% do
        direito de resgate à {charity.name}, entidade filantrópica inscrita no CNPJ sob o nº{" "}
        {charity.cnpj}, com sede na {charity.address}, que aplicará os recursos em seus projetos e
        atividades de assistência social (
        <a href={`http://${charity.site}/`} target="_blank" rel="noopener noreferrer">
          {charity.site}
        </a>
        ), salvo manifestação contrária à sociedade de capitalização. O preenchimento correto da
        ficha de cadastro é obrigatório no momento da compra. Antes de contratar, leia as Condições
        Gerais do título, disponíveis na íntegra no site{" "}
        <a href="http://www.susep.gov.br/" target="_blank" rel="noopener noreferrer">
          www.susep.gov.br
        </a>
        . Título aprovado pela Superintendência de Seguros Privados – SUSEP – no Processo SUSEP nº{" "}
        {reg.process}. <strong>1 – SORTEIOS: </strong>o subscritor concorre aos sorteios da
        modalidade {modes}.
        {reg.globo &&
          ` No “Globo da Sorte”, cada título traz 1 conjunto de ${reg.globo.numbers} dezenas aleatórias, sem repetição no mesmo conjunto, entre 01 e ${reg.globo.max}; as bolas são extraídas de um globo até que um ou mais títulos tenham todas as suas dezenas sorteadas, e o prêmio é dividido em partes iguais entre os títulos contemplados.`}
        {reg.giro &&
          " No “Giro da Sorte”, cada título traz 1 Número da Sorte, sem repetição na mesma série, entre “0.000.000” e “9.999.999”; na apuração são gerados números aleatórios e distintos no mesmo intervalo, e é contemplado o título cujo Número da Sorte coincidir com o número gerado."}{" "}
        <strong>
          Os títulos contemplados em qualquer das premiações são resgatados antecipadamente na data
          do respectivo sorteio e deixam de concorrer aos sorteios seguintes. 2 – SÉRIES E
          PROBABILIDADES:
        </strong>{" "}
        cada série reúne {reg.series} de títulos, e a probabilidade mínima de contemplação,
        considerando todos os títulos da série, é de uma chance em {reg.series} em cada sorteio. Da
        contribuição única, {reg.capitalization} vão para a capitalização, formando um capital mínimo
        de resgate de {reg.redemption} ao fim da vigência; {reg.draw} custeiam os sorteios; e a quota
        de carregamento é de {reg.loading}, que inclui os custos de promoção e distribuição.{" "}
        <strong>3 – VIGÊNCIA:</strong> 2 meses. <strong>4 – RESGATE:</strong> o valor de resgate fica
        disponível ao titular do direito de resgate após a carência de 2 meses.{" "}
        <strong>5 – DATA, HORA E LOCAL DOS SORTEIOS:</strong> os sorteios são realizados pela ViaCap,
        na presença de auditor independente, na {reg.place}, no dia e horário indicados neste título
        {reg.time ? ` (${reg.date}, às ${reg.time})` : ` (${reg.date})`}. O local é de livre acesso aos
        adquirentes do {product}. <strong>6 – PRÊMIOS:</strong> para receber o prêmio, o contemplado
        deve apresentar o título ou o comprovante de compra no site/aplicativo, RG e CPF válidos,
        comprovante de residência atualizado e dados bancários. Os valores informados já são
        líquidos de imposto de renda, e o pagamento é feito em moeda corrente, em até 15 (quinze)
        dias corridos após a entrega da documentação, em conta de titularidade do subscritor.{" "}
        <strong>7 – DISPOSIÇÕES GERAIS:</strong> a compra implica adesão automática às Condições
        Gerais do título, das quais o subscritor declara ter tomado conhecimento antes da aquisição.
        Os direitos e obrigações deste título prescrevem no prazo previsto em lei. É proibida a venda
        de títulos de capitalização a menores de 16 (dezesseis) anos. A aprovação deste plano pela
        SUSEP não representa incentivo ou recomendação à sua compra, indicando apenas sua adequação
        às normas vigentes. Os dados pessoais coletados na contratação são tratados conforme a Lei
        Geral de Proteção de Dados (Lei nº 13.709/2018). Mais informações pelo{" "}
        <strong>SAC: {REG_SAC}</strong>. <strong>OUVIDORIA: {REG_OMBUDSMAN}</strong>.
      </p>
      {reg.terms && (
        <p className="regulation-justify">
          Consulte as condições gerais{" "}
          <a href={reg.terms} target="_blank" rel="noopener noreferrer">
            clicando aqui.
          </a>
        </p>
      )}
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
