import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        {`${blog.likes} `}<button onClick={() => addLike(blog)}>like</button><br />
        {blog.name}<br />
      </div>
    </div>
  )
}


export default Blog