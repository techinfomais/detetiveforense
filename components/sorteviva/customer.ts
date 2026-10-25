// Dados do cliente usados no checkout: máscaras, validações e persistência no navegador.
// Tudo é validado de novo ao ler do localStorage — o valor salvo pode estar desatualizado,
// incompleto ou ter sido editado à mão.
import { isValidCpf, maskCpf, onlyDigits } from "./checkout-identify"

export { isValidCpf, maskCpf }

const digits = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max)

/* ---------------- máscaras ---------------- */

export function maskPhone(v: string) {
  const d = digits(v, 11)
  if (!d) return ""
  if (d.length <= 2) return `(${d}`
  const rest = d.slice(2)
  const split = d.length === 11 ? 5 : 4
  return rest.length > split
    ? `(${d.slice(0, 2)}) ${rest.slice(0, split)}-${rest.slice(split)}`
    : `(${d.slice(0, 2)}) ${rest}`
}

export function maskDate(v: string) {
  return digits(v, 8)
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
}

export function maskCpfCnpj(v: string) {
  const d = digits(v, 14)
  if (d.length <= 11) return maskCpf(d)
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
}

export function maskCep(v: string) {
  return digits(v, 8)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,3})$/, "$1-$2")
}

/* ---------------- validações (retornam a mensagem de erro, ou "" se válido) ---------------- */

export const MIN_AGE = 16

// DDDs em uso no Brasil (Anatel)
const DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44,
  45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81,
  82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
])

export function cpfError(v: string) {
  const d = onlyDigits(v)
  if (!d) return "Informe o seu CPF."
  if (d.length < 11) return "O CPF deve ter 11 dígitos."
  return isValidCpf(d) ? "" : "CPF inválido. Confira os números digitados."
}

export function isValidCnpj(v: string) {
  const d = digits(v, 14)
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false
  const calc = (len: number) => {
    const weights = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const sum = weights.reduce((s, w, i) => s + Number(d[i]) * w, 0)
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }
  return calc(12) === Number(d[12]) && calc(13) === Number(d[13])
}

export function cpfCnpjError(v: string) {
  const d = digits(v, 14)
  if (!d) return "Informe o seu CPF ou CNPJ."
  if (d.length === 11) return isValidCpf(d) ? "" : "CPF inválido. Confira os números digitados."
  if (d.length === 14) return isValidCnpj(d) ? "" : "CNPJ inválido. Confira os números digitados."
  return "Informe um CPF (11 dígitos) ou CNPJ (14 dígitos)."
}

