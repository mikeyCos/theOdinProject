import React from "react";

export default class ClassAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      foo: "bar",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (e) => {
    // this.setState((state) => ({
    //   ...state,
    //   inputVal: e.target.value,
    // }));
    this.setState({ inputVal: e.currentTarget.value });
  };

  render() {
    console.log(this.state);
    return (
      <form
        id="form-add-task"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.handleSubmit(this.state.inputVal);
          // Class components voodoo magic?
          // this.setState((state) => ({ inputVal: "" }));
          this.setState({ inputVal: "" });
        }}
      >
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          onChange={this.handleInputChange}
          value={this.state.inputVal}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
