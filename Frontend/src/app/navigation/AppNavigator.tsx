import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import LoginScreen from '../../features/auth/screens/LoginScreen';
import RegisterScreen from '../../features/auth/screens/RegisterScreen';
import { AuthUser } from '../../features/auth/auth.types';
import HomeScreen from '../../screens/HomeScreen';
import CharacterScreen from '../../screens/CharacterScreen';
import MealScreen from '../../screens/MealScreen';
import WorkoutScreen from '../../screens/WorkoutScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Character: undefined;
  Meal: undefined;
  Workout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Workout"
            options={{ title: 'Workout' }}
          >
            {() => (
              <WorkoutScreen
                user={user}
                onLogout={() => setUser(null)}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {({ navigation }) => (
                <LoginScreen
                  navigation={navigation}
                  onLogin={setUser}
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}