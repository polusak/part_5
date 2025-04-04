import { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Login = (params) => {
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      params.setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setError('true')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  return (
    <div>
        <h2>Log in to application</h2>
        <Notification error ={error} message={message} />
        <form onSubmit={handleLogin}>
        <div>
          username {' '}
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password {' '}
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
  )
}

Login.propTypes ={
  setUser: PropTypes.func.isRequired
}

export default Login