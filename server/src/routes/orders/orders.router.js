import express from "express";
import config from "../../config";
import Iyzipay from "iyzipay";
import User from "../../models/user.model";
import Orders from "../../models/order.model";

const route = () => {
  const router = new express.Router();

  // PAYMENT
  router.route("/").post((req, res) => {
    const { userInfo, cartItems, shipping, paymentInfo } = req.body;
    let { getIp } = req.body;
    User.findById({ _id: req.user._id }).then((user) => {
      if (user) {
        const iyzipay = new Iyzipay({
          apiKey: config.apiKey,
          secretKey: config.secretKey,
          uri: config.uri,
        });

        // const getLastLogin = user.last_login;

        const lastLogin =
          user.last_login.getUTCFullYear() +
          "-" +
          ("0" + (user.last_login.getUTCMonth() + 1)).slice(-2) +
          "-" +
          ("0" + user.last_login.getUTCDate()).slice(-2) +
          " " +
          ("0" + user.last_login.getUTCHours() + 3).slice(-2) +
          ":" +
          ("0" + user.last_login.getUTCMinutes()).slice(-2) +
          ":" +
          ("0" + user.last_login.getUTCSeconds()).slice(-2);

        const createdDate =
          user.created_date.getUTCFullYear() +
          "-" +
          ("0" + (user.created_date.getUTCMonth() + 1)).slice(-2) +
          "-" +
          ("0" + user.created_date.getUTCDate()).slice(-2) +
          " " +
          ("0" + user.created_date.getUTCHours() + 3).slice(-2) +
          ":" +
          ("0" + user.created_date.getUTCMinutes()).slice(-2) +
          ":" +
          ("0" + user.created_date.getUTCSeconds()).slice(-2);

        const request = {
          locale: Iyzipay.LOCALE.TR,
          conversationId: "123456789",
          price: cartItems.reduce((a, b) => a + b.price * b.qty, 0),
          paidPrice: "1.2",
          currency: Iyzipay.CURRENCY.TRY,
          installment: "1",
          basketId: "B67832",
          paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
          paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
          paymentCard: {
            cardHolderName: shipping.firstname + shipping.lastname,
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: "123",
            registerCard: "0",
          },
          buyer: {
            id: "BY789",
            name: shipping.firstname,
            surname: shipping.lastname,
            gsmNumber: shipping.tel,
            email: shipping.email,
            identityNumber: shipping.tcNo,
            lastLoginDate: lastLogin,
            registrationDate: createdDate,
            registrationAddress: shipping.street,
            ip: "85.34.78.112",
            city: shipping.city,
            country: shipping.country,
            zipCode: "34732",
          },
          shippingAddress: {
            contactName: shipping.firstname,
            city: shipping.city,
            country: shipping.country,
            address: shipping.street,
            zipCode: "34742",
          },
          billingAddress: {
            contactName: shipping.firstname,
            city: shipping.city,
            country: shipping.country,
            address: shipping.street,
            zipCode: "34742",
          },
          basketItems: cartItems.map((data) => {
            return {
              id: "BI103",
              name: data.name,
              category1: "Electronics",
              category2: "Usb / Cable",
              itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
              price: data.price * data.qty,
            };
          }),
        };

        iyzipay.payment.create(request, function (err, result) {
          res.status(200).send(result);

          const newOrder = new Orders({
            user: user._id,
            ip: getIp,
            basketItems: cartItems,
            installment: 1,
            billingAddress: shipping.street,
            billingCountry: shipping.country,
            billingCity: shipping.city,
            billingZipCode: "34440",
            billingContactName: shipping.firstname + " " + shipping.lastname,
            paymentStatus: true,
          });
          newOrder.save().then();
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    });
  });

  return router;
};

export default {
  route,
  routePrefix: `/${config.apiVersion}/orders`,
};
