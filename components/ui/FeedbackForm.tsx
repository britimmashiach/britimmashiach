'use client'

import { useState } from 'react'
import { Loader2, MessageSquareHeart, Send } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type Category = 'sugestao' | 'opiniao' | 'reclamacao'

const CATEGORIES: { id: Category; label: string; desc: string }[] = [
  { id: 'sugestao', label: 'Sugestão', desc: 'Ideia para melhorar a plataforma ou a congregação' },
  { id: 'opiniao', label: 'Opinião', desc: 'Comentário geral sobre estudos, eventos ou conteúdo' },
  { id: 'reclamacao', label: 'Reclamação', desc: 'Algo que não funcionou ou precisa de atenção' },
]

interface FeedbackFormProps {
  defaultEmail?: string | null
  defaultName?: string | null
}

export function FeedbackForm({ defaultEmail, defaultName }: FeedbackFormProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [contactName, setContactName] = useState(defaultName ?? '')
  const [contactEmail, setContactEmail] = useState(defaultEmail ?? '')
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!category) {
      toast.error('Selecione o tipo de mensagem')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          category,
          subject,
          message,
          contactName,
          contactEmail,
          website,
        }),
      })

      const data = (await res.json()) as { ok?: boolean; error?: string }

      if (!res.ok || data.error) {
        toast.error('Não foi possível enviar', { description: data.error || `Erro ${res.status}` })
        return
      }

      setSent(true)
      toast.success('Mensagem enviada', {
        description: 'Obrigado. Sua contribuição foi registrada com carinho.',
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha de conexão'
      toast.error('Erro de conexão', { description: msg })
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="glass-card p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
          <MessageSquareHeart className="w-7 h-7 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
          Mensagem recebida
        </h2>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-md mx-auto">
          Registramos sua contribuição. Quando necessário, entraremos em contato pelo e-mail informado.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false)
            setCategory(null)
            setSubject('')
            setMessage('')
          }}
          className="text-sm font-inter text-gold-600 dark:text-gold-400 hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-inter font-medium text-foreground">Tipo de mensagem</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={cn(
                'text-left p-4 rounded-lg border transition-colors',
                category === item.id
                  ? 'border-gold-500/60 bg-gold-500/10'
                  : 'border-border hover:border-gold-500/30 hover:bg-muted/30',
              )}
            >
              <p className="text-sm font-inter font-semibold text-foreground">{item.label}</p>
              <p className="text-xs font-inter text-warmgray-500 mt-1 leading-relaxed">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="contactName" className="text-sm font-inter font-medium text-foreground">
            Seu nome
          </label>
          <input
            id="contactName"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Como podemos te chamar"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contactEmail" className="text-sm font-inter font-medium text-foreground">
            E-mail para contato
          </label>
          <input
            id="contactEmail"
            type="email"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-inter font-medium text-foreground">
          Assunto (opcional)
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Resumo em uma linha"
          maxLength={120}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/40"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-inter font-medium text-foreground">
          Mensagem
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte sua sugestão, opinião ou reclamação com clareza..."
          maxLength={3000}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-y min-h-[140px]"
        />
        <p className="text-xs font-inter text-warmgray-500 text-right">{message.length}/3000</p>
      </div>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gold py-3 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar mensagem
          </>
        )}
      </button>

      <p className="text-xs font-inter text-warmgray-500 text-center leading-relaxed">
        Suas informações são usadas apenas para registrar e, se necessário, responder sua mensagem.
      </p>
    </form>
  )
}
