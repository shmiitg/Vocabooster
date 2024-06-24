import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1])); // Decode token payload
            setUser(user);
        }
    }, []);

    const login = async (email, password) => {
        const res = await fetch(`${process.env.REACT_APP_LOCAL_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.status === 200) {
            localStorage.setItem("token", data.token);
            const user = JSON.parse(atob(data.token.split(".")[1]));
            setUser(user);
            navigate("/");
        } else {
            throw new Error(data.error);
        }
    };

    const register = async (username, email, password) => {
        const res = await fetch(`${process.env.REACT_APP_LOCAL_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        if (res.status === 201) {
            localStorage.setItem("token", data.token);
            const user = JSON.parse(atob(data.token.split(".")[1]));
            setUser(user);
            navigate("/");
        } else {
            throw new Error(data.error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
