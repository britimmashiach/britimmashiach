# PROJETO TEHILIM — PADRÕES DE FORMATAÇÃO E DESIGN
## Arquivo de Conhecimento | Padrões Visuais e Tipográficos

---

## 1. PALETA DE CORES (HEX)

| Nome | Código HEX | Uso |
|------|-----------|-----|
| Azul profundo | `1F3864` | Títulos de seções (PARTE I/II/III), bordas inferiores |
| Ouro | `B8860B` | Texto hebraico, transliterações |
| Cinza | `595959` | Texto secundário |
| Roxo | `4B0082` | Traduções portuguesas de versículos |

---

## 2. TIPOGRAFIA

| Contexto | Fonte | Estilo |
|----------|-------|--------|
| Corpo do texto | Open Sans | Regular |
| Hebraico | Shlomo Stam | RTL, `heb: true`, NUNCA bold |
| Transliterações | Open Sans | Itálico, cor ouro `B8860B` |
| Traduções portuguesas | Open Sans | Cor roxo `4B0082` |

---

## 3. SEÇÕES EDITORIAIS FINAIS — FORMATAÇÃO

### APLICAÇÃO
- **Fundo:** `D6E4F0` (azul claro)
- **Conteúdo:** Resumo prático extraído exclusivamente do conteúdo existente

### KAVANÁH
- **Fundo:** `F0EAD6` (bege/areia)
- **Estilo:** Itálico
- **Conteúdo:** Intenção espiritual sintetizada do próprio texto

### AUTOANÁLISE
- **Fundo:** `EAF0E4` (verde claro)
- **Conteúdo:** 2 perguntas reflexivas derivadas do conteúdo

---

## 4. ESTRUTURA VISUAL POR SALMO

```
┌─────────────────────────────────────────────┐
│  TÍTULO DO SALMO                            │
│  (número + título hebraico + transliteração)│
├─────────────────────────────────────────────┤
│  TEXTO BASE                                 │
│  → Hebraico (Shlomo Stam, ouro)            │
│  → Transliteração (itálico, ouro)           │
│  → Tradução portuguesa (roxo)               │
├─────────────────────────────────────────────┤
│  PALAVRA-CHAVE                              │
├═════════════════════════════════════════════╡
│  PARTE I — FUNDAMENTOS              [BORDA] │
│  ─────────────────────────────────────────  │
│  4.1 Análise letra por letra                │
│  4.2 Tzerufim                               │
│  4.3 Guematria                              │
│  4.4 Análises adicionais                    │
├═════════════════════════════════════════════╡
│  PARTE II — PRINCÍPIO OPERACIONAL   [BORDA] │
│  ─────────────────────────────────────────  │
│  Versículo N                                │
│  Netiv: ...                                 │
│  Função: ...                                │
│  Sod: ...                                   │
├═════════════════════════════════════════════╡
│  PARTE III — ESTRUTURA GLOBAL       [BORDA] │
│  ─────────────────────────────────────────  │
│  → Ciclos Temáticos                         │
│  → Estrutura Global                         │
│  → Sod Final                                │
├─────────────────────────────────────────────┤
│  APLICAÇÃO          [fundo D6E4F0]          │
├─────────────────────────────────────────────┤
│  KAVANÁH            [fundo F0EAD6, itálico] │
├─────────────────────────────────────────────┤
│  AUTOANÁLISE        [fundo EAF0E4]          │
└─────────────────────────────────────────────┘
```

---

## 5. SUBSECÇÕES DA PARTE I — NOMENCLATURA OBRIGATÓRIA

```
4.1 — Análise Letra por Letra
4.2 — Tzerufim
4.3 — Guematria
4.4 — Análises Adicionais
```

---

## 6. BLOCO DE VERSÍCULO NA PARTE II — FORMATO VISUAL

```
───────────────────────────────────
Versículo [N]
[Texto hebraico — Shlomo Stam — ouro]
[Transliteração — itálico — ouro]
[Tradução — Open Sans — roxo]

Netiv: [caminho Sefirótico]
Função: [descrição da função]
Sod: [segredo místico]
───────────────────────────────────
```

---

## 7. REGRAS TIPOGRÁFICAS ABSOLUTAS

```
✅ Usar:        hífen simples (-)
✅ Usar:        vírgula como separador alternativo
✅ Usar:        acento pleno em todo o português

❌ Proibido:    em-dash (—)
❌ Proibido:    en-dash (–)
❌ Proibido:    espaço duplo
❌ Proibido:    espaço antes de vírgula
❌ Proibido:    espaço antes de pipe (|)
❌ Proibido:    parênteses duplos de fechamento "))
❌ Proibido:    bold em runs hebraicos (Shlomo Stam)
```

---

## 8. ESTRUTURA DE CADA VOLUME DOCX

1. Página de título
2. Introdução do Livro (contextualização kabalística do bloco)
3. Análises completas dos Salmos (estrutura trifásica)
4. Glossário kabalístico

---

## 9. FORMATAÇÃO DO TEXTO HEBRAICO NOS VERSÍCULOS

Após cada versículo hebraico na PARTE II, inserir na seguinte ordem:
1. Texto hebraico original (Shlomo Stam, RTL, cor ouro)
2. Transliteração portuguesa (Open Sans, itálico, cor ouro)
3. Tradução portuguesa (Open Sans, cor roxo `4B0082`)

---

## 10. BORDAS DE CABEÇALHO DE SEÇÃO

Os cabeçalhos PARTE I, PARTE II e PARTE III recebem:
- **Borda inferior:** cor `1F3864` (azul profundo)
- Espessura: padrão OOXML

---

*Arquivo gerado automaticamente a partir das conversas do projeto.*  
*Última atualização: maio de 2026*
