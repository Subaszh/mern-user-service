import express from 'express';
import { createCompany, findCompaniesWithName } from '../helpers/company.helper';
import { Companies } from '../models';
const router = express.Router();

router.get('/search', async(req, res) => {
  const {query} = req.query;
  const companies = await findCompaniesWithName(query)
  res.send(companies)
})

router.post('/', async(req, res) => {
  try {
    const newCompany = await createCompany(req.body)
    const result = await Companies.create(newCompany)
    res.send({message: "Company created successfully", id: result._id})
  } catch(e) {
    res.status(500)
    res.send({error: e.errors.permalink.properties.message})
  }
})

// router.post('/bulk-upload', async(req, res) => {
//   try {
//     for(let company of req.body) {
//       const newC = await createCompany(company)
//       await Companies.create(newC)
//     }
//     res.send({message: "Companies created successfully"})
//   } catch(e) {
//     res.status(500)
//     res.send({error: e.errors.permalink.properties.message})
//   }
// })

export default router;
