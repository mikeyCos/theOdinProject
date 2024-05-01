export default function MailLetter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={isHighlighted ? "highlighted" : ""}
      onFocus={() => {
        onHover(letter);
      }}
      onPointerMove={() => {
        onHover(letter.id);
      }}
    >
      <button
        onClick={() => {
          onToggleStar(letter);
        }}
      >
        {letter.isStarred ? "Unstar" : "Star"}
      </button>
      {letter.subject}
    </li>
  );
}
