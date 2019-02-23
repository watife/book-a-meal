import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import secret from "../utils/jwt";
import Customer from "../models/customer.model";

class CustomerController {
  /*
   *
   * controller to signup a customer
   * required: name, email, password
   *
   */
  static async customerRegister(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      const hash = await bcrypt.hash(password, 10);

      // check that the email doesn't exist
      const emailCheck = await Customer.findOne({ where: { email } });

      if (emailCheck) {
        throw new Error("User with this email already exists");
      }

      const newCustomer = await Customer.create({
        name,
        email,
        phone,
        password: hash
      });

      if (!newCustomer) {
        throw new Error("Could not signup, try some other time");
      }

      // get the new user to be saved for jwt
      const customerToSave = {
        id: newCustomer.id,
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone
      };
      const jwtToken = jwt.sign(
        { customer: customerToSave, isCustomer: true },
        secret,
        {
          expiresIn: 86400
        }
      );
      return res.status(201).json({
        status: "success",
        message: "Caterer Registered",
        token: `Bearer ${jwtToken}`,
        caterer: customerToSave
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        caterer: error.message
      });
    }
  }

  /*
   *
   * controller to log customer in
   * required: caterer id
   *
   */
  static async customerLogin(req, res) {
    try {
      const { email, password } = req.body;

      const customer = await Customer.findOne({ where: { email } });

      if (!customer) {
        throw new Error("Invalid email or password");
      }

      const Comparehash = await bcrypt.compare(password, customer.password);

      if (!Comparehash) {
        throw new Error("Invalid email or password");
      }

      const customerToSave = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      };
      const jwtToken = jwt.sign(
        { customer: customerToSave, isCustomer: true },
        secret,
        {
          expiresIn: 86400
        }
      );
      return res.status(200).json({
        status: "success",
        message: "Caterer Logged In",
        token: `Bearer ${jwtToken}`,
        caterer: customerToSave
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        caterer: error.message
      });
    }
  }

  /*
   *
   * controller to get a single customer
   * required: customer id
   *
   */
  static async getCustomer(req, res) {
    try {
      const { id } = req.params;

      const customer = await Customer.findById(id);

      if (!customer) {
        throw new Error("Customer specified does not exist");
      }

      const safeCustomer = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      };

      return res.status(200).json({
        status: "success",
        caterer: safeCustomer
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        caterer: error.message
      });
    }
  }

  /*
   *
   * controller to get all caterers
   * required: none
   *
//    */
  //   static async getAllCaterer(req, res) {
  //     try {
  //       const caterers = await Caterer.findAll();

  //       if (!caterers) {
  //         throw new Error(`No caterer was found`);
  //       }
  //       // create new admin and remove the password fields
  //       const newAdmins = caterers.map(admin => {
  //         return {
  //           id: admin.id,
  //           name: admin.name,
  //           email: admin.email,
  //           phone: admin.phone
  //         };
  //       });
  //       return res.status(200).json({
  //         status: "success",
  //         caterers: newAdmins
  //       });
  //     } catch (error) {
  //       return res.status(400).json({
  //         status: "error",
  //         caterer: error.message
  //       });
  //     }
  //   }

  //   /*
  //    *
  //    * controller to modify a specific caterer
  //    * required: admin id, new name
  //    *
  //    */
  //   static async modifyCaterer(req, res) {
  //     try {
  //       const { id } = req.params;
  //       const { name } = req.body;
  //       const caterer = await Caterer.update({ name }, { where: { id } });

  //       if (!caterer[0]) {
  //         throw new Error(`Caterer specified could not be updated`);
  //       }
  //       return res.status(200).json({
  //         status: "success",
  //         caterer
  //       });
  //     } catch (error) {
  //       return res.status(400).json({
  //         status: "error",
  //         caterer: error.message
  //       });
  //     }
  //   }

  //   /*
  //    *
  //    * controller to delete a specific caterer
  //    * required: admin id
  //    *
  //    */
  //   static async deleteCaterer(req, res) {
  //     try {
  //       const { id } = req.params;

  //       const caterer = await Caterer.destroy({ where: { id } });

  //       if (!caterer) {
  //         throw new Error("could not delete the specified caterer");
  //       }
  //       return res.status(200).json({
  //         status: "success",
  //         caterer
  //       });
  //     } catch (error) {
  //       return res.status(400).json({
  //         status: "error",
  //         caterer: error.message
  //       });
  //     }
  //   }
}

export default CustomerController;
