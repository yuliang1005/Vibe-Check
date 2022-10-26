import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, findFollow } from "../data/repository";
import MessageContext from "../contexts/MessageContext";
import ReactPaginate from "react-paginate";

export default function Profiles(props) {
  const [profiles, setProfiles] = useState(null);
  const [page, setPage] = useState(0);
  const { message } = useContext(MessageContext);

  // Load profiles.
  useEffect(() => {
    async function loadProfiles() {
      const currentProfiles = await getAllUsers();

      setProfiles(currentProfiles);
    }
    loadProfiles();
  }, []);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  if(profiles === null)
    return null;

  // Logic for pagination support to display a subset of profiles.
  const pageSize = 5;
  const pageCount = Math.ceil(profiles.length / pageSize);
  const offset = page * pageSize;
  const profilesToDisplay = profiles.slice(offset, offset + pageSize);

  return (
    <div className="content">
    <div>
      {message && <div className="alert alert-success" role="alert">{message}</div>}
      <h1 className="display-4">Users</h1>
      <div>
        <table className="user-table">
            <tr>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Joined date</th>
              <th></th>
            </tr>
          </table>
          <table className="user-table">
            {profilesToDisplay.map(profile =>
            <tbody>
            {profile.username !== props.user.username &&
                    <tr className="user-tr" >
                        <td>{profile.username}</td>
                        <td>{profile.first_name}</td>
                        <td>{profile.last_name}</td>
                        <td>{profile.joined_date}</td>
                        <td><Link className="profileBtn" to={`/user-profile/${profile.username}`}>details</Link></td>
                    </tr>
            }
            </tbody>
            )}
          </table>
        <ReactPaginate
          onPageChange={handlePageClick}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
    </div>
  );
}
