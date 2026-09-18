import { AuthUser } from '../features/auth/auth.types';
import { logout } from '../features/auth/auth.api';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  MainStackParamList,
} from '../app/navigation/MainNavigator';

type WorkoutNavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface Workout {
  _id: string;
  title: string;
  durationHours: number;
  notes: string;
  //imagePath?: string;
  //date?: date;
}

export default function WorkoutScreen({
  user,
  onLogout,
}: WorkoutScreenProps) {

  const navigation = useNavigation<WorkoutNavigationProp>();

  const [title, setTitle] = useState('');
  const [durationHours, setDurationHours] = useState('');
  const [notes, setNotes] = useState('');

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchWorkouts() {
    try {
      setLoadingWorkouts(true);

      const response = await api.get('/workout/all');

      setWorkouts(response.data.workouts);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
      setError('Could not load workouts.');
    } finally {
      setLoadingWorkouts(false);
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function handleWorkoutCreate() {
    setError('');
    setLoading(true);

    try {
      await api.post('/workout/create', {
        title,
        durationHours,
        notes,
      });

      setTitle('');
      setDurationHours('');
      setNotes('');

      await fetchWorkouts();

    } catch (error) {
      console.error(error);
      setError('Workout could not be created.');
    } finally {
      setLoading(false);
    }
  }

  function renderWorkout({ item }: { item: Workout }) {
    return (
      <TouchableOpacity style={styles.workoutCard}
        onPress={() => {
          navigation.navigate('WorkoutDetail', {
            id: item._id,
          });
        }}
      >
        <Text style={styles.workoutTitle}>
          {item.title}
        </Text>

        <Text style={styles.workoutInfo}>
          Duration hours: {item.durationHours} h
        </Text>

        <Text style={styles.workoutInfo}>
          Note: {item.notes}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Workouts
        </Text>
        <Text style={styles.subtitle}>
          View and add your workouts.
        </Text>
        <View style={styles.mainContent}>

          {/* LEFT - MEAL LIST */}
          <View style={styles.listSection}>

            <Text style={styles.sectionTitle}>
              Your workouts
            </Text>

            {loadingWorkouts ? (
              <ActivityIndicator size="large" />
            ) : workouts.length === 0 ? (
              <Text style={styles.emptyText}>
                You don't have any workouts yet.
              </Text>
            ) : (
              <FlatList
                data={workouts}
                keyExtractor={(item) => item._id}
                renderItem={renderWorkout}
                showsVerticalScrollIndicator={true}
              />
            )}
          </View>

          {/* RIGHT - FORM */}
          <View style={styles.formSection}>

            <Text style={styles.sectionTitle}>
              Add a workout
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Workout title"
              value={title}
              onChangeText={setTitle}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Amount of hours"
              value={durationHours}
              onChangeText={setDurationHours}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Notes"
              value={notes}
              onChangeText={setNotes}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            {error ? (
              <Text style={styles.error}>
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleWorkoutCreate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    padding: spacing.lg,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },

  mainContent: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.xl,
  },

  listSection: {
    flex: 1,
    minWidth: 0,
  },

  formSection: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },

  workoutCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  workoutInfo: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },

  emptyText: {
    color: colors.textSecondary,
    fontSize: 15,
  },

  input: {
    height: 50,
    borderWidth: 2,
    color: colors.text,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: spacing.md,
    fontSize: 16,
  },

  error: {
    color: colors.error,
    marginBottom: spacing.md,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  buttonDisabled: {
    opacity: 0.6,
  },
});
