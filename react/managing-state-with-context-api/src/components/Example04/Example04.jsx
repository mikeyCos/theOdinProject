import AddTask from "./AddTask.jsx";
import TaskList from "./TaskList.jsx";
import { TasksProvider } from "./TasksContext.jsx";

export default function Example04() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
