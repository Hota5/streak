import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Habit } from '@/types';
import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type HabitDetailsProps = {
  habit: Habit;
};

export default function HabitDetails({ habit }: HabitDetailsProps) {
  const theme = useTheme();
  return (
    <ScrollView>
      <View style={styles.content}>
        <Image source={{ uri: habit.photoUrl }} style={styles.photo} />
        <View style={styles.body}>
          <Text style={[styles.title, { color: theme.text }]}>{habit.name}</Text>
          <View style={styles.row}>
            <Text style={{ color: theme.muted }}>Goal</Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {habit.goalPerWeek} times per week
            </Text>
          </View>
          {habit.reminderTime ? (
            <View style={styles.row}>
              <Text style={{ color: theme.muted }}>Reminder</Text>
              <Text style={[styles.value, { color: theme.text }]}>
                {habit.reminderTime}
              </Text>
            </View>
          ) : null}
          <View style={styles.row}>
            <Text style={{ color: theme.muted }}>Done on</Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {habit.doneDates.join(', ')}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { width: '100%', maxWidth: 600, alignSelf: 'center' },
  photo: { width: '100%', aspectRatio: 16 / 9 },
  body: { padding: Spacing.md, gap: Spacing.sm },
  title: { fontSize: FontSize.hero, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.md },
  value: { flexShrink: 1, textAlign: 'right' },
});
