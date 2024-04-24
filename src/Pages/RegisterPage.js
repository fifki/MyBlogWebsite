import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Corrected typo here
  async function register(ev) {
    ev.preventDefault();
    console.log(username, password);
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1 className="pagetitle">Register</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      ></input>

      <input
        type="password" // Changed to password type for password field
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      ></input>

      <button>Register</button>
    </form>
  );
}
