import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';
import { storeUser } from '../util/http'

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password, username, phoneNumber, birthPlace, dob, gender, pronouns, zodiac, aboutMe, interest1, interest2, interest3, currLocation, timeOfBirth, notifications }) {
    setIsAuthenticating(true);
    try {
      const response = await createUser(email, password);
      const token = response.data.idToken;
      // const email = response.data.email;
      const uid = response.data.localId;
      console.log(uid)
      authCtx.authenticate(token);
      token && storeUser({ uid, email, password, username, phoneNumber, birthPlace, dob, gender, pronouns, zodiac, aboutMe, interest1, interest2, interest3, currLocation, timeOfBirth, notifications });
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;