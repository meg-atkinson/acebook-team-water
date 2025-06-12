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

export async function sendFriendRequest(token, receiverId) {
    const requestOptions = {
        method: 'PUT',
        headers: 
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        body: JSON.stringify({})
    };

    const response = await fetch(`${BACKEND_URL}/users/friend-request/${receiverId}`, requestOptions);

    if (!response.ok){
        throw new Error('Failed to send friend request')
    }

    const updatedUserData = await response.json()
    return updatedUserData;
}

export async function acceptFriendRequest(token, receiverId) {
    const requestOptions = {
        method: 'PUT',
        headers: 
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        body: JSON.stringify({})
    };

    const response = await fetch(`${BACKEND_URL}/users/friend-request/accept/${receiverId}`, requestOptions);
    console.log(response)

    if (!response.ok){
        throw new Error('Failed to accept friend request')
    }

    const updatedUserData = await response.json()
    return updatedUserData;
}

export async function rejectFriendRequest(token, receiverId) {
    const requestOptions = {
        method: 'PUT',
        headers: 
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        body: JSON.stringify({})
    };

    const response = await fetch(`${BACKEND_URL}/users/friend-request/reject/${receiverId}`, requestOptions);
    console.log(response)

    if (!response.ok){
        throw new Error('Failed to reject friend request')
    }

    const updatedUserData = await response.json()
    return updatedUserData;
}