export default function formatDate(dateString, boolean) {
  // this returns a format [Day, Month Date]
  // ex: Wednesday, April 14
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(`${dateString} 00:00:00`);

  return boolean
    ? `${date.toUTCString().substring(0, 3)} ${date.toUTCString().substring(5, 7)}`
    : `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
}
