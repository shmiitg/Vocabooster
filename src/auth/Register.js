import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser, fetchFavorites } = useContext(AuthContext);

    const register = async () => {
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

    return (
        <div>
            <h2>Register</h2>
            <div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={register}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
