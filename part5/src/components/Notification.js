import React from 'react'

const Notification = ({ not }) => {
  const { value, type } = not
  if (value === null) return null

  const style = {
    display: 'inline-block',
    padding: 10,
    color: (type === 'success' ? 'green' : 'red'),
    backgroundColor: (type === 'success' ? '#E8F5E9' : '#FFCDD2' ),
    fontSize: '.95rem'
  }

  return (
    <div style={{ marginTop: 25, marginBottom: 25 }}>
      <span style={style}>{value}</span>
    </div>
  )
}

export default Notification