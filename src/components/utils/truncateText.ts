export const truncateText = (text: string, maxLength: number) => {
  if (!text) return '';

  return `${text.slice(0, maxLength)}...`;
};
