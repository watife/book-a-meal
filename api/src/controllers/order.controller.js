import Order from "../models/order.model";
import Meal from "../models/meal.model";
import OrderMeal from "../models/orderMeal.model";

class OrderController {
  /*
   *
   * controller to get all Order history
   * required: none
   *
   */
  static async fetchAllOrders(req, res) {
    try {
      const orders = await Order.findAll();

      if (!orders[0]) {
        throw new Error("No Order was found");
      }

      return res.status(200).json({
        status: "success",
        orders
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
   * controller to add a single Order
   * required: mealId, quantity, billingAddress
   *
   */
  static async addOrder(req, res) {
    try {
      const { mealId, quantity, billingAddress } = req.body;

      // make sure the order doesn't exist already
      const orderCheck = await OrderMeal.findOne({
        where: { mealId, customerId: req.customer.id }
      });

      if (orderCheck) {
        throw new Error(
          "This order have already been placed and is on it's way"
        );
      }

      const findMeal = await Meal.findOne({ where: { id: mealId } });

      if (!findMeal) {
        throw new Error("the selected was meal not found");
      }

      // create the total for the Order
      const total = findMeal.price * parseInt(quantity, 10);

      const order = await Order.create({
        quantity,
        total,
        billingAddress,
        customerId: req.customer.id
      });

      await OrderMeal.create({
        mealId,
        orderId: order.id,
        customerId: req.customer.id
      });

      return res.status(201).json({
        status: "success",
        message: "Order successfully placed."
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
   * controller to get a single Order
   * required: orderId, customerId
   *
   */
  static async fetchUserOrders(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findOne({
        where: { id }
      });

      if (!order) {
        throw new Error("Order specified not found");
      }
      const orderData = await Order.find({
        include: [
          {
            model: Meal,
            as: "meals",
            required: true
          }
        ],
        where: { id }
      });
      return res.status(200).json({
        status: "success",
        message: "Order retrieved successfully",
        order: orderData
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
   * controller to UPDATE a single Order
   * required: orderId, update params
   *
   */
  static async modifyOrder(req, res) {
    try {
      const { id } = req.params;
      const body = { ...req.body };

      const order = await Order.findByPk(id);

      const orderMeal = await OrderMeal.findOne({
        where: { orderId: id, customerId: req.customer.id }
      });

      const meal = await Meal.findOne({ where: { id: body.mealId } });

      if (!order && !orderMeal) {
        throw new Error("the specified order was not found");
      }

      const orderUpdateData = {
        quantity: body.quantity ? body.quantity : order.quantity,
        billingAddress: body.billingAddress
          ? body.billingAddress
          : order.billingAddress,
        total: order.total
      };

      if (orderUpdateData.quantity !== order.quantity) {
        const newTotal = orderUpdateData.quantity * meal.price;

        orderUpdateData.total = newTotal;
      }

      const { quantity, billingAddress, total } = orderUpdateData;

      await Order.update(
        { quantity, billingAddress, total },
        { where: { id } }
      );

      // change the mealId if is it available
      const newMealId =
        body.mealId !== orderMeal.mealId ? body.mealId : orderMeal.mealId;

      await OrderMeal.update(
        { mealId: newMealId },
        { where: { orderId: id, customerId: req.customer.id } }
      );

      return res.status(200).json({
        status: "success",
        message: "Order successfully Updated"
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        meal: error.message
      });
    }
  }

  /*
   * controller to UPDATE a single Order delivery status by ADMIN
   * required: orderId,  delivery status
   *
   */

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { deliveryStatus } = req.body;

      // modify the deliveryStatus with the new one
      await Order.update({ deliveryStatus }, { where: { id } });

      return res.status(200).json({
        status: "success",
        message: "Order status successfully Updated"
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
   * controller to cancel a single Order
   * required: mealId
   *
   */
}

export default OrderController;
