const sinon = require("sinon");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../api/app");
const { salesProducts } = require("../database/models");
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

const createSaleProductMock = {
  saleId: 2,
  productId: 2,
  quantity: 12
};

describe("Testa as requisisoes de Sales", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("testa createOrderProducts", async () => {
      sinon.stub(salesProducts, 'create').resolves(createSaleProductMock);
      sinon.stub(jwt, 'verify').returns('bigbig');
    
    const response = await chai.request(app)
      .post('/salesProducts')
      .send(createSaleProductMock);
      expect(response.status).to.be.eq(201);
      expect(response.body).to.be.deep.eq(createSaleProductMock);
  });

    it("getSaleProducts", async () => {
      sinon.stub(salesProducts, 'findAll').resolves(createSaleProductMock);
      sinon.stub(jwt, 'verify').returns('bigbig');
    
    const response = await chai.request(app)
      .get('/salesProducts/2')
      .send(createSaleProductMock);
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(createSaleProductMock);
  });
});
