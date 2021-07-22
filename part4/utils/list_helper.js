logger = require('./logger')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {

	if (blogs === undefined)
		return null

	const sum = (csum, item) => csum + item.likes

	return blogs.length > 0 ? blogs.reduce(sum, 0) : null

}

const favoriteBlog = (blogs) => {

	if (blogs === undefined || blogs.length === 0)
		return null

	const maxLikes = Math.max(...blogs.map(blog => blog.likes))

	const maxLikeBlog = blogs.find(blog => blog.likes === maxLikes)

	return {
		title: maxLikeBlog.title,
		author: maxLikeBlog.author,
		likes: maxLikeBlog.likes
	}
}

const authorWithMostBlogs = (blogs) => {

	if (blogs === undefined || blogs.length === 0)
		return null 

	const authors = blogs.map( (blog) => blog.author )

	if (authors === undefined || authors.length === 0)
    return null

  const updateAuthorCount = (acc, author) => {
    if (acc[author])
    	acc[author]++
   	else
   		acc[author] = 1

    return acc
  }

	const countBlogsByAuthor = authors.reduce(updateAuthorCount, {})

	logger.info(countBlogsByAuthor)

	let maxBlogs = 0
	let maxAuthor = null
	for (const [key, value] of Object.entries(countBlogsByAuthor)) {
		if (value > maxBlogs) {
			maxBlogs = value
			maxAuthor = key
		}
	}

	logger.info(maxBlogs, maxAuthor)

	return {
		author: maxAuthor,
		blogs: maxBlogs,
	}
}

const authorWithLargestLikes = (blogs) => {
	if (blogs === undefined || blogs.length === 0)
		return null

	const updateAuthorLikesCount = (acc, item) => {
	  if (acc[item.author])
	  	acc[item.author].likes += item.likes 
	 	else
	 		acc[item.author] = {likes: item.likes}

	  return acc
	}

	const countLikesByAuthor = blogs.reduce(updateAuthorLikesCount, {})

	let maxLikes = 0
	let maxAuthor = null
	for (const [key, value] of Object.entries(countLikesByAuthor)) {
		if (value.likes > maxLikes) {
			maxLikes = value.likes
			maxAuthor = key
		}
	}

	logger.info(maxLikes, maxAuthor)

	return {
		author: maxAuthor,
		likes: maxLikes,
	}


}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	authorWithMostBlogs,
	authorWithLargestLikes
}