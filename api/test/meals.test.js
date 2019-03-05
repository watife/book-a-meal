import chai from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import app from "../src/app";

import Caterer from "../src/models/caterer.model";
import secret from "../src/utils/jwt";
import Category from "../src/models/category.model";

import Meal from "../src/models/meal.model";

import imageUrl from "../src/utils/testImg";

chai.use(chaiHttp);

const PREFIX = "/api/v1/meals";

const defaultCaterer = {
  name: "default",
  email: "default@test.com",
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

describe("Meals", () => {
  /*
   *
   *Test for the add a meal request
   *
   */
  it("it should add a SINGLE meal on /api/v1/meal POST", done => {
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
          chai
            .request(app)
            .post(PREFIX)
            .set("Authorization", `Bearer ${token}`)
            .send({
              name: "default",
              price: 3000,
              categoryId: category.id,
              imageUrl
            })
            .end((err, res) => {
              if (err) {
                err.should.be.a("object");
              }
              res.should.have.status(201);
              // eslint-disable-next-line no-unused-expressions
              res.should.be.json;
              res.body.should.be.a("object");
              res.body.should.have.property("status");
              res.body.should.have.property("data");
              res.body.data.should.be.a("object");
              res.body.data.should.have.property("price");
              res.body.data.should.have.property("name");
              res.body.data.should.have.property("imageUrl");
              done();
            });
        });
      }
    );
  });

  /*
   *
   *Test for the get a meal request
   *
   */
  it("it should get a SINGLE category on /api/v1/meals/<id> GET", done => {
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
        Meal.findOne({ where: { name: "default" } }).then(meal => {
          chai
            .request(app)
            .get(`${PREFIX}/${meal.id}`)
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
              res.should.have.status(200);
              // eslint-disable-next-line no-unused-expressions
              res.should.be.json;
              res.body.should.be.a("object");
              res.body.should.have.property("status");
              res.body.should.have.property("meal");
              res.body.meal.should.be.a("object");
              res.body.meal.should.have.property("id");
              res.body.meal.should.have.property("price");
              res.body.meal.should.have.property("name");
              res.body.meal.should.have.property("imageUrl");
              done();
            });
        });
      }
    );
  });

  /*
   *
   *Test for the get all meals request
   *
   */

  it("it should get all meals on /api/v1/meals/ GET", done => {
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
            if (err) {
              err.should.be.a("object");
            }
            res.should.have.status(200);
            // eslint-disable-next-line no-unused-expressions
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("status");
            res.body.status.should.equal("success");
            res.body.should.have.property("meals");
            res.body.meals.should.be.a("array");
            done();
          });
      }
    );
  });

  /*
   *
   *Test for the modify a meal request
   *
   */
  it("it should modify a SINGLE meal on /api/v1/meals/<id> PUT", done => {
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
        Meal.findOne({ where: { name: "default" } }).then(data => {
          chai
            .request(app)
            .put(`${PREFIX}/${data.dataValues.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
              name: "spagetti-meals"
            })
            .end((err, res) => {
              res.should.have.status(200);
              // eslint-disable-next-line no-unused-expressions
              res.should.be.json;
              res.body.should.be.a("object");
              res.body.should.have.property("status");
              res.body.status.should.equal("success");
              done();
            });
        });
      }
    );
  });

  /*
   *
   *Test for the delete a meal request
   *
   */
  it("it should modify a SINGLE meal on /api/v1/meals/<id> PUT", done => {
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
        Meal.findOne({ where: { name: "spagetti-meals" } }).then(data => {
          chai
            .request(app)
            .delete(`${PREFIX}/${data.dataValues.id}`)
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
              res.should.have.status(200);
              // eslint-disable-next-line no-unused-expressions
              res.should.be.json;
              res.body.should.be.a("object");
              res.body.should.have.property("status");
              res.body.status.should.equal("success");
              done();
            });
        });
      }
    );
  });
});

after(done => {
  Caterer.destroy({ where: { email: "default@test.com" } }).then(() => {
    Category.destroy({ where: { name: "default2" } }).then(() => {
      Meal.destroy({ where: { name: "defaultMeal" } });
      done();
    });
  });
});
