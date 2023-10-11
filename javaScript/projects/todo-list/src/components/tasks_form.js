import pubSub from "../containers/pubsub";
import projectController from "../containers/project_controller";
import buildSelectOptions from "../components/tasks_options";
import "../styles/tasks_form.css";
import IconFlag from "../assets/icons/flag.svg";
import IconChevronDown from "../assets/icons/chevron_down.svg";
import IconCircle from "../assets/icons/circle.svg";
import IconInbox from "../assets/icons/inbox.svg";

const buildTaskForm = (type, form, button, buttonParent, dialogElement) => {
  const state = {
    form,
    type,
  };

  if (type === 'default') {
    if (button.hasAttribute('role')) {
    }
    state.button = button;
    state.buttonParent = buttonParent;
    return Object.assign(
      {},
      formTask(state),
      nonModal(state),
      formInputs(state)
    );
  }

  state.dialogElement = dialogElement;
  return Object.assign({}, formTask(state), modal(state), formInputs(state));
};

export const buildForm = {
  sections: [],
  add(type, form, button, buttonParent, dialogElement) {
    // if section type already exists, update it's container
    // prevents similar sections to be added
    if (this.find(type)) {
      this.find(type).closeForm();
      this.remove(type);
    }
    this.sections = [
      ...this.sections,
      buildTaskForm(type, form, button, buttonParent, dialogElement),
    ];
  },
  remove(type) {
    this.sections.splice(this.sections.indexOf(this.find(type)), 1);
  },
  find(type) {
    return this.sections.find((section) => section.type === type);
  },
};

// renders a form to create a task
// one needs to be a dialog element
// one needs to be a non-dialog element
export default function buildTasksForm(e) {
  const button = e.currentTarget;
  const buttonParent = button.parentElement;
  const form = document.createElement("form");
  if (!button.hasAttribute("role") && buttonParent.tagName !== "LI") {
    form.classList.add("form");
    const dialogElement = document.createElement("dialog");
    dialogElement.id = "form_task";
    buildForm.add("modal", form, undefined, undefined, dialogElement);

    form.appendChild(buildForm.find(`modal`).render());
    buildForm.find(`modal`).cacheDOM();
    buildForm.find(`modal`).bindEvents();
    dialogElement.appendChild(form);
    document.body.appendChild(dialogElement);
    dialogElement.showModal();
  } else {
    form.classList.add("form_task");
    e.currentTarget.replaceWith(form);
    buildForm.add("default", form, button, buttonParent);
    form.appendChild(buildForm.find(`default`).render());
    buildForm.find(`default`).cacheDOM();
    buildForm.find(`default`).bindEvents();
    form.scrollIntoView({ behavior: "smooth" });
  }
}

