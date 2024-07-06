import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UniqueObjectSet from "../utils/uniqueObjectSet";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState(new UniqueObjectSet());

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        fetchUser(token);
    }, []);

    const fetchUser = async (token) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/user`;
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.username);
                const favs = data.favorites.map((fav) => ({
                    itemType: fav.itemType,
                    itemId: fav._id,
                }));
                const uniqueFavorites = new UniqueObjectSet();
                favs.forEach((fav) => uniqueFavorites.add(fav));
                setFavorites(uniqueFavorites);
            } else {
                localStorage.removeItem("token");
                setUser(null);
                setFavorites(new UniqueObjectSet());
            }
        } catch (err) {
            console.log("Can't fetch user details");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setFavorites(new UniqueObjectSet());
        navigate("/login");
    };

    const addFavorite = async (itemType, itemId) => {
        const newFavorite = { itemType, itemId };
        const updatedFavorites = new UniqueObjectSet();
        favorites.values().forEach((item) => updatedFavorites.add(item));
        updatedFavorites.add(newFavorite);
        setFavorites(updatedFavorites);

        const token = localStorage.getItem("token");
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/user/favorites/${itemType}/${itemId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            const favs = data.favorites.map((fav) => ({
                itemType,
                itemId: fav.itemId,
            }));
            const uniqueFavorites = new UniqueObjectSet();
            favs.forEach((fav) => uniqueFavorites.add(fav));
            setFavorites(uniqueFavorites);
        } else {
            window.alert("Failed to add favorite");
        }
    };

    const removeFavorite = async (itemType, itemId) => {
        const updatedFavorites = new UniqueObjectSet();
        favorites.values().forEach((item) => {
            if (item.itemId !== itemId) {
                updatedFavorites.add(item);
            }
        });
        setFavorites(updatedFavorites);

        const token = localStorage.getItem("token");
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/user/favorites/${itemType}/${itemId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.ok) {
            const data = await res.json();
            const favs = data.favorites.map((fav) => ({
                itemType,
                itemId: fav.itemId,
            }));
            const uniqueFavorites = new UniqueObjectSet();
            favs.forEach((fav) => uniqueFavorites.add(fav));
            setFavorites(uniqueFavorites);
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
