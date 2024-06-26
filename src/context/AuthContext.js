import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

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
            setFavorites(new Set(data.favorites));
        } else if (res.status === 401) {
            logout();
        } else {
            console.log("Failed to fetch favorites");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setFavorites(new Set());
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
            setFavorites(new Set(data.favorites));
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
            setFavorites(new Set(data.favorites));
        } else {
            window.alert("Failed to remove favorite");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
                favorites,
                addFavorite,
                removeFavorite,
                fetchFavorites,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};