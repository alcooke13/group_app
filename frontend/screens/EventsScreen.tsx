import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { getEventData, EventData, getEventDataByUserId } from '../services/EventServices';
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
    const [date, setDate] = useState("")

    useEffect(() => { 
      if (isFocused) { 
        setView("calendar") ;

        getEventDataByUserId(user)
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
      console.log(date)
      setView("singleDay");
      
      
    }
    //Step 1
    // Gets all events as an array of key value pairs, date in YYYY-MM-DD as key with value of another key value pair of marked: true
    const datesToMark = events?.map((date) => {
      let dateObj: any = {};
      dateObj[new Date(date.date).toLocaleDateString("fr-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          })] = {marked: true} 
      return dateObj
  });
  
  //Step 2
  // Calender doesn't accept the array this converts datesToMark to a single object with multiple key value pairs inside to mark dates in the calender
  let resultDates = datesToMark?.reduce(function(result, currentObject) {
      for(let key in currentObject) {
          if (currentObject.hasOwnProperty(key)) {
              result[key] = currentObject[key];
          }
      }
      return result;
  }, {});

  const filteredEvents = events?.map((event, index) => {
    if(new Date(event.date).toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) === date){
      console.log("WORKS")
      return <>
      <View>
        <Text>TESTING 123</Text>
      </View>
        </>
    }
    
  })

    const eventList = groups?.map((group)=>  {
      return group.events.map((event, index) => {
        return <InfoBox header={group.groupName} key={index}>
        <View style={styles.textBox}>
          <Text>{event.activity}</Text>
          <Text>{event.eventLocation}</Text>
          <Text>{new Date(event.date).toLocaleDateString("en-GB", {
            // year: "numeric",
            month: "short",
            day: "2-digit",
            weekday: "long"
            })}</Text>
        </View>
      </InfoBox>
      })
    })

    
    return (
      <SafeAreaView style={[styles.containerList, view === "calendar" ? styles.containerCalendar: styles.containerList]}>
        {/* LIST VIEW */}
          {view === "list" ? <><View style={styles.calendarButtonBox}> 
            <SmallButton title="Calendar View" onPress={toggleCalendarView} style={styles.button}/>
          </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-evenly'}}>
           {eventList}
            </ScrollView></> : ""}

        {/* CALENDAR VIEW */}

          {view === "calendar" ? <View style={styles.outer}>
            <View style={styles.calendarButtonBox}> 
            <SmallButton title="List View" onPress={toggleListView} style={styles.button}/>
          </View>
          <View style={styles.containerCalendar}>
            <InfoBox header='Calendar'>
              <CalendarMonth onPress={chooseDate} calendarEvents={events} chooseDate={chooseDate} setDate={setDate} resultDates={resultDates}/>
            </InfoBox>
            </View>
            </View>: ""}   

        {/* FILTERERED LIST OF EVENTS ON A CHOSEN DATE */}
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
      
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: "20%"
    },
    outer: {
      width: "100%",
      height: "100%",
    },

    button: {
      backgroundColor: 'red'
    }

  });