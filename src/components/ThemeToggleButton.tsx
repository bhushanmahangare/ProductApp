import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ marginVertical: 10 }}>
      <Button
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
        onPress={toggleTheme}
      />
    </View>
  );
};

export default ThemeToggleButton;
