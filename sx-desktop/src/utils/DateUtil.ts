import { parseISO, startOfDay } from "date-fns"

export const parseDate = (date: string | Date | undefined): Date | undefined => {
  if (!date) return undefined

  if (typeof date === 'string') {
    const parsedDate = parseISO(date.split('T')[0])

    return startOfDay(parsedDate)
  }

  return date
}
