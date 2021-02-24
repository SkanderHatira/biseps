import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const Navbar = () => {
  const auth = useAuth();
  return (
    <div>
      <nav
        className={`${
          auth.user.isAuthenticated
            ? "#00acc1 cyan darken-1"
            : "#00897b teal darken-1"
        }`}
      >
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            BiSSProP
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/docs">Docs</Link>
            </li>
            <li>
              <Link to="/examples">Examples</Link>
            </li>
            {auth.user.isAuthenticated ? (
              <>
                <li>
                  <Link to="/newrun">Runs</Link>
                </li>
                <li>
                  <Link onClick={auth.signout}>Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
