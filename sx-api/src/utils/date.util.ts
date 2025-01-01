import { fromZonedTime, toZonedTime } from 'date-fns-tz'

export function formatDatePtBR(date: Date): string {
  return date.toLocaleDateString('pt-BR')
}

export function formatDateTimeSaoPaulo(date: Date) {
  const utcDate = fromZonedTime(date, 'UTC')
  const zonedDate = toZonedTime(utcDate, 'America/Sao_Paulo')

  return zonedDate
}