export function nameError(v: string) {
  const name = v.trim().replace(/\s+/g, " ")
  if (!name) return "Informe o seu nome completo."
  if (!/^[\p{L}' .-]+$/u.test(name)) return "Use apenas letras no nome."
  const parts = name.split(" ").filter((p) => p.replace(/[.'-]/g, "").length > 0)
  if (parts.length < 2) return "Informe nome e sobrenome."
  if (name.length > 120) return "O nome pode ter no máximo 120 caracteres."
  return ""
}

export function phoneError(v: string) {
  const d = digits(v, 11)
  if (!d) return "Informe o seu celular com DDD."
  if (d.length < 11) return "O celular deve ter DDD + 9 dígitos."
  if (!DDDS.has(Number(d.slice(0, 2)))) return "DDD inválido."
  if (d[2] !== "9") return "Informe um número de celular (começa com 9)."
  if (/^(\d)\1+$/.test(d.slice(2))) return "Número de celular inválido."
  return ""
}

/** Data no formato dd/mm/aaaa → Date (meia-noite local), ou null se a data não existe */
function parseDate(v: string) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v)
  if (!m) return null
  const [day, month, year] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null
}

export function ageOn(birth: Date, today = new Date()) {
  const age = today.getFullYear() - birth.getFullYear()
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  return beforeBirthday ? age - 1 : age
}

export function birthDateError(v: string, today = new Date()) {
  if (!v) return "Informe a sua data de nascimento."
  if (digits(v, 8).length < 8) return "Use o formato dd/mm/aaaa."
  const date = parseDate(v)
  if (!date) return "Data inválida."
  if (date > today) return "A data de nascimento não pode ser no futuro."
  const age = ageOn(date, today)
  if (age > 120) return "Confira o ano de nascimento."
  if (age < MIN_AGE) return `A participação é permitida somente a maiores de ${MIN_AGE} anos.`
  return ""
}

export function emailError(v: string) {
  const email = v.trim()
  if (!email) return "Informe o seu e-mail."
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "E-mail inválido."
}

export function cepError(v: string) {
  const d = digits(v, 8)
  if (!d) return "Informe o seu CEP."
  return d.length === 8 && !/^0{8}$/.test(d) ? "" : "CEP inválido. Use 8 dígitos."
}

export function passwordError(v: string) {
  if (!v) return "Crie uma senha."
  if (v.length < 8) return "A senha deve ter pelo menos 8 caracteres."
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Use letras e números na senha."
  return ""
}

/* ---------------- cliente salvo no navegador ---------------- */

export type Customer = {
  /** CPF mascarado (000.000.000-00) */
  cpf: string
  name: string
  /** dd/mm/aaaa */
  birthDate: string
  /** (00) 00000-0000 */
  phone: string
}

const STORAGE_KEY = "sorteviva-customer"

export const sameCpf = (a: string, b: string) => onlyDigits(a) === onlyDigits(b)

/** Normaliza e valida todos os campos; retorna null se qualquer um for inválido. */
export function toValidCustomer(raw: unknown): Customer | null {
  if (!raw || typeof raw !== "object") return null
  const r = raw as Record<string, unknown>
  if (![r.cpf, r.name, r.birthDate, r.phone].every((v) => typeof v === "string")) return null
  const customer: Customer = {
    cpf: maskCpf(r.cpf as string),
    name: (r.name as string).trim().replace(/\s+/g, " "),
    birthDate: maskDate(r.birthDate as string),
    phone: maskPhone(r.phone as string),
  }
  const invalid =
    cpfError(customer.cpf) || nameError(customer.name) || birthDateError(customer.birthDate) || phoneError(customer.phone)
  return invalid ? null : customer
}

/** Lê o cliente salvo; se estiver inválido/corrompido, remove e retorna null. */
export function loadCustomer(): Customer | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const customer = toValidCustomer(JSON.parse(raw))
    if (!customer) localStorage.removeItem(STORAGE_KEY)
    return customer
  } catch {
    return null
  }
}

/** Salva o cliente somente se todos os campos forem válidos. Retorna o valor salvo (ou null). */
export function saveCustomer(data: Customer): Customer | null {
  const customer = toValidCustomer(data)
  if (!customer) return null
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customer))
  } catch {}
  return customer
}

export function clearCustomer() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

/**
 * Cliente salvo correspondente ao CPF informado. Se o CPF mudou (ex.: o cliente tinha digitado
 * errado e corrigiu), os dados do CPF anterior são descartados para não serem associados ao novo.
 */
export function customerForCpf(cpf: string): Customer | null {
  const saved = loadCustomer()
  if (!saved) return null
  if (sameCpf(saved.cpf, cpf)) return saved
  clearCustomer()
  return null
}

/** Mensagem enviada ao WhatsApp ao concluir a compra: o bot identifica o cliente pelo CPF. */
export const purchaseMessage = (customer: Customer) =>
  [
    "📋 *CONFIRMAÇÃO DE COMPRA — VIVASORTE*",
    "",
    `👤 *Nome completo:* ${customer.name}`,
    `🪪 *CPF:* ${maskCpf(customer.cpf)}`,
    `📱 *Telefone:* ${maskPhone(customer.phone)}`,
    "",
    "💬 *Mensagem:*",
    "Fiz a compra no site e aguardo o resultado!",
  ].join("\n")
