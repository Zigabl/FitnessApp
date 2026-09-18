import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { api } from '../services/api';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface Workout {
  _id: string;
  title: string;
  durationHours: number;
  notes: string;
  imagePath?: string;
  date?: date;
}

interface WorkoutDetailScreenProps {
  route: {
    params: {
      id: string;
    };
  };
}

export default function WorkoutDetailScreen({
  route,
}: WorkoutDetailScreenProps) {

  const { id } = route.params;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const response = await api.get(`/workout/get/${id}`);

        setWorkout(response.data.workout);
      } catch (error) {
        console.error('Failed to fetch workout:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          Workout could not be found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          {workout.title}
        </Text>

        <Text style={styles.subtitle}>
          Workout details
        </Text>

        <View style={styles.card}>

          <View style={styles.row}>
            <Text style={styles.label}>
              Duration
            </Text>

            <Text style={styles.value}>
              {workout.durationHours} h
            </Text>
          </View>

        </View>

        {workout.notes && (
          <View style={styles.notesCard}>
            <Text style={styles.notesTitle}>
              Notes
            </Text>

            <Text style={styles.notesText}>
              {workout.notes}
            </Text>
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    padding: spacing.xl,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  label: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },

  notesCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  notesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  notesText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  errorText: {
    color: colors.error,
    fontSize: 16,
  },
});