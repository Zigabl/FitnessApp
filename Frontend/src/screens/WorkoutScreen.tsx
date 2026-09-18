import { AuthUser } from '../features/auth/auth.types';
import { logout } from '../features/auth/auth.api';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import * as ImagePicker from 'expo-image-picker';
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
  Image,
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
  imagePath: string;
  //date?: Date;
}

interface WorkoutScreenProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function WorkoutScreen({
  user,
  onLogout,
}: WorkoutScreenProps) {

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigation = useNavigation<WorkoutNavigationProp>();

  const [title, setTitle] = useState('');
  const [durationHours, setDurationHours] = useState('');
  const [notes, setNotes] = useState('');

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setImageUri(asset.uri);
      setImageName(asset.fileName ?? 'workout-image.jpg');

      if (asset.file) {
        setImageFile(asset.file);
      }
    }
  }

  function getImageUrl(imagePath: string) {
    return `http://localhost:3000/${imagePath.replace(/\\/g, '/')}`;
  }

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
      const formData = new FormData();

      formData.append(
        'workout',
        JSON.stringify({
          title,
          durationHours,
          notes,
        })
      );

      if (imageFile) {
        formData.append(
          'workoutImage',
          imageFile
        );
      }

      await api.post('/workout/create', formData);

      setTitle('');
      setDurationHours('');
      setNotes('');
      setImageUri(null);
      setImageName(null);
      setImageFile(null);

      await fetchWorkouts();

    } catch (error) {
      console.error('Workout creation failed:', error);
      setError('Workout could not be created.');
    } finally {
      setLoading(false);
    }
  }

  function renderWorkout({ item }: { item: Workout }) {
    return (
      <TouchableOpacity
        style={styles.workoutCard}
        onPress={() => {
          navigation.navigate('WorkoutDetail', {
            id: item._id,
          });
        }}
      >
        <View style={styles.workoutCardContent}>

          {/* INFORMATION - approximately 2/3 of the card */}
          <View style={styles.workoutInfoContainer}>
            <Text style={styles.workoutTitle}>
              {item.title}
            </Text>

            <Text style={styles.workoutInfo}>
              Duration hours: {item.durationHours} h
            </Text>

            <Text style={styles.workoutInfo}>
              Note: {item.notes}
            </Text>
          </View>

          {/* IMAGE - approximately 1/3 of the card */}
          <View style={styles.workoutImageContainer}>
            {item.imagePath ? (
              <Image
                source={{
                  uri: getImageUrl(item.imagePath),
                }}
                style={styles.workoutImage}
              />
            ) : (
              <View style={styles.noImage}>
                <Text style={styles.noImageText}>
                  No image
                </Text>
              </View>
            )}
          </View>

        </View>
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
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Amount of hours"
              value={durationHours}
              onChangeText={setDurationHours}
              keyboardType="numeric"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Notes"
              value={notes}
              onChangeText={setNotes}
              editable={!loading}
            />

            <TouchableOpacity
              style={styles.imageButton}
              onPress={pickImage}
              disabled={loading}
            >
              <Text style={styles.imageButtonText}>
                {imageUri ? 'Change image' : 'Choose image'}
              </Text>
            </TouchableOpacity>

            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.previewImage}
              />
            )}

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

  workoutCardContent: {
    flexDirection: 'row',
  },

  workoutImageContainer: {
    width: '33%',
    height: 120,
    marginRight: spacing.md,
  },

  workoutImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },

  noImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noImageText: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  workoutInfoContainer: {
    flex: 1,
    justifyContent: 'center',
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

  imageButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  imageButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
});
