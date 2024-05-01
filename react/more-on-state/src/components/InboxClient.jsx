import { useState } from "react";
import { lettersInbox } from "../data/data.inbox";
import InboxLetter from "./InboxLetter";
import "../styles/inboxClient.css";

export default function InboxClient() {
  // const [selection, setSelection] = useState([]);
  const [selection, setSelection] = useState({});

  // TODO: allow multiple selection
  // const selectedCount = selection.length;
  const selectedCount = Object.keys(selection).length;

  function handleToggle(toggledId) {
    // TODO: allow multiple selection
    // const isInSelection = selection.includes(toggledId);
    // const index = selection.indexOf(toggledId);
    // if (isInSelection) selection.splice(index, 1);
    // const newSelection = isInSelection
    //   ? [...selection]
    //   : [...selection, toggledId];
    // setSelection(newSelection);

    const inSelection = Object.hasOwn(selection, toggledId);
    if (inSelection) delete selection[toggledId];
    const newSelection = inSelection
      ? { ...selection }
      : { ...selection, [toggledId]: toggledId };
    setSelection(newSelection);
  }

  return (
    <div className="inbox">
      <h2>Inbox</h2>
      <ul>
        {lettersInbox.map((letter) => (
          <InboxLetter
            key={letter.id}
            letter={letter}
            isSelected={
              // TODO: allow multiple selection
              // selection.includes(letter.id)
              //   selection.some((id) => id === letter.id)
              selection[letter.id] === letter.id
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>You selected {selectedCount} letters</b>
        </p>
      </ul>
    </div>
  );
}
