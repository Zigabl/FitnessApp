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

interface Meal {
  _id: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  notes: string;
  imagePath?: string;
}

interface MealDetailScreenProps {
  route: {
    params: {
      id: string;
    };
  };
}

export default function MealDetailScreen({
  route,
}: MealDetailScreenProps) {

  const { id } = route.params;

  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const response = await api.get(`/meal/get/${id}`);

        setMeal(response.data.meal);
      } catch (error) {
        console.error('Failed to fetch meal:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMeal();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          Meal could not be found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          {meal.title}
        </Text>

        <Text style={styles.subtitle}>
          Meal details
        </Text>

        <View style={styles.card}>

          <View style={styles.row}>
            <Text style={styles.label}>
              Calories
            </Text>

            <Text style={styles.value}>
              {meal.calories} kcal
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Protein
            </Text>

            <Text style={styles.value}>
              {meal.protein} g
            </Text>
          </View>

          {meal.carbs !== undefined && (
            <View style={styles.row}>
              <Text style={styles.label}>
                Carbohydrates
              </Text>

              <Text style={styles.value}>
                {meal.carbs} g
              </Text>
            </View>
          )}

          {meal.fats !== undefined && (
            <View style={styles.row}>
              <Text style={styles.label}>
                Fats
              </Text>

              <Text style={styles.value}>
                {meal.fats} g
              </Text>
            </View>
          )}

        </View>

        {meal.notes && (
          <View style={styles.notesCard}>
            <Text style={styles.notesTitle}>
              Notes
            </Text>

            <Text style={styles.notesText}>
              {meal.notes}
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