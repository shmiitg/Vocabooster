import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { fetchUser } = useContext(AuthContext);

    const login = async () => {
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
            fetchUser(data.token);
            navigate("/dashboard");
        } else {
            throw new Error(data.error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
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
                <button type="submit" onClick={login}>
                    Login
                </button>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default Login;
