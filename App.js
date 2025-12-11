import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Switch, SafeAreaView, StatusBar, Alert
} from 'react-native';
import { Mail, Lock, Shield, Bus, Utensils, Smartphone, Gamepad2, GraduationCap } from 'lucide-react-native';

// --- CONFIGURATION ---
// IMPORTANT: If using Android Emulator, use 'http://10.0.2.2:8000'
// If using physical phone, use your PC's IP address like 'http://192.168.1.5:8000'
const API_URL = 'http://127.0.0.1:8000'; 

const COLORS = {
  background: '#EBF5FF', primary: '#5B9EE1', text: '#1F2937', 
  textLight: '#9CA3AF', success: '#10B981', danger: '#EF4444'
};

// --- SCREENS ---

// 1. LOGIN SCREEN
const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // connecting to the Python Backend
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(); // Switch screen
      } else {
        Alert.alert("Login Failed", data.detail || "Check your credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to Python Server. Is it running?");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.headerContainer}>
        <Shield size={60} color={COLORS.primary} fill="#D1E9FF" />
      </View>
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to access your account</Text>

        <View style={styles.inputContainer}>
          <Mail color={COLORS.textLight} size={20} />
          <TextInput 
            placeholder="Email (test@example.com)" 
            style={styles.input} 
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock color={COLORS.textLight} size={20} />
          <TextInput 
            placeholder="Password (password123)" 
            secureTextEntry 
            style={styles.input} 
            placeholderTextColor={COLORS.textLight} 
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>{loading ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>
        
        <Text style={{color: COLORS.textLight, fontSize: 12, marginTop: 10}}>
          (Make sure Python backend is running!)
        </Text>
      </View>
    </View>
  );
};

// 2. ACTIVITY SCREEN (Static UI)
const ActivityScreen = () => {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.navHeader}><Text style={styles.navTitle}>Activity & Limits</Text></View>
        <View style={styles.card}>
            <View style={styles.timelineItem}>
                <Utensils size={20} color="black" />
                <View style={{flex:1, marginLeft:15}}>
                    <Text style={{fontWeight:'bold'}}>Today</Text><Text style={{color:'#999'}}>Canteen</Text>
                </View>
                <Text style={{fontWeight:'bold'}}>-RM5.00</Text>
            </View>
        </View>
    </ScrollView>
  );
};

// 3. APP RESTRICTION SCREEN (Interactive)
const AppRestrictionScreen = () => {
  const [socialEnabled, setSocial] = useState(false);
  
  return (
    <ScrollView style={styles.container}>
        <View style={styles.navHeader}><Text style={styles.navTitle}>App Restriction</Text></View>
        <View style={styles.cardRow}>
            <View style={[styles.appIconBox, { backgroundColor: '#E11D4820' }]}>
                <Smartphone color="#E11D48" size={24}/>
            </View>
            <View style={{flex: 1, paddingHorizontal: 12}}>
                <Text style={styles.appTitle}>Social Media</Text>
                <Text style={{color: !socialEnabled ? COLORS.danger : COLORS.success}}>
                    {!socialEnabled ? "● BLOCKED" : "● Allowed"}
                </Text>
            </View>
            <Switch value={socialEnabled} onValueChange={setSocial} />
        </View>
    </ScrollView>
  );
};

// --- MAIN NAVIGATOR ---
export default function App() {
  const [screen, setScreen] = useState('login');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <StatusBar barStyle="dark-content" />
      {screen === 'login' && <LoginScreen onLoginSuccess={() => setScreen('activity')} />}
      {screen === 'activity' && <ActivityScreen />}
      {screen === 'restriction' && <AppRestrictionScreen />}

      {/* Dev Nav */}
      <View style={styles.devNav}>
        <TouchableOpacity onPress={() => setScreen('login')}><Text style={styles.devNavText}>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('activity')}><Text style={styles.devNavText}>Activity</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('restriction')}><Text style={styles.devNavText}>Apps</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'space-between' },
  container: { flex: 1, padding: 20 },
  headerContainer: { height: '30%', justifyContent: 'center', alignItems: 'center' },
  bottomSheet: { backgroundColor: 'white', height: '70%', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginBottom: 30 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, width: '100%', height: 50 },
  input: { flex: 1, marginLeft: 10 },
  primaryButton: { backgroundColor: COLORS.primary, width: '100%', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  primaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  // Dashboard Styles
  navHeader: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  navTitle: { fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 20 },
  timelineItem: { flexDirection: 'row', alignItems: 'center' },
  cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 16 },
  appIconBox: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  appTitle: { fontWeight: 'bold', fontSize: 16 },
  
  devNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#fff', position: 'absolute', bottom: 0, width: '100%' },
  devNavText: { fontWeight: 'bold', color: COLORS.primary }
});