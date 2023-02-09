import * as React from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { getGroupData, GroupData } from '../services/GroupServices';
import GroupNameButton from '../components/GroupNameButton';
import navigation from "../navigation";
import { TabView } from '@rneui/base';
import Navigation from '../navigation';



export default function AllGroupsScreen(){

    const [groups, setGroup] = useState<GroupData[]>();
    const [singleGroup, setSingleGroup] = useState<GroupData>();

    useEffect(() => {
      getGroupData()
      .then((userGroups) => {
        setGroup(userGroups);
      }).then(()=>{
        resetSingleGroup()
      })
    }, [navigation]);


    var allUsersGroupsByName = groups?.flatMap(function(val, index){
      return <GroupNameButton key={index} title={val.groupName} status={false} onPress={()=>captureChosenGroup(val)}/>
     })

     function captureChosenGroup(group){
      setSingleGroup(group)
     }

     function resetSingleGroup (){
      setSingleGroup()
     }
     


    
    return (
        <SafeAreaView style={styles.container}>
          <Image source={require('../assets/GroupLogo1.png')}/>
          <Text>{singleGroup?.groupName}</Text>
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