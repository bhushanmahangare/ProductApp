import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
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

// Hotspot Map Screen
const HotspotMapScreen = ({ navigation }) => {
  return (
    <ScrollView style={hotspotStyles.container}>
      <Text style={hotspotStyles.title}>Northeastern Hotspot Map</Text>
      <Text style={hotspotStyles.subtitle}>Interactive disease hotspot monitoring</Text>
      
      <View style={hotspotStyles.divider} />
      
      <Text style={hotspotStyles.sectionTitle}>❌ NGO Partners</Text>
      <Text style={hotspotStyles.sectionSubtitle}>Active partner organizations</Text>
      
      <View style={hotspotStyles.ngoList}>
        <View style={hotspotStyles.ngoItem}>
          <Text style={hotspotStyles.ngoName}>Health First</Text>
          <Text style={hotspotStyles.ngoContact}>+91-98765-43210</Text>
        </View>
        <View style={hotspotStyles.ngoItem}>
          <Text style={hotspotStyles.ngoName}>Care of All</Text>
          <Text style={hotspotStyles.ngoContact}>+91-98765-43211</Text>
        </View>
        <View style={hotspotStyles.ngoItem}>
          <Text style={hotspotStyles.ngoName}>Made Assist</Text>
          <Text style={hotspotStyles.ngoContact}>+91-98765-43212</Text>
        </View>
      </View>
      
      <View style={hotspotStyles.actionButtons}>
        <TouchableOpacity style={hotspotStyles.actionButton}>
          <Text style={hotspotStyles.actionButtonText}>Action</Text>
        </TouchableOpacity>
        <TouchableOpacity style={hotspotStyles.actionButton}>
          <Text style={hotspotStyles.actionButtonText}>Action</Text>
        </TouchableOpacity>
      </View>
      
      <View style={hotspotStyles.divider} />
      
      <Text style={hotspotStyles.sectionTitle}>Interactive Map</Text>
      <Text style={hotspotStyles.sectionSubtitle}>Northeastern India Disease Hotspots</Text>
      
      <TouchableOpacity style={hotspotStyles.mapButton}>
        <Text style={hotspotStyles.mapButtonText}>View Full Map</Text>
      </TouchableOpacity>
      
      <View style={hotspotStyles.divider} />
      
      <TouchableOpacity style={hotspotStyles.contactButton}>
        <Text style={hotspotStyles.contactButtonText}>Contact All Partners</Text>
      </TouchableOpacity>
      
      <View style={hotspotStyles.divider} />
      
      <View style={hotspotStyles.alertBox}>
        <Text style={hotspotStyles.alertTitle}>Water Quality Alert</Text>
        <Text style={hotspotStyles.alertText}>
          3 IoT sensors detected abnormal pH levels in Majuli, Assam. Immediate testing recommended.
        </Text>
      </View>
      
      <TouchableOpacity style={hotspotStyles.detailsButton}>
        <Text style={hotspotStyles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={hotspotStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={hotspotStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Case Reporting Screen
const CaseReportingScreen = ({ navigation }) => {
  const [symptoms, setSymptoms] = useState({
    fever: false,
    vomiting: false,
    diarrhea: false,
    dehydration: false
  });

  const toggleSymptom = (symptom) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: !prev[symptom]
    }));
  };

  return (
    <ScrollView style={caseReportingStyles.container}>
      <Text style={caseReportingStyles.title}>Case Reporting</Text>
      <Text style={caseReportingStyles.subtitle}>Report new disease cases and water quality data</Text>
      
      <Text style={caseReportingStyles.sectionTitle}>Location Information</Text>
      
      <View style={caseReportingStyles.inputGroup}>
        <Text style={caseReportingStyles.label}>Village *</Text>
        <TextInput
          style={caseReportingStyles.input}
          placeholder="Enter village name"
        />
      </View>
      
      <View style={caseReportingStyles.inputGroup}>
        <Text style={caseReportingStyles.label}>State/Region *</Text>
        <TextInput
          style={caseReportingStyles.input}
          placeholder="Select state/region"
        />
      </View>
      
      <View style={caseReportingStyles.divider} />
      
      <Text style={caseReportingStyles.sectionTitle}>Disease Information</Text>
      
      <View style={caseReportingStyles.inputGroup}>
        <Text style={caseReportingStyles.label}>Disease Type *</Text>
        <TextInput
          style={caseReportingStyles.input}
          placeholder="Select disease type"
        />
      </View>
      
      <Text style={caseReportingStyles.label}>Symptoms</Text>
      <View style={caseReportingStyles.symptomsContainer}>
        <TouchableOpacity 
          style={[caseReportingStyles.symptomButton, symptoms.fever && caseReportingStyles.symptomSelected]}
          onPress={() => toggleSymptom('fever')}
        >
          <Text style={caseReportingStyles.symptomText}>Fever</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[caseReportingStyles.symptomButton, symptoms.vomiting && caseReportingStyles.symptomSelected]}
          onPress={() => toggleSymptom('vomiting')}
        >
          <Text style={caseReportingStyles.symptomText}>Vomiting</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[caseReportingStyles.symptomButton, symptoms.diarrhea && caseReportingStyles.symptomSelected]}
          onPress={() => toggleSymptom('diarrhea')}
        >
          <Text style={caseReportingStyles.symptomText}>Diarrhea</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[caseReportingStyles.symptomButton, symptoms.dehydration && caseReportingStyles.symptomSelected]}
          onPress={() => toggleSymptom('dehydration')}
        >
          <Text style={caseReportingStyles.symptomText}>Dehydration</Text>
        </TouchableOpacity>
      </View>
      
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
      
      <TouchableOpacity style={caseReportingStyles.submitButton}>
        <Text style={caseReportingStyles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={caseReportingStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={caseReportingStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Water Quality Assessment Screen
const WaterQualityAssessmentScreen = ({ navigation }) => {
  return (
    <ScrollView style={waterQualityStyles.container}>
      <Text style={waterQualityStyles.title}>Water Quality Assessment</Text>
      <Text style={waterQualityStyles.subtitle}>IoT sensor data or manual test results</Text>
      
      <View style={waterQualityStyles.inputGroup}>
        <Text style={waterQualityStyles.label}>pH Value</Text>
        <TextInput
          style={waterQualityStyles.input}
          placeholder="6.5-8.5"
          keyboardType="numeric"
        />
      </View>
      
      <View style={waterQualityStyles.inputGroup}>
        <Text style={waterQualityStyles.label}>Turbidity (NTU)</Text>
        <TextInput
          style={waterQualityStyles.input}
          placeholder="NTU"
          keyboardType="numeric"
        />
      </View>
      
      <View style={waterQualityStyles.inputGroup}>
        <Text style={waterQualityStyles.label}>Water Status</Text>
        <TextInput
          style={waterQualityStyles.input}
          placeholder="Select status"
        />
      </View>
      
      <View style={waterQualityStyles.divider} />
      
      <Text style={waterQualityStyles.sectionTitle}>Documentation & Precautions</Text>
      
      <View style={waterQualityStyles.uploadSection}>
        <Text style={waterQualityStyles.uploadLabel}>Patient/Case Image</Text>
        <TouchableOpacity style={waterQualityStyles.uploadButton}>
          <Text style={waterQualityStyles.uploadButtonText}>Click to upload case documentation</Text>
        </TouchableOpacity>
      </View>
      
      <View style={waterQualityStyles.uploadSection}>
        <Text style={waterQualityStyles.uploadLabel}>Water Test Result</Text>
        <TouchableOpacity style={waterQualityStyles.uploadButton}>
          <Text style={waterQualityStyles.uploadButtonText}>Upload water test strip/result</Text>
        </TouchableOpacity>
      </View>
      
      <View style={waterQualityStyles.inputGroup}>
        <Text style={waterQualityStyles.label}>Precautions Taken</Text>
        <TextInput
          style={[waterQualityStyles.input, {height: 100}]}
          placeholder="Describe the precautionary measures taken..."
          multiline
        />
      </View>
      
      <TouchableOpacity style={waterQualityStyles.submitButton}>
        <Text style={waterQualityStyles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={waterQualityStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={waterQualityStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Community Alerts Screen
const CommunityAlertsScreen = ({ navigation }) => {
  const alerts = [
    {
      id: 1,
      disease: "Cholera",
      location: "Majuli Island, Assam",
      cases: "12 cases",
      description: "Rapid spread detected in riverside communities",
      time: "2 hours ago",
      population: "15,000 population",
      waterStatus: "Water: Unsafe",
      priority: "Critical"
    },
    {
      id: 2,
      disease: "Tychoid",
      location: "Imphal, Manipur",
      cases: "8 cases",
      description: "Contaminated water source identified",
      time: "6 hours ago",
      population: "8,500 population",
      waterStatus: "Water: Monitoring",
      priority: "High"
    },
    {
      id: 3,
      disease: "Dengue",
      location: "Silchar, Assam",
      cases: "8 cases",
      description: "Seasonal increase in mosquito breeding",
      time: "12 hours ago",
      population: "12,000 population",
      waterStatus: "Water: Safe",
      priority: "Medium"
    },
    {
      id: 4,
      disease: "Malaria",
      location: "Jorhat, Assam",
      cases: "3 cases",
      description: "Cases under control, recovery rate good",
      time: "1 day ago",
      population: "10,000 population",
      waterStatus: "Water: Safe",
      priority: "Low"
    }
  ];

  return (
    <ScrollView style={alertsStyles.container}>
      <Text style={alertsStyles.title}>Community Alerts</Text>
      <Text style={alertsStyles.subtitle}>Real-time disease outbreak monitoring and community notifications</Text>
      
      <View style={alertsStyles.priorityFilter}>
        <View style={alertsStyles.priorityColumn}>
          <Text style={alertsStyles.priorityTitle}>1</Text>
          <Text style={alertsStyles.priorityItem}>Critical Alerts</Text>
          <Text style={alertsStyles.priorityItem}>High Priority</Text>
          <Text style={alertsStyles.priorityItem}>Medium Priority</Text>
          <Text style={alertsStyles.priorityItem}>Under Control</Text>
        </View>
        
        <View style={alertsStyles.priorityColumn}>
          <Text style={alertsStyles.priorityTitle}>2</Text>
          <Text style={alertsStyles.priorityItem}>All Alerts</Text>
          <Text style={alertsStyles.priorityItem}>Critical</Text>
          <Text style={alertsStyles.priorityItem}>High</Text>
          <Text style={alertsStyles.priorityItem}>Medium</Text>
          <Text style={alertsStyles.priorityItem}>Safe</Text>
        </View>
      </View>
      
      {alerts.map(alert => (
        <View key={alert.id} style={alertsStyles.alertCard}>
          <Text style={alertsStyles.alertDisease}>{alert.disease} Outbreak</Text>
          <Text style={alertsStyles.alertLocation}>📍 {alert.location}</Text>
          <Text style={alertsStyles.alertCases}>{alert.cases}</Text>
          
          <Text style={alertsStyles.alertDescription}>{alert.description}</Text>
          
          <View style={alertsStyles.alertDetails}>
            <Text style={alertsStyles.alertDetail}>⏰ {alert.time}</Text>
            <Text style={alertsStyles.alertDetail}>👥 {alert.population}</Text>
            <Text style={alertsStyles.alertDetail}>💧 {alert.waterStatus}</Text>
          </View>
          
          <View style={alertsStyles.alertActions}>
            <TouchableOpacity style={alertsStyles.actionButton}>
              <Text style={alertsStyles.actionButtonText}>Send SMS Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity style={alertsStyles.actionButton}>
              <Text style={alertsStyles.actionButtonText}>Notify NGOs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={alertsStyles.actionButton}>
              <Text style={alertsStyles.actionButtonText}>Share Awareness</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={alertsStyles.viewDetailsButton}>
            <Text style={alertsStyles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
      
      <View style={alertsStyles.navButtons}>
        <TouchableOpacity style={alertsStyles.navButton}>
          <Text style={alertsStyles.navButtonText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={alertsStyles.navButton}>
          <Text style={alertsStyles.navButtonText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={alertsStyles.navButton}>
          <Text style={alertsStyles.navButtonText}>Awareness</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={alertsStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={alertsStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Awareness Screen
const AwarenessScreen = ({ navigation }) => {
  const awarenessMaterials = [
    {
      id: 1,
      title: "Cholera Prevention",
      subtitle: "Essential water safety and hygiene practices",
      topic: "Water Purification Methods",
      description: "Simple household water treatment techniques",
      duration: "5:23",
      languages: "Assamese, English",
      type: "video"
    },
    {
      id: 2,
      title: "Dengue Awareness",
      subtitle: "Mosquito control and prevention strategies",
      topic: "Community Health Guidelines",
      description: "Downloadable awareness materials",
      duration: "4:15",
      languages: "Hindi, Bengali",
      type: "download"
    }
  ];

  return (
    <ScrollView style={awarenessStyles.container}>
      <Text style={awarenessStyles.title}>Disease Prevention & Awareness</Text>
      <Text style={awarenessStyles.subtitle}>Educational materials for community health</Text>
      
      {awarenessMaterials.map(material => (
        <View key={material.id} style={awarenessStyles.materialCard}>
          <Text style={awarenessStyles.materialTitle}>{material.title}</Text>
          <Text style={awarenessStyles.materialSubtitle}>{material.subtitle}</Text>
          
          <View style={awarenessStyles.divider} />
          
          <Text style={awarenessStyles.topicTitle}>{material.topic}</Text>
          <Text style={awarenessStyles.topicDescription}>{material.description}</Text>
          
          <View style={awarenessStyles.materialActions}>
            {material.type === "video" ? (
              <>
                <View style={awarenessStyles.actionItem}>
                  <Text style={awarenessStyles.actionDuration}>{material.duration}</Text>
                  <TouchableOpacity style={awarenessStyles.actionButton}>
                    <Text style={awarenessStyles.actionButtonText}>Watch Video</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={awarenessStyles.actionItem}>
                  <Text style={awarenessStyles.actionDuration}>3 min</Text>
                  <Text style={awarenessStyles.actionLanguages}>{material.languages}</Text>
                  <TouchableOpacity style={awarenessStyles.actionButton}>
                    <Text style={awarenessStyles.actionButtonText}>View Content</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={awarenessStyles.actionItem}>
                  <Text style={awarenessStyles.actionDuration}>{material.duration}</Text>
                  <Text style={awarenessStyles.actionLanguages}>{material.languages}</Text>
                  <TouchableOpacity style={awarenessStyles.actionButton}>
                    <Text style={awarenessStyles.actionButtonText}>Watch Video</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={awarenessStyles.actionItem}>
                  <Text style={awarenessStyles.actionText}>Download</Text>
                  <Text style={awarenessStyles.actionLanguages}>All Languages</Text>
                  <TouchableOpacity style={awarenessStyles.actionButton}>
                    <Text style={awarenessStyles.actionButtonText}>View Content</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      ))}
      
      <TouchableOpacity style={awarenessStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={awarenessStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Village Tracker Screen
const VillageTrackerScreen = ({ navigation }) => {
  const villages = [
    {
      id: 1,
      name: "Imphal Valley",
      population: "25,000 Population",
      activeCases: 12,
      recoveries: 15,
      risk: "medium risk",
      trend: "Trend Stable",
      waterQuality: "Safe"
    },
    {
      id: 2,
      name: "Silchar",
      population: "18,000 Population",
      activeCases: 8,
      recoveries: 22,
      risk: "low risk",
      trend: "Trend Decreasing",
      waterQuality: "Safe"
    }
  ];

  return (
    <ScrollView style={villageStyles.container}>
      <Text style={villageStyles.title}>Village Tracker - Northeastern India</Text>
      <Text style={villageStyles.subtitle}>Real-time village health monitoring with AI predictions</Text>
      
      <View style={villageStyles.searchBar}>
        <TextInput
          style={villageStyles.searchInput}
          placeholder="Search village"
        />
        <TouchableOpacity style={villageStyles.filterButton}>
          <Text style={villageStyles.filterButtonText}>Filter by state</Text>
        </TouchableOpacity>
        <TouchableOpacity style={villageStyles.exportButton}>
          <Text style={villageStyles.exportButtonText}>Export CSV</Text>
        </TouchableOpacity>
      </View>
      
      <View style={villageStyles.divider} />
      
      <Text style={villageStyles.sectionTitle}>Interactive Disease Hotspot Map</Text>
      <Text style={villageStyles.sectionSubtitle}>Real-time monitoring of northeastern India villages</Text>
      
      <View style={villageStyles.mapPlaceholder}>
        <Text style={villageStyles.mapText}>Interactive Map View</Text>
        <Text style={villageStyles.mapSubtext}>Northeastern India Health Surveillance</Text>
        
        <View style={villageStyles.mapButtons}>
          <TouchableOpacity style={villageStyles.mapButton}>
            <Text style={villageStyles.mapButtonText}>View Full Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={villageStyles.mapButton}>
            <Text style={villageStyles.mapButtonText}>Satellite View</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {villages.map(village => (
        <View key={village.id} style={villageStyles.villageCard}>
          <Text style={villageStyles.villageName}>{village.name}</Text>
          <Text style={villageStyles.villagePopulation}>{village.population}</Text>
          
          <View style={villageStyles.villageStats}>
            <View style={villageStyles.stat}>
              <Text style={villageStyles.statNumber}>{village.activeCases}</Text>
              <Text style={villageStyles.statLabel}>Active Cases</Text>
            </View>
            
            <View style={villageStyles.stat}>
              <Text style={villageStyles.statNumber}>{village.recoveries}</Text>
              <Text style={villageStyles.statLabel}>Recoveries</Text>
            </View>
          </View>
          
          <Text style={[villageStyles.risk, village.risk === "medium risk" ? villageStyles.mediumRisk : villageStyles.lowRisk]}>
            {village.risk}
          </Text>
          
          <View style={villageStyles.trendContainer}>
            <Text style={villageStyles.trendText}>{village.trend}</Text>
            <TouchableOpacity style={villageStyles.detailsButton}>
              <Text style={villageStyles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
          
          <View style={villageStyles.waterQuality}>
            <Text style={villageStyles.waterTitle}>Water Quality: {village.waterQuality}</Text>
          </View>
        </View>
      ))}
      
      <View style={villageStyles.navButtons}>
        <TouchableOpacity style={villageStyles.navButton}>
          <Text style={villageStyles.navButtonText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={villageStyles.navButton}>
          <Text style={villageStyles.navButtonText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={villageStyles.navButton}>
          <Text style={villageStyles.navButtonText}>Awareness</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={villageStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={villageStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Generate Report Screen
const GenerateReportScreen = ({ navigation }) => {
  return (
    <ScrollView style={reportStyles.container}>
      <Text style={reportStyles.title}>Generate Report</Text>
      
      <View style={reportStyles.actionButtons}>
        <TouchableOpacity style={reportStyles.actionButton}>
          <Text style={reportStyles.actionButtonText}>Alert High-Risk Villages</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={reportStyles.actionButton}>
          <Text style={reportStyles.actionButtonText}>Contact Field Teams</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={reportStyles.sectionTitle}>Village Comparison - Weekly Trends</Text>
      <Text style={reportStyles.sectionSubtitle}>Case progression across monitored villages</Text>
      
      <View style={reportStyles.chartContainer}>
        <View style={reportStyles.chartYAxis}>
          <Text style={reportStyles.chartLabel}>24</Text>
          <Text style={reportStyles.chartLabel}>18</Text>
          <Text style={reportStyles.chartLabel}>12</Text>
          <Text style={reportStyles.chartLabel}>6</Text>
          <Text style={reportStyles.chartLabel}>0</Text>
        </View>
        
        <View style={reportStyles.chartBars}>
          <View style={reportStyles.barGroup}>
            <View style={[reportStyles.bar, {height: 80}]} />
            <Text style={reportStyles.barLabel}>Week 1</Text>
          </View>
          
          <View style={reportStyles.barGroup}>
            <View style={[reportStyles.bar, {height: 120}]} />
            <Text style={reportStyles.barLabel}>Week 2</Text>
          </View>
          
          <View style={reportStyles.barGroup}>
            <View style={[reportStyles.bar, {height: 160}]} />
            <Text style={reportStyles.barLabel}>Week 3</Text>
          </View>
          
          <View style={reportStyles.barGroup}>
            <View style={[reportStyles.bar, {height: 200}]} />
            <Text style={reportStyles.barLabel}>Week 4</Text>
          </View>
        </View>
      </View>
      
      <View style={reportStyles.legend}>
        <View style={reportStyles.legendItem}>
          <View style={[reportStyles.legendColor, {backgroundColor: '#4A90E2'}]} />
          <Text style={reportStyles.legendText}>Village A</Text>
        </View>
        <View style={reportStyles.legendItem}>
          <View style={[reportStyles.legendColor, {backgroundColor: '#50E3C2'}]} />
          <Text style={reportStyles.legendText}>Village B</Text>
        </View>
        <View style={reportStyles.legendItem}>
          <View style={[reportStyles.legendColor, {backgroundColor: '#F5A623'}]} />
          <Text style={reportStyles.legendText}>Village C</Text>
        </View>
      </View>
      
      <View style={reportStyles.navButtons}>
        <TouchableOpacity style={reportStyles.navButton}>
          <Text style={reportStyles.navButtonText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={reportStyles.navButton}>
          <Text style={reportStyles.navButtonText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={reportStyles.navButton}>
          <Text style={reportStyles.navButtonText}>Awareness</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={reportStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={reportStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="HotspotMap" component={HotspotMapScreen} />
        <Stack.Screen name="CaseReporting" component={CaseReportingScreen} />
        <Stack.Screen name="WaterQualityAssessment" component={WaterQualityAssessmentScreen} />
        <Stack.Screen name="CommunityAlerts" component={CommunityAlertsScreen} />
        <Stack.Screen name="Awareness" component={AwarenessScreen} />
        <Stack.Screen name="VillageTracker" component={VillageTrackerScreen} />
        <Stack.Screen name="GenerateReport" component={GenerateReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles for all screens
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

const hotspotStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  ngoList: {
    marginBottom: 20,
  },
  ngoItem: {
    marginBottom: 15,
  },
  ngoName: {
    fontSize: 16,
    fontWeight: '500',
  },
  ngoContact: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  mapButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contactButton: {
    backgroundColor: '#50E3C2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alertBox: {
    backgroundColor: '#FFF2CC',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  alertText: {
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const caseReportingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  symptomButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  symptomSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  symptomText: {
    fontSize: 14,
    color: '#333',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#50E3C2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const waterQualityStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#50E3C2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const alertsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  priorityFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityColumn: {
    width: '48%',
  },
  priorityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priorityItem: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  alertCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  alertDisease: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  alertLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  alertCases: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  alertDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  alertDetails: {
    marginBottom: 15,
  },
  alertDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  viewDetailsButton: {
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const awarenessStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  materialCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
  },
  materialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  materialSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  materialActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
  },
  actionDuration: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  actionLanguages: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const villageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  exportButton: {
    backgroundColor: '#50E3C2',
    padding: 10,
    borderRadius: 5,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  mapPlaceholder: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  mapText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  mapButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  mapButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  villageCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  villageName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  villagePopulation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  villageStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
    width: '48%',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  risk: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  mediumRisk: {
    color: '#F5A623',
  },
  lowRisk: {
    color: '#50E3C2',
  },
  trendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  trendText: {
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  waterQuality: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
  },
  waterTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const reportStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 20,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    marginRight: 10,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barGroup: {
    alignItems: 'center',
    width: '23%',
  },
  bar: {
    width: '80%',
    backgroundColor: '#4A90E2',
    borderRadius: 3,
  },
  barLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppNavigator;