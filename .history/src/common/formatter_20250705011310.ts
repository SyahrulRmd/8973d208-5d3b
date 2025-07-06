export const formatDate = (date: string) => {
  // Parse the ISO date string manually to avoid timezone conversion
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);

  if (!match) {
    return 'Invalid date';
  }

  const [, year, month, day, hour, minute, second] = match;

  // Create a date object with the original time
  const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));

  return dateObj.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
