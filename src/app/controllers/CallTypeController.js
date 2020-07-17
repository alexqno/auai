import Call from '../models/Call';

class CallTypeController {
  async index(req, res) {
    return res.json(Object.values(Call.types));
  }
}

export default new CallTypeController();
