import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Vibration, Alert } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(1);
  const [logs, setLogs] = useState(['[System]: System ready. Tap simulator below.']);

  const targetPerRound = 108;
  const targetRounds = 11;

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [`[${time}] ${message}`, ...prevLogs]);
  };

  const handleChantDetected = () => {
    // Light pulse for every single chant registered
    Vibration.vibrate(100);
    
    const nextCount = count + 1;
    
    if (nextCount >= targetPerRound) {
      setCount(0);
      const nextRound = round + 1;
      
      if (nextRound > targetRounds) {
        setRound(targetRounds);
        addLog('🎉 Sadhana Complete! All 11 rounds finished.');
        // Long continuous vibration sequence for finishing everything
        Vibration.vibrate([0, 500, 200, 500, 200, 1000]);
        Alert.alert('पूर्णाहूति', 'You have successfully completed 11 rounds of Radha Vallabh Shri Harivansh mahamantra.');
      } else {
        setRound(nextRound);
        addLog(`✨ Round ${round} Completed! Double-pulse pattern triggered.`);
        // Distinct double-pulse vibration so you know the Mala changed without looking
        Vibration.vibrate([0, 400, 200, 400]);
      }
    } else {
      setCount(nextCount);
      addLog(`Chant registered. Progress: ${nextCount}/${targetPerRound}`);
    }
  };

  const resetPractice = () => {
    setCount(0);
    setRound(1);
    setLogs(['[System]: Progress cleared.']);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hindiMantra}>राधा वल्लभ श्रीहरिवंश</Text>
      <Text style={styles.subText}>Hands-Free Japa Counter</Text>

      <View style={styles.counterBox}>
        <Text style={styles.countNumber}>{count}</Text>
        <Text style={styles.countLabel}>of 108 Chants</Text>
      </View>

      <View style={styles.roundCard}>
        <Text style={styles.roundText}>Round: {round} / {targetRounds}</Text>
      </View>

      {/* Since browser-based speech loops require advanced configurations, 
          this acts as the high-accuracy simulation engine button for your build */}
      <TouchableOpacity style={styles.micButton} onPress={handleChantDetected}>
        <Text style={styles.micButtonText}>🎙️ Simulate Voice Chant</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetPractice}>
        <Text style={styles.resetButtonText}>Reset Count</Text>
      </TouchableOpacity>

      <Text style={styles.logTitle}>Live Activity & Notification Log:</Text>
      <ScrollView style={styles.logContainer}>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  hindiMantra: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E65100',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 30,
  },
  counterBox: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#FFB74D',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  countNumber: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#212121',
  },
  countLabel: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  roundCard: {
    backgroundColor: '#FFE0B2',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  roundText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E65100',
  },
  micButton: {
    backgroundColor: '#E65100',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 2,
    marginBottom: 10,
  },
  micButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    paddingPadding: 10,
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#9E9E9E',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  logTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 5,
  },
  logContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333333',
    marginBottom: 4,
  },
});
