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
  // GET PRODUCT BY :id
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
  // POST PRODUCT
  router.route("/").post((req, res) => {
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
  routePrefix: `/${config.apiVersion}/products`,
};
