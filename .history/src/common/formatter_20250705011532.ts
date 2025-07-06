export const formatDate = (date: string) => {
  // const localDate = date.replace(/[+-]\d{2}:\d{2}$/, '');
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
