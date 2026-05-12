/**
 * seed-aliyot.ts
 *
 * Popula a tabela `aliyot` com 7 registros placeholder para cada Parashá
 * existente em `parashot`. Resultado esperado: 54 × 7 = 378 linhas.
 *
 * Uso:
 *   npm run seed:aliyot
 *
 * Depois (para preencher pdf_url a partir do Storage):
 *   npm run sync:pdfs
 *
 * Ou combinado:
 *   npm run populate
 *
 * Variáveis obrigatórias em .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (formato atual do Supabase, ex.: sb_secret_...)
 *
 * Observações sobre o schema real (supabase/migrations/20260510_parashot_aliyot.sql):
 *   - day_of_week é NOT NULL (CHECK BETWEEN 0 AND 6). Convenção:
 *       Aliyah 1 → Yom Rishon (0) ... Aliyah 7 → Shabat (6)
 *   - title é NOT NULL. Placeholder: "Aliyah N".
 *   - content tem default '', preenchido com placeholder padrão.
 *   - level_pardes é TEXT[] (não objeto JSON).
 *   - is_premium NÃO existe nesta tabela; o gating é por aliyah_number
 *     e perfil do usuário (ver components/parashot/AliyotList.tsx).
 *   - UNIQUE (parasha_id, aliyah_number) garante idempotência via upsert.
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('\n❌ Variáveis de ambiente ausentes:')
  if (!SUPABASE_URL) console.error('   NEXT_PUBLIC_SUPABASE_URL não definida')
  if (!SERVICE_KEY)  console.error('   SUPABASE_SERVICE_ROLE_KEY não definida')
  console.error('\n   Adicione-as ao .env.local e rode novamente.\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

const ALIYOT_TITLES: Record<number, string> = {
  1: 'Aliyah 1',
  2: 'Aliyah 2',
  3: 'Aliyah 3',
  4: 'Aliyah 4',
  5: 'Aliyah 5',
  6: 'Aliyah 6',
  7: 'Aliyah 7',
}

const PLACEHOLDER_CONTENT = 'Conteúdo desta Aliyáh em preparação pelo Rav.'

const BATCH_SIZE = 100

interface AliyahSeed {
  parasha_id:    string
  aliyah_number: number
  day_of_week:   number
  title:         string
  content:       string
  level_pardes:  string[]
}

async function main(): Promise<void> {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  seed-aliyot — Brit Mashiach Platform')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const { data: parashot, error: pErr } = await supabase
    .from('parashot')
    .select('id, slug, week_number')
    .order('week_number')

  if (pErr) {
    console.error('❌ Erro ao buscar parashot:', pErr.message)
    process.exit(1)
  }

  if (!parashot?.length) {
    console.error('❌ Nenhuma Parashá encontrada em `parashot`.')
    console.error('   Execute primeiro o seed das 54 Parashiot oficiais.\n')
    process.exit(1)
  }

  console.log(`  Parashot encontradas : ${parashot.length}`)

  const records: AliyahSeed[] = parashot.flatMap((p) =>
    Array.from({ length: 7 }, (_, i) => {
      const n = i + 1
      return {
        parasha_id:    p.id,
        aliyah_number: n,
        day_of_week:   n - 1,
        title:         ALIYOT_TITLES[n],
        content:       PLACEHOLDER_CONTENT,
        level_pardes:  [],
      }
    }),
  )

  console.log(`  Registros a inserir  : ${records.length} (${parashot.length} × 7)\n`)
  console.log('─────────────────────────────────────────────────────────')

  let inserted = 0
  let skipped  = 0

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE)

    const { data, error: uErr } = await supabase
      .from('aliyot')
      .upsert(batch, {
        onConflict: 'parasha_id,aliyah_number',
        ignoreDuplicates: true,
      })
      .select('id')

    if (uErr) {
      console.error(`❌ Erro no batch ${i + 1}-${i + batch.length}: ${uErr.message}`)
      process.exit(1)
    }

    const n = data?.length ?? 0
    inserted += n
    skipped  += batch.length - n

    const from = i + 1
    const to   = i + batch.length
    console.log(`  Batch ${from.toString().padStart(3)}-${to.toString().padStart(3)} → ${n} inseridos, ${batch.length - n} já existiam`)
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`  ✔  Inseridos    : ${inserted}`)
  console.log(`  –  Ignorados    : ${skipped} (já existiam)`)
  console.log(`  Σ  Total final  : ${inserted + skipped}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  if (inserted + skipped !== records.length) {
    console.error('⚠  ALERTA: total divergente do esperado.\n')
    process.exit(1)
  }

  if (inserted > 0) {
    console.log('  Próximo passo:  npm run sync:pdfs\n')
  }
}

main().catch((err) => {
  console.error('\n❌ Falha inesperada:', err)
  process.exit(1)
})
