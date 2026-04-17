export default function formatDateWithOrdinal(date = new Date()) {
  const day = date.getDate();
  const year = date.getFullYear();

  const month = date.toLocaleString('en-US', { month: 'short' });

  function getOrdinal(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  return `${month} ${day}${getOrdinal(day)} ${year}`;
}