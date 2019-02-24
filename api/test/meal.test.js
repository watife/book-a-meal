/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";

const should = chai.should();

chai.use(chaiHttp);

const PREFIX = "/api/v1/meals";

describe("All API test for MEAL endpoints", () => {
  it("should list ALL Meals on /meals GET", done => {
    chai
      .request(app)
      .get(PREFIX)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("name");
        res.body.data[0].should.have.property("size");
        done();
      });
  });
  it("should list a SINGLE Meal on /meals/<id> GET", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({ name: "spagetti native", price: 7000, size: "large" })
      .end((error, response) => {
        const { id } = response.body.data;
        chai
          .request(app)
          .get(`${PREFIX}/${id}`)
          .end((err, res) => {
            if (err) {
              err.should.have.status(400);
              done();
            }
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("status");
            res.body.status.should.equal("success");
            res.body.should.have.property("data");
            res.body.data.should.be.a("object");
            res.body.data.should.have.property("id");
            res.body.data.should.have.property("name");
            res.body.data.should.have.property("price");
            res.body.data.id.should.equal(id);
            done();
          });
      });
  });
  it("should add a SINGLE Meal on /meals POST", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({ name: "spagetti native", price: 7000, size: "large" })
      .end((error, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("name");
        res.body.data.should.have.property("price");
        res.body.data.should.have.property("size");
        res.body.data.name.should.equal("spagetti native");
        res.body.data.price.should.equal(7000);
        done();
      });
  });
  it("should update a SINGLE Meal on /meals/<id> PUT", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({ name: "spagetti native", prize: 7000, size: "large" })
      .end((error, response) => {
        const { id } = response.body.data;
        chai
          .request(app)
          .put(`${PREFIX}/${id}`)
          .send({ name: "spagetti bols", price: 8000, size: "medium" })
          .end((err, data) => {
            if (err) {
              err.should.have.status(400);
              done();
            }
            const res = data.body;
            data.status.should.equal(200);
            res.should.be.a("object");
            res.should.have.property("status");
            res.should.have.property("data");
            res.data.should.be.a("object");
            res.data.should.have.property("name");
            res.data.should.have.property("price");
            res.data.should.have.property("size");
            res.data.name.should.equal("spagetti bols");
            res.data.price.should.equal(8000);
            res.data.size.should.equal("medium");
            done();
          });
      });
  });
  it("should delete a SINGLE Meal on /meals/<id> DELETE", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({ name: "spagetti native", prize: 7000, size: "large" })
      .end((err, response) => {
        const { id } = response.body.data;
        chai
          .request(app)
          .delete(`${PREFIX}/${id}`)
          .end((error, res) => {
            if (error) {
              error.should.have.status(400);
            }
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("status");
            res.body.status.should.equal("success");
            done();
          });
      });
  });
});
