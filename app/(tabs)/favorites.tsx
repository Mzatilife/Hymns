import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useFavorites } from '@/hooks/useFavorites';
import { router } from 'expo-router';

const hymns = {
  '1': {
    title: 'Mulungu Dalitsani Malawi',
    number: '1',
  },
  '2': {
    title: 'Yesu Ndinu Mbusa Wanga',
    number: '2',
  },
  '3': {
    title: 'Tikondane',
    number: '3',
  },
};

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { favorites } = useFavorites();

  const favoriteHymns = favorites.map(id => ({
    id,
    ...hymns[id as keyof typeof hymns]
  }));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your favorite hymns
        </Text>
      </View>

      <View style={styles.content}>
        {favoriteHymns.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            You haven't added any favorites yet
          </Text>
        ) : (
          <View style={styles.hymnsGrid}>
            {favoriteHymns.map((hymn) => (
              <Pressable
                key={hymn.id}
                onPress={() => router.push(`/hymn/${hymn.id}`)}
                style={({ pressed }) => [
                  styles.hymnCard,
                  { 
                    backgroundColor: colors.surface,
                    opacity: pressed ? 0.7 : 1
                  }
                ]}
              >
                <Text style={[styles.hymnNumber, { color: colors.primary }]}>#{hymn.number}</Text>
                <Text style={[styles.hymnTitle, { color: colors.text }]}>{hymn.title}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  hymnsGrid: {
    gap: 12,
  },
  hymnCard: {
    padding: 16,
    borderRadius: 12,
  },
  hymnNumber: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  hymnTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});