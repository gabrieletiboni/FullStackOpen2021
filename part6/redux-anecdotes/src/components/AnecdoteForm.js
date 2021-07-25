import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import React from 'react'

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const createAnecdote = (e) => {
		e.preventDefault()
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''

		dispatch(addAnecdote(content))
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={createAnecdote}>
				<div><input type='text' name='anecdote' /></div>
				<button>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm