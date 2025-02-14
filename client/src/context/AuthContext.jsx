import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const isLogged=localStorage.getItem('Auth') ? true: false
    const [loggedIn, setLoggedIn] = useState(isLogged);


    const AuthData = { loggedIn, setLoggedIn };

    return (
        <AuthContext.Provider value={AuthData}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
