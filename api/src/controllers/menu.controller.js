import path from "path";
import fs from "fs";

import Menu from "../models/menu.model";
import Meal from "../models/meal.model";
import MenuMeal from "../models/menumeal.model";
import dateActive from "../utils/date";

class MenuContoller {
  /*
   *
   * controller to get all Menu
   * required: none
   *
   */
  static async fetchAllMenu(req, res) {
    try {
      const menus = await Menu.findAll();

      if (!menus[0]) {
        throw new Error("No Menu was found");
      }
      return res.status(200).json({
        status: "success",
        menus
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
   * controller to add menu for Today
   *
   *
   */
  static async addTodayMenu(req, res) {
    try {
      const { mealId } = req.body;

      if (!mealId) {
        throw new Error("select a meal to create today's menu");
      }

      const meal = await Meal.findById(mealId);

      if (!meal) {
        throw new Error("the selected meal cannot found");
      }

      const today = dateActive();

      const activeMenu = await Menu.findOne({ where: { createdAt: today } });

      if (activeMenu) {
        await MenuMeal.create({
          menuId: activeMenu.dataValues.id,
          mealId: meal.dataValues.id
        });

        return res.status(201).json({
          status: "success",
          message: "Meal Added to Menu successfully",
          menu: activeMenu,
          meal
        });
      }

      const menu = await Menu.create({
        catererId: req.caterer.id
      });

      if (meal) {
        await MenuMeal.create({
          menuId: menu.dataValues.id,
          mealId: meal.dataValues.id
        });
      }

      return res.status(201).json({
        status: "success",
        message: "Menu Added successfully",
        menu
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
   * controller to get menu for Today
   * required: name, price, quantity, imageUrl
   *
   */
  static async getTodayMenu(req, res) {
    try {
      const today = dateActive();

      const menu = await Menu.findOne({
        include: [
          {
            model: Meal,
            as: "meals",
            required: false,
            attributes: ["id", "name", "price", "imageUrl"],
            through: { attributes: [] }
          }
        ],
        where: { createdAt: today }
      });

      if (!menu) {
        throw new Error("No current active Menu, try again Later");
      }

      // 1. get the default path to the public directory
      const fileDir = path.join(__dirname, "../public/photos/");

      const mealData = menu.meals.map(meal => {
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

      const menuData = {
        id: menu.id,
        catererId: menu.catererId,
        createdAt: menu.createdAt,
        meals: mealData
      };

      return res.status(200).json({
        status: "success",
        message: "Menu retrieved successfully",
        menu: menuData
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        meal: error.message
      });
    }
  }
  // static async  (req, res) => {
  //   const allMenu = MenuService.getAllMenu();
  //   return res.status(200).json({
  //     status: "success",
  //     data: allMenu
  //   });
  // },
  // modifyMenu: (req, res) => {
  //   const data = req.body;
  //   const modifiedMenu = MenuService.modifyMenu(data);

  //   return res.status(201).json({
  //     status: "success",
  //     data: modifiedMenu
  //   });
  // }
}
export default MenuContoller;
