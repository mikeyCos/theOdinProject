const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat('en-us', { weekday: 'long' }).format(date);
}

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink',
  },
};
export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>
        {person.name}'s Todos for {formatDate(today)}
      </h1>
      <img
        className="avatar"
        src={baseUrl + person.imageId + person.imageSize + '.jpg'}
        alt={person.name}
      />
      <ul>
        <li data-item="1">Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
