import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { fetchUserProfiles } from '../util/http';

function WelcomeScreen() {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [fetchedUserProfiles, setFetchedUserProfiles] = useState([])
  // const [userProfile, setUserProfile] = useState({})

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const API_KEY = 'AIzaSyA4Yngj86Jb3PROOM5MkqCRARjBhLvnBA4'
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

  useEffect(() => {
    axios
      .post(url, {
        idToken: token 
      })
      .then((response) => {
        setUserId(response.data.users[0].localId)
        setUserEmail(response.data.users[0].email)
      });
  }, [token]);

  useEffect(() => {
    async function getUserProfiles() {
      const userProfiles = await fetchUserProfiles()
      setFetchedUserProfiles(userProfiles)
    }
    getUserProfiles()
  }, [])

  const userProfile = fetchedUserProfiles.filter((profile) => {
    return profile.uid === userId
  })

  

  // console.log(userId)
  // console.log(userProfile[0])

  // console.log(fetchedUserProfiles)

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{userId}</Text>
      <Text>{userEmail}</Text>
      <Text>{userProfile[0].aboutMe}</Text>
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