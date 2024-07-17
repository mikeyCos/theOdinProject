import PropTypes from "prop-types";

export default function ContactList({ contacts, selectedId, dispatch }) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                // TODO: dispatch changed_selection
                dispatch({ type: "changed_selection", contactId: contact.id });
              }}
            >
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  selectedId: PropTypes.number,
  dispatch: PropTypes.func,
};
