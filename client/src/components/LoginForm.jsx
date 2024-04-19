import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

const LoginForm = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [formData, setFormData] = useState({login: '', password: ''});
    
    const entry = (event) => {
        event.preventDefault();
        setIsAuth(true);
    }

    const authorized_view = (
        <div>
            Профиль пользователя
        </div>
    );

    const no_authorized_view = (
        <div className="login_block">
            Вход в аккаунт webSynth
            <form onSubmit={entry} className="login_form">
                <input
                    value={formData.login}
                    onChange={e => setFormData({...formData, login: e.target.value})}
                    required={true}
                    type="text"
                    placeholder="Введите логин"
                />
                <input
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    required={true}
                    type="password"
                    placeholder="Введите пароль"
                />
                <button type="submit">
                    Войти
                </button>
            </form>
        </div>
    );

    return (
        isAuth
        ?
        authorized_view
        :
        no_authorized_view
    )
}

export default LoginForm;