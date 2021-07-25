const initialState = null

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'CHANGE':
      return action.data.content

    default: return state
  }

  return state
}

export const changeMessage = (text) => {
  return {
    type: 'CHANGE',
    data: { content: text }
  }
}

export default reducer