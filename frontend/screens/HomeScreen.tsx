import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfoBox from '../components/InfoBox';
import TickBox from '../components/TickBox';
import {useState} from 'react';

export default function HomeScreen(){
    const [isSelected, setSelection] = useState(false);
    function onPress(){
        setSelection(!isSelected)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text  style={styles.title} >Home view</Text>
            
            <TickBox value={isSelected} onPress={onPress} size={100} backgroundColor={'white'}  ></TickBox>
        </SafeAreaView>
    )

   
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25242B'
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      }
  });