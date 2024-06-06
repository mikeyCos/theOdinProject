import Clock from "./Clock";
import Chat from "./Chat";
import Dot from "./Dot";
import ChatAgain from "./ChatAgain";
import Select from "./Select";
import TodoList from "./TodoList";
import TodoListAgain from "./TodoListAgain";
import ContactManager from "./ContactManager";
import MessageForm from "./MessageForm";
import InputChanges from "./InputChanges";
import "../styles/App.css";

function App() {
  return (
    <>
      <Clock />
      <Chat />
      <Dot />
      <ChatAgain />
      <Select />
      <TodoList />
      <TodoListAgain />
      <ContactManager />
      <MessageForm />
      <InputChanges />
    </>
  );
}

export default App;
