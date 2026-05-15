# PROJETO TEHILIM — LIÇÕES APRENDIDAS E ERROS CONHECIDOS
## Arquivo de Conhecimento | Debugging e Soluções

---

## 1. ERROS CRÍTICOS DOCUMENTADOS

---

### ERRO #1 — PageNumberElement() gera XML inválido

**Sintoma:** Arquivo DOCX não abre no Word; Word reporta arquivo corrompido.

**Causa raiz:** `PageNumberElement()` na biblioteca `docx@9.5.3` gera o elemento `<w:pgNum/>` que é XML inválido no padrão OOXML.

**Diagnóstico:**
```bash
# Inspecionar XML interno do DOCX
unzip -p arquivo.docx word/document.xml | grep -c "pgNum"
# Se retornar > 0, o arquivo está corrompido
```

**Solução:**
```javascript
// ❌ ERRADO
PageNumberElement()

// ✅ CORRETO
SimpleField('PAGE')
```

**Status:** Resolvido. Todos os volumes gerados após esta descoberta usam `SimpleField`.

---

### ERRO #2 — Bold em runs hebraicos causa desfoque

**Sintoma:** Texto em Shlomo Stam aparece borrado/desfocado no Word.

**Causa raiz:** A propriedade `bold: true` em combinação com fonte caligráfica causa conflito de renderização.

**Solução:**
```javascript
// ❌ ERRADO
new TextRun({ text: "טֶקְסט", font: "Shlomo Stam", heb: true, bold: true })

// ✅ CORRETO
new TextRun({ text: "טֶקְסט", font: "Shlomo Stam", heb: true })
// Nunca usar bold: true com heb: true
```

**Status:** Resolvido. Regra aplicada a todos os volumes.

---

### ERRO #3 — Script de correção pulava KAVANÁH

**Sintoma:** Seções KAVANÁH (texto português em itálico) não eram corrigidas ortograficamente.

**Causa raiz:** O script detectava transliterações pelo estilo `italic: true`, mas KAVANÁH também é itálico em português.

**Solução:**
```python
# ❌ ERRADO — detectar por itálico
def is_transliteration(run):
    return run.italic == True

# ✅ CORRETO — detectar por cor ouro
def is_transliteration(run):
    return run.font.color.rgb == RGBColor(0xB8, 0x86, 0x0B)
```

**Status:** Resolvido. A versão final do script usa detecção por cor.

---

### ERRO #4 — Adaptação de script incompleta via sed

**Sintoma:** Script adaptado para novo bloco ainda referenciava variáveis do bloco anterior.

**Causa raiz:** O padrão `sed` não cobria todas as ocorrências de nomes de módulos e variáveis.

**Solução:** Garantir que o `sed` substitua **todas** as quatro categorias:
1. Nome do módulo JS
2. Nome da variável de exportação
3. String do nome do arquivo de saída
4. String do título do documento

```bash
sed 's/MODULO_ANTIGO/MODULO_NOVO/g; \
     s/VAR_ANTIGA/VAR_NOVA/g; \
     s/ARQUIVO_ANTIGO/ARQUIVO_NOVO/g; \
     s/TITULO_ANTIGO/TITULO_NOVO/g' \
     script_antigo.js > script_novo.js
```

**Status:** Resolvido. Padrão documentado e validado.

---

### ERRO #5 — Fonte Shlomo Stam não renderiza no cliente

**Sintoma:** Texto hebraico aparece em fonte substituta genérica no Word.

**Causa raiz:** Shlomo Stam não está instalada na máquina Windows do cliente.

**Diagnóstico:** Não é erro de script — o DOCX referencia a fonte corretamente.

**Solução:** Instalar a fonte Shlomo Stam na máquina Windows que abrirá o arquivo. Esta é uma dependência do lado do cliente.

**Status:** Documentado como requisito de instalação.

---

## 2. CHECKLIST ANTI-ERROS PARA NOVOS BLOCOS

```
ANTES DE GERAR:
[ ] Esquema de dados segue exatamente o modelo do Salmo 139
[ ] Todos os campos obrigatórios presentes (parteI, parteII, parteIII)
[ ] Transliterações fixas usadas (Toráh, Moshê, Yeshua, Kabaláh com K...)
[ ] Valores de guematria corretos (El=31, Echad=13, YHVH=26...)
[ ] Nenhuma citação externa inventada

APÓS GERAR:
[ ] Abrir arquivo no Word — sem mensagem de reparo
[ ] grep -c "pgNum" no XML = 0
[ ] grep -c "em-dash\|—\|–" no XML = 0
[ ] Texto hebraico em Shlomo Stam, RTL, sem bold
[ ] Seções APLICAÇÃO, KAVANÁH, AUTOANÁLISE presentes em cada Salmo
[ ] Cores corretas: azul 1F3864, ouro B8860B, cinza 595959, roxo 4B0082
```

---

## 3. LIÇÕES METODOLÓGICAS

1. **Sempre validar XML interno** antes de entregar o DOCX
2. **Nunca assumir compatibilidade** de APIs de geração com versões específicas da biblioteca
3. **O padrão sed é confiável** para adaptação entre blocos, desde que todas as 4 categorias sejam cobertas
4. **Detecção de tipo de run** deve ser por cor, não por estilo, para evitar falsos positivos
5. **A reparação via Python zipfile** é robusta para correção in-memory sem comprometer outros arquivos do ZIP

---

*Arquivo gerado automaticamente a partir das conversas do projeto.*  
*Última atualização: maio de 2026*
