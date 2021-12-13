import { Op, col, fn, literal } from "sequelize";

export const profession = async (req, res) => {
  const { Job, Contract, Profile } = req.app.get("models");
  var { start, end } = req.query;

  const professions = await Job.findAll({
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [new Date(start), new Date(end)],
      },
    },
    include: [
      {
        model: Contract,
        include: [{ model: Profile, as: "Contractor", attributes: [] }],
        attributes: [],
      },
    ],
    attributes: [
      [fn("sum", col("price")), "total"],
      [col("Contract.Contractor.profession"), "profession"],
    ],
    group: [col("Contract.Contractor.profession")],
    order: [[literal("total"), "DESC"]],
  });

  return res.json(professions[0]);
}