import express from "express";
import config from "../../config";
import Product from "../../models/product.model";

const route = () => {
  const router = new express.Router();

  // router.route("/").get((req, res, error) => {
    
  // });

  // ADMIN POST PRODUCT
  router.route("/product").post((req, res) => {
    const {
      name,
      category,
      image,
      price,
      brand,
      rating,
      numReview,
      countInStock,
    } = req.body;

    const newProduct = new Product({
      name: name,
      category: category,
      image: image,
      price: price,
      brand: brand,
      rating: rating,
      numReview: numReview,
      countInStock: countInStock ? countInStock : 1,
    });

    newProduct.save().then(
      (data) => {
        res.status(200).send({
          message: "Product add success.",
          data: data,
        });
      },
      (err) => {
        res.status({
          message: "Product fail",
          err: err,
        });
      }
    );
  });

  return router;
};

export default {
  route,
  routePrefix: `/${config.apiVersion}/admin`,
};
