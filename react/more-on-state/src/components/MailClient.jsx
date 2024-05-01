import { useState } from "react";
import { initialLetters } from "../data/data.mail";
import Letter from "./MailLetter";
import "../styles/mailClient.css";

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  //   const [highlightedLetter, setHighlightedLetter] = useState(null);
  const [highlightedLetterID, setHighlightedLetterID] = useState(null);
  function handleHover(letterID) {
    setHighlightedLetterID(letterID);
  }

  function handleStar(starred) {
    setLetters(
      letters.map((letter) => {
        if (letter.id === starred.id) {
          return {
            ...letter,
            isStarred: !letter.isStarred,
          };
        } else {
          return letter;
        }
      })
    );
  }

  return (
    <div className="mail">
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={letter.id === highlightedLetterID}
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </div>
  );
}
