// /seja-um-revendedor e /seja-um-influenciador — em construção (serão replicados da referência)
export function PartnerPage({ kind }: { kind: "revendedor" | "influenciador" }) {
  return (
    <section className="partner-page container">
      <h1>{kind === "revendedor" ? "Seja um revendedor" : "Seja um influenciador"}</h1>
    </section>
  )
}
