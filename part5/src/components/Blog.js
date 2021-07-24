import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeThisBlog = async () => {
    // likeBlog(blog)
    const newBlog = { ...blog, likes: currentLikes+1 }
    delete newBlog.id

    const response = await likeBlog(blog.id, newBlog)

    if (response === true)
      setCurrentLikes(currentLikes+1)
  }

  const deleteThisBlog = () => {
    if (window.confirm('Are you sure you want to DELETE this blog permanently?'))
      deleteBlog(blog.id)
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <span className='blogTitle'>{blog.title}</span> <button onClick={toggleVisibility}>hide</button><br/>
        <span className='blogUrl'>{blog.url}</span><br/>
        <span className='blogLikes'>likes {currentLikes}</span> <button className='likeButton' onClick={likeThisBlog}>like</button><br/>
        <span className='blogAuthor'>{blog.author}</span>
        {blog.user && blog.user.username && user.username === blog.user.username && (
          <button onClick={deleteThisBlog}>Delete blog</button>
        )}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <span className='blogTitle'>{blog.title}</span> <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default Blog