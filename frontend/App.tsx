import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { useEffect, useState , useCallback} from 'react';
import { getGroupData, GroupData } from './services/GroupServices';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
  
SplashScreen.preventAutoHideAsync();
  
  export default function App() {
    const [user, setUser] = useState(1);

    const [fontsLoaded] = useFonts({
      'Ubuntu-Regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
      'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf')
    });
  
    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
      return null;
    }




  return (
    <SafeAreaProvider onLayout={onLayoutRootView} >
      <Navigation user={user} />
      <StatusBar style='auto'/>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black'
  }
});
