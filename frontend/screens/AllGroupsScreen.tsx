import * as React from 'react'
import { Text, View, Image, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native'
import { NavigationContainer, TabRouter, useIsFocused, useRoute } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useEffect, useRef, useState } from 'react'
import { getGroupDataByUserId, getGroupDataByGroupId, GroupData } from '../services/GroupServices'
import GroupNameButton from '../components/GroupNameButton'
import route from '../navigation'
import { TabView } from '@rneui/base'
import InfoBox from '../components/InfoBox'
import TextHeader from '../components/TextHeader'
import ScreenHeaderText from '../components/ScreenHeaderText'
import BackArrow from '../components/BackArrow'
import BigPlus from '../components/BigPlus'
import BurgerIcon from '../components/BurgerIcon'
import { DatePollData, getDatePollDataByGroupId, getDatePollDataById, postDatePoll, updateDatePollTimeout, updateDatePollToComplete, updateDatePollWithRemovedVote } from '../services/DatePollServices'
import { getLocationPollDataByGroupId, getLocationPollDataById, LocationPollData, postLocationPoll, updateLocationPollTimeout, updateLocationPollToComplete, updateLocationPollWithRemovedVote } from '../services/LocationPollServices'
import { ActivityPollData, getActivityPollDataByGroupId, getActivityPollDataById, postActivityPoll, updateActivityPollTimeout, updateActivityPollToComplete, updateActivityPollWithRemovedVote } from '../services/ActivityPollServices'
import ButtonSelector from '../components/ButtonSelector'
import NewEvent from './NewEvent'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens'
import AddGroupScreen from './AddGroupScreen'
import SmallPlus from '../components/SmallPlus'
import { updateActivityPollWithNewVote } from '../services/ActivityPollServices'
import { updateDatePollWithNewVote } from '../services/DatePollServices'
import { updateLocationPollWithNewVote } from '../services/LocationPollServices'
import { EventData, updateEventActivity, updateEventDate, updateEventLocation } from '../services/EventServices'
import NewOptionScreen from './NewOptionScreen'
import SingleGroupSettings from './SingleGroupSettings'

interface Props {
  user: number
}

export default function AllGroupsScreen (props: Props) {

  const { user } = props
  const isFocused = useIsFocused()

  const [groups, setGroups] = useState<GroupData[]>();
  const [groupChanges, updateGroupChanges] = useState<Object>({});
  const [singleGroup, setSingleGroup] = useState<GroupData>();
  const [groupView, setGroupView] = useState<string>("Loading");
  const [pollChange, updatePollChange] = useState<Boolean>(false);
  const [upcomingEvent, setUpcomingEvent] = useState<EventData | null>(null);
  const [groupPolls, setGroupPolls] = useState<Array<DatePollData | ActivityPollData | LocationPollData>>();
  const [activeGroupPoll, setActiveGroupPoll] = useState<(DatePollData | ActivityPollData | LocationPollData | null)>(null);
  const [votingStats, setVotingStats] = useState<Object>()
  const groupStatus = useRef <Object>({}) 

  const route = useRoute()
  let groupId: number

  try {
    groupId = route.params.groupId
  } catch {
    groupId = 0
  }

  useEffect(() => {
    if (isFocused) {
      if (groupId != 0) {
        setGroupView('Loading')
        getSingleGroupData(groupId)
        route.params.groupId = 0

        getGroupDataByUserId(user).then(userGroups => {
          setGroups(userGroups)
        })
      } else {
        setGroupView('All Groups')

        getGroupDataByUserId(user).then(userGroups => {
          setGroups(userGroups)
        })
      }
    }
  }, [isFocused])

  useEffect(() => {
    if ('new group' in groupChanges) {
      getSingleGroupData(groupChanges['new group']);
      updateGroupChanges({});
    } 
    
    if ('new event' in groupChanges) {
      getSingleGroupData(singleGroup.id);
      updateGroupChanges({});
    }
  }, [groupChanges]);

  useEffect(() => {
    if (pollChange) {
      if (activeGroupPoll?.type === "Date") {
        getDatePollDataById(activeGroupPoll.id)
        .then((poll) => {
          setActiveGroupPoll(poll);
          getVotingStats(poll);
        })
        .then(() => setGroupView("Single Group"));
      } else if (activeGroupPoll?.type === "Activity") {
        getActivityPollDataById(activeGroupPoll.id)
        .then((poll) => {
          setActiveGroupPoll(poll);
          getVotingStats(poll);
        })
        .then(() => setGroupView("Single Group"));
      } else if (activeGroupPoll?.type === "Location") {
        getLocationPollDataById(activeGroupPoll.id)
        .then((poll) => {
          setActiveGroupPoll(poll);
          getVotingStats(poll);
        })
        .then(() => setGroupView("Single Group"));
      }
      
      updatePollChange(false);
    }
  }, [pollChange]);
  

  function getVotingStats (poll: ActivityPollData | LocationPollData | DatePollData) {
    const memberIds: number[] = []
    const voterIds: number[] = []

    if (poll) {
      poll.event.group.users.forEach(user => memberIds.push(user.id))

      if (poll?.options) {
        for (const [option, user_ids] of Object.entries(poll.options)) {
          user_ids.forEach(user_id => {
            voterIds.includes(user_id) ? '' : voterIds.push(user_id)
          })
        }
      }

      setVotingStats({ voters: voterIds.length, members: memberIds.length })

      if (voterIds.length == memberIds.length) {
        return 'Vote completed'
      } else {
        return 'Vote incomplete'
      }
    }
  }


  function pollController(allGroupPolls: (DatePollData | ActivityPollData | LocationPollData)[], upcomingEvent: EventData) {

    const upcomingPoll: DatePollData | ActivityPollData | LocationPollData | undefined = allGroupPolls?.find(poll => (Date.parse(poll.timeout) - Date.now() > 0));
    const pastPolls: Array<DatePollData | ActivityPollData | LocationPollData | undefined> = allGroupPolls?.filter(poll => (Date.parse(poll.timeout) - Date.now() < 0));

    function mostPollVotes (
      poll: DatePollData | ActivityPollData | LocationPollData
    ) {
      let mostVotes = 0
      let winningOption

      for (const [option, user_ids] of Object.entries(poll?.options)) {
        if (user_ids.length > 0 && user_ids.length > mostVotes) {
          winningOption = option
        }
      }

      return winningOption
    }

    let upcomingPollFound: boolean = false;

    // Check for any past polls that resulted in a winning vote or not
    // If found update the event details with winning option and set poll to complete
    // If not found extend the poll timeout by 48 hours
    if (pastPolls.length !== 0) {
      pastPolls.forEach((poll) => {
        if (poll?.completed) return;
       
        const winningOption = mostPollVotes(poll);

        if (poll?.type === 'Date' && !upcomingEvent.date) {
          if (!winningOption) {
            updateDatePollTimeout(poll.id, {'timeout': 48});
            setActiveGroupPoll(poll);
            upcomingPollFound = true;
          } else {
            updateEventDate(upcomingEvent.id, {'new': winningOption});
            updateDatePollToComplete(poll.id);
          }
        } else if (poll?.type === 'Activity' && !upcomingEvent.activity) {
          if (!winningOption) {

            updateActivityPollTimeout(poll.id, {'timeout': 48});
            setActiveGroupPoll(poll);
            upcomingPollFound = true;
          } else {
            updateEventActivity(upcomingEvent.id, {'new': winningOption});
            updateDatePollToComplete(poll.id);
          }
        } else if (poll?.type === 'Location' && !upcomingEvent.eventLocation) {
          if (!winningOption) {

            updateLocationPollTimeout(poll.id, {'timeout': 48});
            setActiveGroupPoll(poll);
            upcomingPollFound = true;
          } else {
            updateEventLocation(upcomingEvent.id, {'new': winningOption});
            updateDatePollToComplete(poll.id);
          }
        }
      })
    }

    let generateNewPoll: boolean = false;

    // Check if all members voted on the upcoming poll
    // If all voted update the event details with the winning option and engage generation of new poll
    if (upcomingPoll && !upcomingPollFound) {
      const voteStatus = getVotingStats(upcomingPoll);

      if (voteStatus === 'Vote incomplete') {
        setActiveGroupPoll(upcomingPoll)
      } else {
        if (upcomingPoll.type === 'Date')
          updateDatePollToComplete(upcomingPoll.id)
        else if (upcomingPoll.type === 'Activity')
          updateActivityPollToComplete(upcomingPoll.id)
        else if (upcomingPoll.type === 'Date')
          updateLocationPollToComplete(upcomingPoll.id)
        generateNewPoll = true
      }
    } else {
      generateNewPoll = true;
    }

    // Create new poll in the order of Date > Activity > Location
    if (generateNewPoll) {
      if (!upcomingEvent?.date) {

        postDatePoll({eventId: upcomingEvent?.id, timeout: 48})
        .then((datePoll) => {
          setActiveGroupPoll(datePoll);
        });
      } else if (!upcomingEvent?.activity) {
        postActivityPoll({eventId: upcomingEvent?.id, timeout: 48})
        .then((activityPoll) => {
          setActiveGroupPoll(activityPoll);
        });
      } else if (!upcomingEvent?.eventLocation) {
        postLocationPoll({eventId: upcomingEvent?.id, timeout: 48})
        .then((locationPoll) => {
          setActiveGroupPoll(locationPoll);
        });
      }
    } 
  }

  function getUpcomingEvent (group: GroupData) {
    if (group.events.length > 0) {
      const filteredEvents = group?.events?.filter(event => {
        return Date.parse(event.date) - Date.now() > 0 || !event.date
      })

      setUpcomingEvent(filteredEvents[0])
      return filteredEvents[0]
    } else {
      setUpcomingEvent(null)
      return null
    }
  }

  function getSingleGroupData (groupId: number) {
    setActiveGroupPoll(null)

    getGroupDataByGroupId(groupId).then(group => {
      setSingleGroup(group)

      const upcomingEventDetails = getUpcomingEvent(group)

      if (upcomingEventDetails) {
        const allGroupsPolls: Array<
          DatePollData | ActivityPollData | LocationPollData
        > = []
        Promise.all([
          getDatePollDataByGroupId(group.id),
          getActivityPollDataByGroupId(group.id),
          getLocationPollDataByGroupId(group.id)
        ])
          .then(polls => {
            polls.flat().forEach(poll => {
              if (Date.parse(poll.timeout) > Date.now()) {
                allGroupsPolls.push(poll)
              }
            })
          })
          .then(() => {
            pollController(allGroupsPolls, upcomingEventDetails)
          })
          .then(() => {
            setGroupView('Single Group')
          })
      } else {
        setGroupView('Single Group')
      }
    })
  }

  const allUsersGroupsByName = groups?.flatMap(function (group, index) {
    const allGroupsPolls: Array< DatePollData | ActivityPollData | LocationPollData > = []
    const filteredList: Array< DatePollData | ActivityPollData | LocationPollData > = [];
    Promise.all([
      getDatePollDataByGroupId(group.id),
      getActivityPollDataByGroupId(group.id),
      getLocationPollDataByGroupId(group.id)
    ])
      .then(polls => {
        polls.flat().forEach(poll => {
          allGroupsPolls.push(poll)
        })
      })
      .then(() => {
        allGroupsPolls.filter(poll => {
          if (poll.completed === false){
            groupStatus.current[group.id]= true
          } else{
            groupStatus.current[group.id]= false
          }
        })
      })

        return (
          <GroupNameButton
            key={group.id.toString() + index.toString()}
            title={group.groupName}
            status={groupStatus.current[group.id]}
            onPress={() => getSingleGroupData(group.id)}
          />
        )
  })

  function SingleGroupDetails (): JSX.Element {
    if (upcomingEvent) {
      let eventDate
      let eventTime;
      if (upcomingEvent.date) {
        eventDate = new Date(upcomingEvent.date).toLocaleString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        })
        eventTime = new Date(upcomingEvent.date).toLocaleTimeString("en-US", {
          hour: '2-digit',
          minute: '2-digit'
      })
      } else {
        eventDate = "TBC";
        eventTime = "TBC";
      }

      return (
          <View style={styles.eventDetails}>
            <View style={styles.eventDetailsHeader}>
              <TextHeader>{upcomingEvent.eventName}</TextHeader>
            </View>
            <Text style={styles.text}>Date:          {eventDate}</Text>
            <Text style={styles.text}>Time:          {eventTime}</Text>
            <Text style={styles.text}>Location:   {upcomingEvent.eventLocation}</Text>
          </View>
      )
    } else {
      return (
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailsHeader}>
            <TextHeader> No upcoming event </TextHeader>
          </View>
          <Text style={styles.text}>Date:        </Text>
          <Text style={styles.text}>Time:        </Text>
          <Text style={styles.text}>Location:   </Text>
        </View>
      )
    }
  }
  
  function captureChosenVote(selectedOption: string) {
    let voter: number = user
    let newData: { [key: string]: number } = {}

    for (const [option, user_ids] of Object.entries(activeGroupPoll.options)) {
      if (selectedOption !== option) continue;

      // Remove user from option if already voted on option
      if (user_ids.includes(user)) {
        if (activeGroupPoll?.type == 'Location') {
          newData = {};
          newData[selectedOption] = voter;
          updateLocationPollWithRemovedVote(activeGroupPoll?.id, newData);
        } else if (activeGroupPoll?.type == 'Activity') {
          newData = {};
          newData[selectedOption] = voter;
          updateActivityPollWithRemovedVote(activeGroupPoll?.id, newData);
        } else if (activeGroupPoll?.type == 'Date') {
          newData = {};
          newData[selectedOption] = voter;
          updateDatePollWithRemovedVote(activeGroupPoll?.id, newData);
        }
      } 
      // Add user to option if not already voted on option
      else {
        if (activeGroupPoll?.type == 'Location') {
          newData = {};
          newData[selectedOption] = voter;
          updateLocationPollWithNewVote(activeGroupPoll?.id, newData);
        } else if (activeGroupPoll?.type == 'Activity') {
          newData = {};
          newData[selectedOption] = voter;
          updateActivityPollWithNewVote(activeGroupPoll?.id, newData);
        } else if (activeGroupPoll?.type == 'Date') {
          newData = {};
          newData[selectedOption] = voter;
          updateDatePollWithNewVote(activeGroupPoll?.id, newData);
        }
      }


      updatePollChange(true);
    }
  }

  function SingleGroupPollDetails () {
    if (activeGroupPoll) {
      console.log(activeGroupPoll)
      let availableOptionsArray = []
      let allOptionsMap = new Map<string, Array<number>>()
      for (const [option, user_ids] of Object.entries(
        activeGroupPoll?.options
      )) {
        availableOptionsArray.push(option)
      }

      for (const [option, user_ids] of Object.entries(
        activeGroupPoll?.options
      )) {
        allOptionsMap.set(option, user_ids)
      }

      const returnStatement = availableOptionsArray.map(function (option, index) {
        let optionToDisplay = option;
        let timeOfDay: string = "";

        if (activeGroupPoll?.type == 'Date') {
          const optionDateTime = new Date(option);

          const optionTime =  optionDateTime.getHours();
          if (optionTime === 9) timeOfDay = ' Morning, ';
          if (optionTime === 12) timeOfDay = ' Afternoon, ';
          if (optionTime === 18) timeOfDay = ' Evening, ';

          optionToDisplay = optionDateTime.toLocaleString('en-GB', {weekday: 'long'}) + timeOfDay + optionDateTime.toLocaleString('en-GB', {day: 'numeric', month: 'long'});
        }

        return (
          <View style={styles.pollOption} key={option + index.toString()}>
            <ButtonSelector
              key={index}
              option={optionToDisplay}
              onPress={() => captureChosenVote(option)}
              selected={allOptionsMap.get(option)?.includes(user)}
            ></ButtonSelector>
            <View style={styles.pollOptionCounters}>
              <Text style={styles.voteCounter}>
                {allOptionsMap.get(option)?.length}
              </Text>
            </View>
          </View>
        )
      })
      return returnStatement
    } else {
      ;<Text style={styles.text}>No current poll</Text>
    }
  }

  function SingleGroupView () {
    return (
      <>
        <View style={styles.header}>
          <BackArrow onPress={() => setGroupView('All Groups')}></BackArrow>
          <ScreenHeaderText>{singleGroup.groupName}</ScreenHeaderText>
          <BurgerIcon onPress={() => setGroupView('Settings')}></BurgerIcon>
        </View>
        <InfoBox 
          header='Next Event' 
          boxHeight='60%'
          boxMarginBottom='5%'
          smallPlus={upcomingEvent === null ? <SmallPlus onPress={()=> setGroupView('New Event')} /> : ""}
          >
          <SingleGroupDetails/>
        </InfoBox>
        <InfoBox 
          header={activeGroupPoll ? activeGroupPoll.type + " Options" : "No poll active"} 
          boxHeight='100%'
          boxMarginTop='5%'
          boxMarginBottom='15%'
          smallPlus={activeGroupPoll ? <SmallPlus onPress={() => setGroupView('Add Option')} /> : ""}
          >
          <ScrollView style={styles.pollOptionsInnerBox}>
            <SingleGroupPollDetails/>
          </ScrollView>
        </InfoBox>
        {activeGroupPoll ? (
          <Text style={styles.totalVoteCount}>
            Voters: {votingStats['voters']}/{votingStats['members']}
          </Text>
        ) : (
          ''
        )}
      </>
    )
  }

  function AllGroupView () {
    return (
      <>
        <View style={styles.groupsHeader}>
          <ScreenHeaderText>Your Groups</ScreenHeaderText>
        </View>
        <View style={styles.groupsMain}>
          <ScrollView style={styles.scroll}>{allUsersGroupsByName}</ScrollView>
        </View>
        <View style={styles.groupsFooter}>
          <BigPlus onPress={() => setGroupView('Add Group')} />
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {groupView === 'All Groups' ? <AllGroupView /> : ''}
      {groupView === 'Single Group' ? <SingleGroupView /> : ''}
      {groupView === 'New Event' ? (<NewEvent singleGroupName={singleGroup.groupName} singleGroupId={singleGroup.id} setState={setGroupView} updateGroupChanges={updateGroupChanges} setUpcomingEvent={setUpcomingEvent} />) : ('')}
      {groupView === 'Loading' ? '' : ''}
      {groupView === 'Add Option' ? <NewOptionScreen user={user} setState={setGroupView} activePollType={activeGroupPoll?.type} activeGroupPollId={activeGroupPoll?.id} updatePollChange={updatePollChange} /> : ''}
      {groupView === 'Add Group' ? <AddGroupScreen user={user} setState={setGroupView} newGroup={updateGroupChanges} /> : ''}
      {groupView === "Settings" ? <SingleGroupSettings user = {props.user} groupName={singleGroup.groupName} groupId={singleGroup.id} setState={setGroupView} parentUpcomingEvent={upcomingEvent} /> : ""}
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
  groupsHeader: {
    height: '10%',
    paddingTop: '5%'
  },
  groupsMain: {
    height: '80%'
  },
  groupsFooter: {
    marginTop: '2%',
    height: '10%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Ubuntu-Bold'
  },
  scroll: {
    flex: 1,
    width: '90%'
  },
  eventDetails: {
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'center'
  },
  eventDetailsHeader: {
    paddingBottom: 15,
    alignSelf: 'center'
  },
  header: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    width: '100%',
    justifyContent: 'space-around',
    fontFamily: 'Ubuntu-Bold'
  },
  totalVoteCount: {
    color: '#FF914D',
    fontSize: 26,
    paddingBottom: '10%',
    fontFamily: 'Ubuntu-Bold'
  },
  pollOptionsInnerBox: {
    paddingTop: 10
  },
  voteCounter: {
    color: '#FF914D',
    fontSize: 34,
    fontFamily:'Ubuntu-Bold',
    paddingLeft: 20
  },
  pollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 40,
    paddingTop: 5
  },
  text: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 18,
    lineHeight: 30
  }
})
