import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, AppRegistry } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

// Login Screen
const LoginScreen = ({ navigation }) => {
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
    if (username && password && role) {
      navigation.navigate('Dashboard');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View style={loginStyles.container}>
      <Dropdown
        style={loginStyles.languageDropdown}
        placeholderStyle={loginStyles.placeholderStyle}
        selectedTextStyle={loginStyles.selectedTextStyle}
        data={languages}
        labelField="label"
        valueField="value"
        placeholder="Select Language"
        value={language}
        onChange={item => setLanguage(item.value)}
      />

      <Text style={loginStyles.logo}>💙</Text>
      <Text style={loginStyles.title}>Health Monitor</Text>
      <Text style={loginStyles.subtitle}>
        Northeastern India Disease Surveillance System
      </Text>

      <TextInput
        style={loginStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Dropdown
        style={loginStyles.dropdown}
        placeholderStyle={loginStyles.placeholderStyle}
        selectedTextStyle={loginStyles.selectedTextStyle}
        data={roles}
        labelField="label"
        valueField="value"
        placeholder="Select your role"
        value={role}
        onChange={item => setRole(item.value)}
      />

      <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
        <Text style={loginStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={loginStyles.footer}>
        Empowering communities through health surveillance
      </Text>
    </View>
  );
};

// AI Health Assistant Screen
const HealthAssistantScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "I can help analyze health patterns and provide insights about village data.",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const villages = [
    {
      id: 1,
      name: "Imphal Valley",
      state: "Manipur",
      population: "25,000",
      activeCases: 12,
      recoveries: 15,
      risk: "medium risk",
      trend: "Trend Stable",
      waterQuality: "Monitoring"
    },
    {
      id: 2,
      name: "Silchar",
      state: "Assam",
      population: "18,000",
      activeCases: 8,
      recoveries: 22,
      risk: "low risk",
      trend: "Trend Decreasing",
      waterQuality: "Safe"
    },
    {
      id: 3,
      name: "Jorhat",
      state: "Assam",
      population: "12,000",
      activeCases: 3,
      recoveries: 19,
      risk: "low risk",
      trend: "Trend Decreasing",
      waterQuality: "Safe"
    }
  ];

  const suggestedQuestions = [
    "What's the infection rate trend?",
    "Which villages need attention?",
    "Show me water quality status",
    "Compare village health metrics"
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        isAI: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('trend') || lowerQuestion.includes('infection rate')) {
      return "Based on current data, the overall infection trend is decreasing by 15% compared to last week. Silchar and Jorhat show significant improvement, while Imphal Valley remains stable.";
    } else if (lowerQuestion.includes('attention') || lowerQuestion.includes('priority')) {
      return "Villages needing immediate attention:\n1. Imphal Valley (medium risk)\n2. Majuli Island (cholera outbreak)\n3. Kamrup (rising dengue cases)\nRecommended actions: Water quality testing and awareness campaigns.";
    } else if (lowerQuestion.includes('water') || lowerQuestion.includes('quality')) {
      return "Current water quality status:\n✅ Safe: Silchar, Jorhat, Guwahati\n⚠️ Monitoring: Imphal Valley, Aizawl\n❌ Unsafe: Majuli Island\n3 IoT sensors detected pH abnormalities in Majuli.";
    } else if (lowerQuestion.includes('compare') || lowerQuestion.includes('metric')) {
      return "Village Comparison:\nImphal Valley: 12 active cases, 15 recoveries, medium risk\nSilchar: 8 active cases, 22 recoveries, low risk\nJorhat: 3 active cases, 19 recoveries, low risk\nSilchar has the best recovery rate at 73%.";
    } else {
      return "I can help you analyze village health data, track disease trends, monitor water quality, and identify areas needing attention. Try asking about specific villages, disease patterns, or preventive measures.";
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'report') {
      navigation.navigate('GenerateReport');
    } else if (action === 'alert') {
      navigation.navigate('CommunityAlerts');
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputText(question);
  };

  return (
    <ScrollView style={assistantStyles.container}>
      <Text style={assistantStyles.title}>Health Assistant</Text>
      <Text style={assistantStyles.subtitle}>Ask questions about village health data</Text>

      {/* Village Cards Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={assistantStyles.villagesScroll}>
        {villages.map(village => (
          <View key={village.id} style={assistantStyles.villageCard}>
            <View style={assistantStyles.villageHeader}>
              <Text style={assistantStyles.villageName}>{village.name}</Text>
              <Text style={assistantStyles.villageState}>{village.state}</Text>
            </View>
            
            <View style={assistantStyles.villageStats}>
              <View style={assistantStyles.statRow}>
                <Text style={assistantStyles.statNumber}>{village.population}</Text>
                <Text style={assistantStyles.statLabel}>Population</Text>
              </View>
              
              <View style={assistantStyles.statRow}>
                <Text style={assistantStyles.statNumber}>{village.activeCases}</Text>
                <Text style={assistantStyles.statLabel}>Active Cases</Text>
              </View>
              
              <View style={assistantStyles.statRow}>
                <Text style={assistantStyles.statNumber}>{village.recoveries}</Text>
                <Text style={assistantStyles.statLabel}>Recoveries</Text>
              </View>
            </View>

            <View style={assistantStyles.riskContainer}>
              <Text style={[
                assistantStyles.riskText,
                village.risk === 'medium risk' ? assistantStyles.mediumRisk : assistantStyles.lowRisk
              ]}>
                {village.risk}
              </Text>
            </View>

            <View style={assistantStyles.trendContainer}>
              <Text style={assistantStyles.trendText}>{village.trend}</Text>
            </View>

            <View style={assistantStyles.waterQuality}>
              <Text style={assistantStyles.waterText}>Water Quality: {village.waterQuality}</Text>
            </View>

            <TouchableOpacity style={assistantStyles.viewDetailsButton}>
              <Text style={assistantStyles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* AI Chat Section */}
      <View style={assistantStyles.chatSection}>
        <Text style={assistantStyles.chatTitle}>AI Health Assistant</Text>
        
        <View style={assistantStyles.chatContainer}>
          <ScrollView style={assistantStyles.messagesContainer}>
            {messages.map(message => (
              <View key={message.id} style={[
                assistantStyles.messageBubble,
                message.isAI ? assistantStyles.aiMessage : assistantStyles.userMessage
              ]}>
                <Text style={[
                  assistantStyles.messageText,
                  message.isAI ? assistantStyles.aiText : assistantStyles.userText
                ]}>
                  {message.text}
                </Text>
                <Text style={assistantStyles.timestamp}>
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
              </View>
            ))}
            {isTyping && (
              <View style={[assistantStyles.messageBubble, assistantStyles.aiMessage]}>
                <Text style={[assistantStyles.messageText, assistantStyles.aiText]}>
                  AI is typing...
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Suggested Questions */}
          <View style={assistantStyles.suggestedQuestions}>
            <Text style={assistantStyles.suggestedTitle}>Quick Questions:</Text>
            <View style={assistantStyles.questionButtons}>
              {suggestedQuestions.map((question, index) => (
                <TouchableOpacity 
                  key={index}
                  style={assistantStyles.questionButton}
                  onPress={() => handleSuggestedQuestion(question)}
                >
                  <Text style={assistantStyles.questionText}>{question}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Input Area */}
          <View style={assistantStyles.inputContainer}>
            <TextInput
              style={assistantStyles.textInput}
              placeholder="Ask about health insights..."
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={assistantStyles.sendButton} onPress={handleSendMessage}>
              <Text style={assistantStyles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={assistantStyles.quickActions}>
        <Text style={assistantStyles.quickActionsTitle}>Quick Actions</Text>
        <View style={assistantStyles.actionButtons}>
          <TouchableOpacity 
            style={assistantStyles.actionButton}
            onPress={() => handleQuickAction('report')}
          >
            <Text style={assistantStyles.actionButtonText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={assistantStyles.actionButton}
            onPress={() => handleQuickAction('alert')}
          >
            <Text style={assistantStyles.actionButtonText}>Alert High-Risk Villages</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={assistantStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={assistantStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Dashboard Screen
const DashboardScreen = ({ navigation }) => {
  const dashboardData = {
    todayCases: 23,
    highRiskVillages: 8,
    activeAlerts: 5,
    populationMonitored: 45000,
    infectedRatio: '2.3%',
    recoveries: 187,
    weeklyTrend: [28, 21, 14, 7, 10, 15, 12],
    diseaseDistribution: {
      Cholera: 15,
      Typhoid: 25,
      Dengue: 35,
      Malaria: 20
    }
  };

  return (
    <ScrollView style={dashboardStyles.container}>
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.title}>Health Dashboard</Text>
        <Text style={dashboardStyles.subtitle}>Real-time disease surveillance for Northeastern India</Text>
        <Text style={dashboardStyles.date}>9/19/2025, 7:57:21 PM</Text>
      </View>

      <View style={dashboardStyles.nav}>
        <TouchableOpacity style={dashboardStyles.navItem} onPress={() => navigation.navigate('CaseReporting')}>
          <Text style={dashboardStyles.navText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dashboardStyles.navItem} onPress={() => navigation.navigate('CommunityAlerts')}>
          <Text style={dashboardStyles.navText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dashboardStyles.navItem} onPress={() => navigation.navigate('Awareness')}>
          <Text style={dashboardStyles.navText}>Awareness</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dashboardStyles.navItem} onPress={() => navigation.navigate('VillageTracker')}>
          <Text style={dashboardStyles.navText}>Village Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dashboardStyles.navItem} onPress={() => navigation.navigate('HealthAssistant')}>
          <Text style={dashboardStyles.navText}>AI Assistant</Text>
        </TouchableOpacity>
      </View>

      <View style={dashboardStyles.statsContainer}>
        <View style={dashboardStyles.statBox}>
          <Text style={dashboardStyles.statNumber}>{dashboardData.todayCases}</Text>
          <Text style={dashboardStyles.statLabel}>Today's Cases</Text>
        </View>
        <View style={dashboardStyles.statBox}>
          <Text style={dashboardStyles.statNumber}>{dashboardData.highRiskVillages}</Text>
          <Text style={dashboardStyles.statLabel}>High-Risk Villages</Text>
        </View>
        <View style={dashboardStyles.statBox}>
          <Text style={dashboardStyles.statNumber}>{dashboardData.activeAlerts}</Text>
          <Text style={dashboardStyles.statLabel}>Active Alerts</Text>
        </View>
        <View style={dashboardStyles.statBox}>
          <Text style={dashboardStyles.statNumber}>{dashboardData.populationMonitored.toLocaleString()}</Text>
          <Text style={dashboardStyles.statLabel}>Population Monitored</Text>
        </View>
        <View style={dashboardStyles.statBox}>
          <Text style={dashboardStyles.statNumber}>{dashboardData.infectedRatio}</Text>
          <Text style={dashboardStyles.statLabel}>Infected Ratio</Text>
        </View>
        <View style={dashboardStyles.statBox}>
          <Text style={dashboardStyles.statNumber}>{dashboardData.recoveries}</Text>
          <Text style={dashboardStyles.statLabel}>Recoveries</Text>
        </View>
      </View>

      <View style={dashboardStyles.chartContainer}>
        <Text style={dashboardStyles.chartTitle}>Weekly Cases Trend</Text>
        <Text style={dashboardStyles.chartSubtitle}>Cases vs Recoveries over the week</Text>
        
        <View style={dashboardStyles.chart}>
          <View style={dashboardStyles.chartBars}>
            {dashboardData.weeklyTrend.map((value, index) => (
              <View key={index} style={dashboardStyles.chartBarContainer}>
                <View style={[dashboardStyles.chartBar, {height: value * 2}]} />
                <Text style={dashboardStyles.chartLabel}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={dashboardStyles.chartContainer}>
        <Text style={dashboardStyles.chartTitle}>Disease Distribution</Text>
        <Text style={dashboardStyles.chartSubtitle}>Current active cases by disease type</Text>
        
        <View style={dashboardStyles.chart}>
          <View style={dashboardStyles.chartBars}>
            {Object.entries(dashboardData.diseaseDistribution).map(([disease, count], index) => (
              <View key={index} style={dashboardStyles.diseaseBarContainer}>
                <View style={[dashboardStyles.diseaseBar, {height: count * 2}]} />
                <Text style={dashboardStyles.diseaseLabel}>{disease}</Text>
                <Text style={dashboardStyles.diseaseCount}>{count}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <TouchableOpacity style={dashboardStyles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={dashboardStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// // Simple placeholder screens for other features (to keep the code manageable)
// const CaseReportingScreen = ({ navigation }) => (
//   <View style={screenStyles.container}>
//     <Text style={screenStyles.title}>Case Reporting</Text>
//     <TouchableOpacity style={screenStyles.backButton} onPress={() => navigation.goBack()}>
//       <Text style={screenStyles.backButtonText}>Back to Dashboard</Text>
//     </TouchableOpacity>
//   </View>
// );

const CommunityAlertsScreen = ({ navigation }) => (
  <View style={screenStyles.container}>
    <Text style={screenStyles.title}>Community Alerts</Text>
    <TouchableOpacity style={screenStyles.backButton} onPress={() => navigation.goBack()}>
      <Text style={screenStyles.backButtonText}>Back to Dashboard</Text>
    </TouchableOpacity>
  </View>
);

const AwarenessScreen = ({ navigation }) => (
  <View style={screenStyles.container}>
    <Text style={screenStyles.title}>Awareness</Text>
    <TouchableOpacity style={screenStyles.backButton} onPress={() => navigation.goBack()}>
      <Text style={screenStyles.backButtonText}>Back to Dashboard</Text>
    </TouchableOpacity>
  </View>
);

const VillageTrackerScreen = ({ navigation }) => (
  <View style={screenStyles.container}>
    <Text style={screenStyles.title}>Village Tracker</Text>
    <TouchableOpacity style={screenStyles.backButton} onPress={() => navigation.goBack()}>
      <Text style={screenStyles.backButtonText}>Back to Dashboard</Text>
    </TouchableOpacity>
  </View>
);

const GenerateReportScreen = ({ navigation }) => (
  <View style={screenStyles.container}>
    <Text style={screenStyles.title}>Generate Report</Text>
    <TouchableOpacity style={screenStyles.backButton} onPress={() => navigation.goBack()}>
      <Text style={screenStyles.backButtonText}>Back to Dashboard</Text>
    </TouchableOpacity>
  </View>
);

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="HealthAssistant" component={HealthAssistantScreen} />
        <Stack.Screen name="CaseReporting" component={CaseReportingScreen} />
        <Stack.Screen name="CommunityAlerts" component={CommunityAlertsScreen} />
        <Stack.Screen name="Awareness" component={AwarenessScreen} />
        <Stack.Screen name="VillageTracker" component={VillageTrackerScreen} />
        <Stack.Screen name="GenerateReport" component={GenerateReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
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
    top: 50,
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

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#ddd',
  },
  nav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  navText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  statBox: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  chart: {
    alignItems: 'center',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    justifyContent: 'space-between',
  },
  chartBarContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  chartBar: {
    width: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 3,
    marginBottom: 5,
  },
  chartLabel: {
    fontSize: 12,
  },
  diseaseBarContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  diseaseBar: {
    width: 30,
    backgroundColor: '#4A90E2',
    borderRadius: 3,
    marginBottom: 5,
  },
  diseaseLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  diseaseCount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const assistantStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  villagesScroll: {
    marginBottom: 20,
  },
  villageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  villageHeader: {
    marginBottom: 15,
  },
  villageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  villageState: {
    fontSize: 14,
    color: '#666',
  },
  villageStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statRow: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  riskContainer: {
    marginBottom: 10,
  },
  riskText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
    borderRadius: 8,
  },
  mediumRisk: {
    backgroundColor: '#FFF2CC',
    color: '#E6A700',
  },
  lowRisk: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  trendContainer: {
    marginBottom: 10,
  },
  trendText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  waterQuality: {
    marginBottom: 15,
  },
  waterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  viewDetailsButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#fff',
    fontWeight: '500',
  },
  chatSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  chatContainer: {
    maxHeight: 400,
  },
  messagesContainer: {
    maxHeight: 200,
    marginBottom: 15,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '80%',
  },
  aiMessage: {
    backgroundColor: '#F0F8FF',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#4A90E2',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  aiText: {
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  suggestedQuestions: {
    marginBottom: 15,
  },
  suggestedTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: '#666',
  },
  questionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  questionButton: {
    backgroundColor: '#E8F4FD',
    padding: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 12,
    color: '#4A90E2',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 20,
    width: 60,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  quickActions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#50E3C2',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


// Case Reporting Screen - Updated with detailed form
const CaseReportingScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    numberOfCases: '',
    pHValue: '',
    turbidity: '',
    waterStatus: '',
    precautions: ''
  });
  const [selectedLegend, setSelectedLegend] = useState('');

  const legends = [
    { label: 'Legend', value: 'legend' },
    { label: 'Warning', value: 'warning' },
    { label: 'Postoperation', value: 'postoperation' }
  ];

  const waterStatusOptions = [
    { label: 'Safe', value: 'safe' },
    { label: 'Monitoring', value: 'monitoring' },
    { label: 'Unsafe', value: 'unsafe' },
    { label: 'Critical', value: 'critical' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate and submit form data
    if (!formData.numberOfCases || !formData.waterStatus) {
      alert('Please fill required fields');
      return;
    }
    alert('Case report submitted successfully!');
    navigation.goBack();
  };

  return (
    <ScrollView style={caseReportingStyles.container}>
      <Text style={caseReportingStyles.title}>Case Reporting</Text>
      <Text style={caseReportingStyles.subtitle}>Report new disease cases and water quality data</Text>

      {/* Legend Selection */}
      <View style={caseReportingStyles.section}>
        <Text style={caseReportingStyles.sectionTitle}>Case Severity Legend</Text>
        <View style={caseReportingStyles.legendContainer}>
          {legends.map((legend) => (
            <TouchableOpacity
              key={legend.value}
              style={[
                caseReportingStyles.legendButton,
                selectedLegend === legend.value && caseReportingStyles.legendSelected
              ]}
              onPress={() => setSelectedLegend(legend.value)}
            >
              <Text style={[
                caseReportingStyles.legendText,
                selectedLegend === legend.value && caseReportingStyles.legendTextSelected
              ]}>
                {legend.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Number of Cases */}
      <View style={caseReportingStyles.section}>
        <Text style={caseReportingStyles.label}>Number of Cases *</Text>
        <TextInput
          style={caseReportingStyles.input}
          placeholder="Enter number of cases"
          keyboardType="numeric"
          value={formData.numberOfCases}
          onChangeText={(value) => handleInputChange('numberOfCases', value)}
        />
      </View>

      {/* Water Quality Assessment */}
      <View style={caseReportingStyles.section}>
        <Text style={caseReportingStyles.sectionTitle}>Water Quality Assessment</Text>
        <Text style={caseReportingStyles.sectionSubtitle}>IoT sensor data or manual test results</Text>
        
        <View style={caseReportingStyles.waterQualityGrid}>
          <View style={caseReportingStyles.gridColumn}>
            <Text style={caseReportingStyles.gridLabel}>pH Value</Text>
            <TextInput
              style={caseReportingStyles.gridInput}
              placeholder="6.5-8.5"
              keyboardType="decimal-pad"
              value={formData.pHValue}
              onChangeText={(value) => handleInputChange('pHValue', value)}
            />
          </View>
          
          <View style={caseReportingStyles.gridColumn}>
            <Text style={caseReportingStyles.gridLabel}>Turbidity (NTU)</Text>
            <TextInput
              style={caseReportingStyles.gridInput}
              placeholder="NTU"
              keyboardType="decimal-pad"
              value={formData.turbidity}
              onChangeText={(value) => handleInputChange('turbidity', value)}
            />
          </View>
          
          <View style={caseReportingStyles.gridColumn}>
            <Text style={caseReportingStyles.gridLabel}>Water Status</Text>
            <Dropdown
              style={caseReportingStyles.dropdown}
              data={waterStatusOptions}
              labelField="label"
              valueField="value"
              placeholder="Select status"
              value={formData.waterStatus}
              onChange={item => handleInputChange('waterStatus', item.value)}
            />
          </View>
        </View>
      </View>

      {/* Documentation & Precautions */}
      <View style={caseReportingStyles.section}>
        <Text style={caseReportingStyles.sectionTitle}>Documentation & Precautions</Text>
        
        {/* Patient/Case Image Upload */}
        <View style={caseReportingStyles.uploadSection}>
          <Text style={caseReportingStyles.uploadLabel}>Patient/Case Image</Text>
          <TouchableOpacity style={caseReportingStyles.uploadButton}>
            <Text style={caseReportingStyles.uploadButtonText}>Click to upload case documentation</Text>
          </TouchableOpacity>
        </View>

        {/* Water Test Result Upload */}
        <View style={caseReportingStyles.uploadSection}>
          <Text style={caseReportingStyles.uploadLabel}>Water Test Result</Text>
          <TouchableOpacity style={caseReportingStyles.uploadButton}>
            <Text style={caseReportingStyles.uploadButtonText}>Upload water test strip/result</Text>
          </TouchableOpacity>
        </View>

        {/* Precautions */}
        <View style={caseReportingStyles.textAreaSection}>
          <Text style={caseReportingStyles.label}>Precautionary Measures *</Text>
          <TextInput
            style={caseReportingStyles.textArea}
            placeholder="Describe the precautionary measures taken..."
            multiline
            numberOfLines={4}
            value={formData.precautions}
            onChangeText={(value) => handleInputChange('precautions', value)}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={caseReportingStyles.submitButton} onPress={handleSubmit}>
        <Text style={caseReportingStyles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>

      {/* Navigation */}
      <View style={caseReportingStyles.navButtons}>
        <TouchableOpacity style={caseReportingStyles.navButton}>
          <Text style={caseReportingStyles.navButtonText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={caseReportingStyles.navButton}>
          <Text style={caseReportingStyles.navButtonText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={caseReportingStyles.navButton}>
          <Text style={caseReportingStyles.navButtonText}>Awareness</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={caseReportingStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={caseReportingStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Updated Styles for Case Reporting Screen
const caseReportingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  legendButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  legendSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  legendText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  legendTextSelected: {
    color: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  waterQualityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  gridColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  gridInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  uploadButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  textAreaSection: {
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#50E3C2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 15,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Main App Component - This is what should be exported as default
const App = () => {
  return <AppNavigator />;
};

export default App;