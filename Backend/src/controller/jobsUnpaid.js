import { Op } from "sequelize"

export const jobsUnpaid = async (req, res) => {
  const { Job, Contract } = req.app.get('models');

  const unpaidJobs = await Job.findAll({
      where: {
          paid: {
              [Op.not]: true
          }
      },
      include: [
          {
              model: Contract,
              where: {
                  status: {
                      [Op.not]: 'terminated'
                  }
              }
          }
      ]
  })
  return res.json(unpaidJobs)
}