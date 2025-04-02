import { useState } from 'react'
import Blog from './Blog'
import Notification from './Notification'
import CreateBlog from './CreateBlog'

const LoggedIn = (params) => {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [creationVisible, setCreationVisible] = useState(false)

  const user = params.user
  const blogs = params.blogs
  const hideWhenVisible = { display: creationVisible ? 'none' : '' }
  const showWhenVisible = { display: creationVisible ? '' : 'none' }
  
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
        />
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} 
          blog={blog} 
          //visibility={visibility} 
        />
        
      )}
    </div>
  )
}

export default LoggedIn