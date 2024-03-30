import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState(true)
    const [auth, setAuth] = useState({})
    const [changeUserDetails, setChangeUserDetails] = useState(true)

    return (
        <AuthContext.Provider value={{ sidebar, setSidebar, auth, setAuth, changeUserDetails, setChangeUserDetails }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext