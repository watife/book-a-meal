/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const should = chai.should();

chai.use(chaiHttp);

const PREFIX = "/api/v1/orders";

describe("All API test for MEAL endpoints", () => {
  it("should list ALL Orders on /orders GET", done => {
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
        res.body.data[0].should.have.property("userId");
        res.body.data[0].should.have.property("day");
        done();
      });
  });
  it("should list a SINGLE Order on /orders/<id> GET", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({
        userId: 1,
        meals: [
          {
            id: 2,
            name: "Jollof Rice",
            size: "Large",
            price: "550"
          },
          {
            id: 1,
            name: "Fried Rice",
            size: "Medium",
            price: "450"
          }
        ]
      })
      .end((error, response) => {
        console.log(response.body);
        const { userId } = response.body.data;
        chai
          .request(app)
          .get(`${PREFIX}/${userId}`)
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
            res.body.data.should.be.a("array");
            res.body.data[0].should.have.property("id");
            res.body.data[0].should.have.property("day");
            res.body.data[0].should.have.property("meals");
            res.body.data[0].userId.should.equal(userId);
            done();
          });
      });
  });
  it("should add a SINGLE Order on /orders POST", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({
        userId: 1,
        meals: [
          {
            id: 2,
            name: "Jollof Rice",
            size: "Large",
            price: "550"
          },
          {
            id: 1,
            name: "Fried Rice",
            size: "Medium",
            price: "450"
          }
        ]
      })
      .end((error, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("success");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("id");
        res.body.data.should.have.property("date");
        res.body.data.should.have.property("meals");
        res.body.data.userId.should.equal(1);
        done();
      });
  });
  it("should update a SINGLE Meal on /orders/<id> PUT", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send({
        userId: 1,
        meals: [
          {
            id: 2,
            name: "Jollof Rice",
            size: "Large",
            price: "550"
          },
          {
            id: 1,
            name: "Fried Rice",
            size: "Medium",
            price: "450"
          }
        ]
      })
      .end((error, response) => {
        const { id } = response.body.data;
        chai
          .request(app)
          .put(`${PREFIX}/${id}`)
          .send({
            userId: 1,
            meals: [
              {
                id: 2,
                name: "Jollof Rice",
                size: "Large",
                price: "550"
              }
            ]
          })
          .end((err, data) => {
            if (err) {
              err.should.have.status(400);
              done();
            }
            const res = data.body;
            res.should.have.status("success");
            res.should.be.a("object");
            res.should.have.property("status");
            res.status.should.equal("success");
            res.should.have.property("data");
            res.data.should.be.a("object");
            res.data.should.have.property("id");
            res.data.should.have.property("date");
            res.data.should.have.property("meals");
            res.data.meals.should.be.a("array");
            done();
          });
      });
  });
});
