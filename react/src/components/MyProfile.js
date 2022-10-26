import {React, useContext, useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import { deleteUser, findFollow } from "../data/repository";

export default function MyProfile(props) {
  const { message } = useContext(MessageContext);
  const history = useHistory();
  const [followed, setFollowed] =useState(null);

  //load user's follow
  useEffect(() => {
    async function loadFollows() {
      const currentFollows = await findFollow(props.user.username);

      setFollowed(currentFollows);
    }
    loadFollows();
  }, [props.user.username]);

  //delete user
  const deleteUsers = async () =>{
    await deleteUser(props?.user?.username);
    props.logoutUser();
    history.replace("/login");
  }

  return (
    <div className="content">
      {message && <div className="alert alert-success" role="alert">{message}</div>}
      <h1 className="display-4">My Profile</h1>
      <table className="profile-table">
        <tr id="dark-tr">
          <th>Username: </th>
          <th>{props?.user?.username}</th>
        </tr>
        <tr>
          <td>Name: </td>
          <td>{props?.user?.first_name} {props?.user?.last_name} </td>
        </tr>
        <tr>
          <td>Joined date: </td>
          <td>{props?.user?.joined_date}</td>
        </tr>
        <tr>
          <td><Link to="/edit-profile"><button className="profile-button" id="profile-edit">Edit</button></Link></td>
          <td><button onClick={deleteUsers} className="profile-button" id="profile-delete">Delete</button></td>
        </tr>
      </table>
      <h2>My follows</h2>
      <table className="profile-follow-table">
        <tr>
          <th>username</th>
          <th></th>
        </tr>
      {(followed || []).map(follow =>
      <tr className="follow-tr">
        <td>{follow.followed_username}</td>
        <td><Link className="profileBtn" to={`/user-profile/${follow.followed_username}`}>Profile</Link></td>
      </tr>
        )}
      </table>
    </div>
  );
}
