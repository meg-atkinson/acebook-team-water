const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAllUsers(token) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    const response = await fetch(`${BACKEND_URL}/users`, requestOptions)

    if (response.status !== 200) {
        throw new Error("Unable to fetch posts");
    }

    const data = await response.json();
    return data;
}

export async function getSingleUser(userID, token) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${userID}`, requestOptions);

    if (!response.ok) {
        throw new Error("Unable to fetch posts");
    }

    const data = await response.json();
    return data;
}