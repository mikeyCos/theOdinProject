import PropTypes from "prop-types";

export default function Chat({ contact, message, dispatch }) {
  const sendButtonHandler = () => {
    alert(`Recipient: ${contact.name}, Message: ${message}`);
    dispatch({
      type: "send_message",
    });
  };

  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={"Chat to " + contact.name}
        onChange={(e) => {
          // TODO: dispatch edited_message
          // (Read the input value from e.target.value)
          dispatch({
            type: "edited_message",
            message: e.target.value,
          });
        }}
      />
      <br />
      <button onClick={sendButtonHandler}>Send to {contact.email}</button>
    </section>
  );
}

Chat.propTypes = {
  contact: PropTypes.object,
  message: PropTypes.string,
  dispatch: PropTypes.func,
};
