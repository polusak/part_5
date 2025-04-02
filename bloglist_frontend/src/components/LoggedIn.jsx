import { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from './Notification'
import CreateBlog from './CreateBlog'

const LoggedIn = (params) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [creationVisible, setCreationVisible] = useState(false)

  const user = params.user
  const blogs = params.blogs
  const hideWhenVisible = { display: creationVisible ? 'none' : '' }
  const showWhenVisible = { display: creationVisible ? '' : 'none' }

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
    setMessage(`a new blog "${title}" by ${author} added`)
    setError(false)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Blog creation failed')
      setError(true)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification error={error} message={message} />
      {`${user.name} logged in `} 
      <button onClick={params.handleLogout}>logout</button>
      <br />
      <br />
      <div style={hideWhenVisible}>
        <button onClick={() => setCreationVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <CreateBlog 
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          handleCreation={handleCreation}
          setCreationVisible={setCreationVisible}
        />
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LoggedIn