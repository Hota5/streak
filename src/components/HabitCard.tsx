import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Habit } from '@/types';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type HabitCardProps = {
  habit: Habit;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
};

export default function HabitCard({
  habit,
  style,
  onPress,
  onLongPress,
}: HabitCardProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`${habit.name}, ${habit.goalPerWeek} times per week, ${habit.doneDates.length} days done`}
      accessibilityHint="Opens the habit. Long press to delete"
      android_ripple={{ color: theme.border }}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View>
        <Image source={{ uri: habit.photoUrl }} style={styles.photo} />
        <Text
          style={[
            styles.badge,
            { backgroundColor: theme.primary, color: theme.onPrimary },
          ]}
        >
          {habit.goalPerWeek}x / week
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]}>{habit.name}</Text>
        <Text style={{ color: theme.muted }}>
          {habit.doneDates.length} days done
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.6 },
  photo: { width: '100%', aspectRatio: 16 / 9 },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
    fontSize: FontSize.small,
    fontWeight: 'bold',
  },
  body: { padding: Spacing.md, gap: Spacing.xs },
  title: { fontSize: FontSize.title, fontWeight: 'bold' },
});