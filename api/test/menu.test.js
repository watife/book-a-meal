import chai from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import app from "../src/app";

import Caterer from "../src/models/caterer.model";
import secret from "../src/utils/jwt";
import Category from "../src/models/category.model";

import Meal from "../src/models/meal.model";

chai.use(chaiHttp);

const PREFIX = "/api/v1/menu";

const defaultCaterer = {
  name: "defaultmenu",
  email: "defaultmenu@test.com",
  phone: 2348089333186,
  password: "default"
};

before(done => {
  Caterer.create(defaultCaterer).then(caterer => {
    Category.create({ name: "default", catererId: caterer.id }).then(() => {
      done();
    });
  });
});

describe("Menu", () => {
  /*
   *
   *Test for the add today menu request
   *
   */
  it("it should add a SINGLE menu on /api/v1/menu POST", done => {
    Caterer.findOne({ where: { email: defaultCaterer.email } }).then(
      caterer => {
        const { id, name, email, phone } = caterer;
        const token = jwt.sign(
          {
            caterer: { id, name, email, phone },
            isCaterer: true
          },

          secret,
          {
            expiresIn: 86400
          }
        );
        Category.findOne({ where: { name: "default" } }).then(category => {
          Meal.create({
            name: "default",
            price: 3000,
            categoryId: category.id,
            catererId: id,
            imageUrl: "fakeimg.png"
          }).then(meal => {
            chai
              .request(app)
              .post(PREFIX)
              .set("Authorization", `Bearer ${token}`)
              .send({ mealId: meal.id })
              .end((err, res) => {
                res.should.have.status(201);
                //   eslint-disable-next-line no-unused-expressions
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("status");
                res.body.should.have.property("data");
                res.body.data.should.be.a("object");
                done();
              });
          });
        });
      }
    );
  });

  /*
   *
   *Test for the get today menu request
   *
   */
  it("it should get TODAY menu on /api/v1/menu GET", done => {
    Caterer.findOne({ where: { email: defaultCaterer.email } }).then(
      caterer => {
        const { id, name, email, phone } = caterer;
        const token = jwt.sign(
          {
            caterer: { id, name, email, phone },
            isCaterer: true
          },

          secret,
          {
            expiresIn: 86400
          }
        );

        chai
          .request(app)
          .get(PREFIX)
          .set("Authorization", `Bearer ${token}`)

          .end((err, res) => {
            res.should.have.status(200);
            //   eslint-disable-next-line no-unused-expressions
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("status");
            res.body.status.should.equal("success");
            res.body.should.have.property("data");
            done();
          });
      }
    );
  });

  /*
   *
   *Test for the get all menu request
   *
   */
  it("it should get TODAY menu on /api/v1/menu GET", done => {
    Caterer.findOne({ where: { email: defaultCaterer.email } }).then(
      caterer => {
        const { id, name, email, phone } = caterer;
        const token = jwt.sign(
          {
            caterer: { id, name, email, phone },
            isCaterer: true
          },

          secret,
          {
            expiresIn: 86400
          }
        );

        chai
          .request(app)
          .get(`${PREFIX}/history`)
          .set("Authorization", `Bearer ${token}`)

          .end((err, res) => {
            res.should.have.status(200);
            //   eslint-disable-next-line no-unused-expressions
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("status");
            res.body.should.have.property("data");
            res.body.data.should.be.a("array");
            res.body.data[0].should.have.property("id");
            res.body.data[0].should.have.property("catererId");
            done();
          });
      }
    );
  });
});

after(done => {
  Caterer.destroy({ where: { email: "defaultmenu@test.com" } }).then(() => {
    Category.destroy({ where: { name: "defaultmenu" } }).then(() => {
      Meal.destroy({ where: { name: "defaultMeal" } });
      done();
    });
  });
});
