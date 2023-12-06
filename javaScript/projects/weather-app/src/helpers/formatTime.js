export default function formatTime(time) {
  // returns 12 hour time format
  // ex: 2:00 PM or 10:00 AM
  const date = new Date(time.includes('-') ? time : `2000-12-01 ${time}`);
  const timeProperties = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-us', timeProperties);
}
