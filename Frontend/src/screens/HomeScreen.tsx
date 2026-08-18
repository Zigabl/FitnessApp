import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthUser } from '../features/auth/auth.types';

interface HomeScreenProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function HomeScreen({ user, onLogout }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prijavljen si!</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.button} onPress={onLogout}>
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
