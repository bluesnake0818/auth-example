import axios from 'axios';

const API_KEY = 'AIzaSyA4Yngj86Jb3PROOM5MkqCRARjBhLvnBA4'

export async function createUser(email, password) {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  );

  const data = response.data;

  return data
}

export async function login(email, password) {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  );

  const token = response.data.idToken;

  return token;
}

// async function authenticate(mode, email, password) {
//   const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

//   const response = await axios.post(url, {
//     email: email,
//     password: password,
//     returnSecureToken: true,
//   });

//   return response
// }

// export function createUser(email, password) {
//   return authenticate('signUp', email, password);
// }

// export function login(email, password) {
//   return authenticate('signInWithPassword', email, password);
// }