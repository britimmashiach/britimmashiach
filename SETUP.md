# Brit Mashiach - Setup e Deploy

## Pré-requisitos

- Node.js 20+ (nodejs.org/en/download)
- Conta Supabase (supabase.com)
- Conta Stripe (stripe.com)
- Conta Vercel (vercel.com) - para deploy

---

## 1. Instalar Node.js

Baixe e instale em **nodejs.org**. Após instalar, reinicie o terminal e confirme:

```
node --version   # deve mostrar v20.x ou superior
npm --version    # deve mostrar 10.x ou superior
```

---

## 2. Instalar dependências

```bash
cd C:/Sinagoga/Claude/projetos/brit-mashiach
npm install
```

---

## 3. Configurar Supabase

### 3.1 Criar projeto
1. Acesse supabase.com e crie um novo projeto
2. Anote a região (recomendado: South America)

### 3.2 Executar schema
1. No dashboard do projeto, acesse **SQL Editor**
2. Cole e execute o conteúdo de `supabase/schema.sql`
3. Confirme que as tabelas foram criadas em **Table Editor**

### 3.3 Configurar Auth
1. Em **Authentication > Providers**, habilite Email
2. Em **Authentication > Email Templates**, personalize os emails (opcional)
3. Em **Authentication > URL Configuration**, defina:
   - Site URL: `https://brit-mashiach.vercel.app`
   - Redirect URLs: `https://brit-mashiach.vercel.app/**`

### 3.4 Copiar chaves
Em **Settings > API**:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

---

## 4. Configurar Stripe

### 4.1 Criar produto
1. Em stripe.com, acesse **Products > Add Product**
2. Nome: "Brit Mashiach Premium"
3. Adicione um preço: **R$ 47,00 / mês** (recorrente, BRL)
4. Copie o **Price ID** (price_xxx) → `STRIPE_PRICE_ID_PREMIUM`

### 4.2 Configurar webhook (após deploy)
1. Em **Developers > Webhooks > Add endpoint**
2. URL: `https://brit-mashiach.vercel.app/api/stripe/webhook`
3. Eventos a ouvir:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copie o **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### 4.3 Copiar chaves
Em **Developers > API Keys**:
- Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Secret key → `STRIPE_SECRET_KEY`

---

## 5. Variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e preencha com todos os valores das etapas 3 e 4.

---

## 6. Fonte hebraica (Shlomo Stam)

A fonte Shlomo Stam não é de código aberto. Para o ambiente de desenvolvimento:
1. Obtenha o arquivo `ShlomStam.ttf`
2. Coloque em `public/fonts/ShlomStam.ttf`

O `@font-face` já está configurado em `globals.css`. Sem o arquivo TTF, o sistema usa `Times New Roman` como fallback.

---

## 7. Ícones PWA

Gere os ícones PNG nas seguintes dimensões e coloque em `public/icons/`:
- icon-72.png, icon-96.png, icon-128.png, icon-144.png
- icon-152.png, icon-192.png, icon-384.png, icon-512.png

Use uma ferramenta como **realfavicongenerator.net** ou **maskable.app**.

---

## 8. Rodar localmente

```bash
npm run dev
```

Acesse http://localhost:3000

---

## 9. Build de produção (verificar antes de deploy)

```bash
npm run build
npm run type-check
```

Corrija quaisquer erros antes de fazer o deploy.

---

## 10. Deploy na Vercel

### Opção A: CLI
```bash
npm install -g vercel
vercel --prod
```

### Opção B: GitHub + Vercel
1. Crie um repositório no GitHub
2. Faça push do projeto
3. Conecte o repositório na Vercel
4. Adicione todas as variáveis de ambiente no dashboard da Vercel
5. Deploy automático a cada push na branch main

### Variáveis no dashboard Vercel
Adicione todas as do `.env.local.example` em:
Settings > Environment Variables

---

## 11. Verificação pós-deploy

- [ ] Home carrega com data hebraica
- [ ] Dark/light mode funciona
- [ ] Login/cadastro funcionam
- [ ] Checkout Stripe abre corretamente
- [ ] Webhook responde (verificar logs na Vercel e no Stripe)
- [ ] Assinatura ativa muda `role` para `premium` no Supabase
- [ ] Conteúdo premium está bloqueado para usuários free
- [ ] Sitemap acessível em /sitemap.xml
- [ ] Manifest acessível em /manifest.json
