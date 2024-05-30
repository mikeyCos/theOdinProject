import Clock from "./Clock";
import Chat from "./Chat";
import Dot from "./Dot";
import ChatAgain from "./ChatAgain";
import Select from "./Select";
import TodoList from "./TodoList";
import TodoListAgain from "./TodoListAgain";
import ContactManager from "./ContactManager";
import MessageForm from "./MessageForm";
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
    </>
  );
}

export default App;
