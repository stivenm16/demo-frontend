import { useState } from 'react'
import apiService from '../services/apiService.service'

const Dashboard = ({ users, handleEdit, handleDelete }) => {
  const [editingUser, setEditingUser] = useState(null)
  const handleEditClick = (user) => {
    setEditingUser(user)
  }

  const fetchUsersData = async () => {
    try {
      const allUsers = await apiService.getAllUsers()
      setUsers(allUsers || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleSaveClick = async () => {
    handleEdit(editingUser)
    setEditingUser(null)
  }

  const handleCancelClick = () => {
    setEditingUser(null)
  }

  const handleChange = (e, field) => {
    setEditingUser({
      ...editingUser,
      [field]: e.target.value,
    })
  }
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#FFFF' }}>User Dashboard</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#FFFF',
              }}
            >
              {editingUser && editingUser.id === user.id ? (
                <div>
                  <p>
                    <strong>Username:</strong>{' '}
                    <input
                      type="text"
                      value={editingUser.username}
                      onChange={(e) => handleChange(e, 'username')}
                    />
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => handleChange(e, 'email')}
                    />
                  </p>
                  <div>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <div>
                    <button onClick={() => handleEditClick(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard
