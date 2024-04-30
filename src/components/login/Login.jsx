import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

const handleLogin = async () => {
    const data = {
        email: email,
        password: password
    }
    try {
        const res = await axios.post("http://localhost:5000/api/auth/signin", data);
        console.log(res.data);
        localStorage.setItem("userid", res.data._id);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("name", res.data.name);
        setEmail('');
        setPassword('');
        navigate('/home');
    } catch (error) {
        console.log(error);
        setError("Login failed. Please check your credentials and try again.");
        
    }
}
const handleCloseError = () => {
    setError(null); 
};
    return (
        <div class="container">
           {error && (
                <div style={{
                    position: 'fixed',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    maxWidth: 600, 
                    zIndex: 1000    
                }}>
                    <Alert severity="error" onClose={handleCloseError}>
                        {error}
                    </Alert>
                </div>
            )}
            <form action="" class="form_main">
                <p class="heading">Login</p>

                <div class="inputContainer">
                    <svg class="inputIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                    </svg>
                    <input type="text" class="inputField" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="inputContainer">
                    <svg class="inputIcon" width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none" />
                    </g><g id="Layer_7" data-name="Layer 7"><g><path d="M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM37,42H9V22H37Z" /><circle cx="15" cy="32" r="3" /><circle cx="23" cy="32" r="3" /><circle cx="31" cy="32" r="3" /></g></g></g>
                    </svg>
                    <input type="password" class="inputField" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button id="button" type='button' onClick={handleLogin}>Submit</button>
                <div>or</div>
                
                <Link to="/signup">Create an account</Link>
            </form>
            
        </div>
        // <div>Login</div>
    )
}

export default Login