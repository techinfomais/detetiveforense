import type { Metadata } from "next"
import { Ubuntu } from "next/font/google"
import "./globals.css"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
})

export const metadata: Metadata = {
  title: "Sorte Viva - Mude de vida agora!",
  description:
    "Explore sorteios e confira resultados. Plataforma demonstrativa.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={ubuntu.variable}>
      <body>{children}</body>
    </html>
  )
}
