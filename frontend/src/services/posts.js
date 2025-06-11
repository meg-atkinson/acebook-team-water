// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// getPosts
export async function getPosts(token, userId, targetUserID) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts?userID=${userId}&targetUserID=${targetUserID}`, requestOptions);
  

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
}

// getPostByType
export async function getPostsByType(token, userId, type) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts?userID=${userId}&postType=${type}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
}

// CreatePost
export async function createPost(token, uploadData) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: uploadData
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to fetch posts");
  }  

  const createdPost = await response.json();
  console.log('Post created:', createdPost);
  return 
}

// LikePost
export async function likePost(token, postId) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ postID: postId })
  };

  const response = await fetch(`${BACKEND_URL}/posts/like`, requestOptions);

  if (!response.ok) {
    throw new Error("Unable to like post");
  }  

  const likedPost = await response.json();
  console.log('Liked Post:', likedPost);
  return likedPost;
}

// unlikePost - pretty identical to likePost
export async function unlikePost(token, postId) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ postID: postId })
  };

  const response = await fetch(`${BACKEND_URL}/posts/unlike`, requestOptions);

  if (!response.ok) {
    throw new Error("Unable to unlike post");
  }  

  const unlikedPost = await response.json();
  console.log('Unliked Post:', unlikedPost);
  return unlikedPost;
}

