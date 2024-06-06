import React from "react";

export default class ClassTaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tasks, handleDeleteTask, handleChange } = this.props;
    return (
      tasks && (
        <ul>
          {tasks.map((task) => {
            return (
              <ClassTask
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleChange={handleChange}
              />
            );
          })}
        </ul>
      )
    );
  }
}

class ClassTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  render() {
    const { task, handleDeleteTask, handleChange } = this.props;
    return (
      <li>
        {this.state.isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.setState({ isEditing: false });
            }}
          >
            <label htmlFor="task-edit">
              <input
                type="text"
                name="task-edit"
                onChange={(e) =>
                  handleChange({
                    ...task,
                    value: e.currentTarget.value,
                  })
                }
                value={task.value}
              />
            </label>
            <div className="btn-container">
              <button type="submit">Resubmit</button>
              <button type="button" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          </form>
        ) : (
          <>
            {task.value}
            <div className="btn-container">
              <button
                type="button"
                onClick={() => {
                  this.setState({ isEditing: true });
                }}
              >
                Edit
              </button>
              <button type="button" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          </>
        )}
      </li>
    );
  }
}
