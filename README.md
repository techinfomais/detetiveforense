# Sorte Viva

Aplicação estática em Next.js 16 e React 19, baseada no DESIGNSYSTEM.md e sem logo.

## Desenvolvimento

```sh
bun install
bun run dev
```

## Validação e publicação estática

```sh
bun run typecheck
bun run lint
bun run build
```

O build gera a pasta `out/`, pronta para uma hospedagem de arquivos estáticos. As rotas usam diretórios com `index.html`.

## Telas e interações

- Home responsiva com banners próprios em CSS, seletores de quantidade e adição de todos os sorteios do dia.
- Carrinho persistido no navegador, com edição de quantidade e remoção de itens.
- Checkout demonstrativo: identificação fictícia, revisão do carrinho e confirmação sem cobrança.
- Resultados com filtros de categoria e detalhes.
- Acesso à conta, meus títulos e perfil em estado demonstrativo.
- Contato e formulários de parceria com confirmação local.
- Perguntas frequentes, regulamento, termos, privacidade e jogo responsável.
- Páginas de apresentação para assinaturas e clube de benefícios.

Os dados ilustrativos estão em `components/sorteviva/app.tsx`. Os estilos, tokens e breakpoints estão em `app/globals.css`.

## Escopo

Não há backend, autenticação real, envio de formulários, emissão de títulos ou pagamentos. O carrinho usa localStorage; os demais campos não são persistidos. Textos institucionais e informações de operação são demonstrativos e deverão ser substituídos pelos documentos oficiais para uma operação real.
