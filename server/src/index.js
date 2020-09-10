import express from "express";
import bodyParser from "body-parser";
import AppRoutes from "./routes";
import cors from "cors";
import mongoose from "mongoose";
import * as admin from 'firebase-admin';

var serviceAccount = require("./ecommerce-1f381-firebase-adminsdk-9bad6-9718d05913.json");
var refreshToken;
console.log(refreshToken)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-1f381.firebaseio.com"
});

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

// ALL ROUTES
AppRoutes(app);

app.get("/", (req, res) => {
  res.send("Rest api");
});

app.listen("3000", () => console.log("The server has been started!"));
