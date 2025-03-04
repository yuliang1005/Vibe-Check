import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { verifyUser } from "../data/repository";

export default function Login(props) {
  const history = useHistory();
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  //handle login
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await verifyUser(fields.username, fields.password);

    if(user === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and / or password invalid, please try again.");
      return;
    }

    // Set user state.
    props.loginUser(user);

    // Navigate to the home page.
    history.push("/");
  };

  return (
    <div className="content">
      <h1>Login</h1>
      <hr />
      <div className="row">

          <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <input type="submit" className="user-submit" value="Login" />
            </div>
            {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
          </form>
      </div>
    </div>
  );
}
