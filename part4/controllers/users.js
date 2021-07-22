const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('express-async-errors')

usersRouter.get('/', async (request, response, next) => {
	const users = await User.find({}).populate('blogs')
	response.json(users)
})

/* usersRouter.get('/:id', async (request, response, next) => {
	const user = await User.findById(request.params.id)
	
	if (user)
		response.json(user)
	else
		response.status(404).send({error: 'User not found'})	
}) */

usersRouter.post('/', async (request, response, next) => {
	const body = {...request.body, name: (request.body.name ? request.body.name : '')}

	const saltRounds = 10

	if (!request.body.password || request.body.password === '')
		response.status(400).send({error: 'password is missing'})

	if (request.body.password.length < 3)
		response.status(400).send({error: 'password must be at least 3 characters long'})

	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash: passwordHash,
	})

	const savedUser = await user.save()

	response.json(savedUser)
})

/* usersRouter.delete('/:id', async (request, response, next) => {

	await User.findByIdAndRemove(request.params.id)
	response.status(204).end()
}) */

/* usersRouter.put('/:id', async (request, response, next) => {
	const user = {...request.body, likes: (request.body.likes ? request.body.likes : 0)}

	const updatedUser = await User.findByIdAndUpdate(request.params.id, blog, { context: 'query', runValidators: true, new: true  })

	response.json(updatedUser)
}) */


module.exports = usersRouter