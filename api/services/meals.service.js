import dummyData from "../utils/dummyData";
import Meal from "../models/meal.model";

const MealService = {
  fetchAllMeals: () => {
    const validMeals = dummyData.meals.map(meal => {
      const newMeal = new Meal();

      newMeal.id = meal.id;
      newMeal.name = meal.name;
      newMeal.size = meal.size;
      newMeal.price = meal.price;

      return newMeal;
    });
    return validMeals;
  },
  addMeal: meal => {
    const mealLength = dummyData.meals.length;

    const lastId = dummyData.meals[mealLength - 1].id;

    const newId = lastId + 1;

    const mealData = { ...meal };

    mealData.id = newId;

    dummyData.meals.push(mealData);

    return mealData;
  },
  getAMeal: id => {
    const foundMeal = dummyData.meals.find(meal => meal.id.toString() === id);

    return foundMeal || {};
  },
  modifyMeal: (id, data) => {
    const { meals } = dummyData;
    const foundMeal = meals.find(meal => meal.id.toString() === id);

    if (data.name) {
      foundMeal.name = data.name;
    }
    if (data.size) {
      foundMeal.size = data.size;
    }

    if (data.price) {
      foundMeal.price = data.price;
    }
    return foundMeal;
  },
  deleteMeal: id => {
    const index = dummyData.meals.findIndex(meal => meal.id === id);

    // Replace the item by index.
    dummyData.meals.splice(index, 1);
  }
};

export default MealService;
