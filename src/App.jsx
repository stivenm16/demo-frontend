import { useEffect, useState } from 'react'
import './App.css'
import RegistrationForm from './components/Registration'
import Dashboard from './components/Dashboard'
import apiService from './services/apiService.service'
import './styles.css'

function App() {
  const [users, setUsers] = useState([])

  const fetchUsersData = async () => {
    try {
      const allUsers = await apiService.getAllUsers()
      setUsers(allUsers || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleEdit = async (editingUser) => {
    await apiService.updateUser(editingUser.id, editingUser)
    fetchUsersData()
  }
  const handleDelete = async (id) => {
    await apiService.deleteUser(id)
    fetchUsersData()
  }

  useEffect(() => {
    fetchUsersData()
  }, [])
  return (
    <div className="App">
      <div className="registration-form">
        <RegistrationForm fetchUsersData={fetchUsersData} />
      </div>
      <div style={{ flex: 1 }}>
        <Dashboard
          users={users}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default App
