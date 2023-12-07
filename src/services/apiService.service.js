import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'

const apiService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`)
      return response.data
    } catch (error) {
      console.error('Error getting users:', error)
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData)
      return response.data
    } catch (error) {
      console.error('Error creating user:', error)
    }
  },

  updateUser: async (userId, updatedUserData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/${userId}`,
        updatedUserData,
      )
      return response.data
    } catch (error) {
      console.error('Error updating user:', error)
    }
  },

  deleteUser: async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}`)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  },
}

export default apiService
