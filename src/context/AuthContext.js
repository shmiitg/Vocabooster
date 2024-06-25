import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1])); // Decode token payload
            setUser(user);
            fetchFavorites(token);
        }
    }, []);

    const fetchFavorites = async (token) => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            setFavorites(data);
        } else {
            setFavorites([]);
        }
    };

    const login = async (email, password) => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
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
            fetchFavorites(data.token);
            navigate("/");
        } else {
            throw new Error(data.error);
        }
    };

    const register = async (username, email, password) => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
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
            fetchFavorites(data.token);
            navigate("/");
        } else {
            throw new Error(data.error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setFavorites([]);
        navigate("/login");
    };

    const addFavorite = async (wordId) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/favorites/${wordId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            setFavorites(data.favorites);
            window.alert(data.msg);
        } else {
            window.alert("Failed to add favorite");
        }
    };

    const removeFavorite = async (wordId) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/favorites/${wordId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            setFavorites(data.favorites);
            window.alert(data.msg);
        } else {
            window.alert("Failed to remove favorite");
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, favorites, addFavorite, removeFavorite }}
        >
            {children}
        </AuthContext.Provider>
    );
};
