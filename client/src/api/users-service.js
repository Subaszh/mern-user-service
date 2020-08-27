import axios from 'axios'

const getUserId = () => localStorage.getItem('userId')

const login = async (body) => {
  try {
    const { data } = await axios.post('http://localhost:3000/users/login', body)
    return data.id
  } catch(e) {
    throw (e?.response?.data.error || e)
  }
}

const register = async(body) => {
  try {
    const { data } = await axios.post('http://localhost:3000/users/register', body)
    return data
  } catch(e) {
    throw (e?.response?.data.error || e)
  }
}

const resetPassword = async(body) => {
  try {
    const { data } = await axios.put('http://localhost:3000/users/reset-password', body)
    return data
  } catch(e) {
    throw (e?.response?.data.error || e)
  }
}

const fetchFavorites = async() => {
  try {
    const {data} = await axios.get(`http://localhost:3000/users/${getUserId()}/favorites`)
    return data.data
  } catch (e) {
    throw e
  }
}

const markFavorite = async(companyId) => {
  try {
    const {data} = await axios.put(`http://localhost:3000/users/${getUserId()}/mark-favorite/${companyId}`)
    return data
  } catch (e) {
    throw e
  }
}

const removeFavorite = async(companyId) => {
  try {
    const {data} = await axios.put(`http://localhost:3000/users/${getUserId()}/unmark-favorite/${companyId}`)
    return data
  } catch (e) {
    throw e
  }
}

const searchCompanies = async (searchFor) => {
  try {
    const {data} = await axios.get(`http://localhost:3000/companies/search?query=${
      searchFor
    }`)
    return data
  } catch (e) {
    throw e
  }
}


export const UserService = {
  login,
  register,
  resetPassword,
  fetchFavorites,
  markFavorite,
  removeFavorite,
  searchCompanies
}