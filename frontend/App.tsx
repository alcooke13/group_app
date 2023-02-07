import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import LineBreak from './components/LineBreak';



export default function App() {
  


  return (

    <SafeAreaProvider>
      <Navigation />
      <StatusBar style="auto"/>
    </SafeAreaProvider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black'
  }
});
