import React, { useState } from 'react'

const Title = ({value}) => (<h2>{value}</h2>)

const Button = ({text, handleClick}) => (
          <button onClick={handleClick}>{text}</button>
      )

const Display = ({value}) => (<p>{value}</p>)

const Statistic = ({text, value, ...rest}) => {

    if (rest.type === 'tableRow') {
      return (
        <tr>
        <td>{text}</td><td>{value}</td>
        </tr>)
    } else {
      return (
        <>
          <Display value={text + ' ' + value} />
        </>
      )
    }
}

const Statistics = ({feedbacks}) => {
    const [good, neutral, bad] = feedbacks

    const getTotal = () => good + neutral + bad
    const getAvg = () => (good - bad)/getTotal()
    const goodPercentage = () => 100*(good/getTotal()) + '%'  

    if (getTotal() === 0)
      return (
          <>
          <Title value="statistics" />
          <Display value="No feedback" />
          </>
        )

    else
      return (
          <>
            <Title value="statistics" />

            <table>
              <tbody>
            <Statistic text="good" value={good} type="tableRow" />
            <Statistic text="neutral" value={neutral} type="tableRow" />
            <Statistic text="bad" value={bad} type="tableRow" />

            <Statistic text="all" value={getTotal()} type="tableRow" />
            <Statistic text="average" value={getAvg()} type="tableRow" />
            <Statistic text="positive" value={goodPercentage()} type="tableRow" />
              </tbody>
            </table>
          </>
        )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title value="Give feedback" />

      <Button text="good" handleClick={() => setGood(good+1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral+1)} />
      <Button text="bad" handleClick={() => setBad(bad+1)} />

      <Statistics feedbacks={[good, neutral, bad]}/>
    </div>
  )
}

export default App