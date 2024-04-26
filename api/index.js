const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const User = require("./models-mongo/User.js");
const fs = require("fs");
const Post = require("./models-mongo/Post.js");

const uploadMiddleware = multer({ dest: "uploads/" });
const db = require("./models");
const secret = "fatimamotaamine";
const path = require("path");



const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
db.sequelize.sync().then(() => {
  console.log("database connected succefully.");
});
//to be able to upload the photo from the uploads
app.use(("/uploads", express.static(__dirname + "/uploads")));

// mongoose.connect('mongodb+srv://fifkirne1:SSuqAnElTs0BmZe2@cluster0.g9gbgaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post("/register", async (req, res) => {
  const User = db.users;
  const { username, password } = req.body;
  console.log(username, password);
  try {
    
    const newUser = User.create({
      username,
      password :bcrypt.hashSync(password, salt) ,
    });
  } catch (error) {
    res.status(400).json(e);
  }
  // try{
  // const userDoc =  await User.create({
  //     username,
  //     passeword: bcrypt.hashSync(passeword, salt), });
  // res.json(userDoc);
  // } catch(e){
  //     
  // }
  res.send({ message: "regested succefully" });
});

app.post("/login", async (req, res) => {
  const { username, passeword } = req.body;
  const userDoc = await User.find({ username });
  const passok = bcrypt.compareSync(passeword, userDoc.passeword);
  if (passok) {
    //loged in
    console.log("hello world");
    // jwt.sign({ username, id:userDoc._id}, secret , {} , (err , token )=>{
    //     if(err) throw err;
    //     res.cookie('token' , token).json({
    //         id:userDoc._id,
    //         username,
    //     });

    // });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  console.log("profile");
  res.send({ message: "done" });
  // const {token}= req.cookies;
  // jwt.verify(token , secret , {} , (err , info) =>{
  //     if(err) throw err;
  //     res.json(info);
  // });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.get("/post", (req, res) => {
  res.send({ message: "get post" });
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname } = req.file;
  console.log(originalname);
  const parts = originalname.split(".");
  const fileName = parts[0];
  const ext = parts.at(-1);
  //renaming the file
  const newPath = path.join(__dirname,"uploads",fileName)+`.${ext}`;
  const oldPath = path.join(__dirname,"..",uploads,fileName);
  console.log(fileName);
  fs.renameSync(oldPath, newPath);

  // //to get the id of the author
  // const { token } = req.cookies;
  // jwt.verify(token, secret, {}, async (err, info) => {
  //   if (err) throw err;
  //   //creating the post
  //   const { title, summary, content } = req.body;
  //   const postDoc = await Post.create({
  //     title,
  //     summary,
  //     content,
  //     cover: newPath,
  //     author: info.id,
  //   });

    // res.json(postDoc);
    // });
    res.json({message: "saved"});
});
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    //renaming the file
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;

    const postDoc = await Post.findById();
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

//to get the post the user created
app.get("./post", async (req, res) => {
  //we want to have all the info about the post
  //sort function so the the latest post is on the top
  //the limit function is to select only 20
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20),
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(4000, () => {
  console.log(">>> Open http://127.0.0.1:%s/ in your browser.", "4000");
});
