import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/users/authUserSlice";
import { changeTheme } from "../redux/theme/themeSlice";
import hasRole, {
  accessCategories,
  accessTalents,
  accessEvents,
  accessParticipant,
  accessPayments,
  accessOrders,
} from "../utils/roleAccess";

export default function Header() {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.authUser);
  const { role } = useSelector((state) => state.authUser.user);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const onChangeTheme = () => {
    dispatch(changeTheme());
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/logout");
  };

  return (
    <div className="sticky-top">
      <header className="navbar navbar-expand-lg d-print-none sticky-top">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3 mt-1">
            <Link to="/dashboard">
              <label className="ms-2">Semina</label>
            </Link>
          </h1>

          <div className="navbar-nav flex-row order-md-last">
            <div className="d-flex me-2">
              {theme === "dark" ? (
                <button
                  className="nav-link px-0"
                  title="Enable light mode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  onClick={onChangeTheme}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                  </svg>
                </button>
              ) : (
                <button
                  className="nav-link px-0"
                  title="Enable dark mode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  onClick={onChangeTheme}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                  </svg>
                </button>
              )}
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  className="avatar avatar-sm"
                  style={{ backgroundImage: "url(/images/boy.png)" }}
                ></span>
                <div className="d-none d-lg-block ps-2">
                  <div>{user.name}</div>
                  <div className="mt-1 small text-muted">{user.email}</div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow rounded mt-3">
                <Link className="dropdown-item" to={`/users/${user?.id}`}>
                  Profile
                </Link>
                <div className="dropdown-divider" />
                <button onClick={logoutHandler} className="dropdown-item">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* header navbar */}
      <header className="navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar bg-muted-lt">
            <div className="container-xl">
              <ul className="navbar-nav">
                <li
                  className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
                >
                  <Link to="/dashboard" className="nav-link">
                    <span className="nav-link-icon  d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Home</span>
                  </Link>
                </li>
                {(hasRole({ roles: accessCategories.lihat, role }) ||
                  hasRole({ roles: accessEvents.lihat, role }) ||
                  hasRole({ roles: accessTalents.lihat, role })) && (
                  <li
                    className={`nav-item dropdown ${location.pathname === "/categories" || location.pathname === "/events" || location.pathname === "/talents" ? "active" : ""}`}
                  >
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-icon  d-lg-inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-box"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                          <path d="M12 12l8 -4.5" />
                          <path d="M12 12l0 9" />
                          <path d="M12 12l-8 -4.5" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Master</span>
                    </a>
                    <div className="dropdown-menu">
                      <Link
                        className={`dropdown-item ${location.pathname === "/categories" ? "active" : ""} `}
                        to="/categories"
                      >
                        Categories
                      </Link>
                      <Link
                        className={`dropdown-item ${location.pathname === "/events" ? "active" : ""} `}
                        to="/events"
                      >
                        Events
                      </Link>
                      <Link
                        className={`dropdown-item ${location.pathname === "/talents" ? "active" : ""} `}
                        to="/talents"
                      >
                        Talents
                      </Link>
                    </div>
                  </li>
                )}
                {hasRole({ roles: accessPayments.lihat, role }) && (
                  <li
                    className={`nav-item ${location.pathname === "/payments" ? "active" : ""}`}
                  >
                    <Link to="/payments" className="nav-link">
                      <span className="nav-link-icon  d-lg-inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -8" />
                          <path d="M3 10l18 0" />
                          <path d="M7 15l.01 0" />
                          <path d="M11 15l2 0" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Payments</span>
                    </Link>
                  </li>
                )}
                {hasRole({ roles: accessOrders.lihat, role }) && (
                  <li
                    className={`nav-item ${location.pathname === "/orders" ? "active" : ""}`}
                  >
                    <Link to="#" className="nav-link">
                      <span className="nav-link-icon  d-lg-inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M17 17h-11v-14h-2" />
                          <path d="M6 5l14 1l-1 7h-13" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Orders</span>
                    </Link>
                  </li>
                )}
                {hasRole({ roles: accessParticipant.lihat }) && (
                  <li
                    className={`nav-item ${location.pathname === "/participants" ? "active" : ""}`}
                  >
                    <Link to="#" className="nav-link">
                      <span className="nav-link-title">Participants</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
