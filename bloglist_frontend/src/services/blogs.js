import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (blog) => {
  const response = await axios
    .get(`${baseUrl}/${blog.id}`)
  
  return response.data
}

const create = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const modify = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blogObject.id}`
  const response = await axios.put(url, blogObject, config)
  return response.data
}

export default { getAll, get, create, setToken, modify }