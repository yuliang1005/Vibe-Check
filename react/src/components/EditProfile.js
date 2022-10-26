/*eslint-disable*/
import { React, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { findUser, updateUser,setUser } from "../data/repository";
import MessageContext from "../contexts/MessageContext";
export default function MyProfile(props) {
    const [profile, setProfile] = useState(null);
    const [fields, setFields] = useState({
        username: props.user.username,
        firstname: props.user.first_name,
        lastname: props.user.last_name,
        joineddate: props.user.joineddate
    });
    const { setMessage } = useContext(MessageContext);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    //get user profile from database
    useEffect(() => {
        async function loadProfile() {
            const currentProfile = await findUser(props.user.username);

            setProfile(currentProfile);
            setFieldsNullToEmpty(currentProfile);
        }
        loadProfile();
    }, [props.user.username]);

    //set fileds to empty
    const setFieldsNullToEmpty = (currentFields) => {
        // Make a copy of currentFields so the original parameter is not modified.
        currentFields = { ...currentFields };

        for (const [key, value] of Object.entries(currentFields)) {
            currentFields[key] = value !== null ? value : "";
        }

        setFields(currentFields);
    };

    //process update user
    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        // Update profile.
        console.log(fields);
        const firstname = fields.first_name;
        const lastname =fields.last_name;
        const username = fields.username;

        const profile = await updateUser({firstname,lastname,username});
        if(profile[0] == 1){
            setMessage(<><strong>{profile.first_name} {profile.last_name}</strong> profile has been updated successfully.</>);
            setUser(fields)
            props.updateUser()
            history.push("/profile");
        }else{
            setMessage(<><strong>{profile.first_name} {profile.last_name}</strong> profile has been updated error.</>);
        }
    };

    if (profile === null || fields === null)
        return null;

    return (
        <div className="content">
            <form onSubmit={handleSubmit} className="profile-form">
                <h2>Edit Profile</h2>
                <div id="edit-user">
                    <label>Username: </label>
                    <p id="edit-username">{fields.username}</p>
                </div>
                <br />
                <div id="edit-user">
                    <label>Firstname: </label>
                    <input name="first_name" className="profile-input" id="edit-firstname" value={fields.firstname} onChange={handleInputChange} required />
                    {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                </div>
                <br />
                <div id="edit-user">
                    <label>Lastname: </label>
                    <input name="last_name" className="profile-input" id="edit-lastname" value={fields.lastname} onChange={handleInputChange} required />
                    {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                </div>
                <br />
                <button className="profile-button" id="edit-submit" type="submit">Submit</button>
                <Link to="/profile" className="link-text">Cancel</Link>
            </form>
        </div>
    );
}
