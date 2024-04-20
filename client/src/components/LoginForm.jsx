import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

import { useFetching } from "../useFetching";
import UserService from "../UserService";

import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

// Компонент авторизации
const LoginForm = () => {
    const {user, setUser} = useContext(AuthContext); // Подтягиваем состояние из контекста
    const [formData, setFormData] = useState({login: '', password: ''}); // Состояние формы логина
    const navigate = useNavigate(); // Функция редиректа

    // Обращение к стороннему апи логина через сервис с помощью обертки
    const [fetchUser, isLoginLoading, loginError] = useFetching(async () => {
        const response = await UserService.Login(formData.login, formData.password);
        setUser(response.user);
        //console.log(user);
    })

    // ОБращение к стороннему апи логаута через сервис с помощью обертки
    const [fetchLogout, isLogoutLoading, logoutError] = useFetching(async () => {
        await UserService.Logout(user.token);
        setUser(null);
        //console.log(user);
    })
    
    // Функция отправки формы логина
    const Login = async (event) => {
        event.preventDefault();
        fetchUser();
        setFormData({login: '', password: ''});
    }

    // Функция нажатия на кнопку логаута
    const Logout = async (event) => {
        event.preventDefault();
        fetchLogout();
        navigate(`/`, {replace: false});
    }

    // Функция навигации к странице профиля пользователя
    const transitToProfile = (uid) => {
        navigate(`/users/${uid}`, {replace: false})
    }

    // Представление компонента для авторизованного пользователя
    const authorized_view = (
        <>
            {logoutError && <div className="logout_error">{logoutError}!</div>}

            {isLogoutLoading
            ?
            <div className="loader_block"><Loader /></div>
            :
            <div className="logout_block">
                <div onClick={() => transitToProfile(user.uid)} className="profile_block">
                    Профиль
                </div>
                <button onClick={Logout} className="logout_button">
                    Выйти
                </button>
            </div>
            }
        </>
    );

    // Представление компонента для неавторизованного пользователя
    const no_authorized_view = (
        <>
            {loginError && <div className="login_error">{loginError}!</div>}
            
            {isLoginLoading
            ?
            <div className="loader_block"><Loader /></div>
            :
            <div className="login_block">
                Вход в аккаунт webSynth
                <form onSubmit={Login} className="login_form">
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
            }
        </>
    );

    return (
        user
        ?
        authorized_view
        :
        no_authorized_view
    )
}

export default LoginForm;