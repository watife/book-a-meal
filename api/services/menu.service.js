import dummyData from "../utils/dummyData";
import Menu from "../models/menu.model";

const MenuService = {
  getTodayMenu: () => {
    const todayMenu = dummyData.menu[dummyData.menu.length - 1];

    return todayMenu;
  },
  addMenu: menu => {
    const menuLength = dummyData.menu.length;

    const lastId = dummyData.menu[menuLength - 1].id;

    const newId = lastId + 1;

    const menuData = { ...menu };

    menuData.id = newId;

    menuData.day = Date.now();

    dummyData.menu.push(menuData);

    return menuData;
  },
  getAllMenu: () => {
    /*
     *
     * for menu history
     *
     */
    const menus = dummyData.menu.map(menu => {
      const newMenu = new Menu();

      newMenu.id = menu.id;
      newMenu.day = menu.day;
      newMenu.menu = menu.menu;

      return newMenu;
    });
    return menus;
  },
  modifyMenu: data => {
    /*
     *
     * modification of the current menu for today
     * can't modify history
     *
     */
    const menuToModify = dummyData.menu[dummyData.menu.length - 1];

    if (data.menu) {
      menuToModify.menu = data.menu;
    }

    return menuToModify;
  }
};

export default MenuService;
