import { Alert } from "react-bootstrap";

function SAlert({ message, type, ...props }) {
  return (
    <Alert variant={type} {...props}>
      {message}
    </Alert>
  );
}

export default SAlert;
