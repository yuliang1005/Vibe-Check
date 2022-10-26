import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import { createFollow, findUser, findFollow, unFollow, getOneFollow } from "../data/repository";

export default function MyProfile(props) {
  const [profile, setProfile] = useState('');
  const [followState, setFollowState] = useState('');
  const [followed, setFollowed] =useState(null);
  const { username } = useParams();
  const [status, setStatus] = useState({followed_username:username, username: props.user.username});
  
  
  //get profile
  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await findUser(username);

      setProfile(currentProfile);
    }
    loadProfile();
  }, [username]);

  //load user's follow
  useEffect(() => {
    async function loadFollows() {
      const currentFollows = await findFollow(username);

      setFollowed(currentFollows);
    }
    loadFollows();
  }, [username]);

  //get follow status
  useEffect(() => {
    async function loadFollowStatus() {
      const currentStatus = await getOneFollow(status);
      console.log(currentStatus);

      if(currentStatus.length !== 0){
      setFollowState(currentStatus);
      }
    }
    loadFollowStatus();
  }, [status]);


  //add follow
  const handleFollow = () => {
    createFollow(status);
    window.location.reload();
  }

  //unfollow
  const handleUnfollow = () => {
    unFollow(status);
    window.location.reload();
  }

  return (
    <div className="content">
      <h1 className="display-4">{username}</h1>
      {followState !== '' ?
      <button onClick={handleUnfollow} className="unfollow-btn">unfollow {username}</button>
      :
      <button onClick={handleFollow} className="follow-btn">follow {username}</button>
      }
      <table className="profile-table">
        <tr id="dark-tr">
          <th>Username: </th>
          <th>{profile.username}</th>
        </tr>
        <tr>
          <td>Name: </td>
          <td>{profile.first_name} {profile.last_name} </td>
        </tr>
        <tr>
          <td>Joined date: </td>
          <td>{profile.joined_date}</td>
        </tr>
      </table>
      <h2>{username}'s follows</h2>
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
