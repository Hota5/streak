import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Habit } from '@/types';
import { StyleSheet, Text, View } from 'react-native';

type SummaryRowProps = {
  habits: Habit[];
};

export default function SummaryRow({ habits }: SummaryRowProps) {
  const theme = useTheme();
  const totalDays = habits.reduce((sum, h) => sum + h.doneDates.length, 0);

  const stats = [
    { value: habits.length, label: 'habits' },
    { value: totalDays, label: 'days done' },
  ];

  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <View
          key={stat.label}
          style={[
            styles.box,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.value, { color: theme.primary }]}>
            {stat.value}
          </Text>
          <Text style={{ color: theme.muted }}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm },
  box: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  value: { fontSize: FontSize.hero, fontWeight: 'bold' },
});