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
import { updateDatePollDataWithNewOption, DatePollData } from '../services/DatePollServices';


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
    const [bundle, setBundle] = useState<DatePollData>()

    
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

    const changeConfirmationScreen = () => {
        setPollView("confirmation")
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

    const ConfirmationScreen = () => {
        function prepareBundle(){
            let dateStringKey : string = savedDate + savedTime;
            const newBundle: {[key: string]: [] }  = {}
                
            newBundle[dateStringKey]  = []
            
            updateDatePollDataWithNewOption(1, newBundle).then((data)=> {
                setBundle(data)
                console.log(bundle)
            })
        }
        return (
            <BackgroundBox>
                <><SmallButton title='Submit' onPress={() => prepareBundle()}></SmallButton>
                <SmallButton title='Go Back' onPress={changeViewToDay}></SmallButton></>
            </BackgroundBox>
        )
    }


    
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
            <TimeOfDayButton timeOfDayOption='Morning' onPress={() => setSavedTime("T09:00")}/>
            <TimeOfDayButton timeOfDayOption='Afternoon' onPress={() => setSavedTime("T12:00")}/>
            <TimeOfDayButton timeOfDayOption='Evening' onPress={() => setSavedTime("T18:00")}/>
        </View>
        <View>
        <SmallButton title="Done" onPress={() => changeConfirmationScreen()}/>
        </View>
        </> : ""}


        {pollView === "confirmation" ? <>
        <ConfirmationScreen />
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