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
  return status.replace(/_/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
