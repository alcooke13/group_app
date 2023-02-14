
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
import { DatePollData, getDatePollDataByGroupId, postDatePoll, updateDatePollTimeout } from '../services/DatePollServices'
import { getLocationPollDataByGroupId, LocationPollData, postLocationPoll, updateLocationPollTimeout } from '../services/LocationPollServices'
import { ActivityPollData, getActivityPollDataByGroupId, postActivityPoll, updateActivityPollTimeout } from '../services/ActivityPollServices'
import ButtonSelector from '../components/ButtonSelector'
import NewEvent from './NewEvent/NewEvent'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens'
import AddGroupScreen from './AddGroupScreen'
import SmallPlus from '../components/SmallPlus'
import { updateActivityPollWithNewVote } from '../services/ActivityPollServices'
import { updateDatePollWithNewVote } from '../services/DatePollServices'
import { updateLocationPollWithNewVote } from '../services/LocationPollServices'
import { EventData, updateEventActivity, updateEventDate, updateEventLocation } from '../services/EventServices';
import NewOptionScreen from './NewOptionScreen'
import SingleGroupSettings from './SingleGroupSettings'



interface Props {
  user: number,
}

export default function AllGroupsScreen (props: Props) {

  const { user } = props
  const isFocused = useIsFocused()

  const [groups, setGroups] = useState<GroupData[]>();
  const [groupChanges, updateGroupChanges] = useState<Object>({});
  const [singleGroup, setSingleGroup] = useState<GroupData>();
  const [groupView, setGroupView] = useState<string>("Loading");
  const [screenChanges, updateScreenChanges] = useState<Boolean>(false);
  const [upcomingEvent, setUpcomingEvent] = useState<EventData | null>(null);
  const [groupPolls, setGroupPolls] = useState<Array<DatePollData | ActivityPollData | LocationPollData>>();
  const [activeGroupPoll, setActiveGroupPoll] = useState<(DatePollData | ActivityPollData | LocationPollData | null)>(null);
  const [activePollType, setActivePollType] = useState<string>("");
  const [votingStats, setVotingStats] = useState<Object>()

  const route = useRoute();
  let groupId: number;

  try {
    groupId = route.params.groupId;
  } catch {
    groupId = 0;
  }

  useEffect(() => {
    if (isFocused) {
      if (groupId != 0) {
        setGroupView("Loading");
        getSingleGroupData(groupId);
        route.params.groupId = 0;
  
        getGroupDataByUserId(user)
        .then((userGroups) => {
          setGroups(userGroups);
        })
      } else {
        setGroupView("All Groups");

        getGroupDataByUserId(user)
        .then((userGroups) => {
          setGroups(userGroups);
        })
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if ("new group" in groupChanges) {
      getSingleGroupData(groupChanges['new group']);
      updateGroupChanges({});
    }
  }, [groupChanges]);


  function getVotingStats(poll: ActivityPollData | LocationPollData | DatePollData) {
    const memberIds:number[] = []
    const voterIds:number[] = [];

    if (poll) {
      poll.event.group.users.forEach((user) => memberIds.push(user.id));
    }

    if (poll?.options) {
      for (const [option, user_ids] of Object.entries(poll.options)) {
        user_ids.forEach((user_id) => {
          voterIds.includes(user_id) ? "" : voterIds.push(user_id);
        })
      }
    }

    setVotingStats({"voters": voterIds.length, "members": memberIds.length});

    if (voterIds.length == memberIds.length) {
      return "Vote completed";
    } else {
      return "Vote incomplete";
    }
  }

  function pollController(allGroupPolls: (DatePollData | ActivityPollData | LocationPollData)[], upcomingEvent: EventData) {
    const upcomingPoll: DatePollData | ActivityPollData | LocationPollData | undefined = allGroupPolls?.find(poll => (Date.parse(poll.timeout) - Date.now() > 0));

    if(upcomingPoll?.type === "Activity"){
      setActivePollType("Activity")
    } else if (upcomingPoll?.type === "Location"){
      setActivePollType("Location")
    }else if (upcomingPoll?.type === "Date"){
      setActivePollType("Date")
    }

    const pastPolls: Array<DatePollData | ActivityPollData | LocationPollData | undefined> = allGroupPolls?.filter(poll => (Date.parse(poll.timeout) - Date.now() < 0));

    function mostPollVotes(poll: DatePollData | ActivityPollData | LocationPollData) {
      let mostVotes = 0;
      let winningOption;

      for (const [option, user_ids] of Object.entries(poll?.options)) {
        if (user_ids.length > 0 && user_ids.length > mostVotes) {
          winningOption = option;
        }
      }

      return winningOption;
    }

    if (pastPolls.length != 0) {
      pastPolls.forEach((poll) => {
        const winningOption = mostPollVotes(poll);

        if (poll?.type === "Date" && !upcomingEvent.date) {
          if (!winningOption) {
            updateDatePollTimeout(poll.id, {'timeout': 48});
          } else {
            updateEventDate(upcomingEvent.id, {'new': winningOption});
          }
        } else if (poll?.type === "Activity" && !upcomingEvent.activity) {
          if (!winningOption) {
            updateActivityPollTimeout(poll.id, {'timeout': 48});
          } else {
            updateEventActivity(upcomingEvent.id, {'new': winningOption});
          }
        } else if (poll?.type === "Location" && !upcomingEvent.eventLocation) {
          if (!winningOption) {
            updateLocationPollTimeout(poll.id, {'timeout': 48});
          } else {
            updateEventLocation(upcomingEvent.id, {'new': winningOption});
          }
        }
      })
    }

    console.log("date: ", upcomingEvent?.date)
    console.log("type: ", upcomingPoll?.type)

    if (upcomingPoll) {
      const voteStatus = getVotingStats(upcomingPoll);

      if (voteStatus === "Vote incomplete") {
        setActiveGroupPoll(upcomingPoll);
      } else {
        if (upcomingPoll.type === "Date") update
      }

    } else if (!upcomingEvent?.date) {
      postDatePoll({eventId: upcomingEvent?.id, timeout: 48})
      .then((datePoll) => {
        console.log("date poll: ", datePoll)
        setActiveGroupPoll(datePoll);
      });
    } else if (!upcomingEvent?.activity) {
      postActivityPoll({eventId: upcomingEvent?.id, timeout: 48})
      .then((activityPoll) => {
        console.log("activity poll: ", activityPoll)
        setActiveGroupPoll(activityPoll);
      });
    } else if (!upcomingEvent?.eventLocation) {
      postLocationPoll({eventId: upcomingEvent?.id, timeout: 48})
      .then((locationPoll) => {
        console.log("location poll: ", locationPoll)
        setActiveGroupPoll(locationPoll);
      });
    } 

    console.log("upcoming poll: ", upcomingPoll)
  }
    
  function getUpcomingEvent(group: GroupData) {
    if (group.events.length > 0) {
      const filteredEvents = group?.events?.filter((event) => {
        return Date.parse(event.date) - Date.now() > 0 || !event.date
      });

      setUpcomingEvent(filteredEvents[0]);
      return filteredEvents[0];
    } else {
      setUpcomingEvent(null);
      return null;
    }
  }

  function getSingleGroupData(groupId: number) {
    setActiveGroupPoll(null);

    getGroupDataByGroupId(groupId)
    .then((group) => {
        setSingleGroup(group);

        const upcomingEventDetails = getUpcomingEvent(group);

        if (upcomingEventDetails) {
          const allGroupsPolls: Array<DatePollData | ActivityPollData | LocationPollData> = [];
          Promise.all([
              getDatePollDataByGroupId(group.id),
              getActivityPollDataByGroupId(group.id),
              getLocationPollDataByGroupId(group.id)
          ])
          .then((polls) => {
              polls.flat().forEach((poll) => {
                if (Date.parse(poll.timeout) > Date.now()) {
                  allGroupsPolls.push(poll);
                }})
              })
              .then(() => {
                pollController(allGroupsPolls, upcomingEventDetails);
              })
              .then(() => {
                setGroupView("Single Group");
              })
        } else {
          setGroupView("Single Group");
        }
      }
    );
  }

  const allUsersGroupsByName = groups?.flatMap(function(group, index){
    return <GroupNameButton 
                key={group.id.toString()+index.toString()} 
                title={group.groupName} 
                status={false} 
                onPress={() => getSingleGroupData(group.id)
                }/>
  })

  function SingleGroupDetails() {
    if (upcomingEvent) {
      let eventDate;

      if (upcomingEvent.date) {
        eventDate = new Date(upcomingEvent.date).toLocaleString(
          'en-GB',
          {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          }
        )
      }

      return (
          <>
            <TextHeader>{upcomingEvent.eventName}</TextHeader>
            <Text style={styles.text}>Date:         {eventDate}</Text>
            <Text style={styles.text}>Time:         TBC</Text>
            <Text style={styles.text}>Location:   {upcomingEvent.eventLocation}</Text>
          </>
      )
    } else {
      return (
        <>
          <TextHeader> No upcoming event </TextHeader>
          <Text style={styles.text}>Date:        </Text>
          <Text style={styles.text}>Time:        </Text>
          <Text style={styles.text}>Location:   </Text>
        </>
      )
    }
  }
  
  function captureChosenVote(selectedOption: string) {
    let chosenOption: string = "";
    let voter: number = user
    let newData: { [key: string]: number } = {}
    for (const [option, user_ids] of Object.entries(activeGroupPoll.options)) {
      if (selectedOption === option) {
        chosenOption = selectedOption;
      }
      if (activeGroupPoll?.type == 'Location') {
        newData[chosenOption] = voter;
        updateLocationPollWithNewVote(activeGroupPoll?.id, newData);
        newData = {};
      } else if (activeGroupPoll?.type == 'Activity') {
        newData[chosenOption] = voter;
        updateActivityPollWithNewVote(activeGroupPoll?.id, newData);
        newData = {};
      } else if (activeGroupPoll?.type == 'Date') {
        let dateoption: string = chosenOption.toString();
        newData[dateoption] = voter;
        updateDatePollWithNewVote(activeGroupPoll?.id, newData);
        newData = {};
      }
    }
  }
 
  function SingleGroupPollDetails() {
    if (activeGroupPoll) {
      let availableOptionsArray = []
      let allOptionsMap = new Map<string, Array<number>>()

      for (const [option, user_ids] of Object.entries(activeGroupPoll?.options)) {
        availableOptionsArray.push(option)
      }

      for (const [option, user_ids] of Object.entries(activeGroupPoll?.options)) {
        allOptionsMap.set(option, user_ids)
      }

      const returnStatement = availableOptionsArray.map(function (option, index) {
        let optionToDisplay = option;
        if (activeGroupPoll?.type == 'Date') {
          optionToDisplay = new Date(option).toLocaleString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
        }

        return (
          <View style={styles.pollOption} key={option + index.toString()}>
            <ButtonSelector
              key={index}
              option={optionToDisplay}
              onPress={() => captureChosenVote(option)}
              selected={false}
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
      <Text style={styles.text}>No current poll</Text>
    }
  }

  function SingleGroupView(){
    return(
      <>
        <View style={styles.header}>
          <BackArrow onPress={() => setGroupView("All Groups")}></BackArrow>
          <ScreenHeaderText>{singleGroup.groupName}</ScreenHeaderText>
          <BurgerIcon onPress={()=> setGroupView("Settings")} ></BurgerIcon>
        </View>
        <InfoBox 
          header='Next Event' 
          boxHeight='40%'
          boxMarginTop='-5%'
          smallPlus={<SmallPlus onPress={()=> setGroupView('New Event')} />}
          >
          <SingleGroupDetails/>
        </InfoBox>
        <InfoBox 
          header={activeGroupPoll ? activeGroupPoll.event.eventName : "No poll"} 
          boxHeight='100%'
          boxMarginTop='5%'
          boxMarginBottom='15%'
          smallPlus={<SmallPlus onPress={() => setGroupView('Add Option')}/>}
          >
          <View>
            <SingleGroupPollDetails/>
          </View>
        </InfoBox>
        {activeGroupPoll ? 
          <Text style={styles.totalVoteCount}>Voters: {votingStats["voters"]}/{votingStats["members"]}</Text>
          : ""} 
      </>
    )
  }

  function AllGroupView () {
    return (
      <>
        <Image source={require('../assets/GroupLogo1.png')} />
        <ScrollView style={styles.scroll}>{allUsersGroupsByName}</ScrollView>
        <BigPlus onPress={() => setGroupView('Add Group')} />
      </>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {groupView === 'All Groups' ? <AllGroupView /> : ''}
      {groupView === 'Single Group' ? <SingleGroupView /> : ''}
      {groupView === 'New Event' ? <NewEvent singleGroupName={singleGroup.groupName} singleGroupId={singleGroup.id} setState={setGroupView}/> : ''}
      {groupView === 'Loading' ? '' : ''}
      {groupView === 'Add Option' ? <NewOptionScreen user={user} setState={setGroupView} setActivePollType={setActivePollType} activePollType={activePollType}/> : ''}
      {groupView === 'Add Group' ? <AddGroupScreen user={user} setState={setGroupView} newGroup={updateGroupChanges} /> : ''}
      {groupView === "Settings" ? <SingleGroupSettings user = {props.user} groupName={singleGroup.groupName} groupId={singleGroup.id} setState={setGroupView} /> : ""}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25242B',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily:'Ubuntu-Bold'
  },
  scroll: {
    flex: 1,
    width: '90%'
  },
  header: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    width: '100%',
    justifyContent: 'space-around',
    fontFamily:'Ubuntu-Bold'
  },
  totalVoteCount: {
    color: '#FF914D',
    fontSize: 26,
    paddingBottom: '10%',
  },
  pollOptionCounters: {
  },
  voteCounter: {
    color: '#FF914D',
    fontSize: 36,
    fontFamily:'Ubuntu-Bold',
    paddingLeft: 10
  },
  pollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 30,
    paddingTop: 5
  },
  text: {
    fontFamily:'Ubuntu-Regular'
  }
})
