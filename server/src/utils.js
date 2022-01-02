import config from "./config";
import jwt from "jsonwebtoken";
import { roles } from "./roles";

const getToken = (user, time) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    config.apiSecretKey,
    {
      expiresIn: time || "48h",
    }
  );
};

// TOKEN isAuth()
const isAuth = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user) {
      res.status(401).send({
        message: "You need to be logged in to access this route",
      });
    }
    req.user = user;
    next();
    return;
  } catch (error) {
    next(error);
  }
};
// ADMIN CONTROL
const isAdmin = async (req, res, next) => {
  
  try {
    if (!req.user) {
      res
        .status(401)
        .send({ error: "You don't permisson to perform this action." });
    }
    const permission = roles.can(req.user.roleID).updateAny("profile");
    if (!permission.granted) {
      res
        .status(401)
        .send({ error: "You don't permisson to perform this action." });
    }
    next();
  } catch (error) {
    next(error)
  }
};

export { isAuth, isAdmin, getToken };
