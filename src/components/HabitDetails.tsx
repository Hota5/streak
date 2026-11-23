import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Habit } from '@/types';
import { Image, StyleSheet, Text, View } from 'react-native';

type HabitDetailsProps = {
  habit: Habit;
};

export default function HabitDetails({ habit }: HabitDetailsProps) {
  const theme = useTheme();

  const facts = [
    { value: `${habit.goalPerWeek}x`, label: 'per week' },
    { value: String(habit.doneDates.length), label: 'days done' },
  ];
  if (habit.reminderTime) {
    facts.push({ value: habit.reminderTime, label: 'reminder' });
  }

  return (
    <View style={styles.content}>
      <Image source={{ uri: habit.photoUrl }} style={styles.photo} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]}>{habit.name}</Text>
        <View style={styles.facts}>
          {facts.map((fact) => (
            <View
              key={fact.label}
              style={[
                styles.fact,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.factValue, { color: theme.primary }]}>
                {fact.value}
              </Text>
              <Text style={{ color: theme.muted }}>{fact.label}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.heading, { color: theme.text }]}>Done on</Text>
        {habit.doneDates.length > 0 ? (
          habit.doneDates.map((date) => (
            <Text key={date} style={{ color: theme.text }}>
              {date}
            </Text>
          ))
        ) : (
          <Text style={{ color: theme.muted }}>No days done yet.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { width: '100%', maxWidth: 600, alignSelf: 'center' },
  photo: { width: '100%', aspectRatio: 16 / 9 },
  body: { padding: Spacing.md, gap: Spacing.sm },
  title: { fontSize: FontSize.hero, fontWeight: 'bold' },
  facts: { flexDirection: 'row', gap: Spacing.sm },
  fact: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  factValue: { fontSize: FontSize.title, fontWeight: 'bold' },
  heading: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
    marginTop: Spacing.sm,
  },
});