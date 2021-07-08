import React, { useState } from 'react'


const Button = ({text, handleClick}) => (
          <button onClick={handleClick}>{text}</button>
      )

const MostVoted = ({votes, anecdotes}) => {

  const getMostVoted = () =>  {
      let max = -1
      let argmax = -1

      for (var i = 0; i < votes.length; i++) {
        if (votes[i] > max) {
            argmax = i
            max = votes[i]
          }
      }
      return argmax
  }

  const sumVotes = () => votes.reduce((a, b) => a + b, 0)

  if (sumVotes() > 0)
    return (
    <>
      <h2>Anecdote with most votes</h2>
      {anecdotes[getMostVoted()]}
      <br/>
      has {votes[getMostVoted()]} votes
    </>
  )
  else
    return (<p>Start voting to show the most voted anecdote</p>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0))

  // upperbound is exclusive
  const randInt = (upperbound) => Math.floor(Math.random() * (upperbound))

  const newAnedctode = () => setSelected(randInt(anecdotes.length))
  const vote = () => {
    const v = [...votes]
    v[selected] += 1
    setVotes(v)
  }
  

  return (
    <div>
    <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <Button text="vote" handleClick={vote} />
      <Button text="next anecdote" handleClick={newAnedctode} />

    <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App