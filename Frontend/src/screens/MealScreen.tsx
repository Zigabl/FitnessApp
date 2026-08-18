import { AuthUser } from '../features/auth/auth.types';
import { logout } from '../features/auth/auth.api';
import { useState } from 'react';
import { api } from '../services/api';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface MealScreenProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function MealScreen({ user, onLogout }: MealScreenProps) {

  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleMealCreate() {
    setError('');
    setLoading(true);

    try {

      const response = await api.post(
        '/meal/create',
        {
          title,
          calories,
          protein
        }
      );

    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Meal</Text>
        <Text style={styles.subtitle}>Input your meal.</Text>

        <TextInput
          style={styles.input}
          placeholder="Meal title"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Amount of calories"
          value={calories}
          onChangeText={setCalories}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Proteins"
          value={protein}
          onChangeText={setProtein}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleMealCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirm</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hint}>
          Endpoint: POST localhost:3000/api/meal/create
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  error: {
    color: '#c62828',
    marginBottom: 12,
  },
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontSize: 13,
  },
});