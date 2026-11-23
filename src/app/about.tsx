import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  const theme = useTheme();
  return (
    <View style={styles.box}>
      <Text style={[styles.title, { color: theme.text }]}>Streak</Text>
      <Text style={[styles.text, { color: theme.muted }]}>
        Streak is a habit tracker. Add the habits you want to keep up with and
        check them off every day.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, padding: Spacing.lg, gap: Spacing.sm },
  title: { fontSize: FontSize.hero, fontWeight: 'bold' },
  text: { fontSize: FontSize.body },
});