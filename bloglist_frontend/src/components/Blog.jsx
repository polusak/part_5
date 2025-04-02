import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [user, setUser] = useState('')

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    if (blog.user !== undefined && blog.user !== null) {
      setUser(blog.user.name)
    } else {
      setUser('The blog does not include the name of who added it')
    } 
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


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
      
    } catch (error) {
      console.log(error)
    }
    return (
      <div>${blog.likes}</div>
    )
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}> 
        {blog.title} <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}> 
        {`${blog.title} `} <button onClick={() => setVisible(false)}>hide</button><br />
        {blog.author}<br />
        {blog.url}<br />
        {`${likes} `}<button onClick={() => addLike(blog)}>like</button><br />
        {user}<br />
      </div> 
    </div>
  )
}


export default Blog