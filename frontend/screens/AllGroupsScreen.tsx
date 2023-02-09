import * as React from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { NavigationContainer, TabRouter, useIsFocused } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { getGroupData, GroupData } from '../services/GroupServices';
import GroupNameButton from '../components/GroupNameButton';
import route from "../navigation";
import { TabView } from '@rneui/base';
import InfoBox from '../components/InfoBox';

interface Props {
  user: number
}

export default function AllGroupsScreen(props: Props) {

    const { user } = props;

  const isFocused = useIsFocused()

  const initialState = {
    id: "",
    groupName: "",
    events: [],
  }; 

  const [groups, setGroup] = useState<GroupData[]>();
    const [singleGroup, setSingleGroup] = useState(initialState);
    const [groupView, setGroupView] = useState("allgroups")

    useEffect(() => {
      if (isFocused){
        setSingleGroup(initialState)
        setGroupView("allgroups")
      }
      getGroupData()
      .then((userGroups) => {
        setGroup(userGroups);
      })
    }, [isFocused]);



    var allUsersGroupsByName = groups?.flatMap(function(val, index){
      return <GroupNameButton key={index} title={val.groupName} status={false} onPress={()=>captureChosenGroup(val)}/>
     })

     function captureChosenGroup(group:GroupData){
      setSingleGroup(group)
      setGroupView("singlegroup")
     }

     var singleGroupDetails


    
    return (
        <SafeAreaView style={styles.container}>
          <Image source={require('../assets/GroupLogo1.png')}/>
          {groupView === "allgroups" ? <ScrollView style={styles.scroll}>{allUsersGroupsByName}</ScrollView> : ""}
          {groupView==="singlegroup"? <InfoBox header={singleGroup.groupName}><Text>{singleGroup.id}</Text></InfoBox>: ""}
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
      },
      scroll: {
        flex: 1,
        width:'90%',
    }
  });