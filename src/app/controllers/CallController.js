import * as Yup from 'yup';

import Call from '../models/Call';

class CallController {
  async store(req, res) {
    const schema = Yup.object().shape({
      protocol: Yup.string().required(),
      customer_id: Yup.number().required(),
      clerk_id: Yup.number().required(),
      type: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const typeExists = Call.types.find((t) => t.key === req.body.type);
    if (!typeExists) {
      return res.status(400).json({ error: 'Tipo desconhecido.' });
    }

    const { protocol, customer_id, clerk_id, type, description } = req.body;

    const call = await Call.create({
      user_id: req.userId,
      customer_id,
      clerk_id,
      protocol,
      type,
      description,
    });

    return res.json(call);
  }
}

export default new CallController();
