import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import bcrypt from "bcryptjs";
import session from "express-session";
import dotenv from "dotenv";

const app = express();
dotenv.config();
//DataBase Connection
const DB_NAME = "TaskList";
const USER_COLLECTION = "Users";
const url =  process.env.MONGO_URI;
const client = new MongoClient(url);

let db;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "my_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

async function connectDB() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("MongoDB Atlas Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

connectDB();
//Authentication Middleware
const isAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

//Signup
app.post("/signup", async (req, res) => {
  const { Name, Email, PassWord } = req.body;

  try {
    const existingUser = await db
      .collection(USER_COLLECTION)
      .findOne({ email: Email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(PassWord, 10);

    const result = await db.collection(USER_COLLECTION).insertOne({
      name: Name,
      email: Email,
      password: hashedPassword,
      tasks: [], // Task Added 
      createdAt: new Date(),
    });

    req.session.userId = result.insertedId;

    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

//Login
app.post("/login", async (req, res) => {
  const { Email, PassWord } = req.body;

  try {
    const user = await db
      .collection(USER_COLLECTION)
      .findOne({ email: Email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(PassWord, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    req.session.userId = user._id;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

//Keeps the user Login even after refreshing the page
app.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ loggedIn: false });
  }

  const user = await db.collection(USER_COLLECTION).findOne(
    { _id: new ObjectId(req.session.userId) },
    { projection: { password: 0 } }
  );

  if (!user) {
    return res.status(404).json({ loggedIn: false });
  }

  res.json({
    loggedIn: true,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

//add task
app.post("/addtask", isAuth, async (req, res) => {
  const { Title, Description, Priority } = req.body;

  const task = {
    _id: new ObjectId(),
    Title,
    Description,
    Priority: Priority || "High",
    createdAt: new Date(),
  };

  await db.collection(USER_COLLECTION).updateOne(
    { _id: new ObjectId(req.session.userId) },
    { $push: { tasks: task } }
  );

  res.status(201).json({
    success: true,
    message: "Task added",
    task,
  });
});


//Get Task
app.get("/tasks", isAuth, async (req, res) => {
  const user = await db.collection(USER_COLLECTION).findOne(
    { _id: new ObjectId(req.session.userId) },
    { projection: { tasks: 1 } }
  );

  res.status(200).json({
    success: true,
    data: user?.tasks || [],
  });
});

//Get Task
app.delete("/deletetask/:taskId", isAuth, async (req, res) => {
  await db.collection(USER_COLLECTION).updateOne(
    { _id: new ObjectId(req.session.userId) },
    { $pull: { tasks: { _id: new ObjectId(req.params.taskId) } } }
  );

  res.status(200).json({
    success: true,
    message: "Task deleted",
  });
});

//Logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});


//Server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
