import IconAdd from "../assets/icons/add.svg";
import IconDelete from "../assets/icons/delete.svg";
import IconEdit from "../assets/icons/edit.svg";
import IconCircle from "../assets/icons/radio_button_unchecked.svg";
import IconDate from "../assets/icons/date.svg";
import IconCheck from "../assets/icons/check_small.svg";

const icons = {
  add: IconAdd,
  delete: IconDelete,
  edit: IconEdit,
  circle: IconCircle,
  checkbox: IconCheck,
  date: IconDate,
};

const buttonAttributes = (type, name) => {
  const button = {
    // className: btn_delete_project
    className: `btn_${type}_${name}`,
    type: "button",
  };
  return button;
};

export default function buildButton(type, name, text) {
  const button = Object.assign(
    document.createElement("button"),
    buttonAttributes(type, name)
  );
  const image = new Image();
  image.src = icons[type];
  image.setAttribute("onload", "SVGInject(this)");

  if (text) {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("btn_img_wrapper");
    imageWrapper.appendChild(image);
    const span = document.createElement("span");
    span.textContent = text;
    button.appendChild(imageWrapper);
    button.appendChild(span);
  } else if (type === "checkbox") {
    const checkboxBorder = document.createElement("span");
    checkboxBorder.classList.add("checkbox_circle");
    checkboxBorder.appendChild(image);
    button.appendChild(checkboxBorder);
  } else {
    button.appendChild(image);
  }

  return button;
}
