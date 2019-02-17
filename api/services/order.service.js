import dummyData from "../utils/dummyData";
import Order from "../models/order.model";

const OrderService = {
  getUserOrders: id => {
    /*
     * required: userid.
     */
    const userOrders = dummyData.order.filter(
      order => order.userId.toString() === id
    );

    return userOrders;
  },
  getAllOrders: () => {
    /*
     * required: none.
     */
    const orders = dummyData.order.map(order => {
      const newOrder = new Order();

      newOrder.id = order.id;
      newOrder.day = order.day;
      newOrder.userId = order.userId;
      newOrder.meals = order.meals;

      return newOrder;
    });
    return orders;
  },
  modifyOrder: (id, data) => {
    /*
     * required: order id and data.
     */

    const { order } = dummyData;

    console.log(id);
    const foundOrder = order.find(eachOrder => eachOrder.id.toString() === id);

    foundOrder.meals = data.meals;
    return foundOrder;
  },
  addOrder: order => {
    /*
     * required: meal and User.
     */

    const orderData = { ...order };

    const orderLength = dummyData.order.length;

    const lastId = dummyData.order[orderLength - 1].id;

    const newId = lastId + 1;

    const checkedUserOrders = dummyData.order.find(
      eachOrder => eachOrder.userId === orderData.userId
    );

    if (checkedUserOrders !== undefined) {
      orderData.id = newId;
      orderData.date = Date.now();

      dummyData.order.push(orderData);

      return orderData;
    }

    orderData.id = newId;
    orderData.date = Date.now();

    dummyData.order.push(orderData);

    return orderData;
  }
};

export default OrderService;
