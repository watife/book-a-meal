import model from "../models";

const { Customer } = model;

class CustomerController {
  /*
   *
   * controller to signup an customer
   * required: name, email, password
   *
   */
  static customerSignUp(req, res) {
    const { name, email, password } = req.body;

    // check data and make sure it is not empty
    const checkedName = typeof name === "string" && name !== "" ? name : false;
    const checkedEmail =
      typeof email === "string" && email !== "" ? name : false;
    const checkedPassword =
      typeof password === "string" && password.length > 7 ? password : false;

    if (!checkedName || !checkedEmail || !checkedPassword) {
      return res.status(400).json({ customer: "the input(s) cannot be empty" });
    }

    // data body for services
    const data = {
      name,
      email,
      password
    };

    return Customer.create(data)
      .then(customer => {
        if (!customer) {
          return res.status(400).json({
            status: "failed",
            customer: "Customer wasn't created successfully"
          });
        }
        // create a new admin that doesn't send back the password
        const responseData = {
          id: customer.id,
          name: customer.name,
          email: customer.email
        };
        return res.status(201).json({
          status: "success",
          customer: responseData
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /*
   *
   * controller to get a single customer
   * required: customer user id
   *
   */
  static getCustomer(req, res) {
    const { id } = req.params;

    Customer.findById(id)
      .then(customer => {
        if (!customer) {
          return res.status(400).json({
            status: "failed",
            customer: "Customer with the specified Id not found"
          });
        }
        // create new customer and remove the password fields
        const newCustomer = {
          id: customer.id,
          name: customer.name,
          email: customer.email
        };
        return res.status(200).json({
          status: "success",
          customer: newCustomer
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /*
   *
   * controller to get all customers
   * required: none
   *
   */
  static getAllCustomer(req, res) {
    Customer.findAll()
      .then(customers => {
        if (!customers) {
          return res.status(200).json({
            status: "failed",
            customer: "no customer was found"
          });
        }

        // create new customer and remove the password fields
        const newCustomers = customers.map(customer => {
          return {
            id: customer.id,
            name: customer.name,
            email: customer.email
          };
        });
        return res.status(200).json({
          status: "success",
          customers: newCustomers
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /*
   *
   * controller to modify a specific customer
   * required: customer id, new name
   *
   */
  static modifyCustomer(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    Customer.update({ name }, { where: { id } })
      .then(customer => {
        if (!customer[0]) {
          return res.status(400).json({
            status: "failed",
            customer: "could not update the specified customer"
          });
        }
        return res.status(200).json({
          status: "success",
          customer
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /*
   *
   * controller to delete a specific admin
   * required: admin id
   *
   */
  static deleteAdmin(req, res) {
    const { id } = req.params;

    Customer.destroy({ where: { id } })
      .then(customer => {
        if (!customer) {
          return res.status(400).json({
            status: "failed",
            customer: "could not delete the specified customer"
          });
        }
        return res.status(200).json({
          status: "success",
          customer
        });
      })
      .catch(error => res.status(400).json(error));
  }
}

export default CustomerController;
