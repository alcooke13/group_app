import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import InfoBox from '../components/InfoBox';
import { getEventData, EventData } from '../services/EventServices';
import { getDatePollData, DatePollData } from '../services/DatePollServices';
import { getLocationPollData, LocationPollData } from '../services/LocationPollServices';
import { getActivityPollData, ActivityPollData } from '../services/ActivityPollServices';
import { useEffect, useState } from 'react';
import TextHeader from '../components/TextHeader';
import SmallButton from '../components/SmallButton';
import LineBreak from '../components/LineBreak';

interface Props {
    user: number
}

export default function HomeScreen(props: Props) {

    const { user } = props;

    const [events, setEvents] = useState<EventData[]>();
    const [polls, setPolls] = useState<(DatePollData | ActivityPollData | LocationPollData)[]>();

    useEffect(() => {
        const allPolls: Array<DatePollData | ActivityPollData | LocationPollData> = [];

        Promise.all([
            getDatePollData(),
            getActivityPollData(),
            getLocationPollData()
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
        }).then(() => setPolls(allPolls));
    }, []);


    const eventItems = polls?.map((poll, index) => {
        return(
            <>
                <View style={styles.upcomingEvent}>
                    <TextHeader key={index}>{poll.event.eventName}</TextHeader>
                    <SmallButton title='Vote'></SmallButton>
                </View>
                <View>
                {/* {index} !== polls?.length ?   */}
                    <LineBreak/>
                {/* : 
                    <Text></Text> */}
                </View>
            </>
        )
    }
        
    )

    return (
        <SafeAreaView style={styles.container}>
            
            <InfoBox header='Upcoming Events'>
                <View>
                    {eventItems}
                </View>
            </InfoBox>
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
      upcomingEvent: {
        flexDirection: 'row'
      }
  });