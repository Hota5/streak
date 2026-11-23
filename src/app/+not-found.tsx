import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const theme = useTheme();
  return (
    <View style={styles.box}>
      <Text style={[styles.title, { color: theme.text }]}>
        This screen does not exist.
      </Text>
      <Link
        href="/"
        replace
        style={{ color: theme.primary, fontSize: FontSize.body }}
      >
        Go to my habits
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  title: { fontSize: FontSize.title, fontWeight: 'bold' },
});