import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthUser } from '../features/auth/auth.types';
import { logout } from '../features/auth/auth.api';
import { useState } from 'react';

interface HomeScreenProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function HomeScreen({ user, onLogout }: HomeScreenProps) {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setError('');
    setLoading(true);

    try {
      await logout();
      onLogout();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Odjava ni uspela.';

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>


      <Text style={styles.title}>Prijavljen si!</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Odjava</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 32,
  },
  button: {
    width: '100%',
    maxWidth: 360,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
