import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { useState, useMemo } from 'react';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Search, ArrowLeft } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const churches = {
  '1': {
    name: 'CCAP (Church of Central Africa Presbyterian)',
    hymns: [
      { id: '1', title: 'Mulungu Dalitsani Malawi', number: '1', language: 'Chichewa' },
      { id: '2', title: 'Yesu Ndinu Mbusa Wanga', number: '2', language: 'Chichewa' },
      { id: '3', title: 'Tikondane', number: '3', language: 'Chichewa' },
      { id: '4', title: 'Amazing Grace', number: '4', language: 'English' },
      { id: '5', title: 'How Great Thou Art', number: '5', language: 'English' },
      { id: '6', title: 'Blessed Assurance', number: '6', language: 'English' },
    
      // Chitumbuka Songs
      { id: '7', title: 'Yehova Vwirani', number: '430', language: 'Chitumbuka' },
      { id: '8', title: 'Charu Nkhwithu Chara', number: '424', language: 'Chitumbuka' },
      { id: '9', title: 'Chiuta Dada', number: '434', language: 'Chitumbuka' },
      { id: '10', title: 'Chiziŵa Cha Zura', number: '441', language: 'Chitumbuka' },
      { id: '11', title: 'Dada Ndine Mwana Winu', number: '460', language: 'Chitumbuka' },
      { id: '12', title: 'Fumu Ndi Muliska', number: '435', language: 'Chitumbuka' },
      { id: '13', title: 'Fumu Yakutemwa Yikuchema', number: '440', language: 'Chitumbuka' },
      { id: '14', title: 'Fumu Yane', number: '409', language: 'Chitumbuka' },
      { id: '15', title: 'Fumu Yikusungilirenge', number: '429', language: 'Chitumbuka' },
      { id: '16', title: 'Imwe Mose Mwasuzgika', number: '455', language: 'Chitumbuka' },
      { id: '17', title: 'Ine Ndananga Dada', number: '431', language: 'Chitumbuka' },
      { id: '18', title: 'Ise Tikupenja Imwe', number: '453', language: 'Chitumbuka' },
      { id: '19', title: 'Iwe Tiphalirapo', number: '413', language: 'Chitumbuka' },
      { id: '20', title: 'Ka Mwaruta Kwa Yesu?', number: '420', language: 'Chitumbuka' },
      { id: '21', title: 'Kale Pa Kalivari', number: '408', language: 'Chitumbuka' },
      { id: '22', title: 'Kasi Ukukhumba Chiponosko', number: '418', language: 'Chitumbuka' },
      { id: '23', title: 'Kuli Chikaya Cha Vyose', number: '427', language: 'Chitumbuka' },
      { id: '24', title: 'Kuli Chikaya Chituŵa', number: '428', language: 'Chitumbuka' },
      { id: '25', title: 'Kulive Nthowa', number: '461', language: 'Chitumbuka' },
      { id: '26', title: 'Kuŵamkhristu', number: '446', language: 'Chitumbuka' },
      { id: '27', title: 'Laŵiska Pa Mphinjika', number: '454', language: 'Chitumbuka' },
      { id: '28', title: 'M’ngandiruwanga', number: '417', language: 'Chitumbuka' },
      { id: '29', title: 'Mazgu Ghinu Fumu', number: '436', language: 'Chitumbuka' },
      { id: '30', title: 'Mbanjani Ŵavwara Vituŵa', number: '442', language: 'Chitumbuka' },
      { id: '31', title: 'Munthu Watiwasidenge', number: '439', language: 'Chitumbuka' },
      { id: '32', title: 'Murongozgi Wa Ulendo Wa Moyo', number: '447', language: 'Chitumbuka' },
      { id: '33', title: 'Mwa Ŵanthu Mose', number: '450', language: 'Chitumbuka' },
      { id: '34', title: 'Mwe A Fumu', number: '410', language: 'Chitumbuka' },
      { id: '35', title: 'Mzomerani', number: '458', language: 'Chitumbuka' },
      { id: '36', title: 'Nako Nkhunozga', number: '423', language: 'Chitumbuka' },
      { id: '37', title: 'Nakukondwa Timrumbe', number: '448', language: 'Chitumbuka' },
      { id: '38', title: 'Ndimwe Yesu Nkhoswe Ya Ŵanthu', number: '415', language: 'Chitumbuka' },
      { id: '39', title: 'Ndine Muliska Muweme', number: '405', language: 'Chitumbuka' },
      { id: '40', title: 'Ndopa Za Yesu', number: '451', language: 'Chitumbuka' },
      { id: '41', title: 'Ng’anga yikulu', number: '421', language: 'Chitumbuka' },
      { id: '42', title: 'Nkhujipereka', number: '412', language: 'Chitumbuka' },
      { id: '43', title: 'Nkhumuchindikani', number: '432', language: 'Chitumbuka' },
      { id: '44', title: 'Nkhuromba Mponoski', number: '433', language: 'Chitumbuka' },
      { id: '45', title: 'Nkhutemwa Kupulikira', number: '422', language: 'Chitumbuka' },
      { id: '46', title: 'Ntchichi Chingatozga Ine', number: '456', language: 'Chitumbuka' },
      { id: '47', title: 'Pakulira Zimbata', number: '414', language: 'Chitumbuka' },
      { id: '48', title: 'Pakuryapo Chingwa', number: '416', language: 'Chitumbuka' },
      { id: '49', title: 'Pakwenda na Yesu', number: '407', language: 'Chitumbuka' },
      { id: '50', title: 'Pamphinjika Mthaski Wakafwa', number: '445', language: 'Chitumbuka' },
      { id: '51', title: 'Penjaninge Yehova', number: '437', language: 'Chitumbuka' },
      { id: '52', title: 'Rombanga', number: '425', language: 'Chitumbuka' },
      { id: '53', title: 'Teŵeta Na Lwana Lose', number: '426', language: 'Chitumbuka' },
      { id: '54', title: 'Tikamtemwa', number: '459', language: 'Chitumbuka' },
      { id: '55', title: 'Tikuwonga Ŵa Chiuta', number: '438', language: 'Chitumbuka' },
      { id: '56', title: 'Tiri Pa Ulendo', number: '452', language: 'Chitumbuka' },
      { id: '57', title: 'Uchizi', number: '411', language: 'Chitumbuka' },
      { id: '58', title: 'Ulinda wa Chikhristu', number: '404', language: 'Chitumbuka' },
      { id: '59', title: 'Vitumbiko Virimo', number: '449', language: 'Chitumbuka' },
      { id: '60', title: 'Vyose Vikumara', number: '419', language: 'Chitumbuka' },
      { id: '61', title: 'Ŵakamkhomera Yesu', number: '443', language: 'Chitumbuka' },
      { id: '62', title: 'Wizengeso Fumu', number: '403', language: 'Chitumbuka' },
      { id: '63', title: 'Yeghani Mphinjika', number: '457', language: 'Chitumbuka' },
      { id: '64', title: 'Zaninge A Fumu', number: '444', language: 'Chitumbuka' },
      { id: '65', title: 'Zaninge A Mzimu', number: '402', language: 'Chitumbuka' },
      { id: '66', title: 'Zaninge Mose', number: '406', language: 'Chitumbuka' },
    ],
  },
  '2': {
    name: 'Roman Catholic Church',
    hymns: [
      { id: '1', title: 'Amazing Grace', number: '1', language: 'English' },
      { id: '2', title: 'Holy God, We Praise Thy Name', number: '2', language: 'English' },
      { id: '3', title: 'Mulungu Ndi Wabwino', number: '3', language: 'Chichewa' },
      { id: '4', title: 'On Eagles Wings', number: '4', language: 'English' },
      { id: '5', title: 'Yesu Ndinu Mpulumutsi', number: '5', language: 'Chichewa' },
    ],
  },
  '3': {
    name: 'Anglican Church',
    hymns: [
      { id: '1', title: 'All Things Bright and Beautiful', number: '1', language: 'English' },
      { id: '2', title: 'Abide with Me', number: '2', language: 'English' },
      { id: '3', title: 'Mulungu Adalitse', number: '3', language: 'Chichewa' },
      { id: '4', title: 'Guide Me O Thou Great Redeemer', number: '4', language: 'English' },
      { id: '5', title: 'Tidalitse Ambuye', number: '5', language: 'Chichewa' },
    ],
  },
  '4': {
    name: 'Seventh-day Adventist',
    hymns: [
      { id: '1', title: 'Lift Up the Trumpet', number: '1', language: 'English' },
      { id: '2', title: 'We Have This Hope', number: '2', language: 'English' },
      { id: '3', title: 'Yesu Ndinu Chiyembekezo', number: '3', language: 'Chichewa' },
      { id: '4', title: 'The Lord in Zion Reigneth', number: '4', language: 'English' },
      { id: '5', title: 'Mulungu Ndi Mfumu', number: '5', language: 'Chichewa' },
    ],
  },
};

