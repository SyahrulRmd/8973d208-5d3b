export const formatDate = (date: string) => {
  const localDate = date.replace(/[+-]\d{2}:\d{2}$/, '');
  return new Date(localDate).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export const formatStatus = (status: string) => {
  const formatted = status.replace('_', ' ');
  const capitalize = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  return capitalize;
}
