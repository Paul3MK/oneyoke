import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Link, router } from 'expo-router';
import React from 'react';
import NavigateButton from '@/components/CTA/NavigateButton';

export default function Landing() {
  return (
    <View style={styles.container}>
      <View style={styles.landingTop}>
      <Text style={styles.title}>OneYoke</Text>
      </View>
      <View style={styles.landingBottom}>
        <Text style={styles.subtitle}>Kingdom living, together</Text>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        
        {/* <NavigateButton link={"/access_control/"} text={"Continue with email"} /> */}
        <NavigateButton link={"/(general)"} text={"Come inside"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#440000"
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  landingTop: {
    flex: 1,
    paddingTop: 32,
    width: "100%",
    alignItems: "center"
  },
  landingBottom: {
    height: 120,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  subtitle: {
    fontSize: 18
  }
});