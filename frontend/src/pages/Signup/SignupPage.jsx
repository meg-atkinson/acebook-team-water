import "./SignupPage.css"
import logo from '../../assets/Acebook4.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [relStatus, setRelStatus] = useState("");
  const [birthday, setBirthday] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signup(email, password, {
        firstName,
        lastName,
        pronouns,
        relStatus,
        birthday,
        homeTown
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  }
    

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }
  function handlePronounsChange(event) {
    setPronouns(event.target.value);
  }
  function handleRelStatusChange(event) {
    setRelStatus(event.target.value);
  }
  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
  }
  function handleHomeTownChange(event) {
    setHomeTown(event.target.value);
  }


  return (
    <div className="fullscreen">
<br />
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <div className="header">
        <h2>Signup</h2>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
<br />
        <label htmlFor="password">Password: </label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
<br />
<br />
        <label htmlFor="firstName">First Name: </label>
        <input
          placeholder="First Name"
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />
<br />
        <label htmlFor="lastName">Last Name: </label>
        <input
          placeholder="Last Name"
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />  
<br />
        <label htmlFor="pronouns">Pronouns: </label>
        <input
          placeholder="They/Them"
          id="pronouns"
          type="text"
          value={pronouns}
          onChange={handlePronounsChange}
        /> 
<br />
        <label htmlFor="relStatus">Relationship Status: </label>
        <input
          placeholder="Relationship Status"
          id="relStatus"
          type="text"
          value={relStatus}
          onChange={handleRelStatusChange}
        />
<br />
        <label htmlFor="birthday">Birthday </label>
        <input
          placeholder="Day Month"
          id="birthday"
          type="text"
          value={birthday}
          onChange={handleBirthdayChange}
        /> 
<br />
        <label htmlFor="homeTown">Home Town: </label>
        <input
          placeholder="Town"
          id="homeTown"
          type="text"
          value={homeTown}
          onChange={handleHomeTownChange}
        />
<br />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      </div>
    </div>
  );
}
