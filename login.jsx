import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./Redux/auth";
import { BrowserRouter, useNavigate } from "react-router-dom";
import './Style/All.css';

const Login = () => {
    const [username, setUserName] = useState("");
    const [error, setError] = useState(""); 
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleLogin = () => {
        if (!username.trim()) {
                setError(" Name cannot be empty!"); // Set error message
                return;
        }

                dispatch(login({ username }));
                setUserName("");
                setError("");
                navigate("/"); // Redirect to home after login
        };
         
        const change=(e)=>{
            setUserName(e.target.value);
            setError("");
        }

    return (
        <div className="login-container">
            <h2 className="login">Login</h2>
            <input
                type="text" 
                placeholder="Enter your name"
                value={username}
                onChange={change}
                style={{margin:'15px 0px 0px 15px',border:'1px grey solid',padding:'3px',fontStyle:'italic',borderRadius:'3px'}}
            />
            {error && <p style={{ color: "red",fontSize:'11px',margin:'0px 0px 0px 15px' }}>{error}</p>}
            <button className="logB" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
