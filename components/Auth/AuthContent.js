import { useState } from 'react';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    username: false,
    confirmEmail: false,
    confirmPassword: false,  
    phoneNumber: false, 
    birthPlace: false, 
    dob: false,
    gender: false, 
    pronouns: false, 
    zodiac: false, 

    // below editable after post-registration in profile
    aboutMe: true, 
    interest1: true, 
    interest2: true, 
    interest3: true, 
    currLocation: true, 
    timeOfBirth: true, 
    notifications: true, 
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  // validation & sign up request when form submit button is pressed

  function submitHandler(credentials) {
    let { 
      email, 
      confirmEmail, 
      password, 
      confirmPassword, 
      username,
      phoneNumber,
      birthPlace, 
      dob, 
      gender,
      pronouns,
      zodiac,
      aboutMe, 
      interest1,
      interest2,
      interest3, 
      currLocation,
      timeOfBirth,
      notifications,
    } = credentials;

    email = email.trim();
    password = password.trim();
    username = username.trim();
    phoneNumber = phoneNumber.trim();
    birthPlace = birthPlace.trim();
    dob = dob.trim();
    gender = gender.trim();
    pronouns = pronouns.trim();
    zodiac = zodiac.trim();
    aboutMe = aboutMe.trim();
    interest1 = interest1.trim();
    interest2 = interest2.trim();
    interest3 = interest3.trim();
    currLocation = currLocation.trim();
    timeOfBirth = timeOfBirth.trim();
    

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;
    const usernameIsValid = password.length > 1;
    const phoneNumberIsValid = phoneNumber.length > 1;
    const birthPlaceIsValid = birthPlace.length > 1;
    const dobIsValid = dob.length > 1;
    const genderIsValid = gender.length > 1;
    const pronounsIsValid = pronouns.length > 1;
    const zodiacIsValid = zodiac.length > 1;
    const aboutmeIsValid = aboutMe.length > 1;
    const interest1IsValid = interest1.length > 1;
    const interest2IsValid = interest2.length > 1;
    const interest3IsValid = interest3.length > 1;
    const currLocationIsValid = currLocation.length > 1;
    const timeOfBirthIsValid = timeOfBirth.length > 1;
    const notificationsIsValid = notifications !== null;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && 
        (
          !emailsAreEqual || 
          !passwordsAreEqual ||
          !usernameIsValid ||
          !phoneNumberIsValid ||
          !birthPlaceIsValid ||
          !dobIsValid ||
          !genderIsValid ||
          !pronounsIsValid ||
          !zodiacIsValid ||
          !aboutmeIsValid ||
          !interest1IsValid ||
          !interest2IsValid ||
          !interest3IsValid ||
          !currLocationIsValid ||
          !timeOfBirthIsValid ||
          !notificationsIsValid
        ) 
      )
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        username: !usernameIsValid,
        phoneNumber: !phoneNumberIsValid,
        birthPlace: !birthPlaceIsValid,
        dob: !dobIsValid,
        gender: !genderIsValid,
        pronouns: !pronounsIsValid,
        zodiac: !zodiacIsValid,
        aboutMe: !aboutmeIsValid,
        interest1: !interest1IsValid,
        interest2: !interest2IsValid,
        interest3: !interest3IsValid,
        currLocationIsValid: !currLocationIsValid,
        timeOfBirthIsValid: !timeOfBirthIsValid,
        notificationsIsValid: !notificationsIsValid,
      });
      return;
    }
    onAuthenticate({ 
      email, 
      password, 
      username, 
      phoneNumber, 
      birthPlace, 
      dob, 
      gender, 
      pronouns, 
      zodiac, 
      aboutMe, 
      interest1, 
      interest2, 
      interest3, 
      currLocation, 
      timeOfBirth, 
      notifications,
    });
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? 'Create a new user' : 'Log in instead'}
          </FlatButton>
        </View>
      </View>
    </ScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginVertical: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});