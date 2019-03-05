/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import secret from "../src/utils/jwt";
import Customer from "../src/models/customer.model";

const should = chai.should();

const { assert } = chai;

chai.use(chaiHttp);

const PREFIX = "/api/v1/auth";

describe("Customer", () => {
  /*
   *
   *Test for the create customer validation request
   *
   */
  //   it("it should fail validation  on add a SINGLE customer on /api/v1/auth POST", done => {
  //     chai
  //       .request(app)
  //       .post(`${PREFIX}/signup`)
  //       .send({ name: "test", email: "customer@test.com" })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         // eslint-disable-next-line no-unused-expressions
  //         assert.equal(res.body.status, "error");
  //         assert.equal(res.body.type, "validation");
  //         done();
  //       });
  //   });

  /*
   *
   *Test for the add a customer request
   *
   */
  it("it should add a SINGLE customer on /api/v1/customer POST", done => {
    chai
      .request(app)
      .post(`${PREFIX}/signup`)
      .send({
        name: "cate",
        email: "customer@test.com",
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
        res.body.should.have.property("customer");
        res.body.customer.should.be.a("object");
        res.body.customer.should.have.property("id");
        res.body.customer.should.have.property("name");
        res.body.customer.should.have.property("email");
        res.body.customer.should.have.property("phone");
        res.body.customer.should.not.have.property("password");
        res.body.customer.name.should.equal("cate");
        res.body.customer.email.should.equal("customer@test.com");
        done();
      });
  });

  /*
   *
   *Test for the login customer validation request
   *
   */
  //   it("it should fail validation  on login a customer on /api/v1/auth/login POST", done => {
  //     chai
  //       .request(app)
  //       .post(`${PREFIX}/login`)
  //       .send({ name: "test", email: "customer@test.com" })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         // eslint-disable-next-line no-unused-expressions
  //         assert.equal(res.body.status, "error");
  //         assert.equal(res.body.type, "validation");
  //         done();
  //       });
  //   });

  /*
   *
   *Test for the login customer request
   *
   */
  it("it should login in customer on /api/v1/customer/login POST", done => {
    chai
      .request(app)
      .post(`${PREFIX}/login`)
      .send({
        email: "customer@test.com",
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
        res.body.should.have.property("customer");
        res.body.customer.should.be.a("object");
        res.body.customer.should.have.property("id");
        res.body.customer.should.have.property("name");
        res.body.customer.should.have.property("email");
        res.body.customer.should.have.property("phone");
        res.body.customer.should.not.have.property("password");
        res.body.customer.name.should.equal("cate");
        res.body.customer.email.should.equal("customer@test.com");
        done();
      });
  });
});

after(done => {
  Customer.destroy({ where: { email: "customer@test.com" } }).then(() => {
    done();
  });
});
