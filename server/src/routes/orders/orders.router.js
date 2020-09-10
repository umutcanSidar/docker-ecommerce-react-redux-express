import express from "express";
import config from "../../config";
import Iyzipay from "iyzipay";
import User from "../../models/user.model";
import Orders from "../../models/order.model";

const route = () => {
  const router = new express.Router();

  // O
  router.route("/").post((req, res) => {
    const { userInfo, cartItems, shipping, paymentInfo, ip } = req.body;
    User.findById({ _id: userInfo.userId }).then((user) => {
      if (user) {
        const iyzipay = new Iyzipay({
          apiKey: config.apiKey,
          secretKey: config.secretKey,
          uri: config.uri,
        });

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
            lastLoginDate: "2015-10-05 12:43:35",
            registrationDate: "2013-04-21 15:12:09",
            registrationAddress:
              "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732",
          },
          shippingAddress: {
            contactName: shipping.firstname,
            city: shipping.city,
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742",
          },
          billingAddress: {
            contactName: shipping.firstname,
            city: shipping.city,
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
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
            ip: ip,
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
