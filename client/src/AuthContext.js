import { createContext, useState } from "react";

export const AuthContext = createContext(null);

// Компонент контекста, содержащий состояния и функции
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
} 