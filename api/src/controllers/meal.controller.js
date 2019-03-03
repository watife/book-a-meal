import path from "path";
import fs from "fs";
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

      // 1. get the default path to the public directory
      const fileDir = path.join(__dirname, "../public/photos/");

      // fetch the images associated to each meal
      const mealsData = meals.map(meal => {
        const buff = fs.readFileSync(fileDir + meal.imageUrl);
        const mealImg = buff.toString("base64");
        const data = {
          id: meal.id,
          name: meal.name,
          price: meal.price,
          imageUrl: mealImg
        };
        return data;
      });
      return res.status(200).json({
        status: "success",
        Meals: mealsData
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
   * controller to add a single Meal
   * required: name, price, imageUrl
   *
   */
  static async addAMeal(req, res) {
    try {
      const { name, price, imageUrl, categoryId } = req.body;

      const category = await Category.findByPk(categoryId);

      if (!category) {
        throw new Error("the selected category not found");
      }

      // check to make sure that the meal with that specific name doesn't exist
      const mealCheck = await Meal.findOne({ where: { name } });

      if (mealCheck) {
        throw new Error("the meal already exists");
      }

      //  * make the image unique to the meal, no two meal should use thesame image
      const imageCheck = await Meal.findOne({
        where: { imageUrl: imageUrl.name }
      });

      if (imageCheck) {
        throw new Error("Image have to be unique to each meal");
      }

      // save the image in the photos folder

      // 1. get the default path to the public directory
      const fileDir = path.join(__dirname, "../public/photos/");

      const fileObj = typeof imageUrl === "object" ? imageUrl : false;

      const fileName = fileObj.name;

      if (!fileObj) {
        throw new Error("meal image is required");
        // Grab the extension to resolve any image error
        // var ext = file.data.split(';')[0].match(/jpeg|png|gif/)[0];
      }

      // strip off the data: url prefix to get just the base64-encoded bytes
      const data = imageUrl.data.replace(/^data:image\/\w+;base64,/, "");

      const buf = Buffer.from(data, "base64");

      fs.writeFile(fileDir + fileName, buf, err => {
        if (err) {
          throw new Error(err);
        }
      });

      const meal = await Meal.create({
        name,
        price,
        categoryId,
        imageUrl: fileName,
        catererId: req.caterer.id
      });

      return res.status(201).json({
        status: "success",
        message: "Meal Added successfully",
        data: {
          id: meal.id,
          name: meal.name,
          price: meal.price,
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

      const meal = await Meal.findByPk(id);

      if (!meal) {
        throw new Error("Meal specified not found");
      }

      const fileDir = path.join(__dirname, "../public/photos/");

      const buff = fs.readFileSync(fileDir + meal.imageUrl);
      const mealImg = buff.toString("base64");
      const data = {
        id: meal.id,
        name: meal.name,
        price: meal.price,
        imageUrl: mealImg
      };
      return res.status(200).json({
        status: "success",
        message: "Meal retrieved successfully",
        meal: data
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
      const body = { ...req.body };

      const meal = await Meal.findByPk(id);

      if (!meal) {
        throw new Error("the specified meal not found");
      }

      const mealUpdateData = {
        name: body.name ? body.name : meal.name,
        price: body.price ? body.price : meal.price,
        categoryId: body.categoryId ? body.categoryId : meal.categoryId,
        imageUrl: body.imageUrl ? body.imageUrl.name : meal.imageUrl
      };

      const { name, price, imageUrl } = mealUpdateData;

      console.log(meal.imageUrl.name);

      // change the image url data to contain the new data
      if (body.imageUrl) {
        // delete image from the photos directory

        // read the file to be deleted
        // 1. get the default path to the public directory
        const fileDir = path.join(__dirname, `../public/photos/`);
        fs.unlink(fileDir + meal.imageUrl, err => {
          if (err) {
            throw new Error("image couldn't be updated");
          }

          const fileObj =
            typeof body.imageUrl === "object" ? body.imageUrl : false;

          const fileName = fileObj.name;

          if (!fileObj) {
            throw new Error("meal image could not be updated");
            // Grab the extension to resolve any image error
            // var ext = file.data.split(';')[0].match(/jpeg|png|gif/)[0];
          }

          // strip off the data: url prefix to get just the base64-encoded bytes
          const data = body.imageUrl.data.replace(
            /^data:image\/\w+;base64,/,
            ""
          );

          const buf = Buffer.from(data, "base64");

          fs.writeFile(fileDir + fileName, buf, error => {
            if (error) {
              throw new Error("could not save meal image");
            }
          });
        });
      }

      await Meal.update({ name, price, imageUrl }, { where: { id } });

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

      console.log(id);

      const foundMeal = await Meal.findByPk(id);

      if (!foundMeal) {
        throw new Error("could not find the specified meal");
      }

      // unlink the image from the photo directory
      // 1. get the default path to the public directory
      const fileDir = path.join(__dirname, `../public/photos/`);
      fs.unlink(fileDir + foundMeal.imageUrl, err => {
        if (err) {
          throw new Error("Could not delete the specified Meal");
        }
      });

      const meal = await Meal.destroy({ where: { id } });

      if (!meal) {
        throw new Error("could not delete the specified meal");
      }

      return res.status(200).json({
        status: "success",
        meal: "meal deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
}

export default MealController;
