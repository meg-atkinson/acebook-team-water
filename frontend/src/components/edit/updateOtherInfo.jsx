import { useNavigate } from "react-router-dom";
import { useState } from "react";

import '../../pages/EditProfile/EditProfilePage.css';

export const UpdateOtherInfo = ({updateInfo, user}) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    // create form framework
    const [formData, setFormData] = useState({
        otherInfo: {
            interests: user?.otherInfo?.interests || "",
            music: user?.otherInfo?.music || "",
            food: user?.otherInfo?.food || "",
            tvShows: user?.otherInfo?.tvShows || "",
            movies: user?.otherInfo?.movies || "",
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

        if (!validateForm()) {
            return;
        }

        const uploadData = new FormData();

        // otherInfo fields
        uploadData.append("interests", formData.otherInfo.interests);
        uploadData.append("music", formData.otherInfo.music);
        uploadData.append("food", formData.otherInfo.food);
        uploadData.append("tvShows", formData.otherInfo.tvShows);
        uploadData.append("movies", formData.otherInfo.movies);
        uploadData.append("quote", formData.otherInfo.quote);

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
                const errorTest = await response.text();
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