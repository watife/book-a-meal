import chai from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import app from "../src/app";

import Caterer from "../src/models/caterer.model";
import secret from "../src/utils/jwt";
import Category from "../src/models/category.model";

chai.use(chaiHttp);

const PREFIX = "/api/v1/category";

const defaultCaterer = {
  name: "defaultadmin",
  email: "default2@test.com",
  phone: 2348089333186,
  password: "default"
};

before(done => {
  Caterer.create(defaultCaterer).then(caterer => {
    Category.create({ name: "default", catererId: caterer.id }).then(() => {
      Category.create({ name: "default2", catererId: caterer.id }).then(() => {
        done();
      });
    });
  });
});

describe("Category", () => {
  /*
   *
   *Test for the add a category request
   *
   */
  it("it should add a SINGLE category on /api/v1/category POST", done => {
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
          .post(PREFIX)
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: "spagetti polos"
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
            res.body.data.should.have.property("id");
            res.body.data.should.have.property("name");
            done();
          });
      }
    );
  });

  /*
   *
   *Test for the get a category request
   *
   */
  it("it should get a SINGLE category on /api/v1/category/<id> GET", done => {
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
            .get(`${PREFIX}/${category.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
              name: "spagetti polos"
            })
            .end((err, res) => {
              if (err) {
                err.should.be.a("object");
              }
              res.should.have.status(200);
              // eslint-disable-next-line no-unused-expressions
              res.should.be.json;
              res.body.should.be.a("object");
              res.body.should.have.property("status");
              res.body.should.have.property("data");
              res.body.data.should.be.a("object");
              res.body.data.should.have.property("category");
              done();
            });
        });
      }
    );
  });

  /*
   *
   *Test for the get all category request
   *
   */
  it("it should get all category on /api/v1/category/ GET", done => {
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
          .send({
            name: "spagetti polos"
          })
          .end((err, res) => {
            if (err) {
              err.should.be.a("object");
            }
            res.should.have.status(200);
            // eslint-disable-next-line no-unused-expressions
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("status");
            res.body.should.have.property("data");
            res.body.data.should.be.a("array");
            done();
          });
      }
    );
  });

  /*
   *
   *Test for the modify a category request
   *
   */
  it("it should modify a SINGLE category on /api/v1/category/<id> PUT", done => {
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
        Category.findOne({ where: { name: "default2" } }).then(data => {
          chai
            .request(app)
            .put(`${PREFIX}/${data.dataValues.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
              name: "spagetti-default"
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
   *Test for the delete a category request
   *
   */
  it("it should modify a SINGLE category on /api/v1/category/<id> PUT", done => {
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
        Category.findOne({ where: { name: "spagetti-default" } }).then(data => {
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
  Caterer.destroy({ where: { email: "default2@test.com" } }).then(() => {
    Category.destroy({ where: { name: "defaultadmin" } }).then(() => {
      Category.destroy({ where: { name: "default" } }).then(() => {
        Category.destroy({ where: { name: "spagetti polos" } });
        done();
      });
    });
  });
});
