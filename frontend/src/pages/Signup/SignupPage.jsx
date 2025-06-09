import "./SignupPage.css"
import logo from '../../assets/Acebook4.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { signup } from "../../services/authentication";

export function SignupPage() {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});

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
    },
    photos: {
    profilePicture: ""   // File object
    },
  });

  const validateForm = () => {
    const newErrors = {};

  if (!formData.email.includes("@")) {
    newErrors.email = "Invalid email address";
  }
  if (formData.password.length < 1) {
    newErrors.password = "Password must be at least 1 character";
  }
  if (!formData.basicInfo.firstName.trim()) {
    newErrors.firstName = "First name is required";
  }
  if (!formData.basicInfo.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  }
  if (!formData.basicInfo.pronouns.trim()) {
    newErrors.pronouns = "Pronouns are required";
  }
  if(!formData.basicInfo.birthday.trim()){
    newErrors.birthday = "Birthday is required"
  }
  if(!formData.basicInfo.homeTown.trim()){
    newErrors.homeTown = "Hometown required"
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
  };




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
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        photos: {
          profilePicture: file
        },
      }));
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!validateForm()){
      return;
    }
    
    const uploadData = new FormData();

    uploadData.append("email", formData.email);
    uploadData.append("password", formData.password);

    // basicInfo fields
    uploadData.append("firstName", formData.basicInfo.firstName);
    uploadData.append("lastName", formData.basicInfo.lastName);
    uploadData.append("pronouns", formData.basicInfo.pronouns);
    uploadData.append("relStatus", formData.basicInfo.relStatus);
    uploadData.append("birthday", formData.basicInfo.birthday);
    uploadData.append("homeTown", formData.basicInfo.homeTown);

    // Photo file
    if (formData.photos.profilePicture) {
      uploadData.append("profilePicture", formData.photos.profilePicture);
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: uploadData,
      });

      if (response.ok) {
        const createdUser = await response.json();
        console.log("User created:", createdUser);

       // Redirect to login
      navigate("/login");

    } else {
      const errorText = await response.text();
      console.error("Signup failed:", errorText);
    }

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
            className = {errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
          <br />
          <label htmlFor="password">Password: </label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className = {errors.password ? "input-error" : ""}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
          <br />
          <br />
          <label htmlFor="firstName">First Name: </label>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            value={formData.basicInfo.firstName}
            onChange={handleChange}
            className= {errors.firstName ? "input-error" : ""}
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          <br />
          <label htmlFor="lastName">Last Name: </label>
          <input
            placeholder="Last Name"
            name="lastName"
            type="text"
            value={formData.basicInfo.lastName}
            onChange={handleChange}
            className= {errors.lastName ? "input-error": ""}
          />  
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          <br />
          <label htmlFor="pronouns">Pronouns: </label>
          <input
            placeholder="They/Them"
            name="pronouns"
            type="text"
            value={formData.basicInfo.pronouns}
            onChange={handleChange}
            className={errors.pronouns ? "input-error" : ""}
          /> 
          {errors.pronouns && <span className="error-text">{errors.pronouns}</span>}
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
            className={errors.birthday ? "input-error": ""}
          /> 
          {errors.birthday && <span className="error-text">{errors.birthday}</span>}
          <br />
          <label htmlFor="homeTown">Home Town: </label>
          <input
            placeholder="Town"
            name="homeTown"
            type="text"
            value={formData.basicInfo.homeTown}
            onChange={handleChange}
            className={errors.homeTown ? "input-error": ""}
          />
          {errors.homeTown && <span className="error-text">{errors.homeTown}</span>}
          <br />
          <label htmlFor="profilePicture">Profile Picture: </label>
          <input 
            name="profilePicture"
            type="file" 
            accept="image/*" 
            style={{paddingBottom:"20px"}}
            onChange={handleImageChange}
          />
          <br />
          <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
