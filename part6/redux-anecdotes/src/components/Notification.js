import { useSelector } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import React from 'react'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification