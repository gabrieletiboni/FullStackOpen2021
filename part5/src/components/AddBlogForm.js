import React, { useState } from 'react'

const AddBlogForm = ({ addBlog }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleAddBlog = (e) => {
    e.preventDefault()

    addBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
            Title:
          <input
            id='addBlogTitle'
            type="text"
            value={blogTitle}
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
            Author:
          <input
            id='addBlogAuthor'
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
            Url:
          <input
            id='addBlogUrl'
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AddBlogForm