const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const model = require("../models");

const { Admin } = model;

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe("Admins", () => {
  beforeEach(done => {
    Admin.destroy({ where: { name: ["Tayo", "AdminTest"] } }).then(() =>
      done()
    );
  });
  /*
   *
   *Test for the get all Admins request
   *
   */
  it("it should add a SINGLE admin on /api/v1/admin POST", done => {
    chai
      .request(app)
      .post("/api/v1/admin")
      .send({ name: "Tayo", email: "tayo@gmail.com", password: "fakoo.com" })
      .end((err, res) => {
        if (err) {
          err.should.be.a("object");
        }
        res.should.have.status(201);
        // eslint-disable-next-line no-unused-expressions
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("admin");
        res.body.admin.should.be.a("object");
        res.body.admin.should.have.property("id");
        res.body.admin.should.have.property("name");
        res.body.admin.should.have.property("email");
        res.body.admin.should.not.have.property("password");
        res.body.admin.name.should.equal("Tayo");
        res.body.admin.email.should.equal("tayo@gmail.com");
        done();
      });
  });
  /*
   *
   *Test for the get all Admins request
   *
   */
  it("it should get ALL admins on /api/v1/admin GET", done => {
    chai
      .request(app)
      .get("/api/v1/admin")
      .end((err, res) => {
        res.should.have.status(200);
        // eslint-disable-next-line no-unused-expressions
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("admins");
        res.body.admins.should.be.a("array");
        res.body.admins[0].should.have.property("id");
        res.body.admins[0].should.have.property("name");
        res.body.admins[0].should.have.property("email");
        res.body.admins[0].should.not.have.property("password");
        done();
      });
  });
  /*
   *
   *Test for the get an Admin by Id request
   *
   */
  it("should list a SINGLE admin on /admin/<id> GET", done => {
    Admin.create({
      name: "AdminTest",
      email: "admin@gmail.com",
      password: "testestcreate"
    }).then(data => {
      const { id } = data.dataValues;
      chai
        .request(app)
        .get(`/api/v1/admin/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.should.have.property("admin");
          res.body.admin.should.have.property("id");
          res.body.admin.name.should.equal("AdminTest");
          res.body.admin.should.not.have.property("tayo@gmail.com");
          res.body.admin.email.should.equal("admin@gmail.com");
          res.body.admin.id.should.equal(data.id);
          done();
        });
    });
  });
  /*
   *
   *Test for the update of an Admin by Id request
   *
   */
  it("should update a SINGLE blob on /blob/<id> PUT", done => {
    Admin.create({
      name: "AdminTest",
      email: "admin@gmail.com",
      password: "testestcreate"
    }).then(data => {
      const { id } = data.dataValues;

      chai
        .request(app)
        .put(`/api/v1/admin/${id}`)
        .send({ name: "Spider" })
        .end((error, response) => {
          response.should.have.status(200);
          // eslint-disable-next-line no-unused-expressions
          response.should.be.json;
          response.body.should.be.a("object");
          response.body.should.have.property("status");
          response.body.should.have.property("admin");
          response.body.admin[0].should.equal(1);
          done();
        });
    });
  });
  /*
   *
   *Test for the get an Admin by Id request
   *
   */
  it("should DELETE a SINGLE admin on /admin/<id> DELETE", done => {
    Admin.findOne({ where: { name: "Spider" } }).then(data => {
      const { id } = data.dataValues;
      chai
        .request(app)
        .delete(`/api/v1/admin/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.should.have.property("admin");
          res.body.admin.should.equal(1);
          done();
        });
    });
  });
});
