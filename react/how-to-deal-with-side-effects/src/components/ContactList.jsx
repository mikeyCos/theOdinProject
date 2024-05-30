export default function ContactList({ contacts, selectedId, onSelect }) {
  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                onSelect(contact.id);
              }}
            >
              {contact.id === selectedId ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
