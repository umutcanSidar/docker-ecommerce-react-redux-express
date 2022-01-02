import express from "express";
import config from "../../config";

const route = () => {
  const router = new express.Router();

  // GET ONE USER BY :id
  router.route("/").get((req, res) => {
    if (!req.user) {
      res.status(401).send({
        message: "User not found!",
      });
    }

    res.status(200).send({
      data: req.user,
    });
  });

  return router;
};

export default {
  route,
  routePrefix: `/${config.apiVersion}/users`,
};
