import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { profileHasLeaderAccess } from '@/lib/leader-access-policy'
import { LeaderGate } from '@/components/ui/LeaderGate'

interface LeaderPortalGuardProps {
  resourceName: string
  pendingDescription?: string
  children: React.ReactNode
}

/**
 * Gate unificado para rotas do portal de lideres (is_leader ou admin).
 */
export async function LeaderPortalGuard({
  resourceName,
  pendingDescription,
  children,
}: LeaderPortalGuardProps) {
  const auth = await getAuthSnapshot()
  const isLoggedIn = Boolean(auth.user)
  const hasLeader = isLoggedIn && profileHasLeaderAccess(auth.profile)

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <LeaderGate resourceName={resourceName} />
      </div>
    )
  }

  if (!hasLeader) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <LeaderGate
          resourceName={resourceName}
          description={
            pendingDescription ??
            'Sua conta está ativa, mas ainda não consta como líder aprovado. O Rav EBBY libera o acesso manualmente após conversa e discernimento pastoral. Premium pago não libera este conteúdo.'
          }
        />
      </div>
    )
  }

  return <>{children}</>
}

export async function getLeaderFirstName(): Promise<string> {
  const auth = await getAuthSnapshot()
  return auth.sessionDisplay?.firstName ?? 'Líder'
}
