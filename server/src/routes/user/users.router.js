import express from "express";
import config from "../../config";


const route = () => {
  const router = new express.Router();

  // USER GET BY :id
  router.route("/:id").get((req, res) => {
    const userId = req.params.id;

    res.status(200).send({
      image: user.image,
      name: user.name,
      surname: user.surname,
    });
  });

  return router;
};

export default {
  route,
  routePrefix: `/${config.apiVersion}/users`,
};
