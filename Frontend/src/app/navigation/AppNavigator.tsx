import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import { AuthUser } from '../../features/auth/auth.types';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function AppNavigator() {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <NavigationContainer>
      {user ? (
        <MainNavigator
          user={user}
          onLogout={() => setUser(null)}
        />
      ) : (
        <AuthNavigator
          onLogin={setUser}
        />
      )}
    </NavigationContainer>
  );
}