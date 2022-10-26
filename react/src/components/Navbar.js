import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav>
      <div className="container">
        <div id="navbar-logo">
          <Link className="navbar-brand" to="/">Vibe Check</Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="list-navbar" id="navbarSupportedContent">
          <ul>
            <li className="navbar-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {props.user !== null &&
              <>
                <li className="navbar-item">
                  <Link className="nav-link" to="/profile">My Profile</Link>
                </li>
                <li className="navbar-item">
                  <Link className="nav-link" to="/post">Post</Link>
                </li>
                <li className="navbar-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
              </>
            }
          </ul>
          <ul className="navbar-nav">
            {props.user === null ?
              <>
                <li className="navbar-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="navbar-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
              :
              <>
                <li className="navbar-item">
                  <Link className="nav-link" to="/login" onClick={props.logoutUser}>Logout</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
