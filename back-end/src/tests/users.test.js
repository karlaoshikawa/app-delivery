const sinon = require("sinon");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../api/app");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const { users } = require("../database/models");
chai.use(chaiHttp);

const userMock = {
  email: "zebirita@email.com",
  password: "$#zebirita#$",
};

const loginMock = {
  id: "3",
  name: "Cliente Zé Birita",
  role: "customer",
  email: userMock.email,
  password: md5(userMock.password),
};

const loginResponseUser = {
  id: "3",
  name: "Cliente Zé Birita",
  role: "customer",
  email: "zebirita@email.com",
  token: "zeBirita",
};

const newUserMock = {
  name: "Homem dos Sacos",
  email: "homemdosaco@email.com",
  password: "1234567",
};

const newUserResponse = {
  id: 4,
  name: "Homem dos Sacos",
  password: md5("1234567"),
  role: "customer",
  email: "homemdosaco@email.com",
};

const sellersMock = [
  {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller",
  },
];

const allUsersMock = [
  {
    id: 1,
    name: "Delivery App Admin",
    email: "adm@deliveryapp.com",
    role: "administrator",
  },
  {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller",
  },
];

describe("Testa as requisisoes de Users", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Testa getUserByEmail", async () => {
    sinon.stub(users, "findOne").resolves(loginMock);
    sinon.stub(jwt, "sign").returns("zeBirita");

    const response = await chai.request(app).post("/login").send(userMock);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(loginResponseUser);
  });

    it("Testa getUserByEmail error 404", async () => {
    sinon.stub(users, "findOne").resolves();
    sinon.stub(jwt, "sign").returns("zeBirita");

    const response = await chai.request(app).post("/login").send({
  email: "zea@email.com",
  password: "$#zebirita#$",
});

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal();
  });

  it("Testa getUserByEmail error", async () => {
    sinon.stub(users, "findOne").resolves(loginMock);
    sinon.stub(jwt, "sign").returns("zeBirita");

    const response = await chai.request(app).post("/login").send({
      email: "zebirita@email.com",
      password: "$#zebirita#$3",
    });

    expect(response.status).to.be.equal(400);
  });

  it("Testa getUserByEmail error sem email", async () => {
    sinon.stub(users, "findOne").resolves(loginMock);
    sinon.stub(jwt, "sign").returns("zeBirita");

    const response = await chai.request(app).post("/login").send({
      password: "$#zebirita#$",
    });

    expect(response.status).to.be.equal(400);
  });

    it("Testa getUserByEmail middleware email error", async () => {
    sinon.stub(users, "findOne").resolves(loginMock);
    sinon.stub(jwt, "sign").returns("zeBirita");

    const response = await chai.request(app).post("/login").send({
      email: "zebirita@email",
      password: "$#zebirita#$3",
    });

    expect(response.status).to.be.equal(400);
    });
  
      it("Testa getUserByEmail middleware password error", async () => {
    sinon.stub(users, "findOne").resolves(loginMock);
    sinon.stub(jwt, "sign").returns("zeBirita");

    const response = await chai.request(app).post("/login").send({
      email: "zebirita@email.com",
      password: "$#ze",
    });

    expect(response.status).to.be.equal(400);
  });

  it("testa createdUser", async () => {
    sinon.stub(users, "findOrCreate").resolves([newUserResponse, true]);

    const response = await chai
      .request(app)
      .post("/register")
      .send(newUserMock);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(newUserResponse);
  });

  it("testa createdUser error", async () => {
    sinon.stub(users, "findOrCreate").resolves([newUserResponse, false]);

    const response = await chai
      .request(app)
      .post("/register")
      .send(newUserMock);

    expect(response.status).to.be.equal(409);
  });

    it("testa createdUser", async () => {
    sinon.stub(users, "findOrCreate").resolves([newUserResponse, true]);

    const response = await chai
      .request(app)
      .post("/register")
      .send({
  name: "Homem",
  email: "homemdosaco@email.com",
  password: "1234567",
});

    expect(response.status).to.be.equal(400);
  });

  it("testa createUserByRole", async () => {
    sinon.stub(jwt, "verify").returns({ data: { role: "administrator" } });

    sinon.stub(users, "findOrCreate").resolves([newUserResponse, true]);

    const response = await chai
      .request(app)
      .post("/roleregister")
      .send({
        name: "Loira do Banheiro",
        email: "loira@email.com",
        password: "1234567",
        role: "seller",
      })
      .set("Authorization", "zeBirita");

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(newUserResponse);
  });

  it("testa createUserByRole error", async () => {
    sinon.stub(jwt, "verify").returns({ data: { role: "seller" } });

    sinon.stub(users, "findOrCreate").resolves([newUserResponse, true]);

    const response = await chai
      .request(app)
      .post("/roleregister")
      .send({
        name: "Loira do Banheiro",
        email: "loira@email.com",
        password: "1234567",
        role: "seller",
      })
      .set("Authorization", "zeBirita");

    expect(response.status).to.be.equal(404);
  });

  it("testa createUserByRole error", async () => {
    sinon.stub(jwt, "verify").returns({ data: { role: "administrator" } });

    sinon.stub(users, "findOrCreate").resolves([newUserResponse, false]);

    const response = await chai
      .request(app)
      .post("/roleregister")
      .send({
        name: "Loira do Banheiro",
        email: "loira@email.com",
        password: "1234567",
        role: "seller",
      })
      .set("Authorization", "zeBirita");

    expect(response.status).to.be.equal(409);
  });

  it("testa getSellers", async () => {
    sinon.stub(users, "findAll").resolves(sellersMock);
    sinon.stub(jwt, "verify").returns({ data: { role: "administrator" } });

    const response = await chai
      .request(app)
      .get("/sellers")
      .set("Authorization", "zeBirita");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(sellersMock);
  });

  it("testa getAllExcludeAdm", async () => {
    sinon.stub(users, "findAll").resolves(allUsersMock[1]);
    sinon.stub(jwt, "verify").returns({ data: { role: "administrator" } });

    const response = await chai
      .request(app)
      .get("/allexcludeadm")
      .send({ id: "2" });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allUsersMock[1]);
  });

  it("testa deleteUser", async () => {
    sinon.stub(users, "findOne").resolves(newUserResponse);
    sinon.stub(users, "destroy").resolves();
    sinon.stub(jwt, "verify").returns({ data: { role: "administrator" } });

    const response = await chai
      .request(app)
      .delete("/deleteuser/4")
      .set("Authorization", "zeBirita");

    expect(response.status).to.be.equal(200);
  });
});
