import React, { useContext } from "react";

import '../styles/App.css';
import { AuthContext } from "../AuthContext";

// Компонент страницы профиля пользователя
const Profile = () => {
    const {user} = useContext(AuthContext);

    return (
        <div className="profile">
            <h1>
                {`Страница профиля пользователя ${user.name}`}
            </h1>
            <div className="profile_info">
                {`Uid: ${user.uid}`}<br/>
                {`Name: ${user.name}`}<br/>
                {`Email: ${user.email}`}<br/>
            </div>
        </div>
    )
}

export default Profile;