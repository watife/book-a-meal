/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";

const should = chai.should();

chai.use(chaiHttp);

const PREFIX = "/api/v1/menu";

describe("All API test for MENU endpoints", () => {
  it("should list today's Menu on /meals GET", done => {
    chai
      .request(app)
      .get(PREFIX)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        res.body.should.be.a("object");
        res.body.data.should.have.property("id");
        res.body.data.should.have.property("menu");
        res.body.data.menu[0].should.be.a("object");
        res.body.data.menu[0].should.have.property("id");
        res.body.data.menu[0].should.have.property("name");
        res.body.data.menu[0].should.have.property("size");
        res.body.data.menu[0].should.have.property("price");
        done();
      });
  });
  it("should list a Add today's Menu on /meals/ GET", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send([
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
      ])
      .end((error, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("success");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("menu");
        res.body.data.menu.should.be.a("array");
        done();
      });
  });

  it("should get the Menu History on /history GET", done => {
    chai
      .request(app)
      .get(`${PREFIX}/history`)
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        res.body.data.should.be.a("array");
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("day");
        res.body.data[0].should.have.property("menu");
        done();
      });
  });
  it("should update a SINGLE Menu on /menu PUT", done => {
    chai
      .request(app)
      .post(PREFIX)
      .send([
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
      ])
      .end((error, response) => {
        chai
          .request(app)
          .put(PREFIX)
          .send({
            id: 2,
            name: "Jollof Rice",
            size: "Large",
            price: "550"
          })
          .end((err, data) => {
            const res = data.body;
            data.status.should.equal(200);
            res.should.be.a("object");
            res.should.have.property("status");
            res.status.should.equal("success");
            res.should.have.property("data");
            res.data.should.be.a("object");
            res.data.should.have.property("menu");
            res.data.menu.should.be.a("array");
            done();
          });
      });
  });
});
