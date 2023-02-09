import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getEventData, EventData } from '../services/EventServices';
import { useEffect, useState } from 'react';
import CalendarMonth from '../components/Calendar';
import InfoBox from '../components/InfoBox';
import TextHeader from '../components/TextHeader';

interface Props {
  user: number
}

export default function EventsScreen(props: Props) {

    const { user } = props;

    const [events, setEvents] = useState<EventData[]>();
    const [view, setView] = useState("list")

    useEffect(() => {
      getEventData()
      .then((allEvents) => {
        setEvents(allEvents);
      })
    }, []);



    //3 Types of views -- state of view/setView
    // Type 1 - Default = screen with calender --> (if view === calender) render calender screen
    // Type 2 - List view = listing all events specific to that user (all events from different groups) if (view === list) render list view
    // Type 3 - A single Day if (view === singleDay) == render day view

    // {view === "calender" ? <CalendarMonth></CalendarMonth> : ""}

    
    return (
        <SafeAreaView style={styles.container}>
            {view === "calender" ? <InfoBox header='Calender'><CalendarMonth /></InfoBox> : ""}
            {view === "list" ? <InfoBox header='testing'><Text>Testing Testing</Text></InfoBox>: ""} 
            {/* Second Type */}
    

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
      
  });