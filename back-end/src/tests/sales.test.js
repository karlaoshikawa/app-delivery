const sinon = require("sinon");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../api/app");
const jwt = require("jsonwebtoken");

const { sales } = require("../database/models");
const { salesProducts } = require('../database/models');

chai.use(chaiHttp);

describe("Testa as requisisoes de Sales", () => {
  afterEach(() => {
    sinon.restore();
  });

  const createSaleMock = {
	userId: 3,
	sellerId: 3,
	totalPrice: 100,
	deliveryAddress: "zebirita",
	deliveryNumber: 55,
  saleDate: "2022-11-03T00:00:00.000Z",
  products: [{ productId: 2, quantity: 2 }],
	status: "entregue"
}

const saleResponse = {
	id: 2,
	userId: 3,
	sellerId: 3,
	totalPrice: 100,
	deliveryAddress: "zebirita",
	deliveryNumber: 55,
	saleDate: "2022-11-03T00:00:00.000Z",
	status: "preparando"
}
  
  const saleResponseOrder = {
	id: 2,
	userId: 3,
	totalPrice: 100,
	deliveryAddress: "zebirita",
	deliveryNumber: 55,
	saleDate: "2022-11-03T00:00:00.000Z",
	status: "preparando"
}
  
  const saleProductResponse = {
   saleId: 2,
   productId: 2,
   quantity: 2,
}

  it("testa createSale error", async () => {
    sinon.stub(jwt, 'verify').returns('bigbig');
    sinon
      .stub(sales, "create")
      .resolves(saleResponse);

    const response = await chai
      .request(app)
      .post("/sales")
      .send(createSaleMock);
    
    sinon
      .stub(salesProducts, "create")
      .resolves(saleProductResponse);

    expect(response.status).to.be.equal(401);
    // expect(response.body).to.be.equal(saleResponse);
  });

  it("testa createSale", async () => {
    sinon.stub(jwt, 'verify').returns({ data: { userId: 3 } });
    sinon
      .stub(sales, "create")
      .resolves(saleResponse);

    sinon
      .stub(salesProducts, "create")
      .resolves(saleProductResponse);

    const response = await chai
      .request(app)
      .post("/sales")
      .send(createSaleMock)
      .set('Authorization', {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer'
});
    
    expect(response.status).to.be.equal(201);
    // expect(response.body).to.be.equal(saleResponse);
  });

  it("testa getSaleById", async () => {
      sinon.stub(sales, 'findByPk').resolves(saleResponse);

      const response = await chai.request(app).get('/sellers/2');
      expect(response.status).to.be.eq(200);
      // expect(response.body).to.be.deep.eq(saleResponse);
  });

    it("testa putSaleStatus", async () => {
      sinon.stub(sales, 'update').resolves({status: 'preparando'});

      const response = await chai.request(app).put('/sales/2');
      expect(response.status).to.be.eq(200);
  });

  it("testa getUserOrders", async () => {
    sinon.stub(jwt, 'verify').returns({ data: { userId: 3 } });
      sinon.stub(sales, 'findAll').resolves([saleResponse]);
    
      const response = await chai.request(app).get('/orders').set('authorization', "bigbig");
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq([saleResponse]);
  });

    it("testa getSellerOrders", async () => {
      sinon.stub(sales, 'findAll').resolves([saleResponse]);
      sinon.stub(jwt, 'verify').returns('bigbig');
    
      const response = await chai.request(app).get('/orders/3').set('Authorization', "bigbig");
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq([saleResponse]);
  });

});
