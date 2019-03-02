import Menu from "../models/menu.model";

import Meal from "../models/meal.model";

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
   * required: name, price, quantity, imageUrl
   *
   */
  static async addTodayMenu(req, res) {
    try {
      const { name, quantity, mealId } = req.body;

      const meal = await Meal.findById(mealId);

      if (!meal) {
        throw new Error("the selected meal cannot found");
      }

      const today = dateActive();

      const activeMenu = await Menu.findOne({ where: { createdAt: today } });

      if (activeMenu) {
        throw new Error("There is a menu specified for today");
      }

      const menu = await Menu.create({
        name,
        quantity,
        mealId,
        catererId: req.caterer.id
      });

      return res.status(201).json({
        status: "success",
        message: "Meal Added successfully",
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

      const menu = await Menu.findOne({ where: { createdAt: today } });

      if (!menu) {
        throw new Error("No current active Menu, try again Later");
      }
      return res.status(200).json({
        status: "success",
        message: "Menu retrieved successfully",
        data: {
          menu
        }
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
