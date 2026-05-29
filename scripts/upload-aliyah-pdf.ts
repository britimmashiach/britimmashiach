/**
 * upload-aliyah-pdf.ts
 *
 * Sobe um PDF de Aliyah para o Supabase Storage nos dois slugs informados.
 *
 * Uso:
 *   tsx --env-file=.env.local scripts/upload-aliyah-pdf.ts <pdf_path> <book> <slug1> <slug2> <aliyah_number>
 *
 * Exemplo (Matot-Masei mechubarot, 1a Aliyah):
 *   tsx --env-file=.env.local scripts/upload-aliyah-pdf.ts \
 *     "C:/Sinagoga/gerados/aliyot/42a_Parashat_Matot-Masei_1a_Aliyah.pdf" \
 *     bamidbar matot masei 1
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET       = 'parashot-pdfs'

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Variáveis de ambiente ausentes (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)')
  process.exit(1)
}

const [, , pdfPath, book, ...rest] = process.argv
const aliyahNumber = rest.pop()
const slugs = rest

if (!pdfPath || !book || slugs.length === 0 || !aliyahNumber) {
  console.error('Uso: upload-aliyah-pdf.ts <pdf_path> <book> <slug1> [slug2 ...] <aliyah_number>')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

async function main(): Promise<void> {
  const pdfBuffer = readFileSync(pdfPath)
  console.log(`\nPDF: ${basename(pdfPath)} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`)
  console.log(`Bucket: ${BUCKET}`)
  console.log(`Aliyah: ${aliyahNumber}\n`)

  for (const slug of slugs) {
    const targetPath = `${book}/${slug}/aliyah-${aliyahNumber}.pdf`
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(targetPath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      })

    if (error) {
      console.log(`  ERRO  ${targetPath}: ${error.message}`)
      process.exit(1)
    }
    console.log(`  OK    ${targetPath}`)
  }

  console.log('\nUpload concluído.\n')
}

main().catch((err) => {
  console.error('Falha:', err)
  process.exit(1)
})
