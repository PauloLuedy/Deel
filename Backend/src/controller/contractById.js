import  getProfile from '../middleware/getPProfile'

 export const contractById =  (getProfile, async  (req, res) => {
    const profile_id = req.get('profile_id')
    const { Contract } = req.app.get('models')
    const { id } = req.params
    const contract = await Contract.findOne({ where: { id } })

    if (!contract)
        return res.status(404).end()
    if (contract.ContractorId !== parseInt(profile_id) && contract.ClientId !== parseInt(profile_id))
        return res.status(404).end()
    res.json(contract)
})


