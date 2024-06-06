import React from "react";
import ClassAddTask from "./ClassAddTask";
import ClassTaskList from "./ClassTaskList";
import generateUUID from "../utilities/generateUUID";

// https://react.dev/reference/react/Component#constructor
export default class ClassInput extends React.Component {
  // Some code goes here
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tasks: [],
  //   };

  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleDeleteTask = this.handleDeleteTask.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.tasksCount = this.state.tasks.length;
  // }

  // Optional
  state = {
    tasks: [],
  };

  tasksCount = this.state.tasks.length;

  handleSubmit = (value) => {
    this.setState((state) => ({
      tasks: [...state.tasks, { id: generateUUID(), value }],
    }));
    this.tasksCount++;
  };

  handleDeleteTask = (taskID) => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskID),
    }));
    this.tasksCount--;
  };

  handleChange = (taskEdit) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => {
        return task.id === taskEdit.id ? taskEdit : task;
      }),
    }));
  };

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <ClassAddTask handleSubmit={this.handleSubmit} />
        <h4>All the tasks!</h4>
        <h4>
          Tasks count: <span>{this.tasksCount}</span>
        </h4>
        {/* The list of all the To-Do's, displayed */}
        <ClassTaskList
          tasks={this.state.tasks}
          handleDeleteTask={this.handleDeleteTask}
          handleChange={this.handleChange}
        />
      </section>
    );
  }
}
