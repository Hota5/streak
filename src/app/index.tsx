import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import FilterChip from '@/components/FilterChip';
import HabitCard from '@/components/HabitCard';
import SummaryRow from '@/components/SummaryRow';
import { Spacing } from '@/constants/theme';
import { fetchHabits } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import type { Habit } from '@/types';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Filter = 'all' | 'daily' | 'weekly';

type Sort = 'default' | 'mostDone' | 'az';

const sorts: { value: Sort; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'mostDone', label: 'Most done' },
  { value: 'az', label: 'A to Z' },
];

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'daily', label: 'Every day' },
  { value: 'weekly', label: 'Some days' },
];

const emptyMessages: Record<Filter, { title: string; message: string }> = {
  all: { title: 'No habits yet', message: 'Your habits will appear here.' },
  daily: { title: 'No daily habits', message: 'Choose another filter.' },
  weekly: { title: 'No weekly habits', message: 'Choose another filter.' },
};


export default function Index() {
  const theme = useTheme()
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('default');
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();

   const [habits, setHabits] = useState<Habit[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetchHabits()
      .then((data) => {
        if (!ignore) {
          setHabits(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!ignore) setStatus('error');
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus('loading');
    setAttempt((a) => a + 1);
  }

  async function refresh() {
    setRefreshing(true);
    try {
      setHabits(await fetchHabits());
    } catch {
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(habit: Habit) {
    Alert.alert('Delete habit?', `"${habit.name}" will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setHabits((list) => list.filter((h) => h.id !== habit.id)),
      },
    ]);
  }

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth =
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

  let visible = habits;
  if (filter === 'daily') {
    visible = habits.filter((h) => h.goalPerWeek === 7);
  }
  if (filter === 'weekly') {
    visible = habits.filter((h) => h.goalPerWeek < 7);
  }

  if (sort === 'mostDone') {
    visible = [...visible].sort(
      (a, b) => b.doneDates.length - a.doneDates.length,
    );
  }
  if (sort === 'az') {
    visible = [...visible].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (status === 'loading') {
    return <ActivityIndicator style={{ flex: 1 }} color={theme.primary} />;
  }

  if (status === 'error') {
    return <ErrorState message="Could not load habits" onRetry={retry} />;
  }

  


  return (
    <FlatList
      key={columns}
      data={visible}
      keyExtractor={(habit) => habit.id}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? { gap: Spacing.md } : undefined}
      renderItem={({ item }) => (
         <HabitCard
          habit={item}
          style={{ width: cardWidth }}
          onPress={() => router.push(`/habit/${item.id}`)}
          onLongPress={() => confirmDelete(item)}
        />
      )}
        refreshing={refreshing}
      onRefresh={refresh}
       ListHeaderComponent={
        <View style={styles.header}>
          <SummaryRow habits={habits} />
          <View style={styles.chips}>
            {filters.map((f) => (
              <FilterChip
                key={f.value}
                label={f.label}
                selected={filter === f.value}
                onPress={() => setFilter(f.value)}
              />
            ))}
          </View>
          <View style={styles.chips}>
            {sorts.map((s) => (
              <FilterChip
                key={s.value}
                label={s.label}
                selected={sort === s.value}
                onPress={() => setSort(s.value)}
              />
            ))}
          </View>
        </View>
      }
      ListHeaderComponentStyle={{ marginBottom: Spacing.md }}
      ListEmptyComponent={
        <EmptyState
          title={emptyMessages[filter].title}
          message={emptyMessages[filter].message}
        />
      }
      ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      contentContainerStyle={{
        flexGrow: 1,
        padding: Spacing.md,
        paddingBottom: Spacing.md + insets.bottom,
      }}
    />
  );
}
const styles = StyleSheet.create({
  header: { gap: Spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
});