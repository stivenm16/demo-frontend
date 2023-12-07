import axios from 'axios'
import apiService from '../../src/services/apiService.service'

jest.mock('axios')

describe('apiService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch all users', async () => {
    const mockedUsers = [{ id: 1, username: 'TestUser' }]
    axios.get.mockResolvedValueOnce({ data: mockedUsers })

    const users = await apiService.getAllUsers()

    expect(users).toEqual(mockedUsers)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/users')
  })

  it('should create a user', async () => {
    const userData = { username: 'TestUser', email: 'test@example.com' }
    const createdUser = { ...userData, id: 1 }
    axios.post.mockResolvedValueOnce({ data: createdUser })

    const newUser = await apiService.createUser(userData)

    expect(newUser).toEqual(createdUser)
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/api/users',
      userData,
    )
  })

  it('should update a user', async () => {
    const updatedUserData = {
      username: 'UpdatedUser',
      email: 'updated@example.com',
      id: 1,
    }
    const updatedUser = { ...updatedUserData, username: 'updatedUser1' }
    axios.put.mockResolvedValueOnce({ data: updatedUser })

    const updatedUserResponse = await apiService.updateUser(
      updatedUserData.id,
      updatedUserData,
    )

    expect(updatedUserResponse).toEqual(updatedUser)
    expect(axios.put).toHaveBeenCalledWith(
      `http://localhost:3000/api/users/${updatedUserData.id}`,
      updatedUserData,
    )
  })

  it('should delete a user', async () => {
    const userId = 1
    axios.delete.mockResolvedValueOnce()

    await apiService.deleteUser(userId)

    expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:3000/api/users/${userId}`,
    )
  })
})
