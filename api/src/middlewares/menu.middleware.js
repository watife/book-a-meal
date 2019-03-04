import Joi from "joi";

class MenuValidate {
  static async validateMenu(req, res, next) {
    try {
      const schema = {
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

  static async validateMenuUpdate(req, res, next) {
    try {
      const schema = {
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
}

export default MenuValidate;
