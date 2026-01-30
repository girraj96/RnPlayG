import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Routes from './src/navigation/Routes';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
