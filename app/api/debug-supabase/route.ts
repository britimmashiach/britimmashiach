import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  if (!url || !key) {
    return NextResponse.json({ error: 'env vars ausentes', url: !!url, key: !!key })
  }

  try {
    const supabase = createClient(url, key)
    const { data, error, count } = await supabase
      .from('parashot')
      .select('slug', { count: 'exact', head: false })
      .limit(3)

    if (error) {
      return NextResponse.json({ error: error.message, code: error.code, details: error.details })
    }

    return NextResponse.json({ ok: true, count, sample: data })
  } catch (err) {
    return NextResponse.json({ error: String(err) })
  }
}
