import Category from "../models/category.model";
import Caterer from "../models/caterer.model";

class CategroyController {
  /*
   *
   * controller to get all Categories
   * required: none
   *
   */
  static async fetchAllCategories(req, res) {
    try {
      const categories = await Category.findAll();

      if (!categories[0]) {
        throw new Error("No Category was found");
      }
      return res.status(200).json({
        status: "success",
        data: categories
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
   * controller to add a single Category
   * required: name, catererId
   *
   */
  static async addACategory(req, res) {
    try {
      const { name } = req.body;

      const category = await Category.create({
        name,
        catererId: req.caterer.id
      });

      if (!category) {
        throw new Error("could not create category");
      }

      return res.status(201).json({
        status: "success",
        message: "Category Created successfully",
        data: {
          id: category.id,
          name: category.name
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
   * controller to get a single Category
   * required: mealId
   *
   */
  static async getSingleCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);

      if (!category) {
        throw new Error("Category specified not found");
      }

      const caterer = await Caterer.findByPk(category.catererId);

      const returnData = {
        id: category.id,
        name: category.name,
        caterer
      };
      return res.status(200).json({
        status: "success",
        message: "Category retrieved successfully",
        data: returnData
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
   * controller to get a single Category
   * required: categoryId
   *
   */
  static async modifyCategory(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      const category = await Category.findByPk(id);

      if (!category) {
        throw new Error("Category cannot be found");
      }

      const mealUpdateData = {
        name: body.name ? body.name : category.name
      };

      const { name } = mealUpdateData;

      const updatedCategory = await Category.update(
        { name },
        { where: { id } }
      );

      if (!updatedCategory) {
        throw new Error("Category could not be updated");
      }

      const newCategory = await Category.findByPk(id);

      return res.status(200).json({
        status: "success",
        message: "Category successfully Updated",
        data: newCategory
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
   * controller to delete a single Category
   * required: mealId
   *
   */
  static async deleteSingleCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.destroy({ where: { id } });

      if (!category) {
        throw new Error("could not delete the specified category");
      }
      return res.status(200).json({
        status: "success",
        message: "category deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}

export default CategroyController;
