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
import TextHeader from '../components/TextHeader';
import ScreenHeaderText from '../components/ScreenHeaderText';
import BackArrow from '../components/BackArrow';

interface Props {
  user: number
}

export default function AllGroupsScreen(props: Props) {

    const { user } = props;

  const isFocused = useIsFocused()

  const initialState = {
    id: "",
    groupName: "",
    events: [
      {
      id:"",
      date:"",
      eventName:"",
      eventLocation:"", 
      activity:"", 
      activityPoll:"",
      locationPoll:"", 
      datePoll:""
      }
    ],
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


     function SingleGroupDetails(){
        if (Date.parse(singleGroup.events[0].date) > Date.now()) {
          return (
            <>
            <TextHeader>{singleGroup.events[0].eventName}</TextHeader>
            <>
            <Text>Date:         {singleGroup.events[0].date}</Text>
            <Text>Time:         TBC</Text>
            <Text>Location:   {singleGroup.events[0].eventLocation}</Text>
            </>
            </>
            )
                } else
                {
                  return (
                    <>
                    <TextHeader> No upcoming event </TextHeader>
                    <Text>Date:        </Text>
                    <Text>Time:        </Text>
                    <Text>Location:   </Text>
                    </>
                    )
                }    
     }

     function AllGroupView(){
      return(
      <>
      <Image source={require('../assets/GroupLogo1.png')}/>
      <ScrollView style={styles.scroll}>{allUsersGroupsByName}</ScrollView> 
      </>
      ) 
    }
     
     function SingleGroupView(){
      return(
      <>
      <View style={styles.header}>
          <BackArrow onPress={() => setGroupView("allgroups")}></BackArrow>
          <ScreenHeaderText>{singleGroup.groupName}</ScreenHeaderText>
        </View>
            <InfoBox header='Next Event'><SingleGroupDetails /></InfoBox>
          </>
        )
     }


    
    return (
        <SafeAreaView style={styles.container}>
          {groupView === "allgroups" ? <AllGroupView/> : ""}
          {groupView==="singlegroup"? <SingleGroupView/>: ""}
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
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center'

      }
  });