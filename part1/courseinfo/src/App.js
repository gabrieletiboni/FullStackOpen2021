import React from 'react'

const Header = (props) => (
          <>
            <h1>{props.course}</h1>
          </>
)

const Part = (props) => (
    <>
      <p>
          {props.name} {props.exnum}
      </p>
    </>
)

const Content = (props) => {
    return (
      <>
        <Part name={props.data.part1} exnum={props.data.ex1} />
        <Part name={props.data.part2} exnum={props.data.ex2} />
        <Part name={props.data.part3} exnum={props.data.ex3} />
      </>
    )
}

const Total = (props)  => (
      <>
        <p>Number of exercises {props.tot}</p>
      </>
      )

const App = () => {
  const course = 'Half Stack application development'
  const data = {
      part1: 'Fundamentals of React',
      ex1: 10,
      part2: 'Using props to pass data',
      ex2: 7,
      part3: 'State of a component',
      ex3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content data={data} />
      <Total tot={data.ex1 + data.ex2 + data.ex3} />
    </div>
  )
}

export default App