const formTask = (state) => ({
  type: state.type,
  form: state.form,
  cacheDOM() {
    this.btnCancel = this.form.querySelector(".btn_cancel");
    this.btnSubmit =
      this.form.querySelector(".btn_submit_task") ||
      this.form.querySelector(".btn_update_task");
    this.formInputs = this.form.querySelectorAll(".task_input");
    this.btnPriority = this.form.querySelector("#btn_priority");
    this.btnProject = this.form.querySelector("#btn_project");
  },
  bindEvents() {
    this.submitForm = this.submitForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.form.addEventListener("submit", this.submitForm);
    this.btnCancel.addEventListener("click", this.closeForm);
    this.btnPriority.addEventListener("click", buildSelectOptions);
    this.btnProject.addEventListener("click", buildSelectOptions);
    if (this.dialogElement) {
      this.closeModal = this.closeModal.bind(this);
      this.dialogElement.addEventListener("click", this.closeModal);
    }
  },
  unBindEvent() {
    this.form.removeEventListener("submit", this.submitForm);
  },
  render() {
    const container = document.createElement("div");
    const formButtons = document.createElement("div");
    formButtons.classList.add("form_buttons");
    for (let formChild in this.formChildren) {
      const formItem = document.createElement("div");
      formItem.classList.add("form_item");
      if (this.formChildren[formChild].hasOwnProperty("element")) {
        const label = document.createElement("label");
        const item = Object.assign(
          document.createElement(this.formChildren[formChild].element),
          this.formChildren[formChild].attributes
        );

        label.htmlFor = this.formChildren[formChild].attributes.id;
        label.textContent = this.formChildren[formChild].attributes.placeholder;

        formItem.appendChild(label);
        formItem.appendChild(item);

        if (this.formChildren[formChild].sibiling) {
          const button = document.createElement(
            this.formChildren[formChild].sibiling.element
          );
          Object.assign(
            button,
            this.formChildren[formChild].sibiling.attributes
          );
          this.formChildren[formChild].sibiling.children.forEach((item) => {
            const element = Object.assign(
              document.createElement(item.element),
              item.attributes
            );
            if (item.child) {
              const childElement = Object.assign(
                document.createElement(item.child.element),
                item.child.attributes
              );
              childElement.setAttribute("onload", "SVGInject(this)");
              element.appendChild(childElement);
            }
            button.appendChild(element);
          });
          formItem.appendChild(button);
        }
      }
      container.appendChild(formItem);
    }

    for (let btn in this.formButtons) {
      const button = document.createElement("button");
      const span = document.createElement("span");
      Object.assign(button, this.formButtons[btn]);
      span.textContent = btn;

      button.appendChild(span);
      formButtons.appendChild(button);
    }

    container.appendChild(formButtons);

    return container;
  },
  submitForm(e) {
    e.preventDefault();
    if (!this.listItem) {
      projectController.findActive().addTask(this.formInputs);
      if (this.dialogElement) {
        this.closeForm();
      } else {
        this.resetForm();
      }
    } else {
      this.closeForm();
      pubSub.publish("resetOldTask", this.button);
      projectController
        .find(this.listItem.dataset.uuidProj)
        .updateTask(this.listItem.dataset.uuid, this.formInputs);
    }
  },
  closeForm(e) {
    if (!this.dialogElement) {
      this.form.replaceWith(this.button);
      buildForm.remove(this.type);
    } else {
      this.removeModal();
    }
    pubSub.publish("resetOldTask");
  },
  resetForm() {
    // resets all form inputs, type="hidden" included
    // resets priority/project button content
    for (let formChild in this.formChildren) {
      const formInput = this.formChildren[formChild];
      const attributes = formInput.attributes;
      [...this.formInputs].find((input) => input.id === attributes.id).value =
        attributes.value;
      if (this.formChildren[formChild].sibiling) {
        const element = [...this.formInputs].find(
          (input) =>
            formInput.sibiling.attributes.id === input.id &&
            input.tagName === "BUTTON"
        );
        let newIcon;
        const btnSVG = element.firstChild.firstChild;
        if (
          btnSVG.className.baseVal !== "" &&
          btnSVG.src !== formInput.sibiling.children[0].child.attributes.src
        ) {
          newIcon = new Image();
          newIcon.setAttribute("onload", "SVGInject(this)");
          newIcon.src = formInput.sibiling.children[0].child.attributes.src;
          btnSVG.parentElement.replaceChild(newIcon, btnSVG);
        }
        // need replace project if the current icon does not match default icon
        newIcon.className =
          formInput.sibiling.children[0].child.attributes.className;
        element.querySelector("span").textContent =
          formInput.sibiling.children[1].attributes.textContent;
      }
    }
  },
});

const nonModal = (state) => ({
  button: state.button,
  parentButton: state.buttonParent,
});

const modal = (state) => ({
  dialogElement: state.dialogElement,
  closeModal(e) {
    if (e.target.id === "form_task") {
      this.dialogElement.close();
      this.removeModal();
    }
  },
  removeModal() {
    this.dialogElement.remove();
    buildForm.remove(this.type);
  },
});

