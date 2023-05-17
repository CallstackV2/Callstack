const mongoose = require("mongoose");

// Connecting to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "callstackDB",
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// Schema for 'users' collection
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePic: { type: String, default: "someUrl" },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Bcrypt Functionality:
const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcryptjs");

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err); // convert this to fit our global error handler format?

    // reassign document's password to its hashed version:
    this.password = hash;
    return next();
  });
});

const User = mongoose.model("user", userSchema);

// Schema for 'posts' collection
const postSchema = new Schema({
  date: { type: Date, default: Date.now },
  userId: { type: String },
  postTitle: { type: String, required: true },
  postBody: { type: String, required: true },
  postTag: { type: String, default: "uncategorized" },
  numLikes: { type: Number, default: 0 },
});

const Post = mongoose.model("post", postSchema);

// Schema for 'comments' collection
const commentSchema = new Schema({
  date: { type: Date, default: Date.now },
  postId: { type: String },
  commentBody: { type: String, required: true },
  numLikes: { type: Number, default: 0 },
});

const Comment = mongoose.model("comment", commentSchema);

// // Schema for 'subcomments' collection
// const subcommentSchema = new Schema({
//   date: { type: Date, default: Date.now },
//   postId: String,
//   commentId: ,
//   commentBody: { type: String, required: true },
//   numLikes: {type: Number, default: 0},
// });

// const Subcomment = mongoose.model('subcomment', subcommentSchema);

module.exports = { User, Post, Comment };

// database collection of collections
// collection is a collection of documents
