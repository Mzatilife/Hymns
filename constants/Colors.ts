export const Colors = {
  light: {
    primary: '#E44D26', // Malawian red
    secondary: '#008751', // Malawian green
    accent: '#FFB900', // Malawian gold
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E5E5E5',
  },
  dark: {
    primary: '#FF6B52', // Lighter Malawian red for dark mode
    secondary: '#00B76C', // Lighter Malawian green for dark mode
    accent: '#FFD54F', // Lighter Malawian gold for dark mode
    background: '#121212',
    surface: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#BBBBBB',
    border: '#333333',
  },
};

export type Theme = typeof Colors.light;