const formInputs = (state) => {
  const taskItem = state.button
    ? state.button.querySelector(".task_list_item")
    : null;
  const project = taskItem
    ? projectController.find(taskItem.dataset.uuidProj)
    : null;
  const task = taskItem ? project.findTask(taskItem.dataset.uuid) : null;

  const init = () => {
    for (let formChild in inputs.formChildren) {
      let attributes = inputs.formChildren[formChild].attributes;
      // finds task's key equal to input's id
      let key = Object.keys(task).find((item) => item === attributes.id);
      if (attributes && key) {
        if (!inputs.formChildren[formChild].sibiling) {
          let value;
          if (formChild !== "dueDate") {
            value = { value: task[key] };
          } else {
            value = { value: new Date(task[key]).toISOString().split("T")[0] };
          }
          Object.assign(attributes, value);
        } else {
          if (formChild === "priority") {
            inputs.formChildren[
              formChild
            ].sibiling.children[0].child.attributes.className = `priority_${task.priority}`;
            inputs.formChildren[
              formChild
            ].sibiling.children[1].attributes.textContent = `P${task.priority}`;
            inputs.formChildren[formChild].attributes.value = task.priority;
          }
        }
      }
    }
  };

  const inputs = {
    formChildren: {
      name: {
        element: "input",
        attributes: {
          id: "name",
          className: "task_input",
          name: "name",
          type: "text",
          placeholder: "Task name",
          required: "required",
          value: "",
        },
      },
      description: {
        element: "textarea",
        attributes: {
          id: "description",
          className: "task_input",
          name: "description",
          placeholder: "Description",
          value: "",
        },
      },
      dueDate: {
        element: "input",
        attributes: {
          id: "due_date",
          className: "task_input",
          name: "date",
          type: "date",
          placeholder: "Due Date",
          value: "",
        },
      },
      dueTime: {
        element: "input",
        attributes: {
          id: "due_time",
          className: "task_input",
          name: "time",
          type: "time",
          placeholder: "Time",
          value: "",
        },
      },
      priority: {
        element: "input",
        attributes: {
          id: "priority",
          className: "task_input",
          name: "priority",
          type: "hidden",
          placeholder: "Priority",
          value: 4,
        },
        sibiling: {
          element: "button",
          attributes: {
            id: "btn_priority",
            className: "task_input",
            placeholder: "Priority",
            type: "button",
          },
          children: [
            {
              element: "div",
              attributes: {
                className: "img_wrapper",
              },
              child: {
                element: "img",
                attributes: {
                  src: IconFlag,
                  className: "priority_4",
                },
              },
            },
            {
              element: "span",
              attributes: {
                className: "task_priority",
                textContent: "P4",
              },
            },
            {
              element: "div",
              attributes: {
                className: "img_wrapper",
              },
              child: {
                element: "img",
                attributes: {
                  src: IconChevronDown,
                  className: "chevron_down",
                },
              },
            },
          ],
        },
      },
      project: {
        element: "input",
        attributes: {
          id: "project",
          className: "task_input",
          name: "priority",
          type: "hidden",
          placeholder: "Project",
          value:
            projectController.findActive().uuid ===
            projectController.today[0].uuid
              ? projectController.inbox[0].uuid
              : projectController.findActive().uuid,
        },
        sibiling: {
          element: "button",
          attributes: {
            id: "btn_project",
            className: "task_input",
            placeholder: "Project",
            type: "button",
          },
          children: [
            {
              element: "div",
              attributes: {
                className: "img_wrapper",
              },
              child: {
                element: "img",
                attributes: {
                  src:
                    projectController.findActive().uuid ===
                      projectController.today[0].uuid ||
                    projectController.findActive().uuid ===
                      projectController.inbox[0].uuid
                      ? IconInbox
                      : IconCircle,
                  className:
                    projectController.findActive().uuid ===
                      projectController.today[0].uuid ||
                    projectController.findActive().uuid ===
                      projectController.inbox[0].uuid
                      ? "project_inbox"
                      : "project_circle",
                },
              },
            },
            {
              element: "span",
              attributes: {
                className: "task_project",
                textContent:
                  projectController.findActive().uuid ===
                  projectController.today[0].uuid
                    ? projectController.inbox[0].title
                    : projectController.findActive().title,
              },
            },
            {
              element: "div",
              attributes: {
                className: "img_wrapper",
              },
              child: {
                element: "img",
                attributes: {
                  src: IconChevronDown,
                  className: "chevron_down",
                },
              },
            },
          ],
        },
      },
    },
    formButtons: {
      cancel: {
        className: "btn_cancel",
        type: "button",
      },
    },
  };

  // if the button clicked has 'role' attribute
  // assign formChildren with a save-button
  // assign formTask with a content property/init function
  // otherwise,
  // assign formChildren with only a add-button
  if (state.button && state.button.hasAttribute("role")) {
    const inputsEdit = {
      button: {
        save: {
          className: "btn_update_task",
          type: "submit",
        },
      },
      prop: {
        listItem: state.button.firstChild,
      },
    };

    init();
    Object.assign(inputs.formButtons, inputsEdit.button);
    Object.assign(inputs, inputsEdit.prop);
  } else {
    const inputsAdd = {
      add: {
        className: "btn_submit_task",
        type: "submit",
      },
    };

    Object.assign(inputs.formButtons, inputsAdd);
  }
  return inputs;
};
