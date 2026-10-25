import Link from "next/link"

// Ícones Font Awesome Free 6 (CC BY 4.0 — https://fontawesome.com/license/free)
const CART =
  "M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
const CHEVRON_RIGHT =
  "M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
const ANGLES_RIGHT =
  "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"

// Carrinho fixo — mesmo layout e estados de vivasorteoficial.com.br (#cart-button):
// barra inteira no rodapé abaixo de 768px, aba no canto direito a partir de 768px.
export function CartButton({ count, total }: { count: number; total: string }) {
  return (
    <Link
      href="/checkout/"
      className="cart-button"
      aria-label={`Carrinho: ${count} ${count === 1 ? "título" : "títulos"}, ${total}. Ir para o carrinho`}
    >
      <span className="cart-button-inner">
        <span className="cart-button-row">
          <span className="cart-button-icon">
            <svg viewBox="0 0 576 512" width={40} height={32} fill="currentColor" aria-hidden="true">
              <path d={CART} />
            </svg>
            <span className="cart-button-badge">
              <span>{count}</span>
            </span>
          </span>
          <span className="cart-button-total">{total}</span>
          <span className="cart-button-cta">
            Ver carrinho
            <svg viewBox="0 0 384 512" width={20} height={16} fill="currentColor" aria-hidden="true">
              <path d={CHEVRON_RIGHT} />
            </svg>
          </span>
          <span className="cart-button-label">Ir p/ o carrinho</span>
          <span className="cart-button-arrows">
            <svg viewBox="0 0 512 512" width={40} height={32} fill="currentColor" aria-hidden="true">
              <path d={ANGLES_RIGHT} />
            </svg>
          </span>
        </span>
      </span>
    </Link>
  )
}
