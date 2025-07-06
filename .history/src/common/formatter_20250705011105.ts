export const formatDate = (date: string) => {
  // Parse the ISO string
  const dateObj = new Date(date)

  // Extract timezone offset from the original string
  const timezoneMatch = date.match(/([+-]\d{2}):(\d{2})$/)
  if (!timezoneMatch) {
    // Fallback to local time if no timezone info
    return dateObj.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const [, sign, hours, minutes] = timezoneMatch
  const offsetHours = parseInt(hours)
  const offsetMinutes = parseInt(minutes)

  // Calculate the time in the original timezone
  const utcTime = dateObj.getTime()
  const offsetMs = (offsetHours * 60 + offsetMinutes) * 60 * 1000
  const originalTime = new Date(utcTime + (sign === '+' ? -offsetMs : offsetMs))

  // Format in Indonesian locale
  return originalTime.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
