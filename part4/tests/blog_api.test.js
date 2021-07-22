const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '60f97af8b60997496a244591',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: '60f97af8b60991496a244591',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Michael Chan',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})


describe('Blogs tests with MongoDB test', ()  => {

  test('blogs are returned as json and are 3', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(3)

  })

  test('blogs return id instead of _id, _id undefined', async () => {
    const response = await api
      .get('/api/blogs')

      expect(response.body[0].id).toBeDefined()
      expect(response.body[0]._id).toBeUndefined()
  })

  test('blogs cannot be added by calling post if not authenticated', async () => {
    const new_post = {
        author: 'gabriele',
        title: 'my title',
        url: 'www.myurl.com',
        likes: 999
    }

    const insertedBlog = await api
      .post('/api/blogs')
      .send(new_post)
      .expect(401)
      .expect('Content-Type', /application\/json/)

  })

  test('blogs default likes are zero', async () => {

    const logResp = await api
      .post('/api/login')
      .send({username: 'root', password: 'sekret'})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = logResp.body.token

    const new_post = {
        author: 'root other blog',
        title: 'testtitle',
        url: 'www.myurl.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(new_post)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const response2 = await api
      .post('/api/blogs')
      .set('authorization', 'bearer '+token)
      .send(new_post)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      expect(response2.body.likes).toBeDefined()
      expect(response2.body.likes).toEqual(0)
      expect(response2.body.title).toContain('testtitle')
  })

  test('Missing title and url', async () => {
    const logResp = await api
      .post('/api/login')
      .send({username: 'root', password: 'sekret'})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = logResp.body.token

    const new_post = {
        author: 'alberto',
    }

    const response = await api
      .post('/api/blogs')
      .set('authorization', 'bearer '+token)
      .send(new_post)
      .expect(400)
  })

  test('Deletion of a blog', async () => {
    const logResp = await api
      .post('/api/login')
      .send({username: 'root', password: 'sekret'})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = logResp.body.token

    await api
      .delete('/api/blogs/5a422aa71b54a676234d17f8')
      .set('authorization', 'bearer '+token)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .set('authorization', 'bearer '+token)
      .expect(204)
  })

  test('Update of a blog', async () => {
    const logResp = await api
      .post('/api/login')
      .send({username: 'root', password: 'sekret'})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = logResp.body.token

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain('React patterns')

    const updatedBlog = {
        title: 'Node patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    }

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .set('authorization', 'bearer '+token)
      .send(updatedBlog)
      .expect(200)

    const response2 = await api.get('/api/blogs')
    const titles2 = response2.body.map(r => r.title)

    expect(titles2).not.toContain('React patterns')

  })
})


afterAll( async () => {
  mongoose.connection.close()
})