import MenuService from "../services/menu.service";

const MenuContoller = {
  fetchTodayMenu: (req, res) => {
    const todayMenu = MenuService.getTodayMenu();
    return res.status(200).json({
      status: "success",
      data: todayMenu
    });
  },
  addTodayMenu: (req, res) => {
    /*
        Expect json of the format
        {
            menu: "an array of meals"
        }
    */
    const newMenu = req.body;
    const createdMenu = MenuService.addMenu(newMenu);

    return res.status(201).json({
      status: "success",
      data: createdMenu
    });
  },
  fetchAllMenu: (req, res) => {
    const allMenu = MenuService.getAllMenu();
    return res.status(200).json({
      status: "success",
      data: allMenu
    });
  },
  modifyMenu: (req, res) => {
    const data = req.body;
    const modifiedMenu = MenuService.modifyMenu(data);

    return res.status(200).json({
      status: "success",
      data: modifiedMenu
    });
  }
};
export default MenuContoller;
