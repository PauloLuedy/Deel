import { sequelize } from "../models/model";

export const balances = async (req, res) => {
  const { Job, Contract, Profile } = req.app.get('models')
  const { userId } = req.params
  const { deposit } = req.body

  const totalAmount = await Job.findAll({
      attributes: [
          [sequelize.fn('sum', sequelize.col('price')), 'total']
      ],
      include: [
          {
              model: Contract,
              where: {
                  ClientId: userId
              }
          }
      ],
      raw: true
  })

  try {
      if (deposit > (totalAmount[0].total * 0.25)) {
          res.status(401).send("can't deposit more than 25% the total of jobs to pay")
      } else {
          Profile.increment(
              { balance: +deposit },
              { where: { id: userId } }
          )
          res.status(201).send("was deposited successfully")
      }
  } catch (err) {
      console.log(err)
  }
}