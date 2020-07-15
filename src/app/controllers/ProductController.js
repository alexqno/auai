import Customer from '../models/Customer';

class ProductController {
  async index(req, res) {
    return res.json(Customer.products);
  }
}

export default new ProductController();
