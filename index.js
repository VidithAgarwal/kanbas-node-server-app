import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from 'cors'
import "dotenv/config";
import session from 'express-session'
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

import mongoose from "mongoose";


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();



const app = express()
app.use(
    cors({
      credentials: true,
      origin: process.env.REMOTE_SERVER,
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));
app.use(express.json());

Lab5(app)
Hello(app)
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentsRoutes(app);
AssignmentRoutes(app);

app.listen(process.env.PORT || 4000, () => console.log("hello, server started"))