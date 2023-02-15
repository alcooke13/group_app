import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import InfoBox from '../components/InfoBox'
import {
  getEventData,
  EventData,
  getEventDataByUserId
} from '../services/EventServices'
import {
  getDatePollData,
  DatePollData,
  getDatePollDataByUserId
} from '../services/DatePollServices'
import {
  getLocationPollData,
  getLocationPollDataByUserId,
  LocationPollData
} from '../services/LocationPollServices'
import {
  getActivityPollData,
  ActivityPollData,
  getActivityPollDataByUserId
} from '../services/ActivityPollServices'
import { useEffect, useState, useRef } from 'react'
import TextHeader from '../components/TextHeader'
import SmallButton from '../components/SmallButton'
import LineBreak from '../components/LineBreak'
import {
  ParamListBase,
  TabActions,
  useIsFocused,
  useNavigation
} from '@react-navigation/native'
import NewEvent from './NewEvent'
import AllGroupsScreen from './AllGroupsScreen'
import navigation from '../navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface Props {
  user: number
}

export default function HomeScreen (props: Props) {
  const isFocused = useIsFocused()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const pollStatus = useRef<Object>({})

  const { user } = props

  const [events, setEvents] = useState<EventData[]>()
  const [polls, setPolls] =
useState<(DatePollData | ActivityPollData | LocationPollData)[]>()
const filteredList: Array<DatePollData | ActivityPollData | LocationPollData> = []

  useEffect(() => {
    if (isFocused) {
      const allEvents: Array<EventData> = []

      getEventDataByUserId(user)
        .then(events => {
          events.forEach(event => {
            if (Date.parse(event.date) > Date.now()) {
              allEvents.push(event)
            }
          })
        })
        .then(() => {
          allEvents.sort(function compare (
            eventA: EventData,
            eventB: EventData
          ) {
            const dateA: number = Date.parse(eventA.date)
            const dateB: number = Date.parse(eventB.date)
            return dateA - dateB
          })
          setEvents(allEvents)
        })
      const allPolls: Array<
        DatePollData | ActivityPollData | LocationPollData
      > = []

      Promise.all([
        getDatePollDataByUserId(user),
        getActivityPollDataByUserId(user),
        getLocationPollDataByUserId(user)
      ])
        .then(polls => {
          polls.flat().forEach(poll => {
            allPolls.push(poll)
          })
        })
        .then(() => {
          setPolls(allPolls)
        })
    }
  }, [isFocused])

  const eventItems = events?.map((event, index) => {
    const eventDate = new Date(event.date).toLocaleString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })

    const eventTime = new Date(event.date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })

    return (
      <TouchableOpacity
        key={event.eventName + event.id.toString()}
        onPress={() => {
          navigation.navigate('Groups', {
            groupId: event.group.id
          })
        }}
      >
        <View style={styles.eventItem}>
          <View style={styles.eventHeader}>
            <TextHeader>{event.eventName}</TextHeader>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.text}>Date:          {eventDate}</Text>
            <Text style={styles.text}>Time:          {eventTime}</Text>
            <Text style={styles.text}>Location:   {event.eventLocation}</Text>
          </View>
        </View>
        {index !== events?.length - 1 ? <LineBreak /> : ''}
      </TouchableOpacity>
    )
  })

  const pollItems = polls?.filter((poll, index) => {
    if (poll.completed === false) {
      filteredList.push(poll)
    }
  })

  const filteredItems = filteredList.map(function (poll, index) {
    return (
      <View key={poll.id.toString() + poll.type}>
        <View style={styles.pollItem}>
          <TextHeader>{poll.event.eventName}</TextHeader>
          <SmallButton
            title='Vote'
            onPress={() => {
              navigation.navigate('Groups', {
                groupId: poll.event.group.id
              })
            }}
          ></SmallButton>
        </View>
        {index !== polls?.length - 1 ? <LineBreak /> : ''}
      </View>
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <InfoBox header='Upcoming GroupUps' boxHeight='75%' boxMarginTop='5%'>
        <ScrollView showsVerticalScrollIndicator={false}>
          {eventItems}
        </ScrollView>
      </InfoBox>

      <InfoBox header='Open Polls' boxHeight='75%' boxMarginBottom='5%'>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredItems}
        </ScrollView>
      </InfoBox>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#25242B'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  eventItem: {
    padding: 15,
    justifyContent: 'space-between'
  },
  eventHeader: {
    alignItems: 'center'
  },
  eventInfo: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    alignSelf: 'center'
  },
  pollItem: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 18,
    lineHeight: 30
  }
})
