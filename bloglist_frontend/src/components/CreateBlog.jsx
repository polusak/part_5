import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = (params) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()
    if (params.handleCreation !== undefined) {
      try {
        params.handleCreation(title, author, url)
      } catch (error) {
        console.log(error)
      }
    } else {
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
      params.setMessage(`a new blog "${title}" by ${author} added`)
      params.setError(false)
      params.updateBlogs()
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
          params.setMessage(null)
        }, 5000)
      } catch (exception) {
        params.setMessage('Blog creation failed')
        params.setError(true)
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
          params.setMessage(null)
          params.setError(false)
        }, 5000)
      }
    }
  }
    return (
      <div>
        <h2>create new</h2>
      <form onSubmit={handleCreation}>
        <label>
          title: {' '}
            <input
            aria-label="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label><br />
        <label>
          author: {' '}
            <input
            aria-label="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label><br />
        <label>
          url: {' '}
            <input
            aria-label="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label><br />
        <button type="submit">create</button>
        <br />
        <br />
      </form>
      <button onClick={() => params.setCreationVisible(false)}>cancel</button>
      </div>
    )
  }

export default CreateBlog