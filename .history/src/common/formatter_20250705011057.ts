export const formatDate = (date: string) => {
  // Parse the ISO string to extract date and time components
  const dateObj = new Date(date)

  // Get the timezone offset from the original string
  const timezoneMatch = date.match(/([+-]\d{2}:\d{2})$/)
  const timezoneOffset = timezoneMatch ? timezoneMatch[1] : ''

  // Format the date in Indonesian locale
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC' // Use UTC to avoid local timezone conversion
  })

  // Add the original timezone offset
  return `${formattedDate} (UTC${timezoneOffset})`
}
