#!/usr/bin/env node
// Verifica se a coluna subscription_current_period_end existe em profiles.
// Se não existir, imprime a SQL para o user rodar no Supabase Studio.
//
// Uso: npx tsx --env-file=.env.local scripts/check-subscription-column.mjs
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

const { error } = await supabase
  .from('profiles')
  .select('subscription_current_period_end')
  .limit(1)

if (error) {
  console.log('\n⚠ Coluna subscription_current_period_end NÃO EXISTE.\n')
  console.log('Rode a SQL abaixo no Supabase Studio → SQL Editor:\n')
  console.log('-----')
  console.log(`ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_profiles_subscription_period_end
  ON public.profiles(subscription_current_period_end)
  WHERE subscription_current_period_end IS NOT NULL;

COMMENT ON COLUMN public.profiles.subscription_current_period_end IS
  'Data e hora em que o período atual da assinatura termina (Stripe subscription.current_period_end). Atualizado pelo webhook.';`)
  console.log('-----\n')
  console.log('Detalhes do erro:', error.message)
  process.exit(1)
} else {
  console.log('✓ Coluna subscription_current_period_end existe.')
}
