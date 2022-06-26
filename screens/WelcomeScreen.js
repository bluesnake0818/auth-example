import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
// import auth from '@react-native-firebase/auth';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesssage] = useState('fetched');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        'https://react-native-course-3cceb-default-rtdb.firebaseio.com/message.json?auth=' +
          token
      )
      .then((response) => {
        setFetchedMesssage(response.data);
      });
  }, [token]);

  // console.log(token)

  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://react-native-course-3cceb-default-rtdb.firebaseio.com/message.json?auth=' +
  //         token
  //     )
  //     .then((response) => {
  //       setFetchedMesssage(response.data);
  //     });
  // }, [token]);

  // const uid = auth.getCurrentUser().getUid();
  // const user = auth().currentUser;

  // if (user) {
  // console.log('User email: ', user.email);
  // }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
      <Text>{token}</Text>
      {/* <Text>{user.email}</Text> */}
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