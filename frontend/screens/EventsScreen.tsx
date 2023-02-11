import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { getEventData, EventData } from '../services/EventServices';
import { getGroupData, GroupData } from '../services/GroupServices';
import { useEffect, useState } from 'react';
import CalendarMonth from '../components/Calendar';
import InfoBox from '../components/InfoBox';

import SmallButton from '../components/SmallButton';
import BackArrow from '../components/BackArrow';
import { useIsFocused } from "@react-navigation/native";


interface Props {
  user: number
}

export default function EventsScreen(props: Props) {

    const isFocused = useIsFocused();

    const { user } = props;

    const [events, setEvents] = useState<EventData[]>();
    const [view, setView] = useState("calendar")
    const [groups, setGroups] = useState<GroupData[]>();

    useEffect(() => { 
      if (isFocused) { 
        setView("calendar") ;

        getEventData()
        .then((allEvents) => {
          setEvents(allEvents);
        });
        
        getGroupData()
        .then((allGroups) => {
          setGroups(allGroups)
        });
      }
    }, [isFocused]);


    const toggleCalendarView = () => {
      setView("calendar");
    };

    const toggleListView = () => {
      setView("list");
    };

    const chooseDate = () => {
      setView("singleDay");
      
    }

    const eventList = groups?.map(function(val, index){
      return <>
      <InfoBox header={val.groupName} key={index}>
        <View style={styles.textBox}>
          <Text>{val.events[0].activity}</Text>
          <Text>{val.events[0].eventLocation}</Text>
          <Text>{val.events[0].date}</Text>
        </View>
      </InfoBox></>
    });
    
    return (
      <SafeAreaView style={[styles.containerList, view === "calendar" ? styles.containerCalendar: styles.containerList]}>
        {/* LIST VIEW */}
          {view === "list" ? <><View style={styles.calendarButtonBox}> 
            <SmallButton title="Calendar View" onPress={toggleCalendarView} style={styles.button}/>
          </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-evenly', alignSelf:'auto' }}>
           {eventList}
            </ScrollView></> : ""}

        {/* CALENDAR VIEW */}

          {view === "calendar" ? <View style={styles.outer}>
            <View style={styles.calendarButtonBox}> 
            <SmallButton title="List View" onPress={toggleListView} style={styles.button}/>
          </View>
          <View style={styles.containerCalendar}>
            <InfoBox header='Calendar'>
              <CalendarMonth onPress={chooseDate} calenderEvents={events}/>
            </InfoBox>
            </View>
            </View>: ""}   
        {/* Changing Scroll View To View to stop from Scrolling calendar however to fix Spacing between button and calendar */}

        {/* SINGLE DAY VIEW */}
        {view === "singleDay" ? <View><View style={styles.singleBackBox}><BackArrow onPress={toggleCalendarView}/></View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}>
          {eventList}  
        </ScrollView></View> : ""}
        
        </SafeAreaView>
    )    
}


const styles = StyleSheet.create({
    containerList: {
      backgroundColor: "#25242B",
      flex:1
      
    },

    containerCalendar: {
      backgroundColor: "#25242B",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
      
    },
    calendarButtonBox: {
      marginBottom: "5%",
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginRight: '5%',
      marginTop: '5%'
    },
    
    singleBackBox: {
      marginBottom: "5%",
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: '5%',
      marginTop: '5%'
    },
    textBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    outer: {
      width: "100%",
      height: "100%",
    },

    button: {
      backgroundColor: 'red'
    }

  });