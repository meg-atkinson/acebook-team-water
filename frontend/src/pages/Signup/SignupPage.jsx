import "./SignupPage.css"
import logo from '../../assets/Acebook4.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { signup } from "../../services/authentication";

export function SignupPage() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    basicInfo: {
      firstName: "",
      lastName: "",
      pronouns: "",
      relStatus: "",
      birthday: "",
      homeTown: ""
    }
  });

  const handleChange = (event) => {
    if (["firstName", "lastName", "pronouns", "relStatus", "birthday", "homeTown"].includes(event.target.name)) {
      setFormData((prevFormData) => ({
          ...prevFormData,
          basicInfo: {
            ...prevFormData.basicInfo,
            [event.target.name]: event.target.value
          }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value
      }));
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage || `Signup fail: ${response.status}`);
      } 
    
      console.log("Signup successful");
      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };









  return (
    <div className="fullscreen">
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
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="firstName">First Name: </label>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            value={formData.basicInfo.firstName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lastName">Last Name: </label>
          <input
            placeholder="Last Name"
            name="lastName"
            type="text"
            value={formData.basicInfo.lastName}
            onChange={handleChange}
          />  
          <br />
          <label htmlFor="pronouns">Pronouns: </label>
          <input
            placeholder="They/Them"
            name="pronouns"
            type="text"
            value={formData.basicInfo.pronouns}
            onChange={handleChange}
          /> 
          <br />
          <label htmlFor="relStatus">Relationship Status: </label>
          <input
            placeholder="Relationship Status"
            name="relStatus"
            type="text"
            value={formData.basicInfo.relStatus}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="birthday">Birthday </label>
          <input
            placeholder="Day Month"
            name="birthday"
            type="text"
            value={formData.basicInfo.birthday}
            onChange={handleChange}
          /> 
          <br />
          <label htmlFor="homeTown">Home Town: </label>
          <input
            placeholder="Town"
            name="homeTown"
            type="text"
            value={formData.basicInfo.homeTown}
            onChange={handleChange}
          />
          <br />
          <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
