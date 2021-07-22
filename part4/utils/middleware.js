const logger = require('./logger')
const config = require('./config')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {    
		return response.status(400).send({ error: 'malformatted id' })

	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })

	} else if (error.name === 'JsonWebTokenError') {
    	return response.status(401).json({ error: 'invalid token' })

  	} else {
		response.status(400).send({error: 'Unknown error'})
	}

	next(error)
}


const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer'))
		request.token = authorization.substring(7)
	else
  		request.token = null

	next()
}

const userExtractor = (request, response, next) => {
	const token = request.token

	const decodedToken = jwt.verify(token, config.SECRET)

	if (!token || !decodedToken.id)
		request.user = null
	else
		request.user = {
			username: decodedToken.username,
			id: decodedToken.id
		}

	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}