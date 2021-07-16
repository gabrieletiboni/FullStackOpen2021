import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Number = ({name, number}) => {
    return (
        <span>{name} {number}</span>
      )
}

const Filter = ({value, onchangehandler}) => (
        <>
          Filter shown with <input value={value} onChange={onchangehandler} />
          </>
  )

const PersonForm = ({onsubmit, values, handlers}) => {
      const [newName, newNumber] = values
      const [changeInputHandler, changeNumberHandler] = handlers

      return (
          <form onSubmit={onsubmit}>
            <div>name: <input value={newName} onChange={changeInputHandler}/></div>
            <div>number: <input value={newNumber} onChange={changeNumberHandler} /></div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
        )
}

const Notification = ({not}) => {
  const {value, type} = not  
  if (value === null) return null

  const style = { 
    display: 'inline-block',
    padding: 10,
    color: (type == 'success' ? 'green' : 'red'),
    backgroundColor: (type == 'success' ? '#E8F5E9' : '#FFCDD2' ),
    fontSize: '.95rem'
  }

  return (
      <div style={{marginTop: 25}}>
        <span style={style}>{value}</span>
      </div>
    )
}

const Persons = ({persons, deleteHandler}) => (persons.map( (person) => <p key={person.id}><Number name={person.name} number={person.number} /> <Button value="Delete" handler={() => deleteHandler(person.name, person.id)} /><br/></p>))

const Button = ({value, handler}) => (<button onClick={handler}>{value}</button>)

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [notification, setNotification] = useState({value: null, type: null})

  const changeInputHandler = e => setNewName(e.target.value)
  const changeNumberHandler = e => setNewNumber(e.target.value)
  const changeFilter = e => setFilter(e.target.value)

  const filteredPersons = () => persons.filter ( person => person.name.includes(filter))

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const names = persons.map( (person) => person.name)

    if (newName === '')  {
      alert('Type a valid name')
      return false
    }

    const newP = {
      name: newName,
      number: newNumber
    }

    if (names.includes(newName)) {
      if(window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {

        let current_id = persons.find(person => person.name == newName).id

        personService.update(current_id, newP)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== current_id ? person : updatedPerson))
              setNewName('')
              setNewNumber('')
              setFilter('')

              setNotification({value: 'The number of '+newName+' has been correctly updated.', type: 'success'})
              setTimeout(() => {setNotification({value: null, type: null})}, 5000);
            })
            .catch( error => console.log('Error with updating a person', error))
      }
    } else {
      personService.create(newP)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
            setFilter('')

            setNotification({value: newName+' has been correctly added to the phonebook.', type: 'success'})
            setTimeout(() => {setNotification({value: null, type: null})}, 5000);
          })
          .catch( error => console.log('Error with creating a new person', error))
    }
  }

  const deleteHandler = (name, id) => {
    if (window.confirm("Delete "+name+"?")) {
      personService.delPerson(id)
        .then( deletedPerson => {
          console.log('Person deleted', deletedPerson)

          setPersons( persons.filter(person => person.id !== id))
          setNewName('')
          setNewNumber('')
          setFilter('')
        })
        .catch(error => {
            setNotification({value: 'Error while trying to delete '+name+' from the phonebook.', type: 'error'})
            setTimeout(() => {setNotification({value: null, type: null})}, 5000);
        })
    }    
  }

  const personsToShow = filter !== '' ? filteredPersons() : persons


  console.log('Rendering')

  const effect = () => {
    console.log('Calling the effect')

    axios
      .get('http://localhost:3001/persons')
      .then( response => {
          setPersons(response.data)
      })
  }
  useEffect(effect, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onchangehandler={changeFilter} />
      <br/>

      <h3>Add new</h3>
      <PersonForm onsubmit={onSubmitHandler} values={[newName, newNumber]} handlers={[changeInputHandler, changeNumberHandler]} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deleteHandler={deleteHandler} />

      <Notification not={notification} />
    </div>
  )
}

export default App