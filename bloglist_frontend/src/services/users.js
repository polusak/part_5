import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const get = async (user) => {

  const response = await axios
    .get(`${baseUrl}/${user.id}`) 
  return response.data
}

export default { get }