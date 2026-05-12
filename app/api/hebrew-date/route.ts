import { NextResponse } from 'next/server'
import {
  dateAtNoonBrazil,
  getCivilDatePartsInTimeZone,
  getHebrewDateInfo,
} from '@/lib/hebrew-date'

export const revalidate = 3600 // 1 hora

export function GET() {
  try {
    const p = getCivilDatePartsInTimeZone(new Date())
    const data = getHebrewDateInfo(dateAtNoonBrazil(p.year, p.monthIndex, p.day))
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Erro ao calcular data hebraica' },
      { status: 500 },
    )
  }
}
