import React, { useState } from 'react'
import apiService from '../services/apiService.service'

const RegistrationForm = ({ fetchUsersData }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.username || !formData.email || !formData.password) {
        console.error('Please fill in all fields')
        return
      }

      const newUser = await apiService.createUser({
        ...formData,
        id: Math.floor(Math.random() * 100),
      })
      setFormData({
        username: '',
        email: '',
        password: '',
      })
      fetchUsersData()
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegistrationForm
