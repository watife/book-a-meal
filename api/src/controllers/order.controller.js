import OrderService from "../services/order.service";

const OrderController = {
  fetchUserOrders: (req, res) => {
    const params = { ...req.params };
    const userOrders = OrderService.getUserOrders(params.id);

    res.status(200).json({
      status: "success",
      data: userOrders
    });
  },
  fetchAllOrders: (req, res) => {
    const allOrders = OrderService.getAllOrders();

    res.status(200).json({
      status: "success",
      data: allOrders
    });
  },
  addOrder: (req, res) => {
    const body = { ...req.body };

    const addedOrder = OrderService.addOrder(body);

    res.status(201).json({
      status: "success",
      data: addedOrder
    });
  },
  modifyOrder: (req, res) => {
    const body = { ...req.body };
    const params = { ...req.params };

    const modifiedOrder = OrderService.modifyOrder(params.id, body);

    res.status(200).json({
      status: "success",
      data: modifiedOrder
    });
  }
};
export default OrderController;
