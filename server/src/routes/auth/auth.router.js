import express from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import User from "../../models/user.model";
import crypto from "crypto";

import { getToken } from "../../utils";

const route = () => {
  const router = new express.Router();

  router.route("/login").post((req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      // FIND USER
      User.findOne({ username: username }).then((user) => {
        if (!user) {
          res.status(401).send({ message: "Username or password is wrong!" });
        } else {
          if (
            user.password ===
            crypto
              .createHmac("sha256", config.apiPassKey)
              .update(password)
              .digest("hex")
          ) {
            const accessToken = getToken(user, "1d");
            // LAST LOGIN UPDATED DATE
            User.updateOne(
              { username: user.username },
              {
                $set: {
                  last_login: new Date(),
                  accessToken: accessToken
                },
              }
            ).then(() => {});
            res.status(200).send({
              token: accessToken,
              username: user.username,
              roleID: user.roleID,
            });
          }
        }
      });
    } else {
      res
        .status(404)
        .send({ message: "Kullanıcı adı ve parola boş bırakılamaz!" });
    }
  });

  router.route("/register").post((req, res) => {
    const { username, email, password, name, role } = req.body;
    // FIND USER
    User.findOne({ username: username }).then((user) => {
      // SEARCH USER IF NOT USER SAVED
      if (!user) {
        const newUser = new User({
          name: name,
          username: username,
          email: email,
          password: crypto
            .createHmac("sha256", config.apiPassKey)
            .update(password)
            .digest("hex"),
          created_date: Date.now(),
          roleID: role || "basic"
        });
        // SET ACCESSTOKEN ON DB
        const accessToken = getToken(user, "1d");
        newUser.accessToken = accessToken;
        // SAVE USER
        newUser.save().then(
          (data) => {
            res.status(201).send({
              data: data,
              accessToken
            });
          },
          (err) => {
            res.status(304).send({
              err: err,
              message: "Registered failed",
            });
          }
        );
      } else {
        res.send({
          status: false,
          message: "Username is already exist",
        });
      }
    });
  });

  return router;
};

export default {
  route,
  routePrefix: `/${config.apiVersion}/auth`,
};
