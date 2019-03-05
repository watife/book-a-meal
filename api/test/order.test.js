import chai from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import app from "../src/app";

import Caterer from "../src/models/caterer.model";
import secret from "../src/utils/jwt";
import Category from "../src/models/category.model";

import Customer from "../src/models/customer.model";
import Order from "../src/models/order.model";

import Meal from "../src/models/meal.model";

chai.use(chaiHttp);

const PREFIX = "/api/v1/orders";

const defaultCaterer = {
  name: "defaultorder",
  email: "defaultorder@test.com",
  phone: 2348089333186,
  password: "default"
};

const defaultCustomer = {
  name: "defaultorder",
  email: "defaultorder@test.com",
  phone: 2348089333186,
  password: "default"
};

// const defaultOrder = {
//   quantity: 1,
//   total: 100,
//   billingAddress: "No 3, omorinre johnson",
//   customerId: 100
// };

before(done => {
  Caterer.create(defaultCaterer).then(caterer => {
    Category.create({ name: "default", catererId: caterer.id }).then(() => {
      Customer.create(defaultCustomer).then(() => {
        done();
      });
    });
  });
});

describe("Order", () => {
  /*
   *
   *Test for the add today menu request
   *
   */
  it("it should add a SINGLE order on /api/v1/orders POST", done => {
    Caterer.findOne({ where: { email: defaultCaterer.email } }).then(
      caterer => {
        const { id } = caterer;

        Category.findOne({ where: { name: "default" } }).then(category => {
          Meal.create({
            name: "default",
            price: 3000,
            categoryId: category.id,
            catererId: id,
            imageUrl: "fakeimg.png"
          }).then(meal => {
            Customer.findOne({ where: { email: defaultCustomer.email } }).then(
              customer => {
                const token = jwt.sign(
                  {
                    customer: {
                      id: customer.id,
                      name: customer.name,
                      email: customer.email,
                      phone: customer.phone
                    },
                    isCustomer: true
                  },

                  secret,
                  {
                    expiresIn: 86400
                  }
                );
                chai
                  .request(app)
                  .post(PREFIX)
                  .set("Authorization", `Bearer ${token}`)
                  .send({
                    mealId: meal.id,
                    quantity: 3,
                    billingAddress: "no test test"
                  })
                  .end((err, res) => {
                    res.should.have.status(201);
                    //   eslint-disable-next-line no-unused-expressions
                    res.should.be.json;
                    res.body.should.be.a("object");
                    res.body.should.have.property("status");
                    res.body.should.have.property("message");
                    done();
                  });
              }
            );
          });
        });
      }
    );
  });

  /*
   *
   *Test for the get all orders request
   *
   */
  it("it should get all orders on /api/v1/orders GET", done => {
    Caterer.findOne({ where: { email: defaultCaterer.email } }).then(
      caterer => {
        const { id } = caterer;

        Category.findOne({ where: { name: "default" } }).then(category => {
          Meal.create({
            name: "default",
            price: 3000,
            categoryId: category.id,
            catererId: id,
            imageUrl: "fakeimg.png"
          }).then(meal => {
            Customer.findOne({ where: { email: defaultCustomer.email } }).then(
              customer => {
                const token = jwt.sign(
                  {
                    customer: {
                      id: customer.id,
                      name: customer.name,
                      email: customer.email,
                      phone: customer.phone
                    },
                    isCustomer: true
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
                  .send({
                    mealId: meal.id,
                    quantity: 3,
                    billingAddress: "no 3, omorinre johnson "
                  })
                  .end((err, res) => {
                    res.should.have.status(200);
                    //   eslint-disable-next-line no-unused-expressions
                    res.should.be.json;
                    res.body.should.be.a("object");
                    res.body.should.have.property("status");
                    res.body.status.should.equal("success");
                    done();
                  });
              }
            );
          });
        });
      }
    );
  });

  /*
   *
   *Test for the get user order request
   *
   */
  it("it should get a order on /api/v1/orders GET", done => {
    Customer.findOne({ where: { email: defaultCustomer.email } }).then(
      customer => {
        const token = jwt.sign(
          {
            customer: {
              id: customer.id,
              name: customer.name,
              email: customer.email,
              phone: customer.phone
            },
            isCustomer: true
          },

          secret,
          {
            expiresIn: 86400
          }
        );
        Order.findOne({ where: { billingAddress: "no test test" } }).then(
          order => {
            chai
              .request(app)
              .get(`${PREFIX}/${order.id}`)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                //   eslint-disable-next-line no-unused-expressions
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("status");
                res.body.status.should.equal("success");
                done();
              });
          }
        );
      }
    );
  });

  /*
   *
   *Test for the modify user order request
   *
   */
  it("it should modify a order on /api/v1/orders PUT", done => {
    Customer.findOne({ where: { email: defaultCustomer.email } }).then(
      customer => {
        const token = jwt.sign(
          {
            customer: {
              id: customer.id,
              name: customer.name,
              email: customer.email,
              phone: customer.phone
            },
            isCustomer: true
          },

          secret,
          {
            expiresIn: 86400
          }
        );
        Meal.findOne({ where: { name: "default" } }).then(meal => {
          Order.findOne({ where: { billingAddress: "no test test" } }).then(
            order => {
              chai
                .request(app)
                .put(`${PREFIX}/${order.id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ quantity: 5, mealId: meal.id })
                .end((err, res) => {
                  console.log(res.body);
                  res.should.have.status(200);
                  //   eslint-disable-next-line no-unused-expressions
                  res.should.be.json;
                  res.body.should.be.a("object");
                  res.body.should.have.property("status");
                  res.body.status.should.equal("success");
                  done();
                });
            }
          );
        });
      }
    );
  });

  /*
   *
   *Test for the update user order status request
   *
   */
  it("it should modify a order on /api/v1/orders PUT", done => {
    Caterer.findOne({ where: { email: defaultCustomer.email } }).then(
      caterer => {
        const token = jwt.sign(
          {
            caterer: {
              id: caterer.id,
              name: caterer.name,
              email: caterer.email,
              phone: caterer.phone
            },
            isCaterer: true
          },

          secret,
          {
            expiresIn: 86400
          }
        );

        Order.findOne({ where: { billingAddress: "no test test" } }).then(
          order => {
            chai
              .request(app)
              .put(`${PREFIX}/status/${order.id}`)
              .set("Authorization", `Bearer ${token}`)
              .send({ deliveryStatus: "delivered" })
              .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                //   eslint-disable-next-line no-unused-expressions
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("status");
                res.body.status.should.equal("success");
                done();
              });
          }
        );
      }
    );
  });
  // it("it should get TODAY menu on /api/v1/menu GET", done => {
  //   Caterer.findOne({ where: { email: defaultCaterer.email } }).then(
  //     caterer => {
  //       const { id, name, email, phone } = caterer;
  //       const token = jwt.sign(
  //         {
  //           caterer: { id, name, email, phone },
  //           isCaterer: true
  //         },

  //         secret,
  //         {
  //           expiresIn: 86400
  //         }
  //       );

  //       chai
  //         .request(app)
  //         .get(`${PREFIX}/history`)
  //         .set("Authorization", `Bearer ${token}`)

  //         .end((err, res) => {
  //           console.log(res.body);
  //           res.should.have.status(200);
  //           //   eslint-disable-next-line no-unused-expressions
  //           res.should.be.json;
  //           res.body.should.be.a("object");
  //           res.body.should.have.property("status");
  //           res.body.should.have.property("menus");
  //           res.body.menus.should.be.a("array");
  //           res.body.menus[0].should.have.property("id");
  //           res.body.menus[0].should.have.property("catererId");
  //           done();
  //         });
  //     }
  //   );
  // });
});

after(done => {
  Caterer.destroy({ where: { email: "defaultorder@test.com" } }).then(() => {
    Category.destroy({ where: { name: "defaultorder" } }).then(() => {
      Meal.destroy({ where: { name: "defaultMeal" } }).then(() => {
        Order.destroy({
          where: { billingAddress: "no test test" }
        }).then(() => {
          Customer.destroy({ where: { name: "defaultorder" } });
          done();
        });
      });
    });
  });
});
