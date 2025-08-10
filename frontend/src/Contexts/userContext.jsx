import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({ user: null });


const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState({ userId: '', username: '', role: '' })

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {

            const userId = localStorage.getItem('userId') || '';
            const username = localStorage.getItem('username') || '';
            const role = localStorage.getItem('role') || '';

            if (userId.trim().length != 0 && username.trim().length != 0 && role.trim().length != 0) {

                setUser({ userId, username, role })

            }

        }

    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>

            {children}

        </UserContext.Provider>
    )

}

export default UserContextProvider;