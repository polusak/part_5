import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import userService from '../services/users'
import { decodeToken } from "react-jwt"
import './blog.css'

const Blog = (params) => {
  const [visible, setVisible] = useState(false)
  const [remove, setRemove] = useState(false)
  const [likes, setLikes] = useState(params.blog.likes)
  const [user, setUser] = useState('')

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideRemove = { display: remove ? 'none' : '' }
  const showRemove = { display: remove ? '' : 'none' }

  const blog = params.blog

  useEffect(() => {
    if (blog.user !== undefined && blog.user !== null) {
      setUser(blog.user.name)
    } else {
      setUser('The blog does not include the name of who added it')
    } 
  }, [])

  useEffect(() => {
    userService.get(blog.user)
      .then(response => {
        const blogUserId = response.id
        const loggedInUserId = decodeToken(params.loggedInUser.token).id
        if (blogUserId === loggedInUserId) {
          setRemove(true)
        } else {
          setRemove(false)
        }
      })

  }, [])


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService
          .remove(blog)
        params.updateBlogs()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const addLike = async (blog) => {
    if (params.addLike !== undefined) {
      try {
        params.addLike()
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const blogObject = {
          'title': blog.title,
          'author': blog.author,
          'url': blog.url,
          'user': blog.user,
          'likes':likes + 1,
          'id': blog.id
        }
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
  }

  return (
    <div key='main' style={blogStyle}>
      <div className='titleOnly' style={hideWhenVisible}> 
        {blog.title} <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div className='contentHiddenBehindButtonClick' style={showWhenVisible}> 
        {`${blog.title} `} <button onClick={() => setVisible(false)}>hide</button><br />
        {blog.author}<br />
        <div>{blog.url}<br /></div>
        <div>{`likes `}</div>
        <div className='inline'>
          <span>{`likes `}</span>
          <span className='likes'>{`${likes}`}</span>
          <span>{` `}</span>
          <button onClick={() => addLike(blog)}>like</button>
      </div>
        <br />  
        {user}<br /><br />
        <div style={hideRemove}></div>
        <div style={showRemove}>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      </div> 
    </div>
  )
}

export default Blog