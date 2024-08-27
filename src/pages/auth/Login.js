import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { fetchUser } = useContext(AuthContext);

    const login = async () => {
        if (!email || !password) {
            window.alert("All fields are required");
            return;
        }
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
            navigate("/bookmark-word");
        } else {
            window.alert(data.error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                />
                <button type="submit" onClick={login} className="auth-button">
                    Login
                </button>
                <Link to="/register" className="auth-link">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Login;
