# Vidamed — Site + Plataforma de Gestão

Site institucional one-page + plataforma interna (mockup) para a **Vidamed Gestão**, empresa de gestão administrativa, financeira e estratégica para médicos.

> **De médico para médico. Com estratégia e empatia, de verdade.**

## ✨ O que tem aqui

### Site público (`/`)
One-page com identidade visual da marca:
- Hero com globo 3D mostrando rede de médicos pelo Brasil (Three.js + R3F)
- Quem Somos · Para Quem Existimos · Soluções · Planos · Clube de Treinamentos · Por Que Escolher · Passo a Passo · Footer
- WhatsApp flutuante + CTAs integrados

### Plataforma interna (`/app`)
Dois perfis com permissões distintas:
- **`gestor@vidamedgestao.com.br`** — visão estratégica (somente leitura)
- **`financeiro@vidamedgestao.com.br`** — administrativo (cadastros + lançamentos)

Telas:
- **Dashboard** com KPIs comparativos (mês atual vs anterior), Top 5 médicos expandível e faturamento por instituição
- **Médicos** — lista filtrável, cadastro multi-seção com upload de documentos (RG/CNH, comp. residência, diploma, CRM), detalhe com histórico financeiro
- **Pagamentos** — histórico filtrável, lançamento de faturamento com cálculo automático e **modal de preview do e-mail para a contabilidade**, detalhe replicando o layout da planilha original

## 🛠 Stack

- **Vite** + **React 18** + **React Router**
- **TailwindCSS** com paleta da marca (`#003869`, `#009E3D`, `#EFEFEF`)
- **Three.js** + **React Three Fiber** + **drei** para o globo 3D
- **lucide-react** para ícones
- Dados em memória (sem backend nesta fase — apenas seed)

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:5173

### Login de demonstração
Use os botões de acesso rápido na tela de login ou digite um dos e-mails:
- `gestor@vidamedgestao.com.br`
- `financeiro@vidamedgestao.com.br`

(Sem validação de senha — é mockup.)

## 📁 Estrutura

```
src/
├─ App.jsx                 # rotas
├─ main.jsx
├─ index.css
├─ data/                   # dados-semente (médicos, instituições, pagamentos)
├─ lib/                    # storage, auth, formatadores
├─ site/                   # site público
│  ├─ Home.jsx
│  └─ components/          # Hero (Globo 3D), Solucoes, Planos, etc.
└─ app/                    # plataforma interna
   ├─ Login.jsx
   ├─ Layout.jsx
   ├─ Dashboard.jsx
   ├─ medicos/             # MedicosList, MedicoForm, MedicoDetalhe
   └─ pagamentos/          # PagamentoHistorico, PagamentoLancar, PagamentoDetalhe
```

## 📌 Próximos passos (fora deste mockup)

- Backend real (Supabase ou similar) com RLS por perfil
- Upload de documentos com storage criptografado
- Integração de e-mail para a contabilidade (SendGrid / Resend)
- Autenticação real (magic link ou OAuth)
- Auditoria de quem modificou cada lançamento

---

© Vidamed Gestão · Maceió/AL
