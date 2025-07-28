import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    password: ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Replace with a real API call later!
    setMsg(`Registering: ${form.name} | ${form.email} | ${form.address}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Your Address"
        value={form.address}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
      <p>{msg}</p>
    </form>
  );
}

export default Register;
