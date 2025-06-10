// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export async function getUser(token, id) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${id}`, requestOptions);

    if (!response.ok){
        throw new Error('Failed to fetch user info')
    }

    const userData = await response.json();
    return userData;
}