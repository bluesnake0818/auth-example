import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
// import auth from '@react-native-firebase/auth';

function WelcomeScreen() {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  // const [fetchedMessage, setFetchedMesssage] = useState('')

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://react-native-course-3cceb-default-rtdb.firebaseio.com/message.json?auth=' +
  //         token
  //     )
  //     .then((response) => {
  //       setFetchedMesssage(response.data.email);
  //     });
  // }, [token]);
  const API_KEY = 'AIzaSyA4Yngj86Jb3PROOM5MkqCRARjBhLvnBA4'
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

  useEffect(() => {
    axios
      .post(url, {
        idToken: token 
      })
      .then((response) => {
        // setFetchedMesssage(response.data.users[0].localId)
        setUserId(response.data.users[0].localId)
        setUserEmail(response.data.users[0].email)
      });
  }, [token]);

  // console.log(fetchedMessage)

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      {/* <Text>{fetchedMessage}</Text> */}
      <Text>{userId}</Text>
      <Text>{userEmail}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});