import model from "../models";

const { Admin } = model;

class AdminController {
  static adminSignUp(req, res) {
    const { name, email, password } = req.body;

    // data body for services
    const data = {
      name,
      email,
      password
    };

    return Admin.create(data).then(admin =>
      res.status(201).send({
        status: "success",
        data: admin
      })
    );
  }
}

export default AdminController;
