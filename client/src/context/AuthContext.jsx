import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    // console.log(authUser)
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}   