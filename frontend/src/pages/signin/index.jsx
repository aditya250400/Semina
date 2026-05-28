import Form from "react-bootstrap/Form";
import { Container, Card } from "react-bootstrap";
import SButton from "../../components/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { loginAsync } from "../../redux/users/userThunk";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router";

export default function Login() {
  const user = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAsync({ form, setForm, navigate }));
  };
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Card className="w-50">
        <Card.Title className="ms-3 mt-3">Login</Card.Title>
        <Card.Subtitle className="mb-2 ms-3 text-muted">
          Please fill your credentials
        </Card.Subtitle>
        <Card.Body>
          {user.errors && (
            <SAlert
              className="my-2"
              message={user.errors.message}
              type="danger"
            />
          )}

          <Form onSubmit={onSubmit}>
            <TextInputWithLabel
              label="Email Address"
              onChange={handleChange}
              type="email"
              value={form.email}
              name="email"
              placeholder="Enter email"
            />

            <TextInputWithLabel
              onChange={handleChange}
              type="password"
              value={form.password}
              name="password"
              label="Password"
              placeholder="Password"
            />
            <SButton
              loading={user.loading}
              disabled={user.loading}
              variant="primary"
              className="w-100"
              type="submit"
            >
              Submit
            </SButton>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
