import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children, isAuth, setIsAuth}) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        //some logic
        setIsAuth(true);
        setUser(userData);
    }

    const logout = () => {
        // some logic
        setIsAuth(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
} 