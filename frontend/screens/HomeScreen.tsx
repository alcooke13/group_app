import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import InfoBox from '../components/InfoBox';
import { getEventData, EventData, getEventDataByUserId } from '../services/EventServices';
import { getDatePollData, DatePollData, getDatePollDataByUserId } from '../services/DatePollServices';
import { getLocationPollData, getLocationPollDataByUserId, LocationPollData } from '../services/LocationPollServices';
import { getActivityPollData, ActivityPollData, getActivityPollDataByUserId } from '../services/ActivityPollServices';
import { useEffect, useState } from 'react';
import TextHeader from '../components/TextHeader';
import SmallButton from '../components/SmallButton';
import LineBreak from '../components/LineBreak';
import { useIsFocused } from "@react-navigation/native";
import NewEvent from './NewEvent/NewEvent';
import NewOptionScreen from './NewOptionScreen';

interface Props {
    user: number
}

export default function HomeScreen(props: Props) {

    const isFocused = useIsFocused();

    const { user } = props;

    const [events, setEvents] = useState<EventData[]>();
    const [polls, setPolls] = useState<(DatePollData | ActivityPollData | LocationPollData)[]>();

    useEffect(() => {

        if (isFocused) {
            const allEvents: Array<EventData> = []

            getEventDataByUserId(user)
            .then((events) => {
                events.forEach((event) => {
                    if (Date.parse(event.date) > Date.now()) {
                        allEvents.push(event);
                    }
                })
            }).then(() => {
                allEvents.sort(function compare(eventA: EventData, eventB: EventData) {
                    const dateA: number = Date.parse(eventA.date);
                    const dateB: number = Date.parse(eventB.date);
                    return dateA - dateB;
                });

                setEvents(allEvents);
            })

            const allPolls: Array<DatePollData | ActivityPollData | LocationPollData> = [];

            Promise.all([
                getDatePollDataByUserId(user),
                getActivityPollDataByUserId(user),
                getLocationPollDataByUserId(user)
            ]).then((polls) => {
                polls.flat().forEach((poll) => {
                    if (Date.parse(poll.timeout) > Date.now()) {
                        for (const [option, user_ids] of Object.entries(poll.options)) {
                            if (user_ids.every((user_id) => user_id != user)) {
                                allPolls.push(poll);
                            }                        
                        }
                    }
                });
            }).then(() => {

                allPolls.sort(function compare(
                                pollA: DatePollData | LocationPollData | ActivityPollData, 
                                pollB: DatePollData | LocationPollData | ActivityPollData) {
                    const dateA: number = Date.parse(pollA.timeout);
                    const dateB: number = Date.parse(pollB.timeout);
                    return dateA - dateB;
                });
                
                setPolls(allPolls)
            });
        }
    }, [isFocused]);
    

    const eventItems = events?.map((event, index) => {

        const eventDate = new Date(event.date).toLocaleString('en-GB', { 
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });

        const eventTime = new Date(event.date).toLocaleTimeString("en-US", {
            hour: '2-digit', 
            minute:'2-digit'
        });

        return(
            <TouchableOpacity onPress={() => {}}>
                <View style={styles.eventItem} key={index}>
                    <View style={styles.eventHeader}>
                        <TextHeader>{event.eventName}</TextHeader>
                    </View>
                    <View style={styles.eventInfo}>
                    <Text>Date:         {eventDate}</Text>
                    <Text>Time:         {eventTime}</Text>
                    <Text>Location:   {event.eventLocation}</Text>
                    </View>
                </View>
                {index !== events?.length - 1 ?  
                    <LineBreak/>
                : 
                   ""
                }
            </TouchableOpacity>
        )
    });

    const pollItems = polls?.map((poll, index) => {
        return(
            <>
                <View style={styles.pollItem} key={index}>
                    <TextHeader>{poll.event.eventName}</TextHeader>
                    <SmallButton title='Vote'></SmallButton>
                </View>
                {index !== polls?.length - 1 ?  
                    <LineBreak/>
                : 
                   ""
                }
            </>
        )
    });

    return (
        <SafeAreaView style={styles.container}>

            <InfoBox header='Upcoming Events' boxHeight='75%' boxMarginTop='5%'>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {eventItems}
                </ScrollView>
            </InfoBox>
            
            <InfoBox header='Open Polls' boxHeight='75%' boxMarginBottom='5%'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {pollItems}
                </ScrollView>
            </InfoBox>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'space-evenly',
        backgroundColor: '#25242B'
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      },
      eventItem: {
        padding: 15,
        justifyContent: 'space-between',
      },
      eventHeader: {
        alignItems: 'center'
      },
      eventInfo: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10
      },
      pollItem: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
      }
});