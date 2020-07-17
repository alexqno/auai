import { format } from 'date-fns';

import Call from '../models/Call';
import User from '../models/User';

class FinishCallController {
  async update(req, res) {
    const { protocol } = req.params;

    const call = await Call.findOne({ where: { protocol } });

    if (!call) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    const user = await User.findByPk(req.userId);

    const newDescription = `${user.name} - ${format(
      new Date(),
      "dd/MM/yyyy', 'HH:mm:ss"
    )}:\nAtendimento finalizado\n${call.description || ''}`;

    await call.update({
      description: newDescription,
      status: Call.status.FINISHED.key,
    });

    return res.json(call);
  }
}

export default new FinishCallController();
