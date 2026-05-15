# PROJETO TEHILIM — ÍNDICE MESTRE DE CONHECIMENTO
## Rav EBBY | Congregação Brit Im Mashiach | Franca/SP

---

## SOBRE ESTE ARQUIVO

Este índice consolida todo o conhecimento gerado nas sessões de trabalho deste projeto em arquivos estruturados, prontos para importação em qualquer sistema de gerenciamento de projetos ou base de conhecimento.

Gerado em: maio de 2026  
Fonte: Conversas do projeto no Claude (Anthropic)

---

## ARQUIVOS GERADOS

| # | Arquivo | Conteúdo |
|---|---------|----------|
| 01 | `01_PROJETO_VISAO_GERAL.md` | Visão geral, estado dos volumes, estrutura de análise por Salmo, valores de guematria, transliterações fixas |
| 02 | `02_PIPELINE_TECNICO.md` | Pipeline completo de produção DOCX, esquema JS, configuração de runs hebraicos, numeração de páginas, checklist |
| 03 | `03_PADROES_FORMATACAO.md` | Paleta de cores, tipografia, estrutura visual por Salmo, regras tipográficas absolutas |
| 04 | `04_CORRECAO_ORTOGRAFICA.md` | Script de correção, 319 regras, lógica de detecção por cor, preservação de formas verbais |
| 05 | `05_LICOES_APRENDIDAS.md` | 5 erros críticos documentados com causa raiz e solução, checklist anti-erros |
| 06 | `06_CONTEUDO_KABALISTICO.md` | Método PaRDeS, terminologia, 10 Sefirot, guematria, tzerufim, netivot, estrutura PaRDeS III |
| 07 | `07_PROJETO_ALEFBET_NIVEL2.md` | Análise do Nível 1, proposta de Nível 2 com 4 pilares e 12 módulos, conexão com Tehilim |

---

## RESUMO EXECUTIVO DO PROJETO

### O que é
Análise kabalística completa dos 150 Salmos em português, seguindo o método Lurianico-PaRDeS, ~8 páginas por Salmo, publicados em volumes DOCX.

### Onde está
- **Completo:** Salmos 1–72 (7 volumes, Livros I e II)
- **Em andamento:** Salmos 73–83 (Bloco Asaf, Livro III)
- **Próximo:** Salmos 84–89 (conclusão do Livro III)
- **Planejado:** Salmos 90–150 (Livros IV e V)

### Como funciona
```
1. Gerar dados JS (dados_salmos_X_Y.js)
2. Gerar script DOCX (gen_livroN_salmosX_Y.js)
3. Adaptar com sed para novos blocos
4. Validar: zero em-dashes, zero w:pgNum, fontes corretas
5. Aplicar correção ortográfica (corrige_portugues.py)
6. Entregar: Tehilim_LivroN_Salmos_X_Y_CORRIGIDO.docx
```

### Regras invioláveis
- Open Sans para corpo | Shlomo Stam para hebraico
- Nunca bold em runs hebraicos
- Nunca em-dash ou en-dash (usar hífen)
- SimpleField('PAGE') para numeração, nunca PageNumberElement()
- Acentuação portuguesa plena em todo o material
- Transliterações fixas (Kabaláh com K, Moshê, Yeshua, etc.)

---

## COMO USAR ESTES ARQUIVOS

### Em um novo projeto Claude:
1. Faça upload de todos os 7 arquivos .md como "conhecimento do projeto"
2. O Claude terá acesso imediato a todo o contexto acumulado
3. Não será necessário reexplicar regras, padrões ou histórico

### Para novos colaboradores:
- Começar pela leitura de `01_PROJETO_VISAO_GERAL.md`
- Depois `06_CONTEUDO_KABALISTICO.md` para entender o método
- Depois `02_PIPELINE_TECNICO.md` para entender a produção
- Por fim `05_LICOES_APRENDIDAS.md` para evitar erros conhecidos

---

## PRÓXIMOS PASSOS DO PROJETO

```
[ ] Gerar dados_salmos_84_89.js
[ ] Gerar gen_livro3_salmos84_89.js
[ ] Validar e entregar Tehilim_Livro3_Salmos_84_89_CORRIGIDO.docx
[ ] Iniciar planejamento do Livro IV (Salmos 90–106)
[ ] Coordenar Salmo 119 com Projeto AlefBet Nível 2
```

---

*Índice mestre do projeto — Rav EBBY | Brit Im Mashiach | Franca/SP*
