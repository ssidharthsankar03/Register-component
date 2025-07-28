import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '',remember:false });
  const [message, setMessage] = useState('');
  const navigate= useNavigate()

  const handleChange = e => {
    const{name,value,type,checked}=e.target
    setForm({ ...form, [name]:type==='checkbox'?checked:value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email:form.email,password:form.password}),
      });

      const data = await res.json();
      if(res.ok && data.token){
        form.remember
        ?localStorage.setItem('token',data.token)
        :sessionStorage.setItem('token',data.token)
        setMessage('Login Succcessful')
        setTimeout(() => navigate('/dashboard'),1500)
          
        
      }else{
        setMessage(data.message||'Login Failed')
      }
      
    } catch (err) {
      setMessage('Login error');
    }
  };

 return (
  <form onSubmit={handleSubmit}>
    <h2>Login</h2>
    <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
    <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

    <div className="login-options">
      <label className="remember-me">
        <input type="checkbox" name="remember" onChange={handleChange} />
        Remember Me
      </label>
      <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
    </div>

    <button type="submit">Login</button>
    <p>{message}</p>
  </form>
);

}

export default Login;
