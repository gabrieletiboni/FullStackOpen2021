const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)

      const updatedAnec = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anec =>
        anec.id !== id ? anec : updatedAnec 
      )
    case 'NEW_ANEC':
      const newAnec = asObject(action.data.content)
      return state.concat(newAnec)

    case 'RESET':
      return initialState
    default: return state
  }

  return state
}

export const voteAnectdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const resetVotes = () => {
  return {
    type: 'RESET'
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW_ANEC',
    data: {
      content: content
    }
  }
}

export default reducer