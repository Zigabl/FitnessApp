import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen';
import MealScreen from '../../screens/MealScreen';
import WorkoutScreen from '../../screens/WorkoutScreen';
import CharacterScreen from '../../screens/CharacterScreen';
import { AuthUser } from '../../features/auth/auth.types';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export type MainTabParamList = {
  Home: undefined;
  Character: undefined;
  Meal: undefined;
  Workout: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

interface MainNavigatorProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function MainNavigator({
  user,
  onLogout,
}: MainNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primaryLight,
          borderTopColor: colors.border,
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,

        headerStyle: {
          backgroundColor: colors.primary,
        },

        headerTintColor: colors.background,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{ title: 'Home' }}
      >
        {() => (
          <HomeScreen
            user={user}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Character"
        component={CharacterScreen}
        options={{ title: 'Character' }}
      />

      <Tab.Screen
        name="Meal"
        component={MealScreen}
        options={{ title: 'Meals' }}
      />

      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{ title: 'Workout' }}
      />
    </Tab.Navigator>
  );
}