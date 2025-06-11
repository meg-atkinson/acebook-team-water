import { useNavigate } from "react-router-dom";
import { useState } from "react";

import '../../pages/EditProfile/EditProfilePage.css';

export const EditSideProfile = ({ user }) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

// create form framework
    const [formData, setFormData] = useState({
        basicInfo: {
            firstName: user?.basicInfo?.firstName || "",
            lastName: user?.basicInfo?.lastName || "",
            pronouns: user?.basicInfo?.pronouns || "",
            relStatus: user?.basicInfo?.relStatus || "",
            birthday: user?.basicInfo?.birthday || "",
            homeTown: user?.basicInfo?.homeTown || ""
        },
        photos: {
            profilePicture: null //File object for new uploads
        }
    });

// set up errors for invalid removals
    const validateForm = () => {
        const newErrors = {};

        if (!formData.basicInfo.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        if (!formData.basicInfo.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!formData.basicInfo.pronouns.trim()) {
            newErrors.pronouns = "Pronouns are required";
        }
        if (!formData.basicInfo.birthday.trim()) {
            newErrors.birthday = "Birthday is required";
        }
        if (!formData.basicInfo.homeTown.trim()) {
            newErrors.homeTown = "Hometown required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                photos: {
                    profilePicture: file
                }
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const uploadData = new FormData();

        //basicInfo fields
        uploadData.append("firstName", formData.basicInfo.firstName);
        uploadData.append("lastName", formData.basicInfo.lastName);
        uploadData.append("pronouns", formData.basicInfo.pronouns);
        uploadData.append("relStatus", formData.basicInfo.relStatus);
        uploadData.append("birthday", formData.basicInfo.birthday);
        uploadData.append("homeTown", formData.basicInfo.homeTown);

        // Replacement photo if one was selected
        if (formData.photos.profilePicture) {
            uploadData.append("profilePicture", formData.photos.profilePicture);
        }

        // check and replace the existing data
        try {
            const response = await fetch(`http://localhost:3000/users/${user._id}`, {
                method: "PUT",
                body: uploadData,
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log("User updated:", updatedUser);
            } else {
                const errorText = await response.text();
                console.error("update failed:", errorText);
            }
        } catch (error) {
            console.error("Update error:", error.message);
        }
    };

    const convertBirthday = () => {
        const birthday = new Date(user.basicInfo.birthday);
        return birthday.toLocaleDateString('en-GB');
    };

    if (!user || !user.basicInfo) {
        return <p>Loading profile...</p>;
    }

    const profilePicUrl = user.photos.profilePicture
        ? `http://localhost:3000/${user.photos.profilePicture}`
        : "https://www.hcihealthcare.ng/wp-content/uploads/2016/10/face-avatar.png"; // fallback image if none


    // start of display form
    return (
        <div className="editSideProfile">
            <img src={profilePicUrl} alt="Profile" />
            
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name: </label>
                <input
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    value={formData.basicInfo.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "input-error" : ""}
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
                    className={errors.lastName ? "input-error" : ""}
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

                <label htmlFor="birthday">Birthday: </label>
                <input
                    placeholder="Day Month"
                    name="birthday"
                    type="text"
                    value={formData.basicInfo.birthday}
                    onChange={handleChange}
                    className={errors.birthday ? "input-error" : ""}
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
                    className={errors.homeTown ? "input-error" : ""}
                />
                {errors.homeTown && <span className="error-text">{errors.homeTown}</span>}
                <br />

                <label htmlFor="profilePicture">Profile Picture: </label>
                <input
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <br />

                <p>Friends: {user.friends.length}</p>
                
                <input type="submit" value="Submit changes" />
            </form>
        </div>
    );
};