export default function ChurchScreen() {
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'English' | 'Chichewa'| 'Chitumbuka'>('all');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const church = churches[id as keyof typeof churches];

  if (!church) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Church not found</Text>
      </View>
    );
  }

  const filteredHymns = useMemo(() => 
    church.hymns.filter(hymn => {
      const matchesSearch = 
        hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hymn.number.toString().includes(searchQuery);
      
      const matchesLanguage = 
        selectedLanguage === 'all' || 
        hymn.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    }),
    [searchQuery, selectedLanguage, church.hymns]
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: church.name,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />

      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search hymns by title or number..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.languageFilter}>
        <Text style={[styles.filterLabel, { color: colors.text }]}>Language:</Text>
        <View style={styles.filterButtons}>
          <Pressable
            style={[
              styles.filterButton,
              { backgroundColor: selectedLanguage === 'all' ? colors.primary : colors.surface }
            ]}
            onPress={() => setSelectedLanguage('all')}
          >
            <Text style={[
              styles.filterButtonText,
              { color: selectedLanguage === 'all' ? 'white' : colors.text }
            ]}>All</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterButton,
              { backgroundColor: selectedLanguage === 'English' ? colors.primary : colors.surface }
            ]}
            onPress={() => setSelectedLanguage('English')}
          >
            <Text style={[
              styles.filterButtonText,
              { color: selectedLanguage === 'English' ? 'white' : colors.text }
            ]}>English</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterButton,
              { backgroundColor: selectedLanguage === 'Chichewa' ? colors.primary : colors.surface }
            ]}
            onPress={() => setSelectedLanguage('Chichewa')}
          >
            <Text style={[
              styles.filterButtonText,
              { color: selectedLanguage === 'Chichewa' ? 'white' : colors.text }
            ]}>Chichewa</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterButton,
              { backgroundColor: selectedLanguage === 'Chitumbuka' ? colors.primary : colors.surface }
            ]}
            onPress={() => setSelectedLanguage('Chitumbuka')}
          >
            <Text style={[
              styles.filterButtonText,
              { color: selectedLanguage === 'Chitumbuka' ? 'white' : colors.text }
            ]}>Chitumbuka</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.hymnsContainer}>
        {filteredHymns.map((hymn) => (
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
            <View style={styles.hymnInfo}>
              <Text style={[styles.hymnTitle, { color: colors.text }]}>{hymn.title}</Text>
              <Text style={[styles.hymnLanguage, { color: colors.textSecondary }]}>{hymn.language}</Text>
            </View>
          </Pressable>
        ))}
        {filteredHymns.length === 0 && (
          <Text style={[styles.noResults, { color: colors.textSecondary }]}>
            No hymns found matching "{searchQuery}"
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginRight: 16,
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
  languageFilter: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  hymnsContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  hymnCard: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hymnNumber: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginRight: 12,
  },
  hymnInfo: {
    flex: 1,
  },
  hymnTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  hymnLanguage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});