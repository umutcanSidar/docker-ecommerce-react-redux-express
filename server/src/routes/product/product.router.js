import express from "express";
import config from "../../config";
import Product from "../../models/product.model";

const route = () => {
  const router = new express.Router();
  // GET ALL PRODUCTS
  router.route("/").get((req, res) => {
    Product.find({}, (err, products) => {
      if (!products) {
        res.status(404).send({ message: "Not found product" });
      } else {
        res.status(200).send({
          products,
        });
      }
    });
  });
  // GET SINGLE PRODUCT BY :id
  router.route("/:id").get((req, res) => {
    const id = req.params.id;

    if (id) {
      Product.findOne({ _id: id }).then((product) => {
        if (!product) {
          res.status(404).send({ message: "Not found product" });
        } else {
          res.status(200).send({
            product,
          });
        }
      });
    }
  });
  
  return router;
};

export default {
  route,
  routePrefix: `/${config.apiVersion}/products`,
};
