import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});


export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState({})

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {

            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            const role = localStorage.getItem('role');

            setUser({ userId, username, role })

        }

    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>

            {children}

        </UserContext.Provider>
    )

}