import Meal from "../models/meal.model";
import Category from "../models/category.model";

class MealController {
  /*
   *
   * controller to get all Meals
   * required: none
   *
   */
  static async fetchAllMeals(req, res) {
    try {
      const meals = await Meal.findAll();

      if (!meals[0]) {
        throw new Error("No Meal was found");
      }
      return res.status(200).json({
        status: "success",
        Meals: meals
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        meal: error.message
      });
    }
  }

  /*
   *
   * controller to add a single Meal
   * required: name, price, quantity, imageUrl
   *
   */
  static async addAMeal(req, res) {
    try {
      const { name, price, quantity, imageUrl, categoryId } = req.body;

      const category = await Category.findById(categoryId);

      if (!category) {
        throw new Error("the selected category not found");
      }

      const meal = await Meal.create({
        name,
        price,
        imageUrl,
        quantity,
        categoryId,
        catererId: req.caterer.id
      });

      return res.status(201).json({
        status: "success",
        message: "Meal Added successfully",
        data: {
          id: meal.id,
          name: meal.name,
          price: meal.price,
          quantity: meal.quantity,
          imageUrl: meal.imageUrl
        }
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  /*
   *
   * controller to get a single Meal
   * required: mealId
   *
   */
  static async getSingleMeal(req, res) {
    try {
      const { id } = req.params;

      const meal = await Meal.findById(id);

      if (!meal) {
        throw new Error("Meal specified not found");
      }
      return res.status(200).json({
        status: "success",
        message: "Meal retrieved successfully",
        data: {
          meal
        }
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        meal: error.message
      });
    }
  }

  /*
   *
   * controller to get a single Meal
   * required: mealId
   *
   */
  static async modifyMeal(req, res) {
    try {
      const { id } = req.params;
      const { body } = req.body;

      const meal = await Meal.findById(id);

      const mealUpdateData = {
        name: body.name ? body.name : meal.name,
        price: body.price ? body.price : meal.price,
        quantity: body.quantity ? body.quantity : meal.quantity,
        categoryId: body.categoryId ? body.categoryId : meal.categoryId,
        imageUrl: body.imageUrl ? body.imageUrl : meal.imageUrl
      };

      const { name, price, quantity, imageUrl } = mealUpdateData;

      await Meal.update({ name, price, quantity, imageUrl }, { where: { id } });

      return res.status(200).json({
        status: "success",
        message: "Meal successfully Updated"
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        meal: error.message
      });
    }
  }

  /*
   *
   * controller to delete a single Meal
   * required: mealId
   *
   */
  static async deleteSingleMeal(req, res) {
    try {
      const { id } = req.params;

      const meal = await Meal.destroy({ where: { id } });

      if (!meal) {
        throw new Error("could not delete the specified meal");
      }
      return res.status(200).json({
        status: "success",
        meal: "meal deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}

export default MealController;
