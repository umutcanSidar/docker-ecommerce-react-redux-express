import config from "./config";
import jwt from "jsonwebtoken";

// TOKEN isAuth()
const isAuth = (req, res, next) => {
  // GET HEADERS TOKEN
  const token = req.headers.authorization.slice(
    7,
    req.headers.authorization.length
  );
  // CHECK TOKEN
  if (token) {
    jwt.verify(token, config.apiSecretKey, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    res.status(401).send({ message: "Token is not supplied." });
  }
};

export { isAuth };
