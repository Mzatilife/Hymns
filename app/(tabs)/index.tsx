import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Image } from 'react-native';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

const churches = [
  {
    id: '1',
    name: 'CCAP (Church of Central Africa Presbyterian)',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1974&auto=format&fit=crop',
    hymnsCount: 245,
  },
  {
    id: '2',
    name: 'Roman Catholic Church',
    image: 'https://images.unsplash.com/photo-1543373072-69f3d4788832?q=80&w=1974&auto=format&fit=crop',
    hymnsCount: 189,
  },
  {
    id: '3',
    name: 'Anglican Church',
    image: 'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?q=80&w=1974&auto=format&fit=crop',
    hymnsCount: 167,
  },
  {
    id: '4',
    name: 'Seventh-day Adventist',
    image: 'https://images.unsplash.com/photo-1601991115814-b8f1f8cd8e7d?q=80&w=1974&auto=format&fit=crop',
    hymnsCount: 156,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const filteredChurches = useMemo(() => 
    churches.filter(church =>
      church.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Malawian Hymns</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Discover and sing your favorite hymns
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search churches..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Churches</Text>
        <View style={styles.churchesGrid}>
          {filteredChurches.map((church) => (
            <Pressable
              key={church.id}
              onPress={() => router.push(`/church/${church.id}`)}
              style={({ pressed }) => [
                styles.churchCard,
                { backgroundColor: colors.surface, opacity: pressed ? 0.7 : 1 }
              ]}
            >
              <Image
                source={{ uri: church.image }}
                style={styles.churchImage}
                resizeMode="cover"
              />
              <View style={styles.churchInfo}>
                <Text style={[styles.churchName, { color: colors.text }]} numberOfLines={2}>
                  {church.name}
                </Text>
                <Text style={[styles.hymnCount, { color: colors.textSecondary }]}>
                  {church.hymnsCount} hymns
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
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
  searchContainer: {
    padding: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 15,
  },
  churchesGrid: {
    gap: 15,
  },
  churchCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
  },
  churchImage: {
    width: '100%',
    height: 160,
  },
  churchInfo: {
    padding: 16,
  },
  churchName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  hymnCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});