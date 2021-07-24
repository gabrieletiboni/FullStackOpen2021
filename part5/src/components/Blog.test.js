import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
let likeBlog
let deleteBlog

const blog = {
  title: 'blog title test',
  author: 'test author',
  url: 'someurl.com',
  likes: 10
}

const user = {
  token: 'sometoken',
  username: 'someusername',
  name: 'somename'
}

beforeEach(() => {
  likeBlog = jest.fn()
  deleteBlog = jest.fn()

  component = render(
    <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
  )
})

test('<Blog > renders correctly with no details', () => {

  const title = component.container.querySelector('.blogTitle')
  expect(title).toBeDefined()
  expect(title).toHaveTextContent('blog title test')

  const author = component.container.querySelector('.blogAuthor')
  const url = component.container.querySelector('.blogUrl')
  const likes = component.container.querySelector('.blogLikes')

  expect(author).toBeNull()
  expect(url).toBeNull()
  expect(likes).toBeNull()

})

test('Blog renders details on view click', () => {

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const author = component.container.querySelector('.blogAuthor')
  const url = component.container.querySelector('.blogUrl')
  const likes = component.container.querySelector('.blogLikes')

  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('Blog responds to the like function twice', () => {
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)


  expect(likeBlog.mock.calls).toHaveLength(2)
})

