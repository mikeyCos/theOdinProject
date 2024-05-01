export default function Button({
  text = "Click Me!",
  color = "blue",
  fontSize = "12",
  superDuperClickHandler = () =>
    window.open("https://www.google.com", "_blank"),
}) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px",
  };

  return (
    <button
      onClick={() => superDuperClickHandler("https://www.theodinproject.com")}
      style={buttonStyle}
    >
      {text}
    </button>
  );
}
