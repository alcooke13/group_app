import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getEventData, EventData } from '../../services/EventServices';
import { useEffect, useState } from 'react';
import CalendarMonth from '../../components/Calendar';
import InfoBox from '../../components/InfoBox';
import TextHeader from '../../components/TextHeader';

import BackArrow from '../../components/BackArrow';
import BackgroundBox from '../../components/BackgroundBox';
import TickBox from '../../components/TickBox';
import SmallButton from '../../components/SmallButton';


// interface Props {
//     knowsDetails: boolean,
//     knowsDate: boolean,
//     knowsLocation: boolean,
//     knowsActivity: boolean
// }
const detailsKnownCheck: {[key: string]: boolean} = {date: false, activity: false, location: false };

export default function NewEvent() {
    const detailsKnownInfo: {[key: string]: string} = {};

    const [knownEvent, setKnownEvent] = useState(false);
    const [unknownEvent, setUnknownEvent] = useState(false);
    const [dateKnown, setDateKnown] = useState(false);
    const [activityKnown, setActivityKnown] = useState(false);
    const [locationKnown, setLocationKnown] = useState(false);
    



    const onPressYes = () => {
        setKnownEvent(true)
        console.log("You pressed yes!")
    }
    const onPressNo = () => {
        setUnknownEvent(true)
        console.log("You pressed no!")
    }

    const onDateTickBoxPress = () => {
      if (!detailsKnownCheck.date){
        detailsKnownCheck.date = true;
      }else{detailsKnownCheck.date = false}
       
       setDateKnown(!dateKnown);
       console.log(detailsKnownCheck)
        

    }
    const onActivityTickBoxPress = () => {
        if (!detailsKnownCheck.activity){
            detailsKnownCheck.activity = true;
          }
        else{detailsKnownCheck.activity = false}
       setActivityKnown(!activityKnown);
       console.log(detailsKnownCheck)
        

    }
    const onLocationTickBoxPress = () => {
        if (!detailsKnownCheck.location){
            detailsKnownCheck.location = true;
          }else{detailsKnownCheck.location = false}
       setLocationKnown(!locationKnown);
       console.log(detailsKnownCheck)
        

    }
    


   function CheckDetails(){
        if (knownEvent) {
            return (
                <>
                    <Text> Select what you know:</Text>
                    <View>
                        <TickBox value={dateKnown} onPress={onDateTickBoxPress}></TickBox>
                        <TickBox value={activityKnown} onPress={onActivityTickBoxPress}></TickBox>
                        <TickBox value={locationKnown} onPress={onLocationTickBoxPress}></TickBox>
                    </View>
                </>



                
            ) 
        }
        else if (unknownEvent){
            return (
            
                    <Text> unknown event</Text>
                
            )
           
        }
        return (
            <View >
                <Text style={styles.title}>Do you know the event details?</Text>
                <View style={styles.buttonsParent}>
                    <View style={styles.buttons} >
                        <SmallButton title={"Yes"} onPress={onPressYes} ></SmallButton>
                    </View>
                    <View style={styles.buttons}>
                        <SmallButton title={"No"} onPress={onPressNo} ></SmallButton>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <BackgroundBox width={'90%'}>
                <View style={styles.container} >
                   <CheckDetails></CheckDetails>
                </View>
            </BackgroundBox>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    }

});