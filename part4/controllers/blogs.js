const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const config = require('../utils/config')
const middleware = require('../utils/middleware')
require('express-async-errors')


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user')
	response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
	Blog.findById(request.params.id)
		.then(blog => {
			if (blog)
				response.json(blog)
			else
				response.status(404).send({error: 'Blog not found'})
		})
		.catch(error => next(error))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {

	const user = request.user
	if (user == null || !user.id)
		return response.status(401).json({ error: 'token missing or invalid' })

	const blog = new Blog({...request.body, likes: (request.body.likes ? request.body.likes : 0), user: user.id})

	const result = await blog.save()
	response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

	const user = request.user

	if (user == null || !user.id)
		return response.status(401).json({ error: 'token missing or invalid' })

	const blogToBeDeleted = await Blog.findById(request.params.id)
	
	if (blogToBeDeleted.user.toString() !== user.id)
		return response.status(401).send({error: 'deletion not allowed for this user'})

	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
	const user = request.user

	if (user == null || !user.id)
		return response.status(401).json({ error: 'token missing or invalid' })

	const blog = {...request.body, likes: (request.body.likes ? request.body.likes : 0), user: user.id}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { context: 'query', runValidators: true, new: true  })

	response.json(updatedBlog)
})


module.exports = blogsRouter