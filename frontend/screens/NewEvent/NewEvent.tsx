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
import { postEvent } from '../../services/EventServices';
import CalendarNewEvent from '../../components/CalendarNewEvent';
import InfoBox from '../../components/InfoBox';
import MenuText from '../../components/MenuText';
import TimeOfDayButton from '../../components/TimeOfDayButton';

// const detailsKnownCheck: { [key: string]: boolean } = { 'date': false, 'activity': false, 'location': false };

export interface GroupInfoProps {
    singleGroupId: string;
    singleGroupName: string;
    setState: React.Dispatch<React.SetStateAction<string>>;

}





export default function NewEvent(props: GroupInfoProps) {
    const { singleGroupId, singleGroupName, setState } = props;

    const [dateQuestionStage, setDateQuestionStage] = useState('calendar');
    const [eventTitle, setEventTitle] = useState('');
    const [detailsKnown, updateDetailsKnown] = useState<{ [key: string]: boolean }>({ 'date': false, 'activity': false, 'location': false })
    const [dateProvided, setDate] = useState<string>("")
    const [calendarDateProvided, setCalendarDate] = useState<string>("")
    const [timeProvided, setTime] = useState<string>("")
    const [activityProvided, setActivity] = useState<string>("")
    const [locationProvided, setLocation] = useState<string>("")
    const [review, setReview] = useState<boolean>(false)
    const [currentStage, updateStage] = useState<string>("Event Name")
    const [bundle, setBundle] = useState<EventData>()

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
                console.log(eventTitle)
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
                    setDate("");
                    setActivity("");
                    setLocation("");
                    setCalendarDate("");
                    setTime("");
                    updateStage("Event name");
                    break;
                }
                else {

                    // go to group
                }






        }

    }

    function goBackToSingleGroupView() {
        setDate("");
        setActivity("");
        setLocation("");
        setState("singlegroup")
    }
    function goBackToEventName() {
        setDate("");
        setActivity("");
        setLocation("");
        setEventTitle("");
        updateStage("Event Name")
    }

    function goBackToDetalsKnown(){
        updateStage("Details Known")
    }
  

    // Step 1: Ask user for the Events name
    const EventName = () => {
        let titleValue: string;
        const onEventTitleEnd = () => {
            setEventTitle(titleValue)
        }

        return (
            <>
                <View style={{
                     position: 'absolute',
                     top: '10%',
                     left: '10%',
                     

                }}>
                <BackArrow onPress={() => { goBackToSingleGroupView() }}></BackArrow>

                </View>
            <View style={styles.container}>
                <BackgroundBox boxHeight={250} >
                    <View>
                        <Text style={{ fontSize: 24, color: 'black', margin: "10%", textAlign: 'center' }} >
                            What is your events name?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={(eventTitleText: string) => {
                                    titleValue = eventTitleText;
                                }}
                                onEndEditing={() => { onEventTitleEnd() }}
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
                            setEventTitle(titleValue)
                            StageController()
                        }
                    }} ></SmallButton>

                </View>
            </View>
                    </>
        );



    };


    // Step 2: Get the known details of the event
    function KnownDetails() {
        return (
            <>
            <BackArrow onPress={() => { goBackToEventName() }}></BackArrow>
          
            <View style={styles.container}>
                <BackgroundBox boxHeight='70%' >
                    <View>
                        <View>
                            <Text style={{ fontSize: 24, alignSelf: 'center', padding: 15, marginTop: 20, marginHorizontal: 30 }} >Select what you know</Text>
                        </View>

                        <View style={styles.checkBoxParent}>
                            <Text style={styles.checkboxText}>Date</Text>
                            <TickBox value={detailsKnown.date} onPress={() => { onDetailTickBoxPress("date") }}></TickBox>
                        </View>
                        <View style={{ width: '90%', alignSelf: 'center' }}>
                            <LineBreak></LineBreak>
                        </View>
                        <View style={styles.checkBoxParent}>
                            <Text style={styles.checkboxText} >Activity</Text>
                            <TickBox value={detailsKnown.activity} onPress={() => onDetailTickBoxPress("activity")}></TickBox>
                        </View>
                        <View style={{ width: '90%', alignSelf: 'center' }}>
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
                        setActivity("")
                        setLocation("")
                        setDate("")
                        
                        
                        StageController();
                        
                        
                    }} ></SmallButton>
                </View>

            </View>
                    </>
        )
    }


    function CalendarViewDateQuestion() {



        let dateAnswer: string;
        const onDateEnd = () => {
            // setDate(dateAnswer)
        }

        const changeViewToDay = () => {
            setDateQuestionStage("dayView")

        }


        return (

            <View style={styles.container}>
                <View>
                <BackArrow onPress={() => { goBackToDetalsKnown() }}></BackArrow>

                </View>
                <View style={{ marginTop: '20%', marginBottom: 0, paddingBottom: 0 }}>

                    <Text style={{
                        fontSize: 24,
                        padding: 15,
                        textAlign: 'center',
                        color: '#FF914D'
                    }}
                    >What is the date of your event?</Text>

                </View>
                <InfoBox header={"Calendar"} >
                    <CalendarNewEvent
                        onPress={changeViewToDay}

                        setSavedDate={setCalendarDate}
                        changeViewToDay={changeViewToDay}

                    ></CalendarNewEvent>


                </InfoBox>
                {/* <View style={styles.buttonParent}>
                    <SmallButton title={"Next"} onPress={() => {
                        if (!calendarDateProvided) {
                            alert('Please pick a date');
                        }
                        else {
                            
                        }
                    }} ></SmallButton>

                </View> */}

            </View>
        )

    }

    function DayViewDateQuestion() {


        return (
            <View>
              
                <View>
                    <BackArrow onPress={() => { goBackToDetalsKnown() }}></BackArrow>
                    
                    <MenuText>Date Poll</MenuText>
                </View>
                <View>
                    <TimeOfDayButton timeOfDayOption='Morning' selected={timeProvided === "T09:00" ? true : false} onPress={() => setTime("T09:00")} />
                    <TimeOfDayButton timeOfDayOption='Afternoon' selected={timeProvided === "T12:00" ? true : false} onPress={() => setTime("T12:00")} />
                    <TimeOfDayButton timeOfDayOption='Evening' selected={timeProvided === "T18:00" ? true : false} onPress={() => setTime("T18:00")} />
                </View>
                <View>
                    <SmallButton title="Next" onPress={() => {
                        setDate(calendarDateProvided + timeProvided)
                        StageController()
                    }} />
                </View>
            </View>
        )
    }

    function DateQuestion() {

        return (

            <>
                {dateQuestionStage === "calendar" ? <CalendarViewDateQuestion /> : ""}
                {dateQuestionStage === "dayView" ? <DayViewDateQuestion /> : ""}


            </>
        )

    }


    function ActivityQuestion() {
        let activityAnswer: string;
        const onActivityEnd = () => {
            setActivity(activityAnswer)
        }


        return (

            <View style={styles.container}>
                <View>
                <BackArrow onPress={() => { goBackToDetalsKnown() }}></BackArrow>
                </View>
                <BackgroundBox boxHeight={250}  >
                    <View style={{ margin: 30 }}>
                        <Text style={styles.questionTitle} > What is the activity for your event?</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                activityAnswer = text;
                            }}
                            onEndEditing={() => {
                                onActivityEnd();
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
                            setActivity(activityAnswer)
                            StageController()
                        }

                    }} ></SmallButton>


                </View>
            </View>
        )


    }


    function LocationQuestion() {
        let locationAnswer: string;
        const onLocationEnd = () => {
            setLocation(locationAnswer)
        }


        return (

            <View style={styles.container}>
                <View>
                    <BackArrow onPress={() => { goBackToDetalsKnown() }}></BackArrow>
                </View>
                <BackgroundBox boxHeight={250}  >
                    <View style={{ margin: 30 }}>
                        <Text style={styles.questionTitle} > What is the location of your event?</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                locationAnswer = text;
                            }}
                            onEndEditing={() => {
                                onLocationEnd();
                            }}
                        />

                    </View>

                </BackgroundBox>
                <View style={styles.buttonParent}>
                    <SmallButton title={"Next"} onPress={() => {
                        setLocation(locationAnswer)
                        StageController()
                    }} ></SmallButton>

                </View>
            </View>
        )

    }

    function prepareBundle() {
        // const { singleGroupId, singleGroupName, setState } = props;
        const newBundle: any = { ...bundle }
        newBundle.eventName = eventTitle

        newBundle.group = { id: props.singleGroupId, title: props.singleGroupName };

        // test purposes


        if (activityProvided) {
            newBundle.activity = activityProvided;

        }
        if (dateProvided) {
            newBundle.date = dateProvided;
        }
        if (locationProvided) {
            newBundle.eventLocation = locationProvided;
        }
        if (!activityProvided) {
            newBundle.activity = null;

        }
        if (!dateProvided) {
            newBundle.date = null;
        }
        if (!locationProvided) {
            newBundle.eventLocation = null;
        }


        postEvent(newBundle).then((data) => {
            setBundle(data)
        })

        setState("singlegroup")


    }




    function Review() {

        const eventDate = new Date(dateProvided).toLocaleString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });

        const eventTime = new Date(dateProvided).toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit'
        });

        return (
            <View style={styles.container}>

                <BackgroundBox boxHeight='60%' >
                    <View style={{ margin: 20 }}>
                        <Text style={styles.questionTitle}> Are you happy with the below details? </Text>
                        <Text style={{
                            fontSize: 24,
                            padding: 10,
                            textAlign: 'center'
                        }} >{eventTitle}</Text>
                        {dateProvided != "" ? <Text style={styles.reviewText} >Date: {eventDate}</Text> : ""}
                        {dateProvided != "" ? <Text style={styles.reviewText} >Time: {eventTime}</Text> : ""}
                        {activityProvided != "" ? <Text style={styles.reviewText}>Activity: {activityProvided}</Text> : ""}
                        {locationProvided != "" ? <Text style={styles.reviewText}>Location: {locationProvided}</Text> : ""}

                    </View>

                </BackgroundBox>
                <View style={styles.buttonParent}>

                    <View style={{ flexDirection: 'row', padding: 15, marginBottom: '30%' }}>
                        <View style={{ padding: 15 }}>

                            <SmallButton title={"Yes"} onPress={() => {
                                prepareBundle();
                                console.log(dateProvided)
                                console.log(activityProvided)
                                console.log(locationProvided)

                            }} ></SmallButton>
                        </View>
                        <View style={{ padding: 15 }}>

                            <SmallButton title={"No"} onPress={() => {
                                console.log(currentStage)
                                updateStage("Details Known")
                            }} ></SmallButton>

                        </View>
                    </View>



                </View>
            </View>
        )
    }


    function Reviewed() {
        return (
            <View>
                <BackgroundBox>
                    <View>
                        <Text> Dummy area for going back to individial group view</Text>
                    </View>
                </BackgroundBox>

            </View>
        )
    }


    return (
        <>
            {currentStage === "Event Name" ? <EventName></EventName> : ""}
            {currentStage === "Details Known" ? <KnownDetails></KnownDetails> : ""}
            {currentStage === "Date Input" ? <DateQuestion></DateQuestion> : ""}
            {currentStage === "Activity Input" ? <ActivityQuestion></ActivityQuestion> : ""}
            {currentStage === "Reviewed" ? <Reviewed></Reviewed> : ""}
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
    },

    containerCalendar: {
        backgroundColor: "#25242B",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent:'space-between',
        width:"100%",
        justifyContent: 'space-around',

      },
})


