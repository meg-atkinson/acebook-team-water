import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../App";
import { login } from "../../services/authentication";

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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div className="create-account">
      <button onClick={handleClick} className="create-account-btn">Create new account</button>
      </div>
    </>
  );
}
