import express from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import User from "../../models/user.model";
import crypto from "crypto";

const route = () => {
  const router = new express.Router();

  router.route("/login").post((req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      // FIND USER
      User.findOne({ username: username }).then((user) => {
        if (!user) {
          res.status(401).send({ message: "Kullanıcı adı veya şifre yanlış!" });
        } else {
          if (
            user.password ===
            crypto
              .createHmac("sha256", config.apiPassKey)
              .update(password)
              .digest("hex")
          ) {
            // CREATED TOKEN
            const token = jwt.sign({ userId: user._id }, config.apiSecretKey);
            // LAST LOGIN UPDATED DATE
            User.updateOne(
              { username: username },
              {
                $set: {
                  last_login: new Date(),
                },
              }
            ).then(() => {});

            res.status(200).send({
              token: token,
              username: user.username,
              userId: user._id,
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
    const { username, email, password, name } = req.body;
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
        });

        newUser.save().then(
          (data) => {
            res.status(201).send({
              message: "Registered success",
              data: data,
            });
          },
          (err) => {
            res.status(304).send({
              message: "Registered failed",
              err: err,
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
