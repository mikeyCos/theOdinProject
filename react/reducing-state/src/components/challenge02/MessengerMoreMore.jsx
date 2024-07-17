import { useReducer } from "react";
import Chat from "./Chat.jsx";
import ContactList from "./ContactList.jsx";
import { initialState, messengerReducer } from "./messengerReducer.js";

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const contact = contacts.find((c) => c.id === state.selectedId);
  // const message = state.message;
  const message = state.messages[state.selectedId];
  console.log(state);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];
