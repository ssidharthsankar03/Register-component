import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });
  const [dob, setDob] = useState(null);
  const [msg, setMsg] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          dob: dob ? dob.toISOString().split("T")[0] : null,
        }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        alert("Registration successful!");
        setSubmittedData({ ...form, dob: dob?.toLocaleDateString("en-GB") });
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
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
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          dateFormat="dd-MM-yyyy"
          placeholderText="dd-mm-yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="custom-input"
        />
        <button type="submit">Register</button>
        <p>{msg}</p>
      </form>

      {submittedData && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h3>🎉 Registered Successfully!</h3>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Address:</strong> {submittedData.address}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>DOB:</strong> {submittedData.dob}
          </p>
        </div>
      )}
    </div>
  );
}

export default Register;
