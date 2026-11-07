import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HabitCard from '@/components/HabitCard';
import { habits } from '@/data/habits';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function Index() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth =
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

  const totalDays = habits.reduce((sum, h) => sum + h.doneDates.length, 0);

  const stats = [
    { value: habits.length, label: 'habits' },
    { value: totalDays, label: 'days done' },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        padding: Spacing.md,
        gap: Spacing.md,
        paddingBottom: Spacing.md + insets.bottom,
      }}
    >
      <View style={styles.summaryRow}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={[
              styles.summaryBox,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.summaryValue, { color: theme.primary }]}>
              {stat.value}
            </Text>
            <Text style={{ color: theme.muted }}>{stat.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.grid}>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} style={{ width: cardWidth }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  summaryRow: { flexDirection: 'row', gap: Spacing.sm },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  summaryValue: { fontSize: FontSize.hero, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
});
