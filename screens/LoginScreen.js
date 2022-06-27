import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

// if (global.__fbBatchedBridge) {
//   const origMessageQueue = global.__fbBatchedBridge;
//   const modules = origMessageQueue._remoteModuleTable;
//   const methods = origMessageQueue._remoteMethodTable;
//   global.findModuleByModuleAndMethodIds = (moduleId, methodId) => {
//     console.log(`The problematic line code is in: ${modules[moduleId]}.${methods[moduleId][methodId]}`)
//   }
// }

// global.findModuleByModuleAndMethodIds(39, 1);
// global.findModuleByModuleAndMethodIds(139, 0);


function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      console.log(token)
      authCtx.authenticate(token);
    } catch (error) {
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
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;