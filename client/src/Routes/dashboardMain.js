// import react from "React";
import Meals from "../Components/Meals/Meals";
import Menu from "../Components/Menu/Menu";
import MealCreate from "../Components/Meals/MealCreate";
import CategoryCreate from "../Components/Category/CategoryCreate";

const dashboardMain = [
  {
    path: "/caterer/menu",
    exact: true,
    header: "Menu",
    main: Menu
  },
  {
    path: "/caterer/menu/create",
    header: "Meals",
    main: Meals
  },

  {
    path: "/caterer/meal/create",
    header: "MealCreate",
    main: MealCreate
  },

  {
    path: "/caterer/category/create",
    header: "Category Create",
    main: CategoryCreate
  },

  {
    path: "/caterer/meals",
    header: "MealCreate",
    main: Meals
  }
  //   {
  //     path: "/bubblegum",
  //     sidebar: () => <div>bubblegum!</div>,
  //     main: () => <h2>Bubblegum</h2>
  //   },
  //   {
  //     path: "/shoelaces",
  //     sidebar: () => <div>shoelaces!</div>,
  //     main: () => <h2>Shoelaces</h2>
  //   }
];

export default dashboardMain;
