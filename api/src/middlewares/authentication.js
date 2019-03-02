import jwt from "jsonwebtoken";
import secret from "../utils/jwt";

class AuthController {
  static async verifyUserToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized request"
      });
    }
    const jwtToken = token.split(" ")[1];
    try {
      const decoded = await jwt.verify(jwtToken, secret);
      req.user = decoded.user;
      next();
      return true;
    } catch (err) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized request"
      });
    }
  }

  static async verifyAdminToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized request"
      });
    }
    const jwtToken = token.split(" ")[1];
    try {
      const decoded = await jwt.verify(jwtToken, secret);
      if (!decoded.isCaterer) {
        throw new Error("Unauthorized request");
      }
      req.caterer = decoded.caterer;
      next();
      return true;
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async verifyDoubleToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized request"
      });
    }
    const jwtToken = token.split(" ")[1];
    try {
      const decoded = await jwt.verify(jwtToken, secret);

      if (!decoded.isCaterer && !decoded.isCustomer) {
        throw new Error("Unauthorized request");
      }
      if (decoded.caterer) {
        req.caterer = decoded.caterer;
        next();
      }
      if (decoded.customer) {
        req.caterer = decoded.caterer;
        next();
      }
      return true;
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: error.message
      });
    }
  }
}

export default AuthController;
