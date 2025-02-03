import express, { Application } from "express";
import connectDB from "./config/db.ts";
import CONFIG from "./constants/config.constants.ts";
import passport from "passport";
import initializePassport from "./utils/passport.ts";
import usersRouter from "./routes/users.routes.ts";

const app: Application = express();

// our all middlewares
app.use(express.json());
app.use(passport.initialize());

initializePassport(passport);

// our routes
app.use("/users", usersRouter);

// starting server with mongodb
const startServer = async () => {
  try {
    await connectDB();
    app.listen(CONFIG.PORT, () => {
      console.log(`Server is running on port ${CONFIG.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
