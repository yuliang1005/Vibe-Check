import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { findUser, createUser } from "../data/repository";
import moment from 'moment';

export default function Register(props) {
  const history = useHistory();
  const [fields, setFields] = useState({
    username: "", firstname: "", lastname: "",  password: "", confirmPassword: "", joineddate: moment().format('DD/MM/YYYY')
  });
  const [errors, setErrors] = useState({ });

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;

    // Create user.
    const user = await createUser(trimmedFields);

    // Set user state.
    props.loginUser(user);

    // Navigate to the home page.
    history.push("/");
  };

  //validate user input
  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = { };

    let key = "username";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Username is required.";
    else if(field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32.";
    else if(await findUser(trimmedFields.username) !== null)
      currentErrors[key] = "Username is already registered.";

    key = "firstname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lastname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "password";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";

    key = "confirmPassword";
    field = trimmedFields[key];
    if(field !== trimmedFields.password)
      currentErrors[key] = "Passwords do not match.";

    key = "joineddate";
    field = trimFields[key];

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = { };
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
    setFields(trimmedFields);

    return trimmedFields;
  };

  return (
    <div className="content">
      <h1>Register</h1>
      <hr />
      <div className="row">

          <form class="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} required/>
              {errors.username &&
                <div className="text-danger">{errors.username}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">First name</label>
              <input name="firstname" id="firstname" className="form-control"
                value={fields.firstname} onChange={handleInputChange} required/>
              {errors.firstname &&
                <div className="text-danger">{errors.firstname}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="form-label">Last name</label>
              <input name="lastname" id="firstname" className="form-control"
                value={fields.lastname} onChange={handleInputChange} required/>
              {errors.lastname &&
                <div className="text-danger">{errors.lastname}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <small className="password-hint">must be at least 6 characters</small>
              </label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} required/>
              {errors.password &&
                <div className="text-danger">{errors.password}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" className="form-control"
                value={fields.confirmPassword} onChange={handleInputChange} required/>
              {errors.confirmPassword &&
                <div className="text-danger">{errors.confirmPassword}</div>
              }
            </div>
            <div className="form-group">
              <input type="submit" className="user-submit" value="Register" />
              <Link className="user-cancel" to="/">Cancel</Link>
            </div>
          </form>

      </div>
    </div>
  );
}
