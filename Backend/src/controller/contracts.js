import { Op } from "sequelize"
import { Profile } from '../models/model'

export const contract = async (req, res) => {
  const { Contract } = req.app.get("models");
  const contracts = await Contract.findAll({
    where: {
      status: {
        [Op.not]: "terminated",
      },
    },
    include: [
      { model: Profile, as: "Contractor" },
      { model: Profile, as: "Client" },
    ],
  });
  return res.json(contracts);
};
