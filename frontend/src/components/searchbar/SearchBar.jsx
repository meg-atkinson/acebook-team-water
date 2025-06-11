import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
        const [input, setInput] = useState("");

        const fetchData = async (value) => {
            try {
            
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const json = await response.json();
            console.log("Raw data received:", json);
            
            const results = json.filter((user) => {
                if (!user || !user.basicInfo) return false;
        
                const firstName = user.basicInfo.firstName || "";
                const lastName = user.basicInfo.lastName || "";
                const fullName = `${firstName} ${lastName}`.toLowerCase();
        
                return fullName.includes(value.toLowerCase());
            });
        
            setResults(results);

            } catch (error) {
            console.error("Fetch error:", error);
            }
        };

        const handleChange = (value) => {
            setInput(value);
            if (value.trim()) { // Only search if there's actual input
                fetchData(value);
            } else {
                setResults([]); // Clear results when input is empty
            }
        };

        return (
            <div className="input-wrapper">
            <input
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            </div>
        );
};