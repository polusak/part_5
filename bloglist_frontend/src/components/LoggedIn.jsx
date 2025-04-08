import { useState, useEffect } from 'react'
import Blog from './Blog'
import Notification from './Notification'
import CreateBlog from './CreateBlog'
import blogService from '../services/blogs'

const LoggedIn = (params) => {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [creationVisible, setCreationVisible] = useState(false)
  const [blogs, setBlogs] = useState([])

  const updateBlogs = async () => {
    const updatedblogs = await blogService.getAll()
    const blogCompar = (a, b) => {
      if (a.likes < b.likes) {
        return 1
      }
      if (b.likes < a.likes) {  
        return -1
      }
      return 0
    }
    setBlogs( updatedblogs.sort(blogCompar) )
  }

  useEffect(() => {
    updateBlogs()
  
  }, [])

  const user = params.user
  const hideWhenVisible = { display: creationVisible ? 'none' : '' }
  const showWhenVisible = { display: creationVisible ? '' : 'none' }

  const addLike = async (blog) => {
    const blogObject = {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'user': blog.user,
      'likes':likes + 1,
      'id': blog.id
    }

    try {
      const response = await blogService
        .modify(blogObject)
      setLikes(response.likes)
      params.updateBlogs()
    } catch (error) {
      console.log(error)
    }
    return (
      <div>${blog.likes}</div>
    )
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
          setCreationVisible={setCreationVisible}
          setMessage={setMessage}
          setError={setError}
          setBlogs={params.setBlogs}
          updateBlogs={updateBlogs}
        />
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} 
          blog={blog} 
          updateBlogs={updateBlogs}
          loggedInUser={user}
        />
      )}
    </div>
  )
}

export default LoggedIn