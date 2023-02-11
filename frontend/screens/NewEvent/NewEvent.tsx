import { Text, View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getEventData, EventData } from '../../services/EventServices';
import { useEffect, useState } from 'react';

import BackArrow from '../../components/BackArrow';
import BackgroundBox from '../../components/BackgroundBox';
import TickBox from '../../components/TickBox';
import SmallButton from '../../components/SmallButton';
import LineBreak from '../../components/LineBreak';
// import EventServices from '../../services/EventServices'


// const detailsKnownCheck: { [key: string]: boolean } = { 'date': false, 'activity': false, 'location': false };



export default function NewEvent() {


    const [eventTitle, setEventTitle] = useState('');
    const [detailsKnown, updateDetailsKnown] = useState<{ [key: string]: boolean }>({ 'date': false, 'activity': false, 'location': false })
    const [dateProvided, setDate] = useState<string>("")
    const [activityProvided, setActivity] = useState<string>("")
    const [locationProvided, setLocation] = useState<string>("")
    const [review, setReview] = useState<boolean>(false)
    const [currentStage, updateStage] = useState<string>("Event Name")

    useEffect(() => {

    }, []);


    // set up useStates for logic flow
    // starts from group page, creates a new event for that group

    const onDetailTickBoxPress = (detailType: string) => {
        const newDetailsKnown: { [key: string]: boolean } = { ...detailsKnown }
        newDetailsKnown[detailType] = !detailsKnown[detailType]
        updateDetailsKnown(newDetailsKnown);
        console.log(detailsKnown)
    }

    function StageController() {

        switch (currentStage) {
            case "Event Name":
                updateStage("Details Known");
                break;
            case "Details Known": case "Date Input": case "Activity Input": case "Location Input":
                if (detailsKnown.date) {
                    updateStage("Date Input");
                    onDetailTickBoxPress("date");
                    break;
                } else if (detailsKnown.location) {
                    updateStage("Location Input");
                    onDetailTickBoxPress("location");
                    break;
                } else if (detailsKnown.activity) {
                    updateStage("Activity Input");
                    onDetailTickBoxPress("activity");
                    break;
                } else {
                    updateStage("Review");
                    break;
                }

            case "Review":
                if (!review) {
                    updateStage("Event name");
                    setDate("");
                    setActivity("");
                    setLocation("");
                    break;
                } else {
                    // go to group
                }
        }

    }

    // Step 1: Ask user for the Events name
    const EventName = () => {
        let titleValue: string;


        const onTitleEnd = () => {
            setEventTitle(titleValue)
        }

        return (
            <View style={styles.container}>
                <BackgroundBox>
                    <View>
                        <Text style={{ fontSize: 24, color: 'black', margin: "10%", textAlign: 'center' }} >
                            What is your events name?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => {
                                    titleValue = text;
                                }}
                                onEndEditing={onTitleEnd}
                            />


                        </View>
                    </View>
                </BackgroundBox>
                <View style={styles.buttonParent}>

                    <SmallButton title={"Submit"} onPress={() => {
                        if (!titleValue) {
                            alert('Please enter an event name');
                        }
                        else {
                            StageController()
                        }
                    }} ></SmallButton>

                </View>
            </View>
        );



    };


    // Step 2: Get the known details of the event
    function KnownDetails() {
        return (
            <View style={styles.container}>
                <BackgroundBox>
                    <View>
                        <View>
                            <Text style={{ fontSize: 24, alignSelf: 'center', padding: 15, marginTop: 20, marginHorizontal: 30}} >Select what you know</Text>
                        </View>

                        <View style={styles.checkBoxParent}>
                            <Text style={styles.checkboxText}>Date</Text>
                            <TickBox value={detailsKnown.date} onPress={() => { onDetailTickBoxPress("date") }}></TickBox>
                        </View>
                        <View style={{width: '90%', alignSelf: 'center'}}>
                        <LineBreak></LineBreak>
                        </View>
                        <View style={styles.checkBoxParent}>
                            <Text style={styles.checkboxText} >Activity</Text>
                            <TickBox value={detailsKnown.activity} onPress={() => onDetailTickBoxPress("activity")}></TickBox>
                        </View>
                        <View style={{width: '90%', alignSelf: 'center'}}>
                        <LineBreak></LineBreak>
                        </View>
                        <View style={styles.checkBoxParent} >
                            <Text style={styles.checkboxText} >Location</Text>
                            <TickBox value={detailsKnown.location} onPress={() => { onDetailTickBoxPress("location") }}></TickBox>
                        </View>

                    </View>
                </BackgroundBox>
                <View style={styles.buttonParent}>
                    <SmallButton title={"Next"} onPress={() => {
                        StageController();


                    }} ></SmallButton>
                </View>

            </View>
        )
    }


    function DateQuestion() {
        let dateAnswer: string;

        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View>

                    <BackgroundBox >
                        <View>
                            <Text style={styles.questionTitle} >What is the date of your event?</Text>
                            <View style={{ width: '90%' }} >
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        dateAnswer = text;
                                    }}
                                    onEndEditing={() => {
                                        // setDate(dateAnswer)
                                    }}
                                />
                            </View>
                        </View>
                    </BackgroundBox>
                </View>
                <View style={styles.buttonParent}>
                    <SmallButton title={"Next"} onPress={() => {
                        if (!dateAnswer) {
                            alert('Please enter a date');
                        }
                        else {
                            StageController()
                            setDate(dateAnswer)
                        }
                    }} ></SmallButton>

                </View>

            </View>
        )

    }


    function ActivityQuestion() {
        let activityAnswer: string;


        return (

            <View style={styles.container}>
                <BackgroundBox >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.questionTitle} > What is the activity for your event?</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                activityAnswer = text;
                            }}
                            onEndEditing={() => {
                            }}
                        />



                    </View>

                </BackgroundBox>
                <View style={styles.buttonParent}>
                <SmallButton title={"Next"} onPress={() => {
                    if (!activityAnswer) {
                        alert('Please enter an activity');
                    }
                    else {
                        StageController()
                        setActivity(activityAnswer)
                    }

                }} ></SmallButton>


                </View>
            </View>
        )


    }


    function LocationQuestion() {
        let locationAnswer: string;

        return (

            <View style={styles.container}>
                <BackgroundBox >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.questionTitle} > What is the location of your event?</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                locationAnswer = text;
                            }}
                            onEndEditing={() => {
                            }}
                        />



                    </View>

                </BackgroundBox>
                <View style={styles.buttonParent}>
                <SmallButton title={"Next"} onPress={() => {
                    StageController()
                    setLocation(locationAnswer)
                }} ></SmallButton>

                </View>
            </View>
        )

    }


    function Review() {

        return (
            <View style={styles.container}>

                <BackgroundBox>
                    <View>
                        <Text style={styles.questionTitle}> Are you happy with the below details? </Text>
                        {dateProvided != "" ? <Text style={styles.reviewText} >Date: {dateProvided}</Text> : ""}
                        {activityProvided != "" ? <Text style={styles.reviewText}>Activity: {activityProvided}</Text> : ""}
                        {locationProvided != "" ? <Text style={styles.reviewText}>Location {locationProvided}</Text> : ""}

                    </View>

                </BackgroundBox>
                <View style={{flexDirection: 'row', padding: 15 }}>
                    <View style={{padding: 15}}>

                    <SmallButton title={"Yes"} onPress={() => { }} ></SmallButton>
                    </View>
                    <View style={{padding: 15}}>

                <SmallButton title={"No"} onPress={() => {
                    updateStage("Details Known")
                }} ></SmallButton>

                    </View>



                </View>
            </View>
        )
    }


    return (
        <>
            {currentStage === "Event Name" ? <EventName></EventName> : ""}
            {currentStage === "Details Known" ? <KnownDetails></KnownDetails> : ""}
            {currentStage === "Date Input" ? <DateQuestion></DateQuestion> : ""}
            {currentStage === "Activity Input" ? <ActivityQuestion></ActivityQuestion> : ""}
            {currentStage === "Location Input" ? <LocationQuestion></LocationQuestion> : ""}
            {currentStage === "Review" ? <Review></Review> : ""}
        </>
    )

}


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', width: '80%'
    },
    title: {
        fontSize: 24,
        color: 'black',
        margin: "10%",
        textAlign: 'center'
    },
    buttonsParent: {
        flex: 1,
        flexDirection: 'row',

    },
    buttons: {
        padding: 15
    },
    checkBoxParent: {
        flexDirection: 'row',
        padding: 40,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkboxText: {
        fontSize: 24,
        // paddingLeft: "10%"
    },
    questionTitle: {
        fontSize: 24,
        padding: 15,
        textAlign: 'center'
    },
    reviewText: {
        fontSize: 24,
        padding: 10,
    },
    buttonParent: {
        width: '100%',
        height: 50,
        padding: '10%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
    }

});


