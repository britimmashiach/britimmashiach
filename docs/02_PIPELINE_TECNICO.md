# PROJETO TEHILIM — PIPELINE TÉCNICO DE PRODUÇÃO
## Arquivo de Conhecimento | Geração de Arquivos DOCX

---

## 1. AMBIENTE DE EXECUÇÃO

| Componente | Especificação |
|------------|---------------|
| Runtime | Node.js |
| Biblioteca DOCX | `docx@9.5.3` (instalada globalmente) |
| Reparação DOCX | Python — módulo `zipfile` |
| Adaptação de scripts | `sed` para clonagem entre blocos |
| Fonte corpo | Open Sans |
| Fonte hebraico | Shlomo Stam (dependência do cliente Windows) |

---

## 2. PIPELINE DE PRODUÇÃO COMPLETO

```
PASSO 1: Gerar arquivo JavaScript de dados
         → dados_salmos_X_Y.js
         → Contém todas as análises kabalísticas do bloco
         → Segue o esquema obrigatório do Salmo 139

PASSO 2: Gerar script gerador DOCX
         → gen_livroN_salmosX_Y.js
         → Usa docx@9.5.3
         → Referencia o arquivo de dados gerado no Passo 1

PASSO 3: Adaptar scripts para novos blocos via sed
         → Substituir: nome do módulo
         → Substituir: nome da variável de exportação
         → Substituir: string do nome do arquivo de saída
         → Substituir: string do título

PASSO 4: Executar e validar
         → Zero hifens duplos (em-dashes)
         → Zero ocorrências de <w:pgNum>
         → Fontes corretas em todo o documento
```

---

## 3. PADRÃO sed PARA ADAPTAÇÃO DE BLOCOS

```bash
sed 's/tehilim_1_10/tehilim_X_Y/g; \
     s/tehilim1a10/tehilimXaY/g; \
     s/Salmos_1_10/Salmos_X_Y/g' \
     gen_bloco1_v2.js > gen_blocoN.js
```

**Substituições obrigatórias em cada adaptação:**
1. Nome do módulo (ex: `tehilim_1_10` → `tehilim_73_83`)
2. Nome da variável de exportação (ex: `tehilim1a10` → `tehilim73a83`)
3. String do arquivo de saída (ex: `Salmos_1_10` → `Salmos_73_83`)
4. String do título do documento

---

## 4. ESQUEMA OBRIGATÓRIO DO ARQUIVO DE DADOS JS

Cada Salmo no arquivo de dados deve conter exatamente estes campos:

```javascript
{
  number: 73,          // número do Salmo
  hebrew: "...",       // texto hebraico
  versoRaiz: "...",    // versículo raiz com transliteração
  palavraChave: "...", // palavra-chave kabalística

  parteI: {
    analiseLetras: [],     // análise letra por letra
    tzerufim: [],          // permutações
    gematria: {},          // guematria com decomposição sefirótica
    analisesAdicionais: [] // análises de versículos-chave
  },

  parteII: {
    netivot: []  // versículos com netiv, função e Sod
  },

  parteIII: {
    ciclosSefirot: [],   // ciclos temáticos
    estruturaGlobal: "", // estrutura global
    sodFinal: ""         // segredo místico supremo
  }
}
```

---

## 5. CONFIGURAÇÃO DE RUNS DE TEXTO HEBRAICO

```javascript
// CORRETO — Run hebraico
new TextRun({
  text: "טֶקְסט",
  font: "Shlomo Stam",
  heb: true,
  rtl: true,
  color: "B8860B"  // ouro
  // NUNCA adicionar bold: true em runs hebraicos
})
```

**⚠️ CRÍTICO:** `bold: true` NUNCA deve acompanhar `heb: true`.  
Causa desfoque visual na fonte caligráfica Shlomo Stam.

---

## 6. NUMERAÇÃO DE PÁGINAS — SOLUÇÃO CORRETA

```javascript
// ❌ ERRADO — gera XML inválido que o Word rejeita
PageNumberElement()
// Produz: <w:pgNum/> — elemento inválido no OOXML

// ✅ CORRETO — compatível com Word
SimpleField('PAGE')
// Produz: sequência correta de <w:fldChar> + <w:instrText>
```

---

## 7. WORKFLOW DE REPARAÇÃO DOCX (Python)

Quando um arquivo DOCX está corrompido ou com XML inválido:

```python
import zipfile
import io

# 1. Ler todas as entradas ZIP para um dicionário em memória
with zipfile.ZipFile('arquivo.docx', 'r') as z:
    entries = {name: z.read(name) for name in z.namelist()}

# 2. Modificar word/document.xml em memória
xml_content = entries['word/document.xml'].decode('utf-8')
xml_content = xml_content.replace('ANTIGO', 'NOVO')
entries['word/document.xml'] = xml_content.encode('utf-8')

# 3. Reescrever o ZIP preservando todos os outros arquivos
with zipfile.ZipFile('arquivo_corrigido.docx', 'w',
                     zipfile.ZIP_DEFLATED) as z:
    for name, data in entries.items():
        z.writestr(name, data)
```

---

## 8. CHECKLIST DE VALIDAÇÃO PÓS-GERAÇÃO

```
[ ] Zero em-dashes (—) no documento
[ ] Zero en-dashes (–) no documento — usar apenas hifens (-)
[ ] Zero ocorrências de <w:pgNum> no XML
[ ] Fonte Open Sans em todo o texto corpo
[ ] Fonte Shlomo Stam em todos os runs hebraicos
[ ] Nenhum run hebraico com bold: true
[ ] Zero espaços duplos
[ ] Zero espaço antes de vírgula
[ ] Zero espaço antes de pipe (|)
[ ] Zero parênteses duplos de fechamento "))
[ ] Acentuação portuguesa plena e correta
```

---

## 9. CONVENÇÃO DE NOMENCLATURA DE ARQUIVOS

```
Dados JS:      dados_salmos_X_Y.js
Script gerador: gen_livroN_salmosX_Y.js
DOCX final:    Tehilim_LivroN_Salmos_X_Y_CORRIGIDO.docx
```

---

## 10. DEPENDÊNCIA DE FONTE CLIENTE

A fonte **Shlomo Stam** deve estar instalada na máquina Windows que abrirá o arquivo.  
Isso é uma dependência do cliente — não um erro de script.  
O arquivo DOCX referencia a fonte corretamente; a renderização depende da instalação local.

---

*Arquivo gerado automaticamente a partir das conversas do projeto.*  
*Última atualização: maio de 2026*
