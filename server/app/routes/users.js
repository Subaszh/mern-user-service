import { Users, Companies } from '../models';
import { createUser, validatePassword, checkIfUserExists } from '../helpers/user.helper'
import express from 'express';
import bcrypt from  'bcrypt';
import { asyncHandler } from '../utils';

const router = express.Router();

router.post('/login', asyncHandler(async(req, res) => {
  const {email, password} = req.body
  if (!email || !password) {
    throw "Please send Proper email & Password"
  } else {
    const user = await checkIfUserExists('email', email)
    const isValid = await validatePassword(password, user)
    if (isValid) 
      res.send({message: "Authorisation Successful", id: user._id})
    else
      throw "Please Try with a Valid Password"
  }
}));

router.post('/register', asyncHandler(async (req, res)=> {
  const newUser = await createUser(req.body)
  const result = await Users.create(newUser)
  res.send({message: "User created successfully", id: result._id})
}));

router.put('/reset-password', asyncHandler(async(req, res) => {
  const {email, newPassword, currentPassword} = req.body
  if (!email || !newPassword || !currentPassword) {
    throw "Please send Proper email & Password"
  } else {
    const user = await checkIfUserExists('email', email)
    const isNewPasswordEqualsCurrent = await validatePassword(newPassword, user)
    const isValid = await validatePassword(currentPassword, user)
    if (isValid && !isNewPasswordEqualsCurrent) {
      user.password = await bcrypt.hash(newPassword, 8)
      user.updatedAt = new Date()
      await user.save()
      res.send({message: 'password updated succesfully'})
    } else if (!isValid) {
      throw "Current Password is not Valid"
    } else {
      throw "Current password equals new password"
    }
  }

}));


router.put('/:userId/mark-favorite/:companyId', asyncHandler(async(req, res) => {
  const {userId, companyId} = req.params
  const user = await checkIfUserExists('_id', userId)
  if (user.favoriteCompanies.indexOf(companyId) > -1) {
    res.send({message: "Already marked as favorite"})
  } else {
    user.favoriteCompanies = [...user.favoriteCompanies, companyId]
    user.updatedAt = new Date()
    await user.save()
    res.send({message: "Company marked as favorite", data: user.favoriteCompanies})
  }
}))

router.put('/:userId/unmark-favorite/:companyId', asyncHandler(async(req, res) => {
  const {userId, companyId} = req.params
  const user = await checkIfUserExists('_id', userId)
  const favIndex = user.favoriteCompanies.indexOf(companyId)
  if (favIndex > -1) {
    user.favoriteCompanies.splice(favIndex, 1)
    user.updatedAt = new Date()
    await user.save()
    res.send({message: "Company removed from favorite", data: user.favoriteCompanies})
  } else {
    res.send({message: "Company is not favorite for the user"})
  }
}));

router.get('/:userId/favorites', asyncHandler(async(req, res) => {
  const {userId} = req.params
  const user = await checkIfUserExists('_id', userId)
  const favoriteCompanies = await Companies.find().where('_id').in(user.favoriteCompanies).exec()
  res.send({data: favoriteCompanies})
}));

export default router;
