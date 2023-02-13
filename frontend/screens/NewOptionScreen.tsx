import * as React from 'react';
import { View, StyleSheet, SafeAreaView, TextInput, Text} from 'react-native';
import { useState } from 'react';
import BackArrow from '../components/BackArrow';
import TextHeader from '../components/TextHeader';
import BackgroundBox from '../components/BackgroundBox';
import MenuText from '../components/MenuText';
import SmallButton from '../components/SmallButton';
import InfoBox from '../components/InfoBox';
import TimeOfDayButton from '../components/TimeOfDayButton';
import CalendarOption from '../components/CalenderOption';
import { updateDatePollDataWithNewOption, DatePollData } from '../services/DatePollServices';
import { updateLocationPollDataWithNewOption, LocationPollData } from '../services/LocationPollServices';
import { updateActivityPollDataWithNewOption, ActivityPollData } from '../services/ActivityPollServices';


interface Props {
    user: number
    polltype?: any
    setState: React.Dispatch<React.SetStateAction<string>>
}

export default function(props: Props){
    const {user, polltype, setState} = props;
    // Stages will be Location -> Activity Option -> Date Option (Calender date to choose) -> Day Date option (Time of day)
    const [pollView, setPollView] = useState<string>("calenderOption"); // This will need to change depending on the polltype
    const [savedActivityPoll, setSavedActivityPoll] = useState<string>("");
    const [savedLocationPoll, setSavedLocationPoll] = useState<string>("");
    const [savedDate, setSavedDated] = useState<string>("");
    const [savedTime, setSavedTime] = useState<string>("");
    const [dateBundle, setDateBundle] = useState<DatePollData>();
    const [locationBundle, setLocationBundle] = useState<LocationPollData>();
    const [activityBundle, setActivityBundle] = useState<ActivityPollData>();
    const [pollType, setPollType] = useState("Date");

    // Change state functions
    const changeFromActivityToConfirmation = () => {
        if(pollType === "Activity")
        setPollView("confirmation")
    }

    const changeFromLocationToConfirmation = () => {
        if(pollType === "Location")
        setPollView("confirmation")
    }

    const changeViewToCalender = () => {
        if(pollType === "Date")
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
            setSavedActivityPoll(activityValue)
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
                    <TextHeader>Add Activity Option</TextHeader>
                    <TextInput style={styles.inputBox} onChangeText={(inputText: string) => {
                                    activityValue = inputText;
                                }}
                                onEndEditing={onActivityInputEnd}/>
                </View>
            </BackgroundBox>
            <SmallButton title="Add Option" onPress={changeFromActivityToConfirmation}/></View>
            </>
    )}

    const LocationPollInput = () => {
        let locationValue: string;
        const onLocationInputEnd = () => {
            setSavedLocationPoll(locationValue)
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
                                    locationValue = inputText;
                                }}
                                onEndEditing={onLocationInputEnd}/>
                </View>
            </BackgroundBox>

            <SmallButton title="Add Option" onPress={changeFromLocationToConfirmation}/></View>
            </>
    )};
    let eventDate = new Date(savedDate+savedTime).toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    let eventTime = new Date(savedDate+savedTime).toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit'
    });

    const ConfirmationScreen = () => {
        function prepareBundle(){
            // Date/Time Bundle
            let dateStringKey : string = savedDate + savedTime;
            const newBundle: {[key: string]: [] }  = {}
            newBundle[dateStringKey]  = [];

            //Location Bundle
            let locationStringKey: string = savedLocationPoll;
            const newLocationBundle: {[key: string]: [] }  = {}
            newLocationBundle[locationStringKey] = []

            //Activity Bundle
            let activityStringKey: string = savedActivityPoll;
            const newActivityBundle: {[key: string]: [] } = {}
            newActivityBundle[activityStringKey] = []

            // Making the put requests:
           
            // Activity Data
            if(dateStringKey === "" && locationStringKey === "") {  
            updateActivityPollDataWithNewOption(user, newActivityBundle).then((data) => {
                setActivityBundle(data)
            })

            //Location Data
            } else if (dateStringKey === "" && activityStringKey === "") {
                updateLocationPollDataWithNewOption(user, newLocationBundle).then((data) => {
                        setLocationBundle(data)
                    })
            
            // Date/Time        
            } else if (activityStringKey === "" && locationStringKey === "") {
                 updateDatePollDataWithNewOption(user, newBundle).then((data) => {
                setDateBundle(data)
           
            })
            } 
          
                setSavedActivityPoll("");
                setSavedLocationPoll("");
                setSavedDated("");
                setSavedTime("");    
            
            setState("singlegroup")
          
        
        }
        return (
            <View>
            <BackgroundBox boxHeight={250} boxWidth={250}>
               <>
                <Text style={styles.title}>Check Details</Text>
                {savedActivityPoll !== "" ? <Text style={styles.reviewText}>Activity: {savedActivityPoll}</Text> : ""}
                {savedLocationPoll !== "" ? <Text style={styles.reviewText}>Location: {savedLocationPoll}</Text> : ""}
                {savedTime !== "" && savedDate ? <>
                <Text style={styles.reviewText}>Time: {eventTime}</Text>
                <Text style={styles.reviewText}>Date: {eventDate}</Text>
                </> : ""}
                </>
            </BackgroundBox>
            <View style={styles.backButtonHeaderContainer}>
                <View style={styles.buttonContainer}>
             <SmallButton title='Submit' onPress={() => prepareBundle()}></SmallButton>
             <SmallButton title='Go Back' onPress={changeViewToDay}></SmallButton>
             </View>
             </View>
           </View>  
        )
    }
    
    return (
        // container
        <>  
            {/* ACTIVITY */}
           
            {pollView === "activityOption" ? <ActivityPollInput></ActivityPollInput>: ""} 
            
            {/* LOCATION */}

            {pollView === "locationOption" ? <><LocationPollInput></LocationPollInput></>: ""} 

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
            <TimeOfDayButton timeOfDayOption='Morning' selected={savedTime === "T09:00" ? true : false} onPress={() => setSavedTime("T09:00")}/>
            <TimeOfDayButton timeOfDayOption='Afternoon' selected={savedTime === "T12:00" ? true : false} onPress={() => setSavedTime("T12:00")}/>
            <TimeOfDayButton timeOfDayOption='Evening' selected={savedTime === "T18:00" ? true : false} onPress={() => setSavedTime("T18:00")}/>
        </View>
        <View>
        <SmallButton title="Done" onPress={() => changeConfirmationScreen()}/>
        </View>
        </> : ""}
        {pollView === "confirmation" ? <>
        <ConfirmationScreen />
        </> : ""}

        </>
    )};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#25242B",
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
      filteredBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
 
      },

      inputBox: {
        marginTop: "10%",
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        backgroundColor: 'white',
        alignSelf: 'center'
      },
      title: {
        fontSize: 24,
        padding: 15,
        textAlign: 'center'
    },
    reviewText: {
        fontSize: 24,
        padding: 10,
        marginTop: '5%'
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 20,
    }
    


    })