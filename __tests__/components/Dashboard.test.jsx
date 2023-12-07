import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import Dashboard from '../../src/components/Dashboard'

describe('Dashboard Component', () => {
  const mockUsers = [
    { id: 1, username: 'User1', email: 'user1@example.com' },
    { id: 2, username: 'User2', email: 'user2@example.com' },
  ]

  const mockHandleEdit = jest.fn()
  const mockHandleDelete = jest.fn()

  test('renders users data and handles edit/delete clicks', () => {
    const { getAllByText, getByDisplayValue, getByText } = render(
      <Dashboard
        users={mockUsers}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />,
    )

    expect(getByText('User1')).toBeInTheDocument()
    expect(getByText('user1@example.com')).toBeInTheDocument()

    const editButtons = getAllByText('Edit')
    fireEvent.click(editButtons[0])
  })

  test('allows editing user data', () => {
    const { getAllByText, getByDisplayValue, getByText } = render(
      <Dashboard
        users={mockUsers}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />,
    )

    const editButtons = getAllByText('Edit')
    fireEvent.click(editButtons[0])

    const modifiedUsernameInput = getByDisplayValue('User1')
    fireEvent.change(modifiedUsernameInput, {
      target: { value: 'ModifiedUser' },
    })

    fireEvent.click(getByText('Save'))

    expect(mockHandleEdit).toHaveBeenCalledWith({
      id: 1,
      username: 'ModifiedUser',
      email: 'user1@example.com',
    })
  })

  test('allows deleting user', () => {
    const { getAllByText } = render(
      <Dashboard
        users={mockUsers}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />,
    )

    const deleteButtons = getAllByText('Delete')
    fireEvent.click(deleteButtons[0])

    expect(mockHandleDelete).toHaveBeenCalledWith(1)
  })

  test('cancels edit and resets editing state', () => {
    const { getAllByText, queryByDisplayValue } = render(
      <Dashboard
        users={mockUsers}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />,
    )

    const editButtons = getAllByText('Edit')
    fireEvent.click(editButtons[0])

    fireEvent.click(getAllByText('Cancel')[0])

    expect(queryByDisplayValue('User1')).toBeNull()
  })
})
