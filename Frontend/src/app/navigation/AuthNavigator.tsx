import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../features/auth/screens/LoginScreen';
import RegisterScreen from '../../features/auth/screens/RegisterScreen';
import { AuthUser } from '../../features/auth/auth.types';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthNavigatorProps {
  onLogin: (user: AuthUser) => void;
}

export default function AuthNavigator({
  onLogin,
}: AuthNavigatorProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ title: 'Login' }}
      >
        {({ navigation }) => (
          <LoginScreen
            navigation={navigation}
            onLogin={onLogin}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Register"
        options={{ title: 'Registration' }}
      >
        {({ navigation }) => (
          <RegisterScreen
            navigation={navigation}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}