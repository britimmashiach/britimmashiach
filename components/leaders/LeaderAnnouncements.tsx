import { Megaphone, Pin } from 'lucide-react'
import { RichMarkdown } from '@/components/ui/RichMarkdown'
import {
  formatAnnouncementDatePt,
  type LeaderAnnouncement,
} from '@/lib/leader-portal-supabase'

interface Props {
  announcements: LeaderAnnouncement[]
}

/** Avisos do Rav EBBY para líderes aprovados. */
export function LeaderAnnouncements({ announcements }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Megaphone className="w-5 h-5 text-gold-600 dark:text-gold-400" aria-hidden />
        <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
          Avisos do Rav
        </h2>
      </div>

      {announcements.length === 0 ? (
        <div className="glass-card p-6">
          <p className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400">
            Nenhum aviso publicado por enquanto. Quando o Rav EBBY publicar um comunicado, ele aparecerá aqui.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {announcements.map((a) => (
            <li
              key={a.id}
              className={`glass-card p-5 space-y-2${a.pinned ? ' ring-1 ring-gold-500/30 bg-gold-500/5' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                  {a.title}
                </h3>
                {a.pinned && (
                  <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-inter font-semibold uppercase tracking-wider text-gold-700 dark:text-gold-400">
                    <Pin className="w-3 h-3" aria-hidden />
                    Fixado
                  </span>
                )}
              </div>
              {a.body.trim() && (
                <div className="text-sm font-inter text-warmgray-700 dark:text-warmgray-300">
                  <RichMarkdown text={a.body} />
                </div>
              )}
              <p className="text-xs font-inter text-warmgray-400 pt-1">
                {formatAnnouncementDatePt(a.created_at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
