// https://blog.logrocket.com/validate-react-props-proptypes/

const RenderEmail = (props) => {
  return <div>{props.email}</div>;
};

const isEmail = (props, propName, componentName) => {
  const regex =
    /^((([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,})))?$/;

  if (!regex.test(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' passed to '${componentName}'. Expected a valid email address.`
    );
  }
};

RenderEmail.propTypes = {
  email: isEmail,
};

RenderEmail.defaultProps = {
  email: "placeholder@email.com",
};

export default RenderEmail;
