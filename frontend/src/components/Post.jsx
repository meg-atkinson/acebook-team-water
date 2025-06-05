function Post(props) {
  return <article key={props.post._id}>
                    <p>{props.post.content}</p>
                    {/* {props.post.imageUrl && (
                      <img
                        src={props.post.imageUrl}
                        alt="Post"
                        style={{ width: "300px", borderRadius: "8px", marginTop: "20px" }}
                      />
                    )} */}
                    </article>;
}

export default Post;
