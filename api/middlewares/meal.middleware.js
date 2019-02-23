import Joi from "joi";

class CatererValidate {
  static async validateMeal(req, res, next) {
    try {
      const schema = {
        name: Joi.string().required(),
        price: Joi.number()
          .min(1)
          .required(),
        quantity: Joi.string().required(),
        imageUrl: Joi.string().required(),
        categoryId: Joi.number().required()
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

  static async validateMealUpdate(req, res, next) {
    try {
      const schema = {
        name: Joi.string(),
        price: Joi.number().min(1),
        quantity: Joi.string(),
        imageUrl: Joi.string(),
        categoryId: Joi.number()
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

export default CatererValidate;
