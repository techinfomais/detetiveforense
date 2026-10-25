# DESIGNSYSTEM.md — Engenharia reversa da UI/UX "Viva Sorte"

> **O que é isto:** referência técnica de UI/UX extraída de `https://vivasorteoficial.com.br/` (capturada em 24/10/2026), para servir de **base estrutural** de uma plataforma própria de títulos de capitalização / sorteios.
> **Como usar:** mantenha a *estrutura, hierarquia, fluxos, espaçamentos, proporções e comportamentos*. Substitua **cores, fontes, logos, ícones, imagens, textos e marca** pelos da sua empresa. Os tokens abaixo foram organizados para facilitar essa troca (seção 2).
>
> **Como foi obtido:** capturas controladas com REA (Chromium headless) em 3 viewports (1440 / 768 / 390 px), DOM renderizado, stylesheets de primeira parte e a configuração de tema embarcada na página. Os IDs de evidência estão no Apêndice C. Onde algo é **inferência** (não observado diretamente), está marcado como *(inferido)*.
>
> Screenshots de referência: [`docs/referencia/`](docs/referencia/) · Tokens brutos: [`docs/referencia/theme-tokens.css`](docs/referencia/theme-tokens.css)

---

## Sumário

1. [Stack e arquitetura de estilos](#1-stack-e-arquitetura-de-estilos)
2. [Design tokens](#2-design-tokens)
3. [Tipografia](#3-tipografia)
4. [Espaçamento, raios, sombras, z-index](#4-espaçamento-raios-sombras-z-index)
5. [Grid, container e breakpoints](#5-grid-container-e-breakpoints)
6. [Layout por dispositivo (desktop / tablet / mobile)](#6-layout-por-dispositivo)
7. [Navegação e arquitetura de informação](#7-navegação-e-arquitetura-de-informação)
8. [Componentes](#8-componentes)
9. [Fluxos principais](#9-fluxos-principais)
10. [Motion e microinterações](#10-motion-e-microinterações)
11. [Padrões de UX / persuasão do nicho](#11-padrões-de-ux--persuasão-do-nicho)
12. [Compliance e confiança (obrigatórios no nicho)](#12-compliance-e-confiança)
13. [Acessibilidade — o que manter e o que melhorar](#13-acessibilidade)
14. [Implementação recomendada (Tailwind)](#14-implementação-recomendada)
15. [Checklist de rebranding](#15-checklist-de-rebranding)
- [Apêndice A — mapa de rotas](#apêndice-a--mapa-de-rotas)
- [Apêndice B — inventário de componentes do bundle](#apêndice-b--inventário-de-módulos)
- [Apêndice C — evidências](#apêndice-c--evidências)

---

## 1. Stack e arquitetura de estilos

| Item | Observado |
|---|---|
| Framework | **Vue 3 + Vite** (atributos `data-v-xxxx` = scoped CSS; chunks `assets/pages/*.js`), SPA com rotas por arquivo |
| Plataforma | White-label **"LuckyMaker"** (prefixo `lm-`, plugins `@luckymaker/*`), desenvolvido por Even Tecnologia |
| CSS | **Tailwind CSS** com tema customizado via **CSS custom properties** (`.lm-theme[data-theme="light"]`) |
| Ícones | **Font Awesome 6** (SVG inline, `fa-fw`) |
| Animações | **Animate.css** (`animate__headShake`, etc.) + keyframes próprios + **Lottie** (JSON: `confetti`, `coins`, `payment-approved`, `searching`, `live`, `Coupon`) |
| Toasts | **Vue Toastification** (6 containers: top/bottom × left/center/right) |
| Fontes | Google Fonts: **Ubuntu** (principal) e **Lexend** (fallback do sistema) |
| Imagens | CDN com transformação por query (`?fm=webp&auto=compress&w=…&h=…`) + `srcset` responsivo |
| Config | Tema, menu, layouts de header e cores vêm de **JSON de configuração do site** (servido pela API e embarcado no HTML) |

### Padrão-chave de arquitetura: "tema por variáveis + contraste automático"

Cada cor é declarada como **tripla RGB** (sem `rgb()`), com escala 50→900 e duas variantes de texto:

```css
--primary-500: 2, 79, 196;
--primary-500-contrast: 255, 255, 255;  /* cor de texto legível SOBRE esse fundo */
--primary-500-content: 0, 0, 0;         /* inverso */
```

E as utilities usam `rgba(var(--primary), var(--tw-bg-opacity,1))`, permitindo opacidade (`bg-primary/40`).
Quando um componente recebe `bg-primary`, a classe também define `--color-contrast: var(--primary-DEFAULT-contrast)`; filhos usam `text-contrast` / `border-contrast` e **herdam automaticamente a cor legível**. Isso é o que permite trocar a paleta inteira sem quebrar legibilidade — **recomendo replicar este padrão** (seção 14).

---

## 2. Design tokens

### 2.1 Tokens globais do sistema (`ds`)

| Token | Valor | Uso |
|---|---|---|
| `--lm-spacing` | `8px` | Unidade base de todo o espaçamento (grid de 8) |
| `--lm-border-radius` | `1rem` (16px) | Base de todos os raios (escala multiplicativa) |
| `--lm-font-family` | `Ubuntu` | Fonte única do produto |
| `--lm-max-screen-size` | `1536px` | Largura máxima do container |

> **Rebranding:** trocar esses 4 valores muda a "densidade" e o "arredondamento" do produto inteiro.

### 2.2 Paleta semântica (valor DEFAULT = 500)

| Papel | Hex | Uso observado |
|---|---|---|
| `primary` | `#024FC4` | Header/links, chips de edição, faixa de countdown, botões +/–, títulos de data, foco de inputs, menu mobile (fundo) |
| `secondary` | `#0015CF` | Caixa de total/quantidade, badges sobre imagem ("Em 10 horas", "Processo SUSEP"), botão de login, carrinho flutuante |
| `success` | `#52B52F` | **CTA de compra** ("Comprar", "Adicione ao carrinho", "Adicionar todos"), barra de upsell |
| `info` | `#FF7811` | **Marquee/letreiro** de promoção (laranja) |
| `warning` | `#F5A623` | Alertas |
| `danger` | `#C21928` | Erros |
| `dark` | `#2E3238` | Texto escuro / superfícies escuras |
| `muted` | `#7B7B7B` | Bordas de itens de menu, textos secundários |
| `neutral` | `#F5F5F5` | Fundos neutros |
| `background` | `#FFFFFF` | Fundo do app |
| `pix` | `#77B6A8` | Cor dedicada ao método de pagamento **PIX** |
| `gold` *(utility extra)* | `#F7B917 → #DBA100` | Gradiente do botão "Continuar" no checkout/login |

Cores fixas fora do tema (Tailwind default): `slate-50 #F8FAFC` (fundo de input), `slate-500` (descrição de sorteio), `stone-500`, `gray-100/400` (passo inativo do stepper), `black/75`, `black/80`.

### 2.3 Escalas completas (50 → 900)

| | 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| primary | #D9E5F6 | #B3CAED | #81A7E2 | #4E84D6 | #2869CD | **#024FC4** | #0243A7 | #013789 | #012862 | #011C45 |
| secondary | #D9DCF8 | #B3B9F1 | #808AE7 | #4D5BDD | #2638D6 | **#0015CF** | #0012B0 | #000F91 | #000B68 | #000748 |
| success | #E5F4E0 | #CBE9C1 | #A9DA97 | #86CB6D | #6CC04E | **#52B52F** | #469A28 | #397F21 | #295B18 | #1D3F10 |
| info | #FFEBDB | #FFD7B8 | #FFBC88 | #FFA158 | #FF8C35 | **#FF7811** | #D9660E | #B3540C | #803C09 | #592A06 |
| danger | #F6DDDF | #EDBABF | #E18C94 | #D45E69 | #CB3C48 | **#C21928** | #A51522 | #88121C | #610D14 | #44090E |
| warning | #FEF2DE | #FCE4BD | #FAD391 | #F8C165 | #F7B344 | **#F5A623** | #D08D1E | #AC7419 | #7B5312 | #563A0C |
| muted | #EBEBEB | #D7D7D7 | #BDBDBD | #A3A3A3 | #8F8F8F | **#7B7B7B** | #696969 | #565656 | #3E3E3E | #2B2B2B |
| dark | #E0E0E1 | #C0C2C3 | #97999C | #6D7074 | #4D5156 | **#2E3238** | #272B30 | #202327 | #17191C | #101214 |
| neutral | #FEFEFE | #FCFCFC | #FAFAFA | #F8F8F8 | #F7F7F7 | **#F5F5F5** | #D0D0D0 | #ACACAC | #7B7B7B | #565656 |
| pix | #EBF4F2 | #D6E9E5 | #BBDBD4 | #A0CCC2 | #8BC1B5 | **#77B6A8** | #659B8F | #537F76 | #3C5B54 | #2A403B |

**Como a escala é gerada (inferido pelos valores):** 50–400 = mistura do 500 com branco (≈15/30/49/69/84%); 600–900 = 500 escurecido (≈85/70/50/35%). Contraste: tons 50–200 (e até 400 em cores claras) → texto preto; demais → texto branco. Gere sua escala da mesma forma a partir da sua cor de marca.

### 2.4 Regras de uso das cores (padrão de hierarquia)

- **Verde (`success`) é reservado para dinheiro/ação de compra.** Todo CTA de conversão é verde em gradiente. Não use verde para outra coisa.
- **Azul primário = navegação/identidade; azul secundário (mais saturado/escuro) = "caixas de valor"** (total, quantidade, badges sobre imagem).
- **Laranja (`info`) = urgência promocional** (marquee). Amarelo/dourado = destaque premium/autenticação.
- **Fundo sempre branco**; a cor fica nos blocos (seções `bg-primary`, cards, banners). Os banners (imagens) carregam a maior parte da saturação visual.

---

## 3. Tipografia

| Item | Valor |
|---|---|
| Família | `var(--lm-font-family, "Lexend"), ui-sans-serif, system-ui, sans-serif, emoji…` → **Ubuntu** |
| Pesos carregados | 300 (light/extralight), 400, 500 (medium), 700 (bold) — 4 arquivos woff2 do Ubuntu |
| `line-height` base | 1.5 |
| Números | `tabular-nums` no countdown (evita "pulo" dos dígitos) |
| Mono | `ui-monospace…` (contador de quantidade no mobile) |

### Escala tipográfica (Tailwind padrão)

| Classe | Tamanho / altura | Onde aparece |
|---|---|---|
| `text-xs` | 12 / 16 | Chips, badges, disclaimers legais, "Processo SUSEP", rodapé legal |
| `text-sm` | 14 / 20 | Descrições de prêmio, labels secundários, stepper |
| `text-base` | 16 / 24 | Links do menu, título do sorteio principal (h4) |
| `text-lg` | 18 / 28 | Títulos de seção ("Hora do Viva"), subtítulo do login |
| `text-xl` | 20 / 28 | Títulos de CTA em bloco ("Adicione todos os sorteios…"), valor no carrinho |
| `text-2xl` | 24 / 32 | Data do sorteio principal (desktop), H2 de página ("Olá, boas vindas!"), "Instituição beneficiada" |
| `text-[1.75rem]` | 28 | **Quantidade selecionada** no seletor (número grande) |

**Padrões:**
- Títulos de seção: `text-lg font-bold` + subtítulo `text-sm` em cor `primary` claro/`muted`, com **ícone quadrado 20px** (`w-5 aspect-square rounded-md`) à esquerda.
- Preços: rótulo `TOTAL` em `text-xs font-extralight uppercase` + valor `font-medium`/`font-extrabold`.
- Datas de sorteio: duas linhas à direita — `HOJE`/`28/10` (xs) e `ÀS 19:30` (xl, bold, primary).
- Muito uso de `truncate` e `line-clamp-1/2` para nunca quebrar layout em cards.

---

## 4. Espaçamento, raios, sombras, z-index

### 4.1 Espaçamento — escala customizada sobre `--lm-spacing: 8px`

⚠️ A escala **não é a do Tailwind padrão**: os números são remapeados para múltiplos de 8px.

| Classe | Valor | px |
|---|---|---|
| `*-0.5` | spacing × 0.5 | 4 |
| `*-1` | spacing × 1 | 8 |
| `*-1.5` | 0.375rem | 6 |
| `*-2` | spacing × 1.5 | 12 |
| `*-2.5` | 0.625rem | 10 |
| `*-3` | spacing × 2 | 16 |
| `*-4` | spacing × 3 | 24 |
| `*-5` | spacing × 4 | 32 |
| `*-6` | spacing × 6 | 48 |
| `*-8` | spacing × 7.5 | 60 |
| `*-10` | 2.5rem | 40 |
| `*-12` | 3rem | 48 |

Uso típico: gap entre cards `gap-2` (12px); padding de seção `pt-5 pb-3` (32/16px); padding interno de card `p-1`/`p-2` (8/12px); itens do menu `px-2 py-3` (12/16px).

### 4.2 Raios — multiplicadores de `--lm-border-radius: 1rem`

| Classe | Fórmula | px | Uso |
|---|---|---|---|
| `rounded` | 0.25rem | 4 | — |
| `rounded-md` | ×0.375 | 6 | Ícones de categoria, sub-chips |
| `rounded-lg` | ×0.5 | 8 | **Botões CTA**, caixa de total, chips, faixa de countdown |
| `rounded-xl` | ×0.75 | 12 | Carrinho flutuante (desktop) |
| `rounded-2xl` | ×1 | 16 | Badge SUSEP (topo), footer (`rounded-t-2xl`), botão "Adicionar todos" |
| `rounded-3xl` | ×1.5 | 24 | **Cards de sorteio e banners**, botão de login (pill) |
| `rounded-full` | — | ∞ | Botões +/–, badges de tempo, contador do carrinho |

> Assinatura visual: **imagens/cards bem arredondados (24px) + botões moderadamente arredondados (8px)**.

### 4.3 Sombras

`shadow-sm/md/lg/xl/2xl` padrão Tailwind; custom `shadow-t-2xl: 0 -25px 50px -12px rgba(0,0,0,.25)` (sombra para cima, usada em *bottom sheets*). Cards no fundo branco são praticamente **sem sombra** — a separação vem da imagem e do raio. Sombra aparece em hover (`[@media(hover:hover)]:hover:shadow-xl`) e em elementos flutuantes.

### 4.4 Camadas (z-index)

| Token | Valor | Elemento |
|---|---|---|
| `z-1` / `z-10` / `z-20` | 1/10/20 | Overlays internos de card (badges sobre imagem) |
| `z-header` | 40 | Header |
| `z-[45]` | 45 | Placements flutuantes de rodapé (plugins/nudges) |
| `z-app-footer` | 50 | Carrinho flutuante, barra fixa inferior |
| `z-modal` | (acima) | Modais |
| `z-preloader` | 9999 | Preloader de página (overlay `bg-white/40` + barra de progresso 4px) |

---

## 5. Grid, container e breakpoints

### Breakpoints (Tailwind padrão, mobile-first)

| Prefixo | min-width | Papel no layout |
|---|---|---|
| — | 0 | **Base = mobile** (design primário) |
| `sm` | 640px | Ajustes finos de logo/texto |
| `md` | 768px | Grid de cards vira **2 colunas**; carrinho flutuante vira "aba" lateral |
| `lg` | 1024px | **Troca de layout**: menu horizontal, hero em 2 colunas, grid 3 colunas, dropdowns por hover |
| `xl` | 1280px | Mais respiro (`xl:mb-5`) |
| `2xl` | 1536px | Container máximo |

Extras: `(hover:hover)` — efeitos de hover **só em dispositivos com mouse** (bom padrão); `prefers-reduced-motion` respeitado; `max-width: 420px` e `350px` para telas muito pequenas.

### Container

`.container { margin: 0 auto; max-width: 640 → 768 → 1024 → 1280 → 1536 }` (segue o breakpoint). Observado a 1440px: conteúdo com ~92px de margem lateral; a 390px: gutter de 12px.

### Grid de cards de sorteio

```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-stretch
```

---

## 6. Layout por dispositivo

Ordem vertical da **home** (idêntica nos 3 tamanhos, muda só a disposição interna):

```
┌───────────────────────────────────────────┐
│ HEADER (logo · menu · login)              │
│ FAIXA COUNTDOWN (bg-primary, rounded-lg)  │
│ MARQUEE laranja (texto promocional loop)  │
├───────────────────────────────────────────┤
│ HERO = SORTEIO PRINCIPAL                  │
│   banner 16:9 + badge SUSEP               │
│   título · data · prêmios                 │
│   seletor de quantidade + TOTAL           │
│   CTA verde "Comprar"                     │
│ disclaimer legal (xs, centralizado)       │
├───────────────────────────────────────────┤
│ CATEGORIA 1 (ícone + título + subtítulo)  │
│   grid de cards de sorteio                │
│ CATEGORIA 2 …                             │
│ BLOCO CTA "Adicione todos ao carrinho"    │
├───────────────────────────────────────────┤
│ GANHADORES RECENTES (carrossel vídeos)    │
│ INSTITUIÇÃO BENEFICIADA                   │
├───────────────────────────────────────────┤
│ FOOTER (redes · legal · emissora · SAC)   │
└───────────────────────────────────────────┘
  + carrinho flutuante (quando há itens)
  + bottom-sheet de upsell (plugin)
```

### 6.1 Desktop (≥1024px) — ref. `docs/referencia/desktop.png`, `desk_full_*.png`

- **Header** estático (`lg:static`), fundo transparente/branco, 3 zonas: logo à esquerda (h-6 / w-36 ≈ 24×144px), **menu horizontal central** (Início, Resultados, Revendedor▾, Institucional▾, Contato) em `text-primary`, **botão pill "entre ou cadastre-se"** à direita (`bg-secondary`, ícone de usuário + 2 linhas de texto).
- Itens com filhos abrem **dropdown por hover** (`lg:group-hover:grid`, `lg:absolute lg:top-[100%] lg:bg-white lg:shadow-lg`). Item ativo/hover ganha **sublinhado** (`lg:border-b-2 border-current`).
- **Hero em 2 colunas**: banner à esquerda (~58%), painel de compra à direita (título preto, data grande `text-2xl text-primary` "DOM, 25 OUT | 2026", lista de prêmios `text-sm slate-500`, caixa de total com +/– e CTA verde).
- **Cards em 3 colunas**; cada card mostra *chips* "Edição nº | Sorteio em", nome+data e a caixa de total completa com +/–.
- Carrinho flutuante: **aba no canto inferior direito** (`md:bottom-12 md:rounded-l-xl`).

### 6.2 Tablet (768–1023px) — ref. `tablet.png`

- **Já usa header mobile**: logo à esquerda + **hambúrguer** à direita (layout `["logo","empty","bars"]`).
- Hero **empilhado**: banner full-width → linha título/data (esquerda) + "em 1 dia" (direita) → linha com seletor compacto (– 20 +) e CTA "Comprar" lado a lado.
- Cards em **2 colunas** (`md:grid-cols-2`).

### 6.3 Mobile (<768px) — ref. `mobile.png`, `mob_full_0.png`, `mob_menu.png`

- Header compacto (logo + hambúrguer), countdown com fonte menor, marquee.
- Hero empilhado, mesma estrutura do tablet, com **seletor compacto**: botões circulares `primary` + número mono + **CTA verde à direita ocupando ~50%**.
- Cards em **1 coluna**; a versão mobile do card é **simplificada**: imagem → linha "📅 Em 10 horas · R$ 0,05" → seletor (– 50 +) + **CTA "Adicione +50"** (o CTA mostra a quantidade).
- **Menu = drawer lateral** (ocupa ~85% da largura, fundo `primary`, overlay escurecendo a página, botão "<" para fechar). Itens são **cards brancos grandes** (`rounded-2xl`, ~72px de altura) com ícone em quadrado `primary` à esquerda, rótulo e chevron `>` à direita. Grupos ("Revendedor", "Institucional") viram **títulos de seção brancos** dentro do drawer. Primeiro item: **"Entrar"** (só aparece no mobile e deslogado).
- Elementos fixos no rodapé: **barra de carrinho full-width** (`fixed bottom-0 w-full`, `bg-secondary`, total grande + botão pill verde "Ver carrinho") e o **bottom-sheet de upsell** verde ("Deseja obter mais chances de ganhar? [Sim ✓]").
- O painel de pagamento do hero é `sticky bottom-0` no mobile (`payment-sheet`) — o CTA fica sempre ao alcance do polegar.

---

## 7. Navegação e arquitetura de informação

### 7.1 Menu (configurável por JSON, com regras condicionais)

```
Entrar              (/autenticar)   ← só mobile + deslogado      [fa-right-to-bracket]
Início              (/)                                          [fa-home]
Resultados          (/resultados)                                [fa-trophy]
Revendedor ▾
  ├ Seja um revendedor     (/seja-um-revendedor)                 [fa-handshake]
  ├ Seja um influenciador  (/seja-um-influenciador)              [fa-handshake]
  └ Portal do Revendedor   (externo)                             [fa-table-columns]
Institucional ▾
  ├ Perguntas frequentes   (/institucional/perguntas-frequentes) [fa-circle-question]
  ├ Termos de uso          (/institucional/termos-de-uso)        [fa-gavel]
  ├ Regulamento            (/institucional/regulamento)          [fa-section]
  └ Viva Sorte de Todos    (/institucional/de-todos)             [fa-book]
Usuário ▾  (só logado)
  ├ Meus títulos  ├ Meus resgates  ├ Meus pedidos  ├ Minhas contemplações
  ├ Minha carteira ├ Meus saques   ├ Meus dados    ├ Meus cartões
  └ Redefinir senha └ Preferências
Contato             (/contato)                                   [fa-comment]
```

**Padrão replicável:** cada item tem `label`, `url`, `icon`, `children` e `if` (condições como `$device.isMobile`, `$user.isLoggedIn`). Implemente o menu como dado, não como markup fixo.

### 7.2 Header — layouts configuráveis

| Config | Valor | Significado |
|---|---|---|
| `mobileLayout` | `["logo","empty","bars"]` | 3 colunas: logo · vazio · hambúrguer |
| `appLayout` | `["logo","empty","buttons"]` | Versão "app" (PWA/webview): logo · vazio · botões |
| `textColor` / `color` | `primary` / `transparent` | Texto azul sobre fundo transparente |
| `appColor` / `appTextColor` | `primary` / `white` | No modo app, header azul sólido |
| `showCouponsBar` | `true` | Faixa de cupons/countdown abaixo do header |

### 7.3 Rodapé (estrutura)

1. Logo + ícones sociais (Instagram, Facebook, X, YouTube).
2. Texto legal longo (natureza do título, modalidade Filantropia Premiável).
3. Três colunas de logos: **"Títulos emitidos por"** (capitalizadora), **"Instituição Beneficiada"**, **"Desenvolvimento"**.
4. Selo Google Safe Browsing.
5. Links: Termos de Uso · Política de Privacidade · Perguntas frequentes · **Jogo Responsável** · Contato · **SAC (tel:)** · **Ouvidoria (tel: 0800)**.
6. Razão social + CNPJ.
Footer com `rounded-t-2xl` (cantos superiores arredondados).

### 7.4 Resultados (`/resultados`) — ref. `results.png`

Header de página = **faixa `bg-primary` com título branco "Resultados"** (`rounded-lg`), texto de instrução, e **lista de categorias** em cards brancos com borda sutil: ícone quadrado colorido (cor própria de cada categoria) + título bold + subtítulo xs + chevron `>`. Padrão "list item navegável" — reutilize para qualquer índice.

---

## 8. Componentes

> Nomes entre parênteses = nome real do componente/atributo no DOM (`data-component`, `marker-*`).

### 8.1 Button (`Button`)

Base comum a **todos** os botões:

```html
<button class="
  !transition-all duration-150 ease-out
  [@media(hover:hover)]:hover:-translate-y-0.5 active:translate-y-0   ← sobe 2px no hover, volta no clique
  block w-full px-4 py-2.5 rounded-lg font-medium text-white
  bg-gradient-to-br from-success to-success-600                       ← gradiente diagonal
  hover:from-success-600 hover:to-success-700                          ← escurece 1 nível no hover
  disabled:from-success-200 disabled:to-success-300 disabled:text-white/70 disabled:shadow-none
  relative overflow-hidden !text-center
  before:absolute before:inset-0 before:bg-gradient-to-tr
  before:from-white/0 before:via-white/10 before:to-white/20
  before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-300   ← brilho (sheen) no hover
  after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none">
  <div class="flex relative z-10 justify-center items-center">[ícone] Rótulo</div>
</button>
```

| Variante | Gradiente | Uso |
|---|---|---|
| **success** (principal) | `success → success-600` | Comprar, Adicione ao carrinho, Adicionar todos, Ver carrinho |
| **secondary** | `secondary → secondary-600` | Login "entre ou cadastre-se" (pill `!rounded-3xl`) |
| **gold** | `#F7B917 → #DBA100` | "Continuar" no login/checkout (desabilitado = `gray-200 → gray-300`, texto `dark-900`) |
| **outline branco** | borda branca, fundo transparente | "Adicionar todos" dentro de bloco verde |

Tamanhos: altura ~44px (`py-2.5` + text-base) desktop; CTA de hero ~44px; botões +/- 37px (`h-[2.3rem]`) mobile / 43px (`lg:h-[2.7rem]`) desktop.
Ícone à esquerda do rótulo (`fa-shopping-cart`). Texto do CTA **pode incluir a quantidade** ("Adicione +50").

### 8.2 Seletor de quantidade / Payment sheet (`payment-sheet`, `change-amount-button`)

**Versão completa (desktop e cards desktop):**
```
┌──────────────────────────────────────────┐  bg-secondary · text-white · rounded-lg · min-h-[3.7rem] · px-2
│ TOTAL            (–)    20    (+)        │  grid-cols-2
│ R$ 19,80                                 │
└──────────────────────────────────────────┘
[ 🛒  Comprar ]                                CTA success full-width, mt-1
```
- `TOTAL`: `text-xs font-extralight`; valor: `font-medium`.
- Botões +/–: círculo `rounded-full aspect-square`, `bg-primary`, **borda 1–2px na cor de contraste** (branca), ícone `fa-minus/fa-plus` `scale-150`.
- Quantidade: `text-[1.75rem] font-medium min-w-[4rem]` centralizada.
- `touch-action: none` nos botões (evita zoom por toque duplo ao clicar rápido).

**Versão compacta (mobile/tablet):** sem caixa azul; `(–)  20  (+)` com botões `primary` circulares sobre fundo branco + CTA verde ao lado. Quantidade inicial **pré-preenchida** (20, 25, 50, 100 conforme o sorteio — ancoragem de valor).

Config observada: `secondaryRaffles.quantityButtonsGrid: "2x2"` *(inferido: grade de atalhos de quantidade, ex. +10/+25/+50/+100, em algumas telas)*.

### 8.3 Card de sorteio pequeno (`small-raffle-card` / `classic-small-raffle-card`)

```
┌──────────────────────────────────────┐ bg-white rounded-3xl gap-y-2
│ [ imagem 4:2 (mobile) / 16:9 (lg) ]  │ rounded-3xl, background-image cover
│                   (📅 Em 10 horas)   │ ← badge: absolute top-1 right-1, bg-secondary, rounded-full, text-xs,
│                                      │   animate__headShake (chama atenção ao entrar)
│     ╭ ⓘ Processo SUSEP 15414… ╮      │ ← aba: absolute bottom-0 centralizada, bg-secondary, rounded-t-2xl
├──────────────────────────────────────┤
│ [Edição nº  3177] [Sorteio em 10 h]  │ ← 2 chips: bg-primary, rounded-lg, p-1, text-xs; valor em pílula bg-white/20
│ Especial de Graça - 12:30h   HOJE    │ ← nome (xs) · data à direita (xs)
│                          ÀS 12:30    │   hora (xl bold primary)
│ [ TOTAL R$ 2,50   (–) 50 (+) ]       │ ← payment-sheet
│ [ 🛒 Adicione ao carrinho ]          │ ← CTA success
└──────────────────────────────────────┘
```
- Imagem clicável abre detalhe (`role="button"` na `picture`).
- Badge "Processo SUSEP" é **clicável** (abre info regulatória).
- Mobile: oculta chips e mostra linha "📅 Em 10 horas ……… R$ 0,05" (preço unitário) — **menos informação, mais ação**.

### 8.4 Hero / Sorteio principal (`marker-main-raffle-*`)

Banner `aspect-banner` (16:9) `rounded-3xl` + badge SUSEP; painel com `h4` título (`text-primary` mobile / `text-black` desktop), "Por apenas R$ 0,99" (mobile), data (`lg:text-2xl lg:text-primary`), lista de prêmios (`hidden lg:block`), payment-sheet **sticky** no mobile e CTA.

### 8.5 Faixa de countdown (`lm-placing-location` / coupons bar)

`bg-primary`, `rounded-lg`, texto branco `font-bold uppercase text-sm`: **"800 MIL POR 99 CENTAVOS:"** + 3 caixas brancas (`rounded`, borda preta, `tabular-nums`, `text-primary font-bold`) **HH : MM : SS** separadas por ":". Desktop: largura do container; mobile: full-width com 12px de margem.

### 8.6 Marquee (`lm-marquee`, `lm-marquee__content`)

Faixa full-bleed `bg-info` (laranja) com texto `font-medium` branco/amarelo repetido em loop horizontal (`@keyframes lm-marquee-left`). ~28px de altura. Mensagem única repetida ("+de 1 MILHÃO em prêmios por R$ 0,99 centavos!").

### 8.7 Cabeçalho de seção / categoria

Ícone 20×20 `rounded-md` (imagem da categoria) + `h2 text-lg font-bold` (cor da categoria/primary) + subtítulo `text-sm` mais claro. Categorias têm **cor própria** (ex.: `#005bc9`, `#ee151f`) e ícone — usadas em resultados e listagens.

### 8.8 Bloco CTA em massa

Faixa `bg-success` `rounded-2xl`, título `text-xl font-bold` branco "Adicione todos os sorteios ao carrinho!", subtítulo xs, e botão **outline branco pill** à direita "🛒 Adicionar todos". (Aumenta ticket médio.)

### 8.9 Ganhadores recentes (`LastWinners`)

Seção `bg-primary` (texto contraste), título "Ganhadores recentes" + frase "Confira os ganhadores do sorteio da edição **011** de **domingo, 18 de outubro de 2026**" (destaques em cor). **Carrossel horizontal** de cards verticais **128×208px** (`w-32 h-52 rounded-3xl`): foto/vídeo cover, ícone ▶ central (`w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full`), chip de valor no topo (`bg-black/45 backdrop-blur-md` "R$ 5.000,00 - valor líquido"), gradiente `from-black/85 via-black/40 to-transparent` na base com **nome abreviado** ("Carlos A. P. A.") e **cidade/UF**. Hover: `-translate-y-0.5` e imagem `scale-105` (500ms). Formato "stories" — prova social.

### 8.10 Instituição beneficiada (`showcased-partners`)

Título centralizado `text-2xl font-bold`, logo (`h-24`), tagline uppercase bold xs, parágrafo curto. Reforça legitimidade/propósito.

### 8.11 Carrinho flutuante (`#cart-button`)

- Mobile: barra **full-width fixa no rodapé**, `bg-secondary`, ícone carrinho com **badge de contagem** (círculo branco), total `text-xl font-extrabold`, botão pill verde "Ver carrinho".
- Desktop (`md+`): **aba no canto inferior direito** (`md:bottom-12 md:rounded-l-xl md:rounded-t-xl`), texto "Ir p/ o carrinho", hover `bg-secondary-600`.
- Oculto quando carrinho vazio. Animações `floating-cart-panel-enter/leave-left/right`.

### 8.12 Bottom-sheet de upsell (plugin)

Barra verde fixa no rodapé com cantos superiores arredondados, ícone de moedas, pergunta ("Deseja obter mais chances de ganhar?") e botão claro "Sim ✓". *(Plugin de gamificação — Smartico; inferido pelo CSS carregado.)*

### 8.13 Input com label flutuante (`label-input-container`)

```html
<div class="relative border-2 rounded-md bg-slate-50 duration-300
            focus-within:bg-white focus-within:border-primary">
  <input class="w-full px-4 py-3 bg-transparent text-lg !border-none !outline-0"
         inputmode="numeric" data-mask="###.###.###-##" placeholder="Digite o seu CPF">
  <label class="absolute top-0 ml-3 mt-2 px-2 font-medium origin-0 scale-75 -translate-y-6 …">CPF</label>
</div>
<small>Insira o número do seu CPF</small>   ← helper text abaixo, cor slate
```
Altura ~58px, borda 2px que fica `primary` no foco, máscara de CPF, `inputmode="numeric"` (abre teclado numérico), `autocomplete="username"`.

### 8.14 Stepper do checkout

Linha de passos `flex gap-1`: passo ativo = `border border-primary text-primary rounded-lg grow` com "1. Identificação"; passo futuro = quadrado `bg-gray-100 text-gray-400` só com o número "2"; concluído = ícone `fa-circle-check`. Passos: **1. Identificação → 2. Carrinho** (→ pagamento).

### 8.15 Chips, badges e toasts

- `chip chip-primary`: `bg-primary text-white rounded-lg p-1 text-xs font-medium`, com valor em sub-pílula `bg-white/20 rounded-md px-1`.
- Badge de tempo: `bg-secondary rounded-full px-1 py-0.5 text-xs` + ícone calendário.
- Toasts (Vue Toastification) em 6 posições.

### 8.16 Modais

Overlay `fixed inset-0 overflow-auto overscroll-contain p-[1.25rem] items-start justify-center`; conteúdo começa no topo (não centralizado verticalmente — melhor em mobile com teclado). Modais usados: adicionar sorteio ao carrinho (`lm-add-raffle-to-cart-modal`), info SUSEP, popups promocionais.

### 8.17 Preloader / skeleton

Overlay branco 40% + **barra de progresso indeterminada de 4px** no topo (`indeterminateAnimation 1s linear infinite`); skeletons com `skeleton-pulse` e `shimmer`.

---

## 9. Fluxos principais

### 9.1 Compra rápida (observado)
1. Home → ajusta quantidade no hero (já vem pré-selecionada, ex. 20).
2. Clique em **"Comprar"** → **vai direto para `/checkout`** (sem passar por página de produto nem carrinho).
3. Checkout passo **1. Identificação**: "Olá, boas vindas! Identifique-se usando seu CPF" → **apenas CPF** + "Continuar".
4. Passo **2. Carrinho** → pagamento (PIX tem cor própria; Lottie `payment-approved` + `confetti` no sucesso).

**Princípios:** *identificação por CPF primeiro* (cadastro progressivo: só pede o resto se o CPF for novo — campos de cadastro: nome, nascimento, DDI+telefone, e-mail, CEP/endereço, senha); *mínimo de cliques até o pagamento*; carrinho como passo, não como página obrigatória.

### 9.2 Multi-sorteio
Cards → "Adicione ao carrinho" (fica na home, atualiza carrinho flutuante) → ou "Adicionar todos" → "Ver carrinho"/"Ir p/ o carrinho".

### 9.3 Login (`/autenticar`)
Mesma tela de CPF do checkout, com **cabeçalho em "arco"**: curva `bg-primary` sob o header com o logo em um card branco centralizado sobreposto. Botão "Continuar" desabilitado até CPF válido.

### 9.4 Resultados
`/resultados` → escolhe categoria → lista de edições/resultados paginada (`/raffle/{id}/results?page=1`).

### 9.5 Área do usuário
Meus títulos · resgates · pedidos · contemplações · **carteira** · **saques** · dados · cartões · senha · preferências (ver 7.1).

---

## 10. Motion e microinterações

| Interação | Implementação |
|---|---|
| Hover de botão | `-translate-y-0.5` (150ms ease-out) + sheen `before:` (300ms) + escurecer gradiente |
| Clique | `active:translate-y-0` (feedback de "pressionar") |
| Hover de card/vídeo | `scale-105` na imagem (500ms ease-out), `-translate-y-0.5` |
| Badge de tempo | `animate__headShake animate__faster` ao montar |
| Marquee | translação infinita horizontal |
| Countdown | atualização por segundo com `tabular-nums` |
| Transição de página | `enter: fade`, `leave: none` |
| Sucesso de pagamento | Lottie `payment-approved` + `confetti` + `coins` |
| Selos/labels | `label-badge-shine-spin`, `popular-badge-gradient-shift`, `special-offer-shimmer` (brilhos contínuos) |
| Assinaturas | entrada escalonada (badge → título → preço → CTA), `orb-float`, `glow-rotate` |
| Prêmios instantâneos | `prize-shine-sweep`, `shake-light/medium/heavy` (raspadinha/surpresa) |
| Status ao vivo | `status-pulse-ripple` |
| Acessibilidade de movimento | blocos `@media (prefers-reduced-motion: reduce)` presentes |

Durações-padrão: **150ms** (interação), **200–300ms** (opacidade/cor), **500ms** (imagem), **1s** (barra de progresso).

---

## 11. Padrões de UX / persuasão do nicho

Esses são os padrões "validados" que o público já reconhece — mantenha-os:

1. **Preço-âncora ultrabaixo em destaque** ("por 99 centavos", "R$ 0,05") repetido no countdown, marquee, banner e card.
2. **Urgência em 3 camadas**: countdown HH:MM:SS no topo + badge "Em 10 horas" no card + "HOJE ÀS 12:30".
3. **Valor do prêmio > tudo**: banners gigantes com o valor ("200 MIL") ocupam a maior área da tela; texto da UI é pequeno e funcional.
4. **Quantidade pré-selecionada** (20/25/50/100) — o usuário ajusta para baixo/cima, não decide do zero; total recalcula ao vivo.
5. **CTA sempre verde, sempre visível** (sticky no mobile; carrinho flutuante).
6. **Compra em 1 clique até o checkout**; identificação só por CPF.
7. **Cross-sell / bundle**: "Adicionar todos os sorteios" e upsell "mais chances de ganhar?".
8. **Prova social em formato stories** (vídeos de ganhadores com nome abreviado e cidade).
9. **Propósito/filantropia** (instituição beneficiada) como reforço moral da compra.
10. **Selos de legitimidade em todo card** (Processo SUSEP clicável).
11. **Gamificação** (cupons, prêmios instantâneos, moedas/carteira, clube de benefícios, assinaturas, indicação `/convite/:uuid`).
12. **Canal de revenda/influenciador** no menu principal (aquisição via afiliados).

---

## 12. Compliance e confiança

Itens recorrentes que são esperados pelo público e geralmente exigidos (confirme com seu jurídico/SUSEP):

- Badge **"Processo SUSEP nº …"** em cada banner/card (clicável, abre detalhes).
- Disclaimer sob o hero: "Os materiais de divulgação foram elaborados em conformidade com… Ofício Circular … SUSEP".
- Rodapé: modalidade do título, **sociedade de capitalização emissora** (logo + SAC + **Ouvidoria 0800**), **instituição beneficiada**, razão social + **CNPJ**, **Termos**, **Regulamento**, **Política de Privacidade**, **Jogo Responsável**.
- Selo de navegação segura; texto "Este site é protegido por serviços de verificação de segurança" no login.
- Prêmios sempre com **"valor líquido"** explícito.

---

## 13. Acessibilidade

**Manter:** `lang="pt-BR"`; hover só em `(hover:hover)`; `prefers-reduced-motion`; `inputmode="numeric"` e máscara; alvos de toque ≥ 37px; contraste automático (`*-contrast`).

**Melhorar na sua versão** (pontos fracos observados):
- `maximum-scale=1.0` no viewport **bloqueia zoom** → remova.
- Imagens com `alt="Imagem"` genérico → descreva o prêmio/sorteio.
- Imagens de card como `<div style="background-image">` com `role="button"` → use `<img>` + `<button>`/`<a>` real.
- Botões +/– só com ícone → adicione `aria-label="Diminuir quantidade"` / `"Aumentar quantidade"` e `aria-live` no total.
- Texto `text-xs` (12px) em `slate-500`/`opacity-60` sobre branco fica abaixo de AA em alguns casos → use pelo menos `#64748B` em 12px ou suba para 13–14px.
- Marquee sem pausa → ofereça pausar no hover/foco e respeite reduced-motion.

---

## 14. Implementação recomendada

### 14.1 Variáveis (troque os valores pela sua marca)

```css
:root {
  --ds-spacing: 8px;
  --ds-radius: 1rem;
  --ds-font: "SuaFonte", ui-sans-serif, system-ui, sans-serif;
  --ds-max-width: 1536px;

  /* Triplas RGB — gere 50..900 a partir do 500 (ver 2.3) */
  --primary: 2 79 196;        --primary-contrast: 255 255 255;
  --secondary: 0 21 207;      --secondary-contrast: 255 255 255;
  --success: 82 181 47;       --success-contrast: 255 255 255;   /* CTA de compra */
  --info: 255 120 17;         /* urgência/marquee */
  --warning: 245 166 35;
  --danger: 194 25 40;
  --muted: 123 123 123;
  --dark: 46 50 56;
  --neutral: 245 245 245;
  --background: 255 255 255;
  --pix: 119 182 168;
  --gold-from: 247 185 23;    --gold-to: 219 161 0;
}
```

### 14.2 `tailwind.config` (esqueleto)

```js
const c = (name) => ({
  DEFAULT: `rgb(var(--${name}) / <alpha-value>)`,
  ...Object.fromEntries([50,100,200,300,400,500,600,700,800,900]
    .map(s => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`])),
  contrast: `rgb(var(--${name}-contrast) / <alpha-value>)`,
});

module.exports = {
  theme: {
    extend: {
      colors: Object.fromEntries(
        ['primary','secondary','success','info','warning','danger','muted','dark','neutral','background','pix']
          .map(n => [n, c(n)])),
      fontFamily: { sans: 'var(--ds-font)' },
      spacing: {               // escala remapeada (seção 4.1)
        0.5: 'calc(var(--ds-spacing)*0.5)', 1: 'var(--ds-spacing)',
        2: 'calc(var(--ds-spacing)*1.5)',   3: 'calc(var(--ds-spacing)*2)',
        4: 'calc(var(--ds-spacing)*3)',     5: 'calc(var(--ds-spacing)*4)',
        6: 'calc(var(--ds-spacing)*6)',     8: 'calc(var(--ds-spacing)*7.5)',
      },
      borderRadius: {
        md: 'calc(var(--ds-radius)*0.375)', lg: 'calc(var(--ds-radius)*0.5)',
        xl: 'calc(var(--ds-radius)*0.75)',  '2xl': 'var(--ds-radius)',
        '3xl': 'calc(var(--ds-radius)*1.5)',
      },
      aspectRatio: { banner: '16 / 9' },
      zIndex: { header: 40, 'app-footer': 50, preloader: 9999 },
      container: { center: true },
    },
  },
};
```

> Para o padrão "contraste automático", crie utilities `bg-{cor}` que também setem `--color-contrast`, e uma utility `text-contrast { color: rgb(var(--color-contrast)) }`.

### 14.3 Componentes mínimos para o MVP

`Header` (desktop/mobile + drawer) · `CountdownBar` · `Marquee` · `MainRaffleHero` · `PaymentSheet` (completo/compacto) · `QuantityStepper` · `RaffleCard` (desktop/mobile) · `SectionHeader` · `BulkAddBanner` · `WinnersCarousel` · `PartnerShowcase` · `FloatingCart` · `Footer` · `FloatingLabelInput` · `CheckoutStepper` · `Button` (success/secondary/gold/outline) · `Chip`/`Badge` · `Modal` · `Toast` · `Preloader`.

---

## 15. Checklist de rebranding

- [ ] Gerar escalas 50–900 de **primary/secondary** a partir das cores da marca (mantendo secondary mais escura/saturada que primary).
- [ ] Manter **verde para CTA de compra** (ou escolher UMA cor de conversão e usá-la exclusivamente).
- [ ] Escolher a cor de **urgência** (marquee) — contrastante com a primária.
- [ ] Trocar `--ds-font` (preferir sans geométrica/humanista com 300/400/500/700; boa leitura de números).
- [ ] Ajustar `--ds-radius` se a marca for mais "séria" (0.75rem) ou mais "lúdica" (1.25rem).
- [ ] Logos: colorida, branca e preta (o original usa as 3 + mascote).
- [ ] Ícones: Font Awesome pode ser mantido ou trocado por set próprio com a mesma metáfora (casa, troféu, aperto de mão, carrinho, calendário, info).
- [ ] Banners: manter proporção **16:9 (desktop) / 2:1 (mobile)**, área segura para o badge SUSEP na base central e badge de tempo no canto superior direito.
- [ ] Revisar todos os textos legais/regulatórios com a sua capitalizadora.
- [ ] Aplicar as melhorias de acessibilidade da seção 13.

---

## Apêndice A — mapa de rotas

Observadas no bundle/menu/rede:

```
/                                  Home
/resultados                        Resultados por categoria
/autenticar                        Login/identificação (CPF)
/checkout                          Checkout (stepper)
/assinaturas                       Planos de assinatura
/clube-beneficios                  Clube de benefícios
/loja                              Loja/descontos de parceiros (ecommerce highlight)
/categoria/:category               Listagem por categoria
/blocos/:slug                      Páginas montadas por blocos (CMS)
/landing/:uuid/passos/identificacao  Landing pages com funil próprio
/convite/:uuid                     Indicação
/seja-um-revendedor · /seja-um-influenciador
/institucional/{perguntas-frequentes,termos-de-uso,regulamento,de-todos,jogo-responsavel}
/politica-de-privacidade · /contato
/usuario/{perfil,meus-titulos,meus-resgates,meus-pedidos,minhas-contemplacoes,
          minha-carteira,meus-saques,meus-dados,meus-cartoes,alterar-senha,preferencias}
/404
```

Tipos de bloco de CMS (da API `site/blocks`): `BANNER, VIDEO, MEDIA_GROUP, COMBO_BLOCK, CATALOG, SUBSCRIPTION_BLOCK, COUNTDOWN, LABEL, MARQUEE, SEARCH, INSTANT_WINNERS, POPUP, RICH_TEXT, BLOCK_SECTION, VIDEO_GROUP, HERO` — boa referência para um **page builder** próprio.

## Apêndice B — inventário de módulos

Componentes base no bundle: `Button, Chip, Icon, Image, Link, Modal, ModalMixin, Section, Scrollable, Teleport, Typography, Theme, Hoverable, LastWinners, OffersBase, HomeFloatingBottomPlacing, PlatformSpecific, Browser, DebugInfo`.
Stylesheets: `css-*.css` (Tailwind + Animate.css + vendors), `pages/index-*.css`, `pages/assinaturas-*.css`, `pages/usuario/perfil-*.css`, `OffersBase-*.css`, `Hoverable-*.css`, `Icon-*.css`, plugins `prize-plane` e `smartico`.

## Apêndice C — evidências

Capturas REA (`capture_browser_scenario`, Chromium 155, headless, pt-BR, America/Sao_Paulo):

| Captura | Viewport | Evidence ID |
|---|---|---|
| Home desktop + rede + DOM | 1440×900 | `ev_7b48178f5867fac6668efa8518a03781287084b142877a58698fb0e0d3c800ec` |
| Home tablet + DOM | 768×1024 | `ev_719b7bc79a75f41ec16489c4c735895be3e7e79feab1c07d91560b8579174118` |
| Home mobile + DOM | 390×844 | `ev_b8e8180057374865203ddebe5600ed8053d4c8b0687d013ec20a7df8b7b0309b` |
| Home desktop (página longa) | 1440×4200 | `ev_0dde18cd52ed250f61d13895d4e61438034e3d3ac906a7774c7c1ee84ade0034` |
| Home mobile (página longa) | 390×6000 | `ev_3ccd86cf5968f946f9d2e3137ec93fab1f2fc56c1e26408a5146759ecb2fd770` |
| Menu mobile aberto (clique no hambúrguer) | 390×844 | `ev_7cdebd4ac9a641a65780b91d3560ef8e07b340379453a9b821436c378edb59ca` |
| Resultados | 1440×1400 | `ev_7284a5e8a73f79d94d919c6dd8d6b8e6e38f1711a118e40606f537d59d65e6c9` |
| Clique "Comprar" → /checkout | 390×1400 | `ev_c6b2dd3cd1d8de7483823abdd843e327caff7e677a1ef97292a8470eb710159d` |
| Login /autenticar | 390×1000 | `ev_39cf8ba2d3577e9f43e995ed8c89e61b3c013ed68936b5f370400586af9cb534` |

**Limitações:** não foram observados fluxos autenticados (área do usuário, carrinho com itens, pagamento/PIX, sucesso), dropdown desktop aberto, modais SUSEP e estados de erro — os itens correspondentes acima vêm do CSS/config e estão marcados como inferidos quando aplicável. O rodapé não renderizou nas capturas de página longa (carregamento tardio); sua estrutura vem do DOM. Valores dinâmicos (preços, edições, datas) são do dia da captura.
