import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { fetchUser } = useContext(AuthContext);

    const register = async () => {
        if (!username || !email || !password) {
            window.alert("All fields are required");
            return;
        }
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
            fetchUser(data.token);
            navigate("/bookmark");
        } else {
            window.alert(data.error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="auth-input"
                />
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
                <button type="submit" onClick={register} className="auth-button">
                    Register
                </button>
                <Link to="/login" className="auth-link">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Register;
