import * as React from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { getGroupData, GroupData } from '../services/GroupServices';
import GroupNameButton from '../components/GroupNameButton';


export default function AllGroupsScreen(){

    const [groups, setGroup] = useState<GroupData[]>();

    useEffect(() => {
      getGroupData()
      .then((userGroups) => {
        setGroup(userGroups);
      })
    }, []);

    var allUsersGroupsByName = groups?.flatMap(function(val){
      return <GroupNameButton title={val.groupName} status={false} onPress={singleGroupView(val.groupName)}/>
     })

     function singleGroupView(val : string)
      console.log(val)
     }


    
    return (
        <SafeAreaView style={styles.container}>
          <Image source={require('../assets/GroupLogo1.png')}/>
          {allUsersGroupsByName}
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