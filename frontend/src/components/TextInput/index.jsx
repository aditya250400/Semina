import { Form } from "react-bootstrap";

function TextInput({ name, value, type, onChange, placeholder, ...props }) {
  return (
    <Form.Control
      type={type}
      name={name}
      value={value} // state
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  );
}

export default TextInput;
