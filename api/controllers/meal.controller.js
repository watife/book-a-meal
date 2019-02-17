import MealService from "../services/meals.service";

const MealController = {
  fetchAllMeals: (req, res) => {
    const allMeals = MealService.fetchAllMeals();
    return res.status(200).json({
      status: "success",
      data: allMeals
    });
  },
  addAMeal: (req, res) => {
    /*
        Expect json of the format
        {
            name: "name of food",
            size: "size of food",
            price: "price of food"
        }
    */
    const newMeal = req.body;

    const createdMeal = MealService.addMeal(newMeal);

    return res.status(201).json({
      status: "success",
      data: createdMeal
    });
  },
  getSingleMeal: (req, res) => {
    const params = { ...req.params };
    console.log(params);

    const foundMeal = MealService.getAMeal(params.id);

    return res.status(200).json({
      status: "success",
      data: foundMeal
    });
  },
  modifySingleMeal: (req, res) => {
    const params = { ...req.params };

    const data = req.body;

    const modifiedMeal = MealService.modifyMeal(params.id, data);

    return res.status(200).json({
      status: "success",
      data: modifiedMeal
    });
  },

  deleteSingleMeal: (req, res) => {
    const params = { ...req.params };

    MealService.deleteMeal(params.id);

    return res.status(200).json({
      status: "success"
    });
  }
};

export default MealController;
