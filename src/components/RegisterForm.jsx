import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    password: '',
    dob:''
  });
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8081/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    console.log("Server Response:", data);

    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
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

      <input type="date"
      name='dob'
      value={form.dob}
      onChange={handleChange}
      required />
      <button type="submit">Register</button>
      <p>{msg}</p>
    </form>
  );
}

export default Register;
