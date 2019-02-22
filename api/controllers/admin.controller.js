import model from "../models";

const { Admin } = model;

class AdminController {
  /*
   *
   * controller to signup an admin
   * required: name, email, password
   *
   */
  static adminSignUp(req, res) {
    const { name, email, password } = req.body;

    // check data and make sure it is not empty
    const checkedName = typeof name === "string" && name !== "" ? name : false;
    const checkedEmail =
      typeof email === "string" && email !== "" ? name : false;
    const checkedPassword =
      typeof password === "string" && password.length > 7 ? password : false;

    if (!checkedName || !checkedEmail || !checkedPassword) {
      return res.status(400).json({ admin: "the input(s) cannot be empty" });
    }

    // data body for services
    const data = {
      name,
      email,
      password
    };

    return Admin.create(data)
      .then(admin => {
        if (!admin) {
          return res.status(400).json({
            status: "failed",
            admin: "Admin wasn't created successfully"
          });
        }
        // create a new admin that doesn't send back the password
        const responseData = {
          id: admin.id,
          name: admin.name,
          email: admin.email
        };
        return res.status(201).json({
          status: "success",
          admin: responseData
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /*
   *
   * controller to get a single admin
   * required: admin user id
   *
   */
  static getAdmin(req, res) {
    const { id } = req.params;

    Admin.findById(id)
      .then(admin => {
        if (!admin) {
          return res.status(400).json({
            status: "failed",
            admin: "Admin with the specified Id not found"
          });
        }
        // create new admin and remove the password fields
        const newAdmin = {
          id: admin.id,
          name: admin.name,
          email: admin.email
        };
        return res.status(200).json({
          status: "success",
          admin: newAdmin
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /*
   *
   * controller to get all admins
   * required: none
   *
   */
  static getAllAdmin(req, res) {
    Admin.findAll()
      .then(admins => {
        if (!admins) {
          return res.status(200).json({
            status: "failed",
            admin: "no admin was found"
          });
        }

        // create new admin and remove the password fields
        const newAdmins = admins.map(admin => {
          return {
            id: admin.id,
            name: admin.name,
            email: admin.email
          };
        });
        return res.status(200).json({
          status: "success",
          admins: newAdmins
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /*
   *
   * controller to modify a specific admin
   * required: admin id, new name
   *
   */
  static modifyAnAdmin(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    Admin.update({ name }, { where: { id } })
      .then(admin => {
        if (!admin[0]) {
          return res.status(400).json({
            status: "failed",
            admin: "could not update the specified admin"
          });
        }
        return res.status(200).json({
          status: "success",
          admin
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

    Admin.destroy({ where: { id } })
      .then(admin => {
        if (!admin) {
          return res.status(400).json({
            status: "failed",
            admin: "could not delete the specified admin"
          });
        }
        return res.status(200).json({
          status: "success",
          admin
        });
      })
      .catch(error => res.status(400).json(error));
  }
}

export default AdminController;
