import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { getGroupData, GroupData } from '../services/GroupServices';


export default function AllGroups(){

    const [groups, setGroup] = useState<GroupData[]>();

    useEffect(() => {
      getGroupData()
      .then((userGroups) => {
        setGroup(userGroups);
      })
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Groups view</Text>
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