import Link from "next/link"
import type { ReactNode } from "react"

// Dados societários FICTÍCIOS — substituir pelos oficiais antes do lançamento.
export const LEGAL = {
  company: "SORTE VIVA INTERMEDIAÇÃO DIGITAL LTDA.",
  companyCnpj: "12.345.678/0001-90",
  companyAddress:
    "Rua das Palmeiras, 100, sala 1, Centro, na cidade de São Paulo, Estado de São Paulo, CEP 01000-000",
  issuer: "CAPITALIZADORA EXEMPLO S/A",
  issuerCnpj: "98.765.432/0001-10",
  issuerAddress: "Av. Exemplo, 200, conjunto 10, Centro, CEP 20000-000, Rio de Janeiro/RJ",
  charity: "INSTITUIÇÃO BENEFICENTE PARCEIRA",
  charityCnpj: "11.222.333/0001-44",
  phone: "0800 000 0000",
  supportPhone: "(11) 4000-0000",
  whatsapp: "5511900000000",
  email: "contato@exemplo.com.br",
  updatedAt: "Outubro/2026",
}

const { company, companyCnpj, issuer, issuerCnpj, charity, charityCnpj } = LEGAL
const BRAND = "SORTE VIVA"

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "APRESENTAÇÃO",
    body: (
      <>
        {company}, pessoa jurídica de direito privado inscrita no CNPJ sob o nº {companyCnpj},
        com sede na {LEGAL.companyAddress}, doravante denominada “{BRAND}”, “nós” ou “nosso”. -
        Seja bem-vindo à {BRAND}. Este documento estabelece as regras para o uso do nosso site e
        aplicativo, e o seu aceite significa que o USUÁRIO/SUBSCRITOR concorda com todas as
        condições aqui descritas. Recomendamos a leitura atenta deste termo, pois a simples
        utilização dos nossos serviços implica a aceitação imediata do seu conteúdo. Os serviços
        são destinados exclusivamente a pessoas maiores de 16 anos. Caso você não tenha capacidade
        civil para contratar ou não concorde com qualquer disposição deste termo, interrompa o uso
        do site/aplicativo. Ao contratar, o SUBSCRITOR declara concordar expressamente com a
        cessão do direito de resgate do título de capitalização da modalidade filantropia
        premiável em favor da {charity}.
      </>
    ),
  },
  {
    title: `DIREITOS AUTORAIS E GARANTIAS DA ${BRAND}`,
    body: (
      <>
        Salvo indicação expressa em contrário, todo o conteúdo disponibilizado no site, no
        aplicativo e nos serviços relacionados, incluindo textos, imagens, marcas e demais
        materiais, é de propriedade da {BRAND} e está protegido pela legislação aplicável. A
        utilização sem autorização sujeita o infrator às sanções previstas em lei.
      </>
    ),
  },
  {
    title: "POLÍTICAS DO SITE E APP",
    body: (
      <>
        Ao se cadastrar e/ou realizar um pagamento por meio dos serviços da {BRAND}, o
        USUÁRIO/SUBSCRITOR declara que leu e aceitou, integralmente e sem ressalvas, este termo de
        uso e a política de privacidade. - O USUÁRIO/SUBSCRITOR se obriga a cumprir as regras deste
        instrumento e as demais normas operacionais e de segurança definidas pela {BRAND}. - Os
        dados informados no cadastro devem ser completos, verdadeiros e mantidos atualizados. - No
        momento do cadastro, o USUÁRIO deverá aceitar este termo e declarar ter mais de 16
        (dezesseis) anos. A participação de menores de 16 (dezesseis) anos não é permitida e, se
        constatada, o cadastro será cancelado imediatamente. - O uso dos serviços em dispositivos
        móveis requer aparelho compatível com Android 4.0.3 ou iOS 11.0, ou versões superiores,
        cabendo ao SUBSCRITOR observar as regras das operadoras e dos fabricantes. A {BRAND} não
        garante a compatibilidade com todos os aparelhos. - Como nenhum sistema de informática ou
        telecomunicações pode assegurar funcionamento contínuo 24 (vinte e quatro) horas por dia,
        365 (trezentos e sessenta e cinco) dias por ano, a {BRAND} não garante que os serviços
        estarão livres de interrupções, erros ou indisponibilidades, e não responde por falhas no
        processamento de pagamentos causadas por instabilidades de internet alheias ao seu
        controle.
      </>
    ),
  },
  {
    title: "RESUMO DAS CONDIÇÕES GERAIS DO TÍTULO DE CAPITALIZAÇÃO",
    body: (
      <>
        Este é um resumo das Condições Gerais do Título de Capitalização de Pagamento Único da
        Modalidade Filantropia Premiável, aprovado pela Superintendência de Seguros Privados -
        SUSEP e emitido pela {issuer} (CNPJ nº {issuerCnpj}, com sede na {LEGAL.issuerAddress}). O
        título é indicado sobretudo ao consumidor que deseja contribuir com a {charity}, inscrita
        no CNPJ sob o nº {charityCnpj}, entidade beneficente de assistência social certificada nos
        termos da legislação vigente, e concorrer a sorteio(s). Os sorteios seguem a Resolução
        CNSP (Conselho Nacional de Seguros Privados) nº 384, de 09/06/2020, e as Circulares SUSEP
        - Superintendência de Seguros Privados nºs 607/2020, 612/2020 e 656/2022. O direito de
        resgate somente poderá ser exercido após 60 (sessenta) dias contados da data de aquisição
        do título. O texto integral das Condições Gerais está disponível neste site. GLOSSÁRIO: a)
        Subscritor: quem adquire o Título de Capitalização e assume o compromisso de pagar a sua
        contribuição (você é o Subscritor); b) Titular do direito de resgate: o próprio subscritor
        ou a pessoa por ele expressamente indicada; c) Titular do direito de sorteio: o próprio
        subscritor; d) Cedente: o subscritor que, conforme as Condições Gerais, cede 100% do
        direito de resgate à {charity}; e) Cessionária: a {charity}, entidade certificada que
        recebe o valor do direito de resgate cedido. Havendo mais de um contemplado para o mesmo
        prêmio, o valor será pago exclusivamente em dinheiro e dividido em partes iguais. Para
        receber o prêmio, o USUÁRIO/SUBSCRITOR contemplado deverá apresentar RG, CPF ativo,
        comprovante de residência emitido há menos de 180 dias e dados bancários. A {issuer}
        efetuará o pagamento em até 15 (quinze) dias corridos após o recebimento da documentação
        completa, por crédito (TED) em conta de titularidade do contemplado. Os sorteios são
        realizados pela {issuer}, acompanhados por auditoria independente, em local aberto ao
        público, na data, hora e local indicados no Título de Capitalização. A aprovação do Título
        de Capitalização pela SUSEP não representa incentivo ou recomendação da Autarquia à sua
        aquisição, indicando apenas sua conformidade com a legislação em vigor. Os direitos e
        obrigações do Título de Capitalização prescrevem no prazo legal, atualmente de cinco anos.
        Ao adquirir o título, o Subscritor autoriza, sem ônus, o uso do seu nome, voz e imagem na
        divulgação da campanha. INFORMAÇÕES: {LEGAL.phone}.
      </>
    ),
  },
  {
    title: "POLÍTICA DE SEGURANÇA - COLETANDO INFORMAÇÕES SOBRE VOCÊ",
    body: (
      <>
        Para personalizar a sua experiência, o site/aplicativo coleta algumas informações sobre o
        usuário, que também são utilizadas para acompanhar o desempenho e aprimorar os serviços. A
        {" "}{BRAND} mantém essas informações em sigilo e segurança, podendo compartilhá-las apenas:
        (i) para atender a requisições de autoridades policiais, do Poder Judiciário ou de órgãos
        da Administração Pública, Direta ou Indireta; e (ii) com empresas do mesmo grupo
        econômico, para apresentar ao usuário seus produtos e/ou serviços, quando houver
        autorização. - O usuário está ciente e autoriza a coleta dos dados que nos fornece, como
        nome, e-mail, endereço, telefones, informações financeiras e bancárias, dados de cartões
        de crédito ou débito, dados de contato e de localização. - Os colaboradores que atuam em
        nossos sistemas de informação têm o dever de manter a confidencialidade dos dados, sem
        prejuízo da divulgação de informações razoavelmente necessárias para fazer valer estes
        termos e serviços. - Utilizamos diferentes tecnologias de coleta, inclusive cookies,
        arquivos gravados no seu dispositivo que armazenam preferências e identificação, e web
        beacons, que nos ajudam a contabilizar acessos, medir o desempenho de campanhas de
        marketing e verificar a abertura de e-mails. Os dados coletados pela {BRAND} são
        transmitidos e armazenados com segurança, por meio de criptografia. Consulte nossa
        Política de Privacidade em{" "}
        <Link href="/politica-de-privacidade/">/politica-de-privacidade</Link>
      </>
    ),
  },
  {
    title: `LIMITE DE RESPONSABILIDADE ${BRAND}`,
    body: (
      <>
        Nenhuma disposição destes termos exclui ou limita a responsabilidade da {BRAND} pelos
        serviços prestados e produtos comercializados naquilo em que a lei não permita exclusão
        ou limitação. Dessa forma, aplicam-se ao USUÁRIO/SUBSCRITOR apenas as limitações e
        exclusões admitidas pelo ordenamento jurídico, ficando a nossa responsabilidade restrita
        aos limites legais.
      </>
    ),
  },
  {
    title: "REMUNERAÇÃO E PROCESSAMENTO DOS PAGAMENTOS",
    body: (
      <>
        O USUÁRIO/SUBSCRITOR concorda em pagar à {BRAND} o valor de cada transação, debitado ou
        faturado no cartão de débito ou crédito cadastrado, sempre que confirmar a aquisição do
        título de capitalização e a cessão do direito de resgate em favor da {charity}. - O valor
        cobrado será sempre exibido de forma clara e detalhada. Os pagamentos são destinados
        exclusivamente ao CNPJ {companyCnpj} – {company} ou à {issuer}, CNPJ nº {issuerCnpj}. -
        Para concluir a operação, o USUÁRIO deverá autorizar o pagamento do valor do título. Se o
        destinatário ou beneficiário do pagamento for qualquer outro, não conclua a operação e
        denuncie a conta em nossos canais oficiais. - As formas de pagamento aceitas estão
        listadas neste site, e a {BRAND} pode incluir ou excluir bandeiras a seu critério. Ao
        pagar com cartão de crédito ou débito, você se compromete a consultar as condições do
        emissor do seu cartão sobre responsabilidade em caso de perda, roubo ou uso não
        autorizado, bem como sobre limites de crédito e de uso. Você se compromete, ainda, a não
        utilizar cartão de crédito que não esteja em seu nome.
      </>
    ),
  },
  {
    title: "RESPONSABILIDADE DO USUÁRIO",
    body: (
      <>
        É proibido ao USUÁRIO/SUBSCRITOR copiar ou distribuir o software da {BRAND}, utilizar
        trechos, imagens ou qualquer outro conteúdo audiovisual, aplicar técnicas de engenharia
        reversa para desenvolver ou criar outros trabalhos ou analisar sua estrutura,
        disponibilizar o acesso em qualquer endereço da internet, divulgar arquivos sem
        autorização e conceder acesso a terceiros de forma ilícita.
      </>
    ),
  },
  {
    title: "POLÍTICA DE CANCELAMENTO E REEMBOLSO",
    body: (
      <>
        A {BRAND} atua como intermediadora na venda dos títulos de capitalização da modalidade
        filantropia premiável, recebendo as contribuições em nome do USUÁRIO e repassando-as à
        {" "}{issuer}, que é responsável por transferir os valores de resgate à {charity},
        conforme a vontade expressa do USUÁRIO/SUBSCRITOR. Como o título está vinculado ao
        sorteio de prêmios entre os subscritores, o pedido de cancelamento somente será aceito
        até 60 (sessenta) minutos antes da realização do sorteio; após esse momento, o serviço é
        considerado integralmente prestado, não cabendo direito de arrependimento. - Assim, nos
        pedidos de cancelamento anteriores ao sorteio, feitos diretamente à {BRAND} ou à
        administradora do cartão de crédito/débito (chargeback), as regras e os prazos de
        devolução serão os definidos pela administradora do cartão, sem responsabilidade da
        {" "}{BRAND} pela restituição. – Jogos instantâneos já executados e consumidos pelo USUÁRIO
        não podem ser cancelados. Ao solicitar o cancelamento, o USUÁRIO/SUBSCRITOR declara estar
        ciente de que o título adquirido deixará de participar do sorteio.
      </>
    ),
  },
  {
    title: "SOBRE ESTES TERMOS: MUDANÇAS E ATUALIZAÇÕES",
    body: (
      <>
        Este termo poderá ser alterado em razão de mudanças na legislação ou nos serviços
        prestados, e a {BRAND} se compromete a divulgar amplamente as alterações em seus canais de
        comunicação, inclusive por meio de avisos no site e/ou aplicativo. Recomendamos que você
        consulte este termo periodicamente. As alterações não atingirão serviços já em vigor,
        preservando-se as contratações realizadas. A data da última atualização está indicada ao
        final deste documento. O uso contínuo do site e/ou aplicativo {BRAND} representa a
        aceitação das condições modificadas; caso não concorde, interrompa o uso dos serviços a
        que este termo se refere. Este instrumento é regido e interpretado de acordo com a
        legislação brasileira. Em caso de dúvidas, fale conosco pelo e-mail{" "}
        <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> ou pela página de contato:{" "}
        <Link href="/contato/">/contato</Link>
      </>
    ),
  },
]

export function TermsOfUse() {
  return (
    <section className="legal-page container">
      <div className="legal-title">
        <h1>Termos de uso</h1>
      </div>
      <div className="legal-body">
        {sections.map((s, i) => (
          <div key={s.title} className="legal-section">
            {i > 0 && <p aria-hidden="true">&nbsp;</p>}
            <p>{s.title}</p>
            <p>{s.body}</p>
          </div>
        ))}
        <p aria-hidden="true">&nbsp;</p>
        <p>{LEGAL.updatedAt}</p>
      </div>
    </section>
  )
}
