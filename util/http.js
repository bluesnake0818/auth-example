import axios from 'axios'

const BACKEND_URL = 'https://hangfive-react-native-default-rtdb.firebaseio.com'

export function storeUser(userData) {
  axios.post(
    BACKEND_URL + '/users.json',
    userData
  )
}

export async function fetchUserProfiles() {
  const response = await axios.get(BACKEND_URL + '/users.json')

  const users = [];

  for (const key in response.data) {
    const userObj = {
      id: key, 
      aboutMe: response.data[key].aboutMe, 
      birthPlace: response.data[key].birthPlace, 
      currLocation: response.data[key].currLocation, 
      dob: new Date(response.data[key].dob),
      email: response.data[key].email, 
      gender: response.data[key].gender,
      phoneNumber: response.data[key].phoneNumber, 
      pronouns: response.data[key].pronouns, 
      username: response.data[key].username,
      zodiac: response.data[key].zodiac,
      interest1: response.data[key].interest1,
      interest2: response.data[key].interest2,
      interest3: response.data[key].interest3, 
      notifications: response.data[key].notifications,
      password: response.data[key].password,
      timeOfBirth: response.data[key].timeOfBirth,
      uid: response.data[key].uid,
    }
    users.push(userObj)
  }

  return users;
}