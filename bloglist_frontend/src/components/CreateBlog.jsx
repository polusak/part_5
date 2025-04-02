import './notification.css'

const Notification = (params) => {
  const title = params.title
  const author = params.author
  const url = params.url


    return (
      <div>
        <h2>create new</h2>
      <form onSubmit={params.handleCreation}>
        <div>
          title: {' '}
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => params.setTitle(target.value)}
          />
        </div>
        <div>
          author: {' '}
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => params.setAuthor(target.value)}
          />
        </div>
        <div>
          url: {' '}
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => params.setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
        <br />
        <br />
      </form>
      <button onClick={() => params.setCreationVisible(false)}>cancel</button>
      </div>
    )
  }

export default Notification