export const formatDate = (date: string) => {
  // Parse the date string manually to avoid timezone conversion
  const dateObj = new Date(date.replace(/-(\d{2}):(\d{2})$/, ''));

  return dateObj.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
