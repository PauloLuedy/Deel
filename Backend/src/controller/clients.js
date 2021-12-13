import { Op, col } from "sequelize";

export const clients = async (req, res) => {
  const { Job, Contract, Profile } = req.app.get("models");
  var { start, end, limit } = req.query;

  const jobs = await Job.findAll({
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [new Date(start), new Date(end)],
      },
    },
    include: [
      {
        model: Contract,
        include: [{ model: Profile, as: "Client", attributes: [] }],
        attributes: [],
      },
    ],
    order: [["price", "DESC"]],
    attributes: [
      [col("Job.id"), "id"],
      [col("Contract.Client.firstName"), "firstName"],
      [col("Contract.Client.lastName"), "lastName"],
      "price",
    ],
    limit: limit ? limit : 2,
  });
  return res.json(jobs);
}