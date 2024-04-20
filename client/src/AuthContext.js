import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (uuid) => {
        //some logic
        setUser(uuid);
    }

    const logout = () => {
        // some logic
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
} 