import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { getEventData, EventData } from '../services/EventServices';
import { useEffect, useState } from 'react';
import CalendarMonth from '../components/Calendar';
import InfoBox from '../components/InfoBox';
import SmallButton from '../components/SmallButton';
import BackArrow from '../components/BackArrow';


export default function EventsScreen(){
    const [events, setEvents] = useState<EventData[]>();
    const [view, setView] = useState("singleDay")

    useEffect(() => {
      getEventData()
      .then((allEvents) => {
        setEvents(allEvents);
      })
    }, []);
    
    const toggleCalenderView = () => {
      setView("calender");
    };

    const toggleListView = () => {
      setView("list");
    };

    const toggleDayView = () => {
      setView("singleDay")
    }

    const eventList = events?.flatMap(function(val, index){
      return <InfoBox key={index} header={val.eventName}>
        <View style= {styles.textBox}>
          <Text>Activity: {val.activity}</Text>
          <Text>Date: {val.date}</Text>
          <Text>Location: {val.eventLocation}</Text>
        </View>  
        </InfoBox>
    });

    const chosenEvent = <InfoBox header='TEST SINGLE DAY'><Text>TESTING TESTING</Text></InfoBox>

    
    return (
      <SafeAreaView style={[styles.containerList, view === "calender" ? styles.containerCalender: styles.containerList]}>
        {/* LIST VIEW */}
          {view === "list" ? <><View style={styles.calendarButtonBox}> 
            <SmallButton title="Calender View" onPress={toggleCalenderView}/>
          </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
           {eventList}
            </ScrollView></> : ""}

        {/* CALENDER VIEW */}

          {view === "calender" ? <View style={styles.outer}>
            <View style={styles.calendarButtonBox}> 
            <SmallButton title="List View" onPress={toggleListView}/>
          </View>
          <ScrollView style={styles.containerCalender} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}>
            <InfoBox header='Calender'><CalendarMonth /></InfoBox>
            </ScrollView>
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
    }

  });