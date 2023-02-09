import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

interface Props {
    user: number
}

export default function SettingsScreen(props: Props) {

  const { user } = props;

  function onPressAccountSetting(){
    return console.log("Account settings pressed")
  }
  function onPressContactsSetting(){
    return console.log("Contacts settings pressed")
  }
  function onPressNotificationSetting(){
    return console.log("Notification settings pressed")
  }

  
  return (

    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          
          onPress={onPressAccountSetting}
        >
          <Text style={styles.title1} >Account</Text>
        </TouchableOpacity>

      </View>
      <View>
      <TouchableOpacity
        activeOpacity={0.7}
        
        onPress={onPressContactsSetting}
      >
        <Text style={styles.title} >Contacts</Text>
      </TouchableOpacity>


      </View>
      <View>
      <TouchableOpacity
        activeOpacity={0.7}
        
        onPress={onPressNotificationSetting}
      >
        <Text style={styles.title}>Notifications</Text>
      </TouchableOpacity>

      </View>

    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#25242B'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF914D',
    paddingTop: '8%',
    marginLeft: '7.5%'
    
  },
  title1: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF914D',
    paddingTop: '20%',
    marginLeft: '7.5%'
  },
});