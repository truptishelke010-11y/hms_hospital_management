import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === "admin@hospital.com" && pass === "123") onLogin();
    else alert("Wrong Credentials!");
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="logo-circle">🏥</div>
        <h2>Medicare Login</h2>
        <input type="email" placeholder="Admin Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default Login;