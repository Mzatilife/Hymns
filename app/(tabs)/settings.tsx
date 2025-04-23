import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useColorScheme, useColorSchemePreference } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Moon, Sun, Smartphone } from 'lucide-react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const { userPreference, setUserPreference } = useColorSchemePreference();
  const colors = Colors[colorScheme];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Customize your app experience
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        <View style={[styles.optionsContainer, { backgroundColor: colors.surface }]}>
          <Pressable
            style={[
              styles.option,
              { borderBottomColor: colors.border, borderBottomWidth: 1 }
            ]}
            onPress={() => setUserPreference('light')}
          >
            <Sun size={24} color={userPreference === 'light' ? colors.primary : colors.text} />
            <Text style={[
              styles.optionText,
              { 
                color: colors.text,
                fontFamily: userPreference === 'light' ? 'Inter-SemiBold' : 'Inter-Regular'
              }
            ]}>Light</Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.option,
              { borderBottomColor: colors.border, borderBottomWidth: 1 }
            ]}
            onPress={() => setUserPreference('dark')}
          >
            <Moon size={24} color={userPreference === 'dark' ? colors.primary : colors.text} />
            <Text style={[
              styles.optionText,
              { 
                color: colors.text,
                fontFamily: userPreference === 'dark' ? 'Inter-SemiBold' : 'Inter-Regular'
              }
            ]}>Dark</Text>
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => setUserPreference('system')}
          >
            <Smartphone size={24} color={userPreference === 'system' ? colors.primary : colors.text} />
            <Text style={[
              styles.optionText,
              { 
                color: colors.text,
                fontFamily: userPreference === 'system' ? 'Inter-SemiBold' : 'Inter-Regular'
              }
            ]}>System</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <View style={[styles.optionsContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.option}>
            <Text style={[styles.optionText, { color: colors.text }]}>Version</Text>
            <Text style={[styles.optionValue, { color: colors.textSecondary }]}>1.0.0</Text>
          </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  optionsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  optionValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});