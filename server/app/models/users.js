import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favoriteCompanies: [Schema.Types.ObjectId],
  createdAt: Date,
  updatedAt: Date
})

userSchema.plugin(uniqueValidator, { message: 'already being used'})
export const Users = mongoose.model('User', userSchema)