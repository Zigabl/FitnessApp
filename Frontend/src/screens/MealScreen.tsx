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

type MealNavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface Meal {
  _id: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  notes: string;
  //imagePath?: string;
}

interface MealScreenProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function MealScreen({
  user,
  onLogout,
}: MealScreenProps) {

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigation = useNavigation<MealNavigationProp>();

  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [notes, setNotes] = useState('');

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

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
      setImageName(asset.fileName ?? 'meal-image.jpg');

      if (asset.file) {
        setImageFile(asset.file);
      }
    }
  }

  function getImageUrl(imagePath: string) {
    return `http://localhost:3000/${imagePath.replace(/\\/g, '/')}`;
  }

  async function fetchMeals() {
    try {
      setLoadingMeals(true);

      const response = await api.get('/meal/all-me');

      setMeals(response.data.meals);
    } catch (error) {
      console.error('Failed to fetch meals:', error);
      setError('Could not load meals.');
    } finally {
      setLoadingMeals(false);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  async function handleMealCreate() {
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        'meal',
        JSON.stringify({
          title,
          calories,
          protein,
          carbs,
          fats,
          notes,
        })
      );

      if (imageFile) {
        formData.append(
          'mealImage',
          imageFile
        );
      }

      await api.post('/meal/create', formData);

      setTitle('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
      setNotes('');
      setImageUri(null);
      setImageName(null);
      setImageFile(null);

      await fetchMeals();

    } catch (error) {
      console.error('Meal creation failed:', error);
      setError('Meal could not be created.');
    } finally {
      setLoading(false);
    }
  }

  function renderMeal({ item }: { item: Meal }) {
    return (
      <TouchableOpacity style={styles.mealCard}
        onPress={() => {
          navigation.navigate('MealDetail', {
            id: item._id,
          });
        }}
      >

        <View style={styles.mealCardContent}>

          {/* INFORMATION - approximately 2/3 of the card */}
          <View style={styles.mealInfoContainer}>
            <Text style={styles.mealTitle}>
              {item.title}
            </Text>

            <Text style={styles.mealInfo}>
              Calories: {item.calories} kcal
            </Text>

            <Text style={styles.mealInfo}>
              Protein: {item.protein} g
            </Text>

            <Text style={styles.mealInfo}>
              Carbs: {item.carbs} g
            </Text>

            <Text style={styles.mealInfo}>
              Fats: {item.fats} g
            </Text>

            <Text style={styles.mealInfo}>
              Note: {item.notes}
            </Text>
          </View>

          {/* IMAGE - approximately 1/3 of the card */}
          <View style={styles.mealImageContainer}>
            {item.imagePath ? (
              <Image
                source={{
                  uri: getImageUrl(item.imagePath),
                }}
                style={styles.mealImage}
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
          Meals
        </Text>
        <Text style={styles.subtitle}>
          View and add your meals.
        </Text>
        <View style={styles.mainContent}>

          {/* LEFT - MEAL LIST */}
          <View style={styles.listSection}>

            <Text style={styles.sectionTitle}>
              Your meals
            </Text>

            {loadingMeals ? (
              <ActivityIndicator size="large" />
            ) : meals.length === 0 ? (
              <Text style={styles.emptyText}>
                You don't have any meals yet.
              </Text>
            ) : (
              <FlatList
                data={meals}
                keyExtractor={(item) => item._id}
                renderItem={renderMeal}
                showsVerticalScrollIndicator={true}
              />
            )}
          </View>

          {/* RIGHT - FORM */}
          <View style={styles.formSection}>

            <Text style={styles.sectionTitle}>
              Add a meal
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Meal title"
              value={title}
              onChangeText={setTitle}
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Amount of calories"
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Protein"
              value={protein}
              onChangeText={setProtein}
              keyboardType="numeric"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Carbs"
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Fats"
              value={fats}
              onChangeText={setFats}
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
              onPress={handleMealCreate}
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

  mealCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  mealCardContent: {
    flexDirection: 'row',
  },

  mealImageContainer: {
    width: '33%',
    height: 120,
    marginRight: spacing.md,
  },

  mealImage: {
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

  mealInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  mealInfo: {
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
