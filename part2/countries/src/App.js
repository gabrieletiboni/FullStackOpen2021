import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Search = ({value, onchangehandler}) => {


	return (
		<>
			Find countries: <input value={value} onChange={onchangehandler} />
		</>
		)
}

const Countries = ({countriesobj}) => {

	return (
		<>
			{countriesobj.map( countryobj => <p key={countryobj.country.name}>{countryobj.country.name} <button onClick={countryobj.handler}>Show</button></p>)}
		</>
		)

}


const Languages = ({country}) => {
	return (
		<>
			<h4>Languages</h4>
			<ul>
				{country.languages.map ( language => <li key={language.name}>{language.name}</li>)}
			</ul>
		</>
	)
}

const Flag = ({svg}) => <img src={svg} width="100" alt="flag"/>

const CountryInfo = ({country}) => {

	console.log('Country info', country.name)
	return (
			<div>
				<h3>{country.name}</h3>

				<p>Capital {country.capital}</p>
				<p>population {country.population}</p>

				<Languages country={country} />

				<Flag svg={country.flag} />

				<Weather countryname={country.name} />
			</div>
		)
}

const Weather = ({countryname}) => {

	const [weather, setWeather] = useState([])

	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY
		axios
			.get("http://api.weatherstack.com/current?access_key="+api_key+"&query="+countryname)
	    	.then( response => {
	    			setWeather(response.data)
	    		})
	}, [])

	if (weather.length !== 0) {
		console.log(weather)

		return (
			<>
				<h3>Weather in {countryname}</h3>

				<b>Temperature</b> {weather.current.temperature} Celsius
				<br/>
				<img src={weather.current.weather_icons[0]} width="100"/>
				<br/>
				<b>Wind speed</b> {weather.current.wind_speed} km/h direction {weather.current.wind_dir}
			</>
			)
	} else return (<></>)
}


function App() {
	
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')

	const [focusOnCountry, setFocusOnCountry] = useState(false)
	const [shownCountry, setShownCountry] = useState('')

	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
	    	.then( response => setCountries(response.data))
	}, [])


	const onSearchChange = e => {
						setSearch(e.target.value)
						setFocusOnCountry(false)
						setShownCountry('')
					}

	const getFilteredCountries = () => {
		let cCountries = []

		if (search !== '')
			cCountries = countries.filter( country => country.name.toLowerCase().includes(search.toLowerCase()))
		
		let finalList = []
		cCountries.forEach( (c, i) => {
			const newObj = {
				country: c,
				handler: () => {
					setFocusOnCountry(true)
					setShownCountry(c.name.toLowerCase())
					console.log('Setting shown country', c.name.toLowerCase())
				}
			}
			finalList.push(newObj)
		})

		return finalList
	}
	

	const filteredCountries = getFilteredCountries()

	const searchComponent = <Search value={search} onchangehandler={onSearchChange} />

	if (focusOnCountry === true) {
		// console.log(countries)
		// focusedCountry = countries.filter ( country => country.name.toLowerCase() == shownCountry)[0]
		// focusedCountry = countries.filter( country => country.name.toLowerCase().includes(search.toLowerCase()))
		
		let focusedCountry = countries.filter( c => c.name.toLowerCase() === shownCountry )[0]

		return (
			<>
				{searchComponent}
				<CountryInfo country={focusedCountry} />
			</>
			)

	} else {
		if (filteredCountries.length === 1) {
			return (
				<>
					{searchComponent}
					<CountryInfo country={filteredCountries[0].country} />
				</>
			)
		} else {

			if (filteredCountries.length > 10) {
				return (
					<>
						{searchComponent}
						<br />
						Too many matches, specify another filter
					</>
					)
			} else {
				return (
					<>
						{searchComponent}
						<Countries countriesobj={filteredCountries} />
					</>
				)
			}
		}
	}
}

export default App;
