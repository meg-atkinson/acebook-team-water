import Post from "../Post";

export const Wall = ({ posts, showWall }) => {
    if (!Array.isArray(posts)) return <p>Unexpected data</p>;
    if (showWall) {
        return (
            <div className="wallContainer">
            {posts.map((post) => (
                <div className="post-card" key={post._id}>
                <Post post={post} />
                </div>
            ))}
            </div>
        )
    }
}