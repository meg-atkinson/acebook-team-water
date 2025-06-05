require("../mongodb_helper");

const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it("has a content", () => {
    const post = new Post({ content: "some message" });
    expect(post.content).toEqual("some message");
  });

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    const post = new Post({ content: "some message", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });

    await post.save();
    const posts = await Post.find();
    expect(posts[0].content).toEqual("some message");
    expect(posts[0].userID.toString()).toEqual("683d87f1d19165ea3a13dffd");
    expect(posts[0].targetUserID.toString()).toEqual("683d87f1d19165ea3a13dcca");
    expect(posts[0].postType).toEqual("post");
  });
});
