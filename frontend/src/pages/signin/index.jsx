import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/users/userThunk";
import { useNavigate } from "react-router";
import LayoutAuth from "../../layouts/auth";

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
    <LayoutAuth>
      <div className="text-center mb-4 mt-5">
        <h2 className="mt-3">Semina</h2>
      </div>
      <div className="card card-md rounded">
        <div className="card-body">
          <h2 className="h2 text-center mb-4">Login to your account</h2>
          {user.errors && (
            <div className="alert alert-danger mt-2">{user.errors.message}</div>
          )}
          <form onSubmit={onSubmit} autoComplete="off" noValidate>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="off"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Your password"
                autoComplete="off"
              />
            </div>

            <div className="form-footer">
              <button
                disabled={user.loading}
                type="submit"
                className="btn btn-primary w-100 rounded"
              >
                {user.loading ? (
                  <div
                    className="spinner-border text-white"
                    role="status"
                  ></div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAuth>
  );
}
