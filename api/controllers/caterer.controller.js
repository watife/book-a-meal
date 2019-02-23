import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import secret from "../utils/jwt";
import Caterer from "../models/caterer.model";

class CatererController {
  /*
   *
   * controller to signup a caterer
   * required: name, email, password
   *
   */
  static async catererRegister(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      const hash = await bcrypt.hash(password, 10);

      // check that the email doesn't exist
      const emailCheck = await Caterer.findOne({ where: { email } });

      if (emailCheck) {
        throw new Error("Caterer with this email already exists");
      }

      const newCaterer = await Caterer.create({
        name,
        email,
        phone,
        password: hash
      });

      // get the new user to be saved for jwt
      const catererToSave = {
        id: newCaterer.id,
        name: newCaterer.name,
        email: newCaterer.email,
        phone: newCaterer.phone
      };
      const jwtToken = jwt.sign(
        { caterer: catererToSave, isCaterer: true },
        secret,
        {
          expiresIn: 86400
        }
      );
      return res.status(201).json({
        status: "success",
        message: "Caterer Registered",
        token: `Bearer ${jwtToken}`,
        caterer: catererToSave
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  /*
   *
   * controller to log caterer in
   * required: caterer id
   *
   */
  static async catererLogin(req, res) {
    try {
      const { email, password } = req.body;

      const caterer = await Caterer.findOne({ where: { email } });

      if (!caterer) {
        throw new Error("Invalid email or password");
      }

      const Comparehash = await bcrypt.compare(password, caterer.password);

      if (!Comparehash) {
        throw new Error("Invalid email or password");
      }

      const catererToSave = {
        id: caterer.id,
        name: caterer.name,
        email: caterer.email,
        phone: caterer.phone
      };
      const jwtToken = jwt.sign(
        { caterer: catererToSave, isCaterer: true },
        secret,
        {
          expiresIn: 86400
        }
      );
      return res.status(200).json({
        status: "success",
        message: "Caterer Logged In",
        token: `Bearer ${jwtToken}`,
        caterer: catererToSave
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
   * controller to get a single caterer
   * required: caterer id
   *
   */
  static async getCaterer(req, res) {
    try {
      const { id } = req.params;

      const caterer = await Caterer.findById(id);

      if (!caterer) {
        throw new Error("Caterer specified does not exist");
      }

      const safeCaterer = {
        id: caterer.id,
        name: caterer.name,
        email: caterer.email,
        phone: caterer.phone
      };

      return res.status(200).json({
        status: "success",
        caterer: safeCaterer
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
   * controller to get all caterers
   * required: none
   *
   */
  static async getAllCaterer(req, res) {
    try {
      const caterers = await Caterer.findAll();

      if (!caterers[0]) {
        throw new Error("No caterer was found");
      }
      // create new admin and remove the password fields
      const newAdmins = caterers.map(admin => {
        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone
        };
      });
      return res.status(200).json({
        status: "success",
        caterers: newAdmins
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
   * controller to modify a specific caterer
   * required: admin id, new name
   *
   */
  static async modifyCaterer(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const caterer = await Caterer.update({ name }, { where: { id } });

      if (!caterer[0]) {
        throw new Error(`Caterer specified could not be updated`);
      }
      return res.status(200).json({
        status: "success",
        caterer: "caterer successfully modified"
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
   * controller to delete a specific caterer
   * required: admin id
   *
   */
  static async deleteCaterer(req, res) {
    try {
      const { id } = req.params;

      const caterer = await Caterer.destroy({ where: { id } });

      if (!caterer) {
        throw new Error("could not delete the specified caterer");
      }
      return res.status(200).json({
        status: "success",
        caterer: "Caterer successfully deleted"
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}

export default CatererController;
