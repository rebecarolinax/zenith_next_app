"use client"

import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

export const UserProvider = ({ children, props }) => {
    const [userData, setUserData] = useState(null);


    useEffect(() => {

        const usuario = localStorage.getItem("usuario")

        if (usuario) {
            setUserData(JSON.parse(usuario))
        }

    }, [])

    return (
        <UserContext.Provider value={{ userData, setUserData, teste: "xablau" }}>
            {children}
        </UserContext.Provider>
    );
};

export const userDecodeToken = async (token) => {
    if (token === null) {
        return null;
    }

    const decoded = jwtDecode(token);

    return {
        id: decoded.jti,
        nome: decoded.name,
        email: decoded.email,
        foto: decoded.photo,
        cargo: decoded.role,
        colaborador: decoded.idColaborador
    };
};

