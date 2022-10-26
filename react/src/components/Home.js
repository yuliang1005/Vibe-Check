import React from "react";
import logo from "../logo.svg";

export default function Home(props) {
  return (
    <div className="content">
      <h1 className="display-4">Vibe Check</h1>
      <img src={logo} className="logo" alt="logo" />
      {props.user !== null && <h4 id="welcome-message"><strong>Welcome back, {props.user.first_name} {props.user.last_name}!</strong></h4>}
    </div>
  );
}
