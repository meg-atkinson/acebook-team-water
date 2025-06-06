const request = require("supertest");
const JWT = require("jsonwebtoken");
const bcrypt = require('../../bcryptjs');

const app = require("../../app");
const Post = require("../../models/post");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      sub: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
}

let token;
describe("/posts", () => {
  beforeAll(async () => {
    const user = new User({
      email: "eve@me.com",
      password: bcrypt.hashSync('password', 10),
      basicInfo: {
        firstName: "eve",
        lastName: "lol",
        pronouns: "she/her",
        birthday: "01/01/2000",
        homeTown: "Huddersfield"
      }
    });
    await user.save();
    await Post.deleteMany({});
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "some content", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "some content", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });

      const posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].content).toEqual("some content");
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "some content", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ content: "some content", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });

      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ content: "some other content", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });

      const posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ content: "some other content", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const post1 = new Post({ content: "I love all my children equally", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      const post2 = new Post({ content: "I've never cared for GOB", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns every post in the collection", async () => {
      const post1 = new Post({ content: "howdy!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      const post2 = new Post({ content: "hola!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const posts = response.body.posts;
      const firstPost = posts[0];
      const secondPost = posts[1];

      expect(firstPost.content).toEqual("howdy!");
      expect(secondPost.content).toEqual("hola!");
    });

    test("returns a new token", async () => {
      const post1 = new Post({ content: "First Post!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      const post2 = new Post({ content: "Second Post!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const post1 = new Post({ content: "howdy!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      const post2 = new Post({ content: "hola!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.status).toEqual(401);
    });

    test("returns no posts", async () => {
      const post1 = new Post({ content: "howdy!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      const post2 = new Post({ content: "hola!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.posts).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const post1 = new Post({ content: "howdy!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      const post2 = new Post({ content: "hola!", userID: "683d87f1d19165ea3a13dffd", targetUserID: "683d87f1d19165ea3a13dcca" });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.token).toEqual(undefined);
    });
  });
});
