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
      const data = await createUser(email, password);
      const token = await data.idToken;
      const uid = await data.localId;
      authCtx.authenticate(token);
      storeUser({ uid, email, password, username, phoneNumber, birthPlace, dob, gender, pronouns, zodiac, aboutMe, interest1, interest2, interest3, currLocation, timeOfBirth, notifications });
    } catch (error)
      {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;