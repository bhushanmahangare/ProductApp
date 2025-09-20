import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [language, setLanguage] = useState(null);

  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Doctor', value: 'doctor' },
    { label: 'User', value: 'user' },
  ];

  const languages = [
    { label: '🇬🇧 English', value: 'en' },
    { label: '🇮🇳 हिंदी', value: 'hi' },
    { label: '🇮🇳 অসমীয়া', value: 'as' },
    { label: '🇧🇩 বাংলা', value: 'bn' },
    { label: '🇮🇳 Manipuri', value: 'mni' },
    { label: '🇳🇵 नेपाली', value: 'ne' },
  ];

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Role:', role);
    console.log('Language:', language);
    alert(`Login with Language: ${language}`);
  };

  return (
    <View style={styles.container}>
      {/* Language Dropdown at Top */}
      <Dropdown
        style={styles.languageDropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={languages}
        labelField="label"
        valueField="value"
        placeholder="Select Language"
        value={language}
        onChange={item => setLanguage(item.value)}
      />

      <Text style={styles.logo}>💙</Text>
      <Text style={styles.title}>Health Monitor</Text>
      <Text style={styles.subtitle}>
        Northeastern India Disease Surveillance System
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Role Dropdown */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={roles}
        labelField="label"
        valueField="value"
        placeholder="Select your role"
        value={role}
        onChange={item => setRole(item.value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Empowering communities through health surveillance
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2', // later we can add gradient
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  languageDropdown: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    position: 'absolute',
    top: 50, // pinned at top
    right: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1000,
  },
  logo: {
    fontSize: 50,
    marginBottom: 10,
    marginTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  placeholderStyle: {
    color: '#999',
    fontSize: 14,
  },
  selectedTextStyle: {
    color: '#333',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#6ea8fe',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 12,
    color: '#eee',
    textAlign: 'center',
    marginTop: 10,
  },
});
