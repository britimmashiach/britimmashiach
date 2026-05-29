import { createClient } from '@supabase/supabase-js'

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const sb = createClient(url, key, { auth: { persistSession: false } })
  const slugs = ['matot', 'masei', 'nasso', 'behaalotecha', 'shelach']
  const { data, error } = await sb
    .from('parashot')
    .select('*')
    .in('slug', slugs)
    .order('week_number')
  if (error) {
    console.error(error)
    process.exit(1)
  }
  console.log('slug'.padEnd(16), 'title'.padEnd(16), 'wk '.padEnd(4), 'premium')
  for (const p of data!) {
    console.log(
      p.slug.padEnd(16),
      (p.title || '').padEnd(16),
      String(p.week_number).padEnd(4),
      p.is_premium,
    )
  }
}

main()
