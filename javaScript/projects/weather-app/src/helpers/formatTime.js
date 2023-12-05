export default function formatTime(time) {
  // returns 12 hour time format
  // ex: 2:00 PM or 10:00 AM
  // \d{4}-\d{2}-\d{2}
  const date = new Date(/\d{4}-\d{2}-\d{2}/.test(time) ? time : `2000-12-01 ${time}`);
  const timeProperties = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-us', timeProperties);
}
