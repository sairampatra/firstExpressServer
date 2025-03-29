import express from "express";
import { connectToDb } from "./config/dbConfig.js";
import { User } from "./schema/user.js";
import { getBathroom } from "./controllers/getBathroom.js";
import { jagan } from "./controllers/getJagan.js";
import apiRouter from "./routes/apiRouter.js";
import { isAuthenticated } from "./middleware/authMiddleware.js";

const app = express();

connectToDb();

app.use(express.json())
// app.use(express.text())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("home");
});

// first way of using middleware 
// function m1(req, res, next){
// console.log( 'm1');
// next();}
// function m2(req, res, next){
// console.log( 'm2');
// next();}
// function m3(req, res, next){
// console.log( 'm3');
// next();}
// app.post('/post',m1,m2,m3,createPost2)



// second way of using middleware here everything below the middleware code only exicutr if next is true 
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  if (true) {
    next();
  } else {
    res.send("middleware is blocking");
  }
});

// URL params 
// app.post("/ping/:name", (req, res) => {
//   let name = req.params.name
//   res.json({kee:"pong"+' '+ name});
// });


// Query params it can be accessed through req.querry 
// app.post("/ping", (req, res) => {
//   console.log(  req.query  )
//   let name = req.params.name
//   res.json({kee:"pong"});
// });


// request body it can be accessed through req.body 
// it is used to access what we send in body from frontend but between transfering data s converted in to binary or somphing else so it neadedto be converted before accessing to that original format for whichi alredy need to know data is sent in which format 
// app.use(express.json())
// app.use(express.text())
// app.post("/ping", (req, res) => {
//     console.log(  req.body  )
//     res.json({message:"pong"});
//   });
app.get("/bathroom", getBathroom);
app.get("/jagan", jagan);


app.get("/findAllUsers", async (req, res) => {
  console.log("SIde");

  const users = await User.find({});
  console.log(users);

  res.json({
    users,
  });
});

app.post("/createUser", async (req, res) => {
  await new User({
    username: `Jagan `,
    email: "example@gmail.com",
    password: "12345678",
  }).save();
  res.json({
    success: true,
  });
});

app.post("/deleteAllUsers", async (req, res) => {
  await User.deleteMany({});
  res.json({
    success: true,
    message: "All users have been deleted",
  });
});


app.use('/api',apiRouter)





app.listen(6969, () => {
  console.log("soroboro");
});


app.post("/ping",isAuthenticated ,(req, res) => {
  console.log(req.user, 'hahaahah')
  // console.log("bando")
      res.json({message:"pong"});
    });