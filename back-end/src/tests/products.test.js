const sinon = require("sinon");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../api/app");
const jwt = require("jsonwebtoken");

const { sales } = require("../database/models");
const { products } = require('../database/models');

chai.use(chaiHttp);

describe("Testa as requisisoes de Sales", () => {
  afterEach(() => {
    sinon.restore();
  });

  const productArray = [
  {
    "id": 1,
    "name": "Skol Lata 250ml",
    "price": "2.20",
    "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
  },
  {
    "id": 2,
    "name": "Heineken 600ml",
    "price": "7.50",
    "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
  },
]

  describe('metodo getAll', () => {
    it('caso de sucesso', async () => {
      sinon.stub(products, 'findAll').resolves(productArray);

      const response = await chai.request(app).get('/products');
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(productArray);
    })
  })
});