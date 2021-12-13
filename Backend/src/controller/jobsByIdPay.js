export const jobsByIdPay = async (req, res) => {
  const { Job, Contract, Profile } = req.app.get('models')
  const { job_id } = req.params

  const theJobWillBePaid = await Job.findAll({
      where: {
          id: job_id
      },
      include: [
          {
              model: Contract, include: [
                  { model: Profile, as: 'Contractor' },
                  { model: Profile, as: 'Client' }
              ]
          }
      ]
  })

  try {
      if (theJobWillBePaid[0].Contract.Client.balance > theJobWillBePaid[0].price) {
          //C lient balance decrement
          await Profile.increment(
              { balance: -theJobWillBePaid[0].price },
              { where: { id: theJobWillBePaid[0].Contract.ClientId } }
          )

          // Contractor balance increment
          await Profile.increment(
              { balance: +theJobWillBePaid[0].price },
              { where: { id: theJobWillBePaid[0].Contract.ContractorId } }
          )
          return res.status(201).send('PAID successfully')
      }
  } catch (err) {
      console.log(err)
  }

  return res.json('Client balance is low to paid')
}