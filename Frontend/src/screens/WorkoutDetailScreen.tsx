import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

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

  const navigation = useNavigation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { id } = route.params;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  function getImageUrl(imagePath: string) {
    return `http://localhost:3000/${imagePath.replace(/\\/g, '/')}`;
  }

  async function handleDelete() {
    try {
      setDeleting(true);

      await api.delete(`/workout/delete/${id}`);

      setShowDeleteModal(false);
      navigation.goBack();

    } catch (error) {
      console.error('Failed to delete workout:', error);
    } finally {
      setDeleting(false);
    }
  }

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

        {workout.imagePath && (
          <Image
            source={{
              uri: getImageUrl(workout.imagePath),
            }}
            style={styles.detailImage}
          />
        )}

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

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={styles.deleteButtonText}>
            Delete
          </Text>
        </TouchableOpacity>

      </View>

      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Delete workout?
            </Text>

            <Text style={styles.modalText}>
              Are you sure you want to delete "{workout.title}"?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.deleteButtonText}>
                    Delete
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

  detailImage: {
    width: '100%',
    height: 350,
    borderRadius: 16,
    marginBottom: spacing.lg,
    resizeMode: 'cover',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '90%',
    maxWidth: 450,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },

  modalText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },

  cancelButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  confirmDeleteButton: {
    backgroundColor: '#c62828',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
  },

  deleteButton: {
    marginTop: spacing.xl,
    alignSelf: 'flex-end',
    backgroundColor: '#c62828',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 10,
  },

  deleteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});