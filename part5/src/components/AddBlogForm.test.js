import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

let component
let handleAddBlog

beforeEach(() => {
  handleAddBlog = jest.fn()

  component = render(
    <AddBlogForm addBlog={handleAddBlog} />
  )
})

test('<AddBlogForm > calls submit with correct parameters', () => {

  const form = component.container.querySelector('form')

  const title = component.container.querySelector('#addBlogTitle')
  const author = component.container.querySelector('#addBlogAuthor')
  const url = component.container.querySelector('#addBlogUrl')

  fireEvent.change(title, {
    target: { value: 'testtitle' }
  })
  fireEvent.change(author, {
    target: { value: 'authortest' }
  })
  fireEvent.change(url, {
    target: { value: 'www.urltest.com' }
  })
  fireEvent.submit(form)

  console.log(handleAddBlog.mock.calls[0][0])

  const shouldBe = {
    title: 'testtitle',
    author: 'authortest',
    url: 'www.urltest.com'
  }

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0]).toEqual(shouldBe)

})
