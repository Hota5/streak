import EmptyState from '@/components/EmptyState';
import HabitDetails from '@/components/HabitDetails';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { getHabit } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HabitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const habit = getHabit(id);

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  if (!habit) {
    return (
      <EmptyState
        title="Habit not found"
        message="This habit does not exist or was removed."
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: habit.name }} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: Spacing.md + insets.bottom }}
      >
        <HabitDetails habit={habit} />
        <View style={styles.footer}>
          <Pressable
            onPress={goBack}
            style={[styles.button, { borderColor: theme.primary }]}
          >
            <Text style={[styles.buttonText, { color: theme.primary }]}>
              Back to the list
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: Spacing.md,
  },
  button: {
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  buttonText: { fontSize: FontSize.body, fontWeight: 'bold' },
});