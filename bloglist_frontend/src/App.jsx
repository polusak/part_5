import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import LoggedIn from './components/LoggedIn'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <LoginForm 
          user={user}
          setUser={setUser}
        />
      </div>
    )
  }

  return (
    <div>
      <LoggedIn 
        user={user}
        blogs= {blogs}
        handleLogout={handleLogout}
        setBlogs={setBlogs}
      />
    </div>
  )
}

export default App