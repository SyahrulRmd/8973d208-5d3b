export const formatDate = (date: string) => {
  // Parse the date string and extract the original time components
  const dateObj = new Date(date);

  // Get the timezone offset in minutes
  const timezoneOffset = dateObj.getTimezoneOffset();

  // Adjust the date to show the original time
  const adjustedDate = new Date(dateObj.getTime() + (timezoneOffset * 60 * 1000));

  return adjustedDate.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
