import { useState } from 'react';

const NewPost = () => {

    const [newPost, setNewPost] = useState("");

    
    const handleSubmit = (event) => {
    event.default()
    fetch("http://url.com/newpost", {
        method: "POST",
        body: JSON.stringify({ newPost: newPost }),
    });
}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br />
                <label>Make A New Post
                    <br />
                    <br />
                    <input type="text" name="post" value={newPost} onChange={(event) => setNewPost(event.target.value)}/>
                </label>
                <br />
                <br />
                <label>
            
                    <input type="submit" value="Post" />
                </label>
            </form>
        </div>
    )
}

export default NewPost;