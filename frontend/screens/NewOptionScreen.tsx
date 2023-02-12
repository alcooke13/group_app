import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import BackArrow from '../components/BackArrow';
import TextHeader from '../components/TextHeader';
import BackgroundBox from '../components/BackgroundBox';
import MenuText from '../components/MenuText';
import SmallButton from '../components/SmallButton';
import InfoBox from '../components/InfoBox';
import CalendarMonth from '../components/Calendar';
import TimeOfDayButton from '../components/TimeOfDayButton';
import CalendarOption from '../components/CalenderOption';


interface Props {
    user: number
}

export default function(props: Props){
    const {user} = props;
    // Stages will be Location -> Activity Option -> Date Option (Calender date to choose) -> Day Date option (Time of day)
    const [pollView, setPollView] = useState<string>("activityOption");
    const [activityPollData, setActivityPollData] = useState<string>("");
    const [locationPollData, setLocationPollData] = useState<string>("");
    const [datePollData, setDatePollData] = useState<Date>();
    const [savedDate, setSavedDated] = useState<string>("");
    const [savedTime, setSavedTime] = useState<string>("");
    
    // Change state functions
    const changeViewToLocation = () => {
        setPollView("locationOption")
    }

    const changeViewToActivity = () => {
        setPollView("activityOption")
    }

    const changeViewToCalender = () => {
        setPollView("calenderOption")
    }

    const changeViewToDay = () => {
        setPollView("dayOption")
    }

    const ActivityPollInput = () => {
        let activityValue: string;
        const onActivityInputEnd = () => {
            setActivityPollData(activityValue)
        }
        return (
        <>
                <View style ={styles.backButtonHeaderContainer}>
                <BackArrow onPress={() => console.log("back")}/>
                <MenuText>Activity Poll</MenuText>
                </View>
           
            <View style={styles.innerContainer}>
            <BackgroundBox  boxHeight='35%' >
                <View style={styles.textBox}>
                    <TextHeader>Option Input</TextHeader>
                    <TextInput style={styles.inputBox} onChangeText={(inputText: string) => {
                                    activityValue = inputText;;
                                }}
                                onEndEditing={onActivityInputEnd}/>
                </View>
            </BackgroundBox>
            <SmallButton title="Add Option" onPress={changeViewToLocation}/></View>
            </>
    )}

    const LocationPollInput = () => {
        let locationValue: string;
        const onLocationInputEnd = () => {
            setActivityPollData(locationValue)
        }
        return (
        <>
                <View style ={styles.backButtonHeaderContainer}>
                <BackArrow onPress={() => console.log("back")}/>
                <MenuText>Location Poll</MenuText>
                </View>
           
            <View style={styles.innerContainer}>
            <BackgroundBox  boxHeight='35%' >
                <View style={styles.textBox}>
                    <TextHeader>Option Input</TextHeader>
                    <TextInput style={styles.inputBox} onChangeText={(inputText: string) => {
                                    locationValue = inputText;;
                                }}
                                onEndEditing={onLocationInputEnd}/>
                </View>
            </BackgroundBox>

            <SmallButton title="Add Option" onPress={changeViewToCalender}/></View>
            </>
    )};


    
    return (
        // container
        <SafeAreaView style={styles.container}> 
            
            {/* ACTIVITY */}
           
            {pollView === "activityOption" ? <ActivityPollInput></ActivityPollInput> : ""} 
            
            {/* LOCATION */}

            {pollView === "locationOption" ? <LocationPollInput></LocationPollInput> : ""} 

            {/* DATEPOLL CALENDER */}

            {pollView === "calenderOption" ? 
            <View style={styles.outer}>
          <View style={styles.containerCalendar}>
            <InfoBox header='Calendar'>
            <CalendarOption onPress={(changeViewToDay)} changeViewToDay={changeViewToDay} setSavedDate={setSavedDated}/>
            </InfoBox>
            </View>
            </View>: ""}

            {/* DAY VIEW */}

        {pollView === "dayOption" ? <>
        <View style={styles.backButtonHeaderContainer}>
            <BackArrow onPress={() => console.log("back")}/>
            <MenuText>Date Poll</MenuText>
        </View>
        <View>
            <TimeOfDayButton timeOfDayOption='Morning' onPress={()=> console.log("pressed Morning")}/>
            <TimeOfDayButton timeOfDayOption='Afternoon' onPress={()=> console.log("pressed Afternoon")}/>
            <TimeOfDayButton timeOfDayOption='Evening' onPress={()=> console.log("pressed Evening")}/>
        </View>
        <View>
        <SmallButton title="Done" onPress={changeViewToActivity}/>
        </View>
        </> : ""}


        </SafeAreaView>

    
    )};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#25242B",
        flex:1,
    },

    backButtonHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    innerContainer: {
        backgroundColor: "#25242B",
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
        
      },
  
      containerCalendar: {
        backgroundColor: "#25242B",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        
      },
      textBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '15%'
      },
      outer: {
        width: "100%",
        height: "100%",
      },
      button: {
        backgroundColor: 'red'
      },
      filteredBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
      
      },
      inputBox: {
        backgroundColor: "#fff",
        padding: 30,
        width: "80%",
        marginTop: '5%',
        color: "#000",
      }


    })