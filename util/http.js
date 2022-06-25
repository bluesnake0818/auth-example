import axios from 'axios'

const BACKEND_URL = 'https://hangfive-react-native-default-rtdb.firebaseio.com'

export function storeUser(userData) {
  axios.post(
    BACKEND_URL + '/users.json',
    userData
  )
}

export async function fetchUsers() {
  const response = await axios.get(BACKEND_URL + '/users.json')

  const users = [];

  for (const key in response.data) {
    const userObj = {
      id: key, 
      birthPlace: response.data[key].birthPlace, 
      dob: new Date(response.data[key].dob),
      email: response.data[key].email, 
      gender: response.data[key].gender,
      phoneNumber: response.data[key].phoneNumber, 
      pronouns: response.data[key].pronouns, 
      username: response.data[key].username,
      zodiac: response.data[key].zodiac,
    }
    users.push(userObj)
  }

  return users;
}