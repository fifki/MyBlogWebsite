const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    //a string because its going to be a link to a file in uploads
    cover: String,
    //we need this to be able to display it in the /srs/post
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);
const PostModel = model("Post", PostSchema);
module.exports = PostModel;
