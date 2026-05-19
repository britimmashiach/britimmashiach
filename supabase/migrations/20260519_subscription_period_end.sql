-- Adiciona coluna para data de renovação da assinatura (current_period_end do Stripe).
-- Permite exibir ao membro "Renova em DD/MM/YYYY" no perfil, e ao admin
-- ter visibilidade da próxima cobrança.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_profiles_subscription_period_end
  ON public.profiles(subscription_current_period_end)
  WHERE subscription_current_period_end IS NOT NULL;

COMMENT ON COLUMN public.profiles.subscription_current_period_end IS
  'Data e hora em que o período atual da assinatura termina (Stripe subscription.current_period_end). Atualizado pelo webhook.';
