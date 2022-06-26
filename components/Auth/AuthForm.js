import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('')
  const [enteredBirthPlace, setEnteredBirthPlace] = useState('')
  const [enteredDob, setEnteredDob] = useState('')
  const [enteredGender, setEnteredGender] = useState('')
  const [enteredPronouns, setEnteredPronouns] = useState('')
  const [enteredZodiac, setEnteredZodiac] = useState('')

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    username: usernameIsInvalid,
    phoneNumber: phoneNumberIsInvalid,
    birthPlace: birthPlaceIsInvalid,
    dob: dobIsInvalid,
    gender: genderIsInvalid,
    pronouns: pronounsIsInvalid,
    zodiac: zodiacIsInvalid, 
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
      case 'username':
        setEnteredUsername(enteredValue);
        break;
      case 'phoneNumber':
        setEnteredPhoneNumber(enteredValue);
        break;
      case 'birthPlace':
        setEnteredBirthPlace(enteredValue);
        break;
      case 'dob':
        setEnteredDob(enteredValue);
        break;
      case 'gender':
        setEnteredGender(enteredValue);
        break;
      case 'pronouns':
        setEnteredPronouns(enteredValue);
        break;
      case 'zodiac':
        setEnteredZodiac(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      username: enteredUsername,
      phoneNumber: enteredPhoneNumber,
      birthPlace: enteredBirthPlace,
      dob: enteredDob,
      gender: enteredGender,
      pronouns: enteredPronouns,
      zodiac: enteredZodiac,
      aboutMe: 'default',
      interest1: 'coffee',
      interest2: '90s',
      interest3: 'beer',
      currLocation: enteredBirthPlace,
      timeOfBirth: '00:00',
      notifications: true,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        {!isLogin && (
          <Input
            label="Username"
            onUpdateValue={updateInputValueHandler.bind(this, 'username')}
            value={enteredUsername}
            keyboardType="default"
            isInvalid={usernameIsInvalid}
          />
        )}
        {!isLogin && (
          <Input
            label="Phone Number"
            onUpdateValue={updateInputValueHandler.bind(this, 'phoneNumber')}
            value={enteredPhoneNumber}
            keyboardType="number-pad"
            isInvalid={phoneNumberIsInvalid}
          />
        )}
        {!isLogin && (
          <Input
            label="Place of Birth"
            onUpdateValue={updateInputValueHandler.bind(this, 'birthPlace')}
            value={enteredBirthPlace}
            keyboardType="default"
            isInvalid={birthPlaceIsInvalid}
          />
        )}
        {!isLogin && (
          <Input
            label="Date of Birth"
            onUpdateValue={updateInputValueHandler.bind(this, 'dob')}
            value={enteredDob}
            keyboardType="number-pad"
            isInvalid={dobIsInvalid}
          />
        )}
        {!isLogin && (
          <Input
            label="Gender"
            onUpdateValue={updateInputValueHandler.bind(this, 'gender')}
            value={enteredGender}
            keyboardType="default"
            isInvalid={genderIsInvalid}
          />
        )}
        {!isLogin && (
          <Input
            label="Pronouns"
            onUpdateValue={updateInputValueHandler.bind(this, 'pronouns')}
            value={enteredPronouns}
            keyboardType="default"
            isInvalid={pronounsIsInvalid}
          />
        )}
        {!isLogin && (
          <Input
            label="Zodiac"
            onUpdateValue={updateInputValueHandler.bind(this, 'zodiac')}
            value={enteredZodiac}
            keyboardType="default"
            isInvalid={zodiacIsInvalid}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});