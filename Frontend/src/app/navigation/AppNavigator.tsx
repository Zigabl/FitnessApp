import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import { AuthUser } from '../../features/auth/auth.types';
import HomeScreen from '../../screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" options={{ title: 'Domov' }}>
            {() => <HomeScreen user={user} onLogout={() => setUser(null)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" options={{ title: 'Prijava' }}>
            {() => <LoginScreen onLogin={setUser} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
