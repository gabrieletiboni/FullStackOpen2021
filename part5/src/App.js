import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ value: null, type: null })

  const addBlogFormRef = useRef()

  useEffect( () => {
    async function fetchData() {
      const allblogs = await blogService.getAll()
      setBlogs(allblogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const currUser = JSON.parse(loggedUserJSON)
      setUser(currUser)
      blogService.setToken(currUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const currUser = await loginService.login({
        username, password,
      })

      console.log('logged in:', currUser)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(currUser))
      blogService.setToken(currUser.token)
      setUser(currUser)
      setUsername('')
      setPassword('')

      setNotification({ value: 'Login successfull', type: 'success' })
      setTimeout(() => {setNotification({ value: null, type: null })}, 5000)
    } catch (exception) {

      setNotification({ value: 'invalid username or password', type: 'error' })
      setTimeout(() => {setNotification({ value: null, type: null })}, 5000)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            id='loginUsername'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id='loginPwd'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginFormButton">login</button>
      </form>
    )
  }

  const handleAddBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)

      console.log('added blog:', newBlog)

      addBlogFormRef.current.toggleVisibility()

      const freshBlogs = await blogService.getAll()
      setBlogs(freshBlogs)

      setNotification({ value: 'A new blog: '+ newBlog.title+' by '+newBlog.author+' added', type: 'success' })
      setTimeout(() => {setNotification({ value: null, type: null })}, 5000)
    } catch (exception) {
      setNotification({ value: 'Error while creating the blog: make sure to properly fill in every field', type: 'error' })
      setTimeout(() => {setNotification({ value: null, type: null })}, 5000)
    }
  }

  const likeBlog = async (id, blog) => {
    try {
      const newBlog = await blogService.update(id, blog)

      console.log('updated blog:', newBlog)

      setNotification({ value: 'Blog liked', type: 'success' })
      setTimeout(() => {setNotification({ value: null, type: null })}, 5000)

      return true
    } catch (exception) {
      setNotification({ value: 'Error while liking the blog', type: 'error' })
      setTimeout(() => {setNotification({ value: null, type: null })}, 5000)

      return false
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)

      const freshBlogs = await blogService.getAll()
      setBlogs(freshBlogs)

      setNotification({ value: 'Blog successfully deleted', type: 'success' })
      setTimeout(() => {setNotification({ value: null, type: null })}, 5000)
    } catch (exception) {
      setNotification({ value: 'Error while deleting the blog', type: 'error' })
      setTimeout(() => {setNotification({ value: null, type: null })}, 5000)
    }
  }

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel='Add new blog' ref={addBlogFormRef}>
        <AddBlogForm addBlog={handleAddBlog} />
      </Togglable>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.destroyToken()
    setUser(null)
  }

  const logoutForm = () => (<div style={{ marginTop: 25, marginBottom: 25 }}>Logout from the app <button onClick={handleLogout}>Logout</button></div>)

  const listOfBlogs = () => {
    return (
      <>
        <h2>blogs</h2>

        {
          blogs
            .sort( (a, b) => b.likes - a.likes )
            .map(blog => (<Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} /> ))
        }


      </>
    )
  }

  return (
    <div>
      <h1>Blog list web app</h1>
      <Notification not={notification} />

      {user === null && loginForm()}

      {user !== null && listOfBlogs()}

      {user !== null && addBlogForm()}

      {user !== null && logoutForm()}
    </div>
  )
}

export default App