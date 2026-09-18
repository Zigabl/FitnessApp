import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthUser } from '../../features/auth/auth.types';

import HomeScreen from '../../screens/HomeScreen';
import CharacterScreen from '../../screens/CharacterScreen';
import MealScreen from '../../screens/MealScreen';
import WorkoutScreen from '../../screens/WorkoutScreen';
import MealDetailScreen from '../../screens/MealDetailScreen';
import WorkoutDetailScreen from '../../screens/WorkoutDetailScreen';

export type MainTabParamList = {
  Home: undefined;
  Character: undefined;
  Meal: undefined;
  Workout: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;

  MealDetail: {
    id: string;
  };
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

interface MainNavigatorProps {
  user: AuthUser;
  onLogout: () => void;
}

function MainTabs({
  user,
  onLogout,
}: MainNavigatorProps) {

  return (
    <Tab.Navigator>

      <Tab.Screen name="Home">
        {() => (
          <HomeScreen
            user={user}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Character">
        {() => (
          <CharacterScreen
            user={user}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Meal">
        {() => (
          <MealScreen
            user={user}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Workout">
        {() => (
          <WorkoutScreen
            user={user}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

export default function MainNavigator({
  user,
  onLogout,
}: MainNavigatorProps) {

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="MainTabs"
        options={{
          headerShown: false,
        }}
      >
        {() => (
          <MainTabs
            user={user}
            onLogout={onLogout}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{
          title: 'Meal details',
        }}
      />

      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{
          title: 'Workout details',
        }}
      />

    </Stack.Navigator>
  );
}