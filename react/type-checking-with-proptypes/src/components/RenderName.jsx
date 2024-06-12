import propTypes from "prop-types";

const RenderName = (props) => {
  return <div>{props.name}</div>;
};

RenderName.propTypes = {
  name: propTypes.string.isRequired,
};

RenderName.defaultProps = {
  name: "Zach",
};

export default RenderName;
