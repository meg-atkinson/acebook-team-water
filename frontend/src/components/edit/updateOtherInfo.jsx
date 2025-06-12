import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../pages/EditProfile/EditProfilePage.css';

export const UpdateOtherInfo = ({updatedInfo, user}) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    // helper function to get string values if not input
    const getStringValue = (value) => {
        if (Array.isArray(value)) {
            return value.filter(item => itemm && item.trim()).join(', ');
        }
        return value || "";
    };

    // create form framework
    const [formData, setFormData] = useState({
        otherInfo: {
            interests: getStringValue(user?.otherInfo?.interests),
            music: getStringValue(user?.otherInfo?.music),
            food: getStringValue(user?.otherInfo?.food),
            tvShows: getStringValue(user?.otherInfo?.tvShows),
            movies: getStringValue(user?.otherInfo?.movies),
            quote: user?.otherInfo?.quote || ""
        }
    });

    const handleChange = (event) => {
        if (["interests", "music", "food", "tvShows", "movies", "quote"].includes(event.target.name)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                otherInfo: {
                    ...prevFormData.otherInfo,
                    [event.target.name]: event.target.value
                }
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Debug: Log current form state before processing
        console.log("Submitting form data:", formData.otherInfo);

        try {
            const response = await fetch(`http://localhost:3000/users/me/other-info`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData.otherInfo),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log("User updated successfully:", updatedUser);

                if (updatedInfo && typeof updatedInfo === 'function') {
                    updatedInfo(updatedUser);
                } else {
                    console.log("Update successfull - no callback provided");
                }
            } else {
                const errorText = await response.text();
                console.error("update failed:", errorText);
            }
        } catch (error) {
            console.error("Update error:", error.message);
        }
    };

    if (!user || !user.otherInfo) {
        return <p>Loading profile...</p>
    }


    // start of display form
    return (
        <div className="editOtherInfo">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <label htmlFor="interests">Interests: </label>
                <input
                    placeholder="Interests"
                    name="interests"
                    type="text"
                    value={formData.otherInfo.interests}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="music">Music: </label>
                <input
                    placeholder="Music"
                    name="music"
                    type="text"
                    value={formData.otherInfo.music}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="food">Food: </label>
                <input
                    placeholder="Food"
                    name="food"
                    type="text"
                    value={formData.otherInfo.food}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="tvShows">TV Shows: </label>
                <input
                    placeholder="TV Shows"
                    name="tvShows"
                    type="text"
                    value={formData.otherInfo.tvShows}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="movies">Movies: </label>
                <input
                    placeholder="Movies"
                    name="movies"
                    type="text"
                    value={formData.otherInfo.movies}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="quote">Quote: </label>
                <input
                    placeholder="Quote"
                    name="quote"
                    type="text"
                    value={formData.otherInfo.quote}
                    onChange={handleChange}
                />
                <br />

                <input type="submit" value="Submit changes" />
            </form>
        </div>
    );
};