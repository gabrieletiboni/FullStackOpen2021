const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
require('express-async-errors')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {
		logger.info('Connected to MongoDB')
	})
	.catch((error) => {
		logger.error('Error connecting to MongoDB', error.message)
	})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs/', blogsRouter)
app.use('/api/users/', usersRouter)
app.use('/api/login/', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app