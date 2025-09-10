import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../Contexts/userContext";

import './Profile.css';
import User from '../../assets/Home/male.png';

const Profile = () => {

    const { user } = useContext(UserContext)
    const [userData, setUserData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {

        if (!user?.userId) return;

        fetch(`http://localhost:5000/user/get/${user.userId}`)
            .then(res => res.json())
            .then((data) => {
                setUserData(data.user);
            })
            .catch(err => console.log('Error from get user : ' + err))


    }, [user?.userId])

    const handleSave = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                fetch(`http://localhost:5000/user/update`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userData.Email, profilePic: base64 })
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log('user', data.user)
                        setUserData(data.user);
                        setIsEditing(false);
                        setSelectedFile(null);
                        alert('profile picture updated succesfully')

                    })
                    .catch(err => console.log('Error updating user : ' + err));
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSelectedFile(null);
    };

    return (
        <div className="c-profile">
            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-avatar">
                        {selectedFile ? (
                            <img src={URL.createObjectURL(selectedFile)} />
                        ) : userData?.ProfilePic && userData.ProfilePic.trim() !== "" && userData.ProfilePic !== " " ? (
                            <img src={userData?.ProfilePic} />
                        ) : (
                            <img src={User} />
                        )}
                        <input type="file" ref={fileInputRef} accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} style={{ display: 'none' }} />
                    </div>
                    <button className="edit-avatar-btn" onClick={() => { setIsEditing(true); fileInputRef.current.click(); }}>Edit Image</button>
                    <div className="profile-details">
                        <h2>{userData?.Name || user.username}</h2>
                        <div className="profile-info">
                            <div className="form-group">
                                <label>Email:</label>
                                <div className="form-input">{userData?.Email || user.email || 'user@example.com'}</div>
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <div className="form-input">{userData?.Phone || user.phone || '+1234567890'}</div>
                            </div>
                            <div className="form-group">
                                <label>University:</label>
                                <div className="form-input">{userData?.University || user.university || 'University Name'}</div>
                            </div>
                            <div className="form-group">
                                <label>Faculty:</label>
                                <div className="form-input">{userData?.Facualty || user.faculty || 'Faculty Name'}</div>
                            </div>
                        </div>
                        {isEditing && (
                            <div className="edit-actions">
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Profile;