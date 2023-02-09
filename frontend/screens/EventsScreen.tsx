import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { getEventData, EventData } from '../services/EventServices';
import { getGroupData, GroupData } from '../services/GroupServices';
import { useEffect, useState } from 'react';
import CalendarMonth from '../components/Calendar';
import InfoBox from '../components/InfoBox';
import SmallButton from '../components/SmallButton';
import BackArrow from '../components/BackArrow';


export default function EventsScreen(){
    const [events, setEvents] = useState<EventData[]>();
    const [view, setView] = useState("calender")
    const [groups, setGroups] = useState<GroupData[]>();

    useEffect(() => {
      
      getEventData()
      .then((allEvents) => {
        setEvents(allEvents);
      
      getGroupData()
      .then((allGroups) => {
        setGroups(allGroups)
      });
      
      });


    }, []);


    const toggleCalenderView = () => {
      setView("calender");
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
        <Text>{val.events[index].activity}</Text>
        <Text>{val.events[index].eventLocation}</Text>
        <Text>{val.events[index].date}</Text>
      </View>
      </InfoBox></>
    });

    const chosenEvent = <InfoBox header='TEST SINGLE DAY'><Text>TESTING TESTING</Text></InfoBox>

    
    return (
      <SafeAreaView style={[styles.containerList, view === "calender" ? styles.containerCalender: styles.containerList]}>
        {/* LIST VIEW */}
          {view === "list" ? <><View style={styles.calendarButtonBox}> 
            <SmallButton title="Calender View" onPress={toggleCalenderView} style={styles.button}/>
          </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-evenly', alignSelf:'auto' }}>
           {eventList}
            </ScrollView></> : ""}

        {/* CALENDER VIEW */}

          {view === "calender" ? <View style={styles.outer}>
            <View style={styles.calendarButtonBox}> 
            <SmallButton title="List View" onPress={toggleListView} style={styles.button}/>
          </View>
          <View style={styles.containerCalender}>
            <InfoBox header='Calender'>
              <CalendarMonth onPress={chooseDate} calenderEvents={events}/>
            </InfoBox>
            </View>
            </View>: ""}   
        {/* Changing Scroll View To View to stop from Scrolling calender however to fix Spacing between button and calender */}

        {/* SINGLE DAY VIEW */}
        {view === "singleDay" ? <View><View style={styles.singleBackBox}><BackArrow onPress={toggleCalenderView}/></View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}>
        {chosenEvent}  
        </ScrollView></View> : ""}

        </SafeAreaView>
    )    
}


const styles = StyleSheet.create({
    containerList: {
      backgroundColor: "#25242B",
      flex:1
      
    },

    containerCalender: {
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