import { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from './Notification'

const LoggedIn = (params) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const user = params.user
  const blogs = params.blogs

  const handleCreation = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title,
        author,
        url
      }

    
    await blogService
      .create(blogObject)
    const blogs = await blogService.getAll()
    params.setBlogs(blogs)
    setTitle('')
    setAuthor('')
    setUrl('')
    } catch (exception) {
      setErrorMessage('Blog creation failed')
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {`${user.name} logged in `} 
      <button onClick={params.handleLogout}>logout</button>
      
      <h2>create new</h2>
      <form onSubmit={handleCreation}>
        <div>
          title: {' '}
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: {' '}
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: {' '}
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

      <br />
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LoggedIn