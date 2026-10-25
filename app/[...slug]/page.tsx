import { SorteApp } from "@/components/sorteviva/app"
export const dynamicParams = false
export function generateStaticParams() {
  return [
    "resultados",
    "resultados/viva-sorte",
    "resultados/hora-do-viva",
    "resultados/vivasortedodia",
    "resultados/hora-norte",
    "resultados/hora-centro-oeste",
    "resultados/hora-sudeste",
    "resultados/hora-sul",
    "resultados/hora-nordeste",
    "resultados/vivapr",
    "autenticar",
    "checkout",
    "contato",
    "seja-um-revendedor",
    "seja-um-influenciador",
    "assinaturas",
    "clube-beneficios",
    "usuario/meus-titulos",
    "usuario/perfil",
    "institucional/perguntas-frequentes",
    "institucional/termos-de-uso",
    "institucional/regulamento",
    "institucional/jogo-responsavel",
    "institucional/de-todos",
    "politica-de-privacidade",
  ].map((path) => ({ slug: path.split("/") }))
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  return <SorteApp page={slug.join("/")} />
}
