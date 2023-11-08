import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const SplashScreen = () => {

  const navegar = useNavigation();
  const [loadingProgress, setLoadingProgress] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      if (loadingProgress < 100) {
        setLoadingProgress(loadingProgress + 1);
      } else {
        clearInterval(interval);
        navegar.navigate("Login");
        
      }
    }, 10); // Adjust the progress bar fill speed

    return () => clearInterval(interval);
  }, [loadingProgress]);

  return (
    <View style={styles.splashScreen}>
      <View style={styles.splashContent}>
        <Image source={require('../img/LogoPFCIniciales_.png')} style={styles.logo} />
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${loadingProgress}%` }]} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Proces Flow Mate by PFM is licensed under CC BY-NC-ND 4.0
          <Image
            source={{
              uri: 'https://mirrors.creativecommons.org/presskit/icons/cc.svg',
            }}
            style={styles.footerIcon}
          />
          <Image
            source={{
              uri: 'https://mirrors.creativecommons.org/presskit/icons/by.svg',
            }}
            style={styles.footerIcon}
          />
          <Image
            source={{
              uri: 'https://mirrors.creativecommons.org/presskit/icons/nc.svg',
            }}
            style={styles.footerIcon}
          />
          <Image
            source={{
              uri: 'https://mirrors.creativecommons.org/presskit/icons/nd.svg',
            }}
            style={styles.footerIcon}
          />
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashContent: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  progressBar: {
    width: 200,
    height: 10,
    backgroundColor: '#ccc',
    marginTop: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6c757d',
  },
  footerIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
});
