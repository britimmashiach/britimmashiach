import { getSupabaseAdmin, hasServiceRoleEnv } from '../lib/supabase-admin'

const id = '203861f1-0645-40f6-99d0-884605e1b607'

async function main() {
  console.log('hasServiceRoleEnv', hasServiceRoleEnv())
  const admin = getSupabaseAdmin()
  const { data, error } = await admin
    .from('aliyot')
    .select('id, aliyah_number, pdf_url, pdf_premium_url, pdf_kabbalah_url, parasha_id')
    .eq('id', id)
    .single()
  console.log('error', error?.message)
  console.log('data', data)
  if (!data?.parasha_id) return
  const p = await admin.from('parashot').select('is_premium').eq('id', data.parasha_id).single()
  console.log('parasha', p.data, p.error?.message)
}

main()
