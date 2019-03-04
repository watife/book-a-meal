/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import secret from "../src/utils/jwt";

import Caterer from "../src/models/caterer.model";

const should = chai.should();

const { assert } = chai;

chai.use(chaiHttp);

const PREFIX = "/api/v1/caterer";

describe("Caterer", () => {
  /*
   *
   *Test for the create caterer validation request
   *
   */
  it("it should fail validation  on add a SINGLE caterer on /api/v1/caterer POST", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({ name: "test", email: "caterer@test.com" })
      .end((err, res) => {
        res.should.have.status(400);
        // eslint-disable-next-line no-unused-expressions
        assert.equal(res.body.status, "error");
        assert.equal(res.body.type, "validation");
        done();
      });
  });

  /*
   *
   *Test for the add a caterer request
   *
   */
  it("it should add a SINGLE caterer on /api/v1/caterer POST", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({
        name: "cate",
        email: "caterer@test.com",
        password: "password",
        phone: 2348089333186
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
        res.body.should.have.property("caterer");
        res.body.caterer.should.be.a("object");
        res.body.caterer.should.have.property("id");
        res.body.caterer.should.have.property("name");
        res.body.caterer.should.have.property("email");
        res.body.caterer.should.have.property("phone");
        res.body.caterer.should.not.have.property("password");
        res.body.caterer.name.should.equal("cate");
        res.body.caterer.email.should.equal("caterer@test.com");
        done();
      });
  });

  /*
   *
   *Test for the login caterer validation request
   *
   */
  it("it should fail validation  on login a caterer on /api/v1/caterer/login POST", done => {
    chai
      .request(app)
      .post(`${PREFIX}/login`)
      .send({ name: "test", email: "caterer@test.com" })
      .end((err, res) => {
        res.should.have.status(400);
        // eslint-disable-next-line no-unused-expressions
        assert.equal(res.body.status, "error");
        assert.equal(res.body.type, "validation");
        done();
      });
  });

  /*
   *
   *Test for the login caterer request
   *
   */
  it("it should login in caterer on /api/v1/caterer/login POST", done => {
    chai
      .request(app)
      .post(`${PREFIX}/login`)
      .send({
        email: "caterer@test.com",
        password: "password"
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
        res.body.should.have.property("caterer");
        res.body.caterer.should.be.a("object");
        res.body.caterer.should.have.property("id");
        res.body.caterer.should.have.property("name");
        res.body.caterer.should.have.property("email");
        res.body.caterer.should.have.property("phone");
        res.body.caterer.should.not.have.property("password");
        res.body.caterer.name.should.equal("cate");
        res.body.caterer.email.should.equal("caterer@test.com");
        done();
      });
  });

  //   /*
  //    *
  //    *Test for the get all Admins request
  //    *
  //    */
  //   it("it should get ALL caterers on /api/v1/caterer GET", done => {
  //     chai
  //       .request(app)
  //       .get(PREFIX)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         // eslint-disable-next-line no-unused-expressions
  //         res.should.be.json;
  //         res.body.should.be.a("object");
  //         res.body.should.have.property("status");
  //         res.body.should.have.property("admins");
  //         res.body.caterer.should.be.a("array");
  //         res.body.caterer[0].should.have.property("id");
  //         res.body.caterer[0].should.have.property("name");
  //         res.body.caterer[0].should.have.property("email");
  //         res.body.caterer[0].should.have.property("phone");
  //         res.body.caterer[0].should.not.have.property("password");
  //         done();
  //       });
  //   });
  //   /*
  //    *
  //    *Test for the get a caterer by Id request
  //    *
  //    */
  //   it("should list a SINGLE caterer on /caterer/<id> GET", done => {
  //     Admin.create({
  //       name: "AdminTest",
  //       email: "admin@gmail.com",
  //       password: "testestcreate"
  //     }).then(data => {
  //       const { id } = data.dataValues;
  //       chai
  //         .request(app)
  //         .get(`${PREFIX}${id}`)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           // eslint-disable-next-line no-unused-expressions
  //           res.should.be.json;
  //           res.body.should.be.a("object");
  //           res.body.should.have.property("status");
  //           res.body.should.have.property("admin");
  //           res.body.admin.should.have.property("id");
  //           res.body.admin.name.should.equal("AdminTest");
  //           res.body.admin.should.not.have.property("tayo@gmail.com");
  //           res.body.admin.email.should.equal("admin@gmail.com");
  //           res.body.admin.id.should.equal(data.id);
  //           done();
  //         });
  //     });
  //   });
  //   /*
  //    *
  //    *Test for the update of a Caterer by Id request
  //    *
  //    */
  //   it("should update a SINGLE caterer on /blob/<id> PUT", done => {
  //     Admin.create({
  //       name: "AdminTest",
  //       email: "admin@gmail.com",
  //       password: "testestcreate"
  //     }).then(data => {
  //       const { id } = data.dataValues;

  //       chai
  //         .request(app)
  //         .put(`${PREFIX}${id}`)
  //         .send({ name: "Spider" })
  //         .end((error, response) => {
  //           response.should.have.status(200);
  //           // eslint-disable-next-line no-unused-expressions
  //           response.should.be.json;
  //           response.body.should.be.a("object");
  //           response.body.should.have.property("status");
  //           response.body.should.have.property("admin");
  //           response.body.admin[0].should.equal(1);
  //           done();
  //         });
  //     });
  //   });
  //   /*
  //    *
  //    *Test for the get an Admin by Id request
  //    *
  //    */
  //   it("should DELETE a SINGLE admin on /admin/<id> DELETE", done => {
  //     Admin.findOne({ where: { name: "Spider" } }).then(data => {
  //       const { id } = data.dataValues;
  //       chai
  //         .request(app)
  //         .delete(`${PREFIX}${id}`)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           // eslint-disable-next-line no-unused-expressions
  //           res.should.be.json;
  //           res.body.should.be.a("object");
  //           res.body.should.have.property("status");
  //           res.body.should.have.property("admin");
  //           res.body.admin.should.equal(1);
  //           done();
  //         });
  //     });
  //   });
});

after(done => {
  Caterer.destroy({ where: { email: "caterer@test.com" } }).then(() => {
    done();
  });
});
