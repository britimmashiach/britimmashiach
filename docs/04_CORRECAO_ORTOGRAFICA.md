# PROJETO TEHILIM — CORREÇÃO ORTOGRÁFICA PORTUGUESA
## Arquivo de Conhecimento | Script de Correção e Regras

---

## 1. VISÃO GERAL

Um script de correção ortográfica (`corrige_portugues.py`) foi desenvolvido com **319 regras de correção** para garantir acentuação plena em todo o material.

---

## 2. CATEGORIAS DE CORREÇÃO

### 2.1 Tildes Ausentes
```
nao       → não
sao       → são
aguas     → águas
tambem    → também
porem     → porém
```

### 2.2 Cedilhas Ausentes
```
presenca  → presença
sentenca  → sentença
alcanca   → alcança
comeca    → começa
```

### 2.3 Acentos Agudos em Proparoxítonas
```
nivel     → nível
proprio   → próprio
lagrima   → lágrima
numero    → número
simbolo   → símbolo
```

### 2.4 Terminações -ção / -são
```
declaracao  → declaração
invocacao   → invocação
visao       → visão
missao      → missão
(e muitas outras)
```

### 2.5 Adjetivos com Acento
```
cosmico    → cósmico
historico  → histórico
mistico    → místico
critico    → crítico
```

### 2.6 Correções Contextuais Específicas
```
corsa → corça  (contexto específico do material)
```

---

## 3. LÓGICA CRÍTICA — DETECÇÃO DE TRANSLITERAÇÕES

### Problema encontrado na versão inicial:
O script original pulava todos os runs em itálico, tratando-os como transliterações hebraicas. **Isso era incorreto** porque as seções KAVANÁH são texto português em itálico que precisa de correção.

### Solução implementada:
Detectar transliterações **exclusivamente pela cor ouro** (`B8860B`), não pelo estilo itálico.

```python
def is_transliteration(run):
    # CORRETO: detectar por cor, não por itálico
    return run.font.color.rgb == RGBColor(0xB8, 0x86, 0x0B)

# NÃO fazer:
# return run.italic == True  ← ERRADO, pula KAVANÁH
```

---

## 4. PRESERVAÇÃO DE FORMAS VERBAIS

**Caso específico documentado:**

A forma verbal `especifica` (terceira pessoa singular do presente) **NÃO deve ser acentuada** para `específica`.

```
especifica (verbo, 3ª pessoa)  → manter sem acento ✅
específica (adjetivo)          → acentuar ✅
```

O script deve distinguir contexto para evitar acento incorreto em formas verbais.

---

## 5. ESCOPO DE APLICAÇÃO

O script foi aplicado a todos os **7 volumes completos**:
- Livro I: Salmos 1–10, 11–20, 21–30, 31–41
- Livro II: Salmos 42–51, 52–64, 65–72

**Resultado final:** Zero erros de acentuação confirmados nos 7 arquivos.

---

## 6. TEXTO HEBRAICO — NUNCA CORRIGIR

Runs com fonte Shlomo Stam ou flag `heb: true` devem ser **completamente ignorados** pelo correto. Nunca aplicar transformações ortográficas em texto hebraico.

---

## 7. CONVENÇÃO DE NOMENCLATURA DOS ARQUIVOS CORRIGIDOS

```
[NOME_ORIGINAL]_CORRIGIDO.docx
```

Exemplo:
```
Tehilim_Livro1_Salmos_1_10_CORRIGIDO.docx
Tehilim_Livro2_Salmos_42_51_CORRIGIDO.docx
```

---

*Arquivo gerado automaticamente a partir das conversas do projeto.*  
*Última atualização: maio de 2026*
