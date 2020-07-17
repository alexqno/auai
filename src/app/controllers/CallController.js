import { Op } from 'sequelize';
import { format } from 'date-fns';

import * as Yup from 'yup';

import Call from '../models/Call';
import User from '../models/User';
import Customer from '../models/Customer';

class CallController {
  async index(req, res) {
    const calls = await Call.findAll({
      where: { status: { [Op.ne]: Call.status.FINISHED.key } },
      order: ['createdAt'],
      include: [
        {
          model: User,
          as: 'clerk',
          attributes: ['id', 'name'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name'],
        },
      ],
      attributes: [
        'id',
        'protocol',
        'type',
        'typeName',
        'status',
        'statusName',
        'createdAt',
        'updatedAt',
        'clerk_id',
        'customer_id',
      ],
    });

    return res.json(calls);
  }

  async show(req, res) {
    const { protocol } = req.params;

    const call = await Call.findOne({ where: { protocol } });

    if (!call) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    return res.json(call);
  }

  async store(req, res) {
    const protocol = format(new Date(), 'yyMMddHHmmss');

    const call = await Call.create({
      user_id: req.userId,
      protocol,
      status: Call.status.STARTED.key,
    });

    return res.json(call);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      customer_id: Yup.number().required(),
      clerk_id: Yup.number().required(),
      type: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos informados inválidos.' });
    }

    const typeExists = Call.types[req.body.type];
    if (!typeExists) {
      return res.status(400).json({ error: 'Tipo desconhecido.' });
    }

    const { protocol } = req.params;

    const call = await Call.findOne({ where: { protocol } });

    if (!call) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    const { customer_id, clerk_id, type, description } = req.body;

    const user = await User.findByPk(req.userId);

    const newDescription = `${user.name} - ${format(
      new Date(),
      "dd/MM/yyyy', 'HH:mm:ss"
    )}:\n${description}\n${call.description || ''}`;

    await call.update({
      customer_id,
      clerk_id,
      type,
      description: newDescription,
      status: Call.status.SAVED.key,
    });

    return res.json(call);
  }
}

export default new CallController();
