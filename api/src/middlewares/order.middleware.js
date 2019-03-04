import Joi from "joi";

class OrderValidate {
  static async validateOrder(req, res, next) {
    try {
      const schema = {
        quantity: Joi.number().required(),
        billingAddress: Joi.string().required(),
        mealId: Joi.number().required()
      };
      await Joi.validate(req.body, schema);
      next();
      return true;
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: String(err.details[0].message),
        type: "validation"
      });
    }
  }

  static async validateOrderUpdate(req, res, next) {
    try {
      const schema = {
        quantity: Joi.number(),
        billingAddress: Joi.string(),
        deliveryStatus: Joi.string(),
        mealId: Joi.number()
      };
      await Joi.validate(req.body, schema);
      next();
      return true;
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: String(err.details[0].message),
        type: "validation"
      });
    }
  }
}

export default OrderValidate;
