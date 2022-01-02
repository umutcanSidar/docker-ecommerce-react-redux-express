import express from "express";
import bodyParser from "body-parser";
import AppRoutes from "./routes";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "./config";
import User from "./models/user.model";

mongoose.connect(
  "mongodb://umutcansidar:Secode901@ds253203.mlab.com:53203/ecommerce",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const accessToken = req.headers.authorization.slice(
      7,
      req.headers.authorization.length
    );
    const { _id, exp } = await jwt.verify(accessToken, config.apiSecretKey);
    if (exp < Date.now().valueOf() / 1000) {
      return res.status.send({
        message: "Token has expired, please login to obtain a new one",
      });
    }
    res.locals.loggedInUser = await User.findById(_id);
    next();
  } else {
    next();
  }
});

// ALL ROUTES
AppRoutes(app);

app.get("/", (req, res) => {
  res.send("Rest api");
});

app.listen("3000", () => console.log("The server has been started!"));
