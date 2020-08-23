import mongoose from'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  permalink: {
    type: String,
    unique: true,
    required: true
  },
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
})

companySchema.plugin(uniqueValidator, { message: 'Company with {PATH} - {VALUE} exists already'})

export const Companies = mongoose.model('Company', companySchema)