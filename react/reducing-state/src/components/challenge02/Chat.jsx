import PropTypes from "prop-types";

export default function Chat({ contact, message, dispatch }) {
  const sendButtonHandler = () => {
    alert(`Recipient: ${contact.name}, Message: ${message}`);
    dispatch({
      type: "sent_message",
      contactId: contact.id,
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
            // contactId: contact.id,
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
