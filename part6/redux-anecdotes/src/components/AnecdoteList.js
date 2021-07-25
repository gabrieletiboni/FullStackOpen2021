import { useSelector, useDispatch } from 'react-redux'
import { voteAnectdote } from '../reducers/anecdoteReducer'
import { changeMessage } from '../reducers/notificationReducer'
import React from 'react'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()

	const vote = (id, content) => {
	  console.log('vote', id)
	  dispatch(voteAnectdote(id))

	  const not = 'You voted '+content
	  dispatch(changeMessage(not))

	  setTimeout(() => dispatch(changeMessage(null)), 5000);
	}

	return (
		<>
			{
				anecdotes
					.sort( (a, b) => b.votes - a.votes )
					.map(anecdote =>
						<div key={anecdote.id}>
							<div>
								{anecdote.content}
							</div>
							<div>
								has {anecdote.votes}
								<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
							</div>
						</div>
			)}
		</>
	)
}


export default AnecdoteList