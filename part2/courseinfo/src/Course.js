import React from 'react'

const Header = ({ course }) => {
	return (
		<h2>{course.name}</h2>
	)
}

const Part = (props) => {
	return (
		<p>
			{props.part.name} {props.part.exercises}
		</p>    
	)
}

const Content = ({ course }) => {
	return (
		<div>
			{course.parts.map( (part) => <Part part={part} key={part.id} /> )}
		</div>
	)
}

const Total = ({ course }) => {

	const exercises = course.parts.map( (part) => part.exercises)
	const sumExercises = () => exercises.reduce((ex1, ex2) => ex1+ex2, 0)

	return(
		<p>Total number of exercises {sumExercises()}</p>
	) 
}

const Course = ({course}) => {

	return (
		<div>
	      <Header course={course} />
	      <Content course={course} />
	      <Total course={course} />
	    </div>
    )
}

export default Course