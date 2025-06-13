import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../App";
import { login } from "../../services/authentication";
import "./LoginPage.css"

export function LoginPage() {
  const { refreshUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);

      await refreshUser();
      navigate("/feed");
    } catch (err) {
      alert("Invalid credentials")
      console.error(err);
      navigate("/login");
    }
  }

  const handleClick = () =>{
    navigate("/signup")
  } 

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <h2 className="login-title">Login</h2>
      <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="submit-button" >
          <input role="submit-button" id="submit" type="submit" value="Submit" />
        </div>
      </form>
      <div className="create-account">
      <button onClick={handleClick} className="create-account-btn">Create new account</button>
      </div>
      </div>
    </>
  );
}
