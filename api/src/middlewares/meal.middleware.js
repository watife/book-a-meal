import Joi from "joi";

class CatererValidate {
  static async validateMeal(req, res, next) {
    try {
      const schema = {
        name: Joi.string().required(),
        price: Joi.number()
          .min(1)
          .required(),
        size: Joi.string().required(),
        imageObj: Joi.object().required(),
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
        size: Joi.string(),
        imageUrl: Joi.object(),
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
