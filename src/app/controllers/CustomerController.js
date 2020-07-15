import * as Yup from 'yup';

import Customer from '../models/Customer';

class CustomerController {
  async index(req, res) {
    const customers = await Customer.findAll({
      attributes: Customer.jsonAttrs,
    });

    return res.json(customers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const productExists = Customer.products.find(
      (p) => p.key === req.body.product
    );
    if (!productExists) {
      return res.status(400).json({ error: 'Produto desconhecido.' });
    }

    const customerExists = await Customer.findOne({
      where: { product: req.body.product, name: req.body.name },
    });

    if (customerExists) {
      return res.status(400).json({ error: 'Cliente já cadastrado.' });
    }

    const { id, product, name } = await Customer.create(req.body);

    return res.json({
      id,
      product,
      name,
    });
  }
}

export default new CustomerController();
