// /resultados/<categoria> — em construção (será replicado da referência)
export function ResultsCategoryPage({ path }: { path: string }) {
  return (
    <section className="results-category container">
      <h1>{path}</h1>
    </section>
  )
}
