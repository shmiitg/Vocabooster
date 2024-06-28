import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        fetchUser(token);
    }, []);

    const fetchUser = async (token) => {
        const url = `${process.env.REACT_APP_SERVER_URL}/user`;
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            setUser(data.username);
            setFavorites(new Set(data.favorites.map((fav) => fav._id)));
        } else if (res.status === 401) {
            localStorage.removeItem("token");
            setUser(null);
            setFavorites(new Set());
        } else {
            console.log("Failed to fetch user");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setFavorites(new Set());
        navigate("/login");
    };

    const addFavorite = async (wordId) => {
        const updatedFavorites = new Set(favorites);
        updatedFavorites.add(wordId);
        setFavorites(updatedFavorites);

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
        const updatedFavorites = new Set(favorites);
        updatedFavorites.delete(wordId);
        setFavorites(updatedFavorites);

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
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
