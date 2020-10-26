import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Archivo_600SemiBold, useFonts} from '@expo-google-fonts/archivo'
import {Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_500Medium_Italic} from '@expo-google-fonts/poppins'
import Routes from './src/routes';
import { AppLoading } from 'expo';


export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_600SemiBold,
    Poppins_600SemiBold, 
    Poppins_600SemiBold_Italic, 
    Poppins_500Medium_Italic
  })

  if(!fontsLoaded){
    return(
      <AppLoading />
    )
  }
  return (
    <Routes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});