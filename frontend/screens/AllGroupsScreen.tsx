import * as React from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { getGroupData, getGroupDataByGroupId, GroupData } from '../services/GroupServices';
import GroupNameButton from '../components/GroupNameButton';
import InfoBox from '../components/InfoBox';
import TextHeader from '../components/TextHeader';
import ScreenHeaderText from '../components/ScreenHeaderText';
import BackArrow from '../components/BackArrow';
import BigPlus from '../components/BigPlus';
import BurgerIcon from '../components/BurgerIcon';
import { DatePollData, getDatePollDataByGroupId, postDatePoll, updateDatePollTimeout } from '../services/DatePollServices';
import { getLocationPollDataByGroupId, LocationPollData, postLocationPoll, updateLocationPollTimeout } from '../services/LocationPollServices';
import { ActivityPollData, getActivityPollDataByGroupId, postActivityPoll, updateActivityPollTimeout } from '../services/ActivityPollServices';
import ButtonSelector from '../components/ButtonSelector';
import NewEvent from './NewEvent/NewEvent';
import AddGroupScreen from './AddGroupScreen';
import SmallPlus from '../components/SmallPlus';
import { updateActivityPollWithNewVote } from '../services/ActivityPollServices';
import { updateLocationPollWithNewVote } from '../services/LocationPollServices';
import NewOptionScreen from './NewOptionScreen';
import { EventData, updateEventActivity, updateEventDate, updateEventLocation } from '../services/EventServices';

interface Props {
  user: number
}

export default function AllGroupsScreen(props: Props) {

    const { user } = props;
    const isFocused = useIsFocused()

    const [groups, setGroups] = useState<GroupData[]>();
    const [singleGroup, setSingleGroup] = useState<GroupData>();
    const [groupView, setGroupView] = useState<string>("loading");
    const [upcomingEvent, setUpcomingEvent] = useState<EventData | null>(null);
    const [groupPolls, setGroupPolls] = useState<Array<DatePollData | ActivityPollData | LocationPollData>>();
    const [activeGroupPoll, setActiveGroupPoll] = useState<(DatePollData | ActivityPollData | LocationPollData | null)>(null);

    const route = useRoute();
    let groupId: number;

    try {
      groupId = route.params.groupId;
    } catch {
      groupId = 0;
    }

    useEffect(() => {
      if (groupId != 0) {
        setGroupView("loading")
        getSingleGroupData(groupId);
        route.params.groupId = 0;

        getGroupData()
        .then((userGroups) => {
          setGroups(userGroups);
        })
      } else if (isFocused) {
        setGroupView("allgroups");

        getGroupData()
        .then((userGroups) => {
          setGroups(userGroups);
        }) 
      } 
    }, [isFocused]);

    function pollController(allGroupPolls: (DatePollData | ActivityPollData | LocationPollData)[], upcomingEvent: EventData) {
      const upcomingPoll: DatePollData | ActivityPollData | LocationPollData | undefined = allGroupPolls?.find(poll => (Date.parse(poll.timeout) - Date.now() > 0));
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
        setActiveGroupPoll(upcomingPoll);
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
                  pollController(allGroupsPolls, upcomingEventDetails)
                })
                .then(() => {
                  setGroupView("singlegroup")
                })
          } else {
            setUpcomingEvent(null);
            setGroupView("singlegroup");
          }
        }
      );
    }

    const allUsersGroupsByName = groups?.flatMap(function(group, index){
      return <GroupNameButton 
                  key={index} 
                  title={group.groupName} 
                  status={false} 
                  onPress={() => getSingleGroupData(group.id)
                  }/>
    })

    function addNewEvent(){
      setGroupView("newEvent")
    }
    
    // const upcomingPoll: DatePollData | ActivityPollData | LocationPollData = allGroupPolls.find(poll => (Date.parse(poll.timeout) - Date.now()>0))


    function addNewOption(){
      setGroupView("addOption")
    }

    function SingleGroupDetails(){
      if (upcomingEvent) {
        const eventDate = new Date(upcomingEvent.date).toLocaleString('en-GB', { 
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        });

        return (
          <>
            <TextHeader>{upcomingEvent.eventName}</TextHeader>
            <>
              <Text>Date:         {eventDate}</Text>
              <Text>Time:         TBC</Text>
              <Text>Location:   {upcomingEvent.eventLocation}</Text>
            </>
          </>
          )
      } else {
          return (
            <>
              <TextHeader> No upcoming event </TextHeader>
              <Text>Date:        </Text>
              <Text>Time:        </Text>
              <Text>Location:   </Text>
            </>
            )
        } 
    }   
    
    function SingleGroupPollDetails(){
      if (activeGroupPoll) {
        let availableOptions = []
        let voteCount = new Map()
        for (const [option, user_ids] of Object.entries(activeGroupPoll?.options)) {
            availableOptions.push(option)
            voteCount.set(option, user_ids)
        }

        console.log(Object.entries(activeGroupPoll?.options))

        const getOptions = availableOptions.map(function(val, index){
          return (
            <View style={styles.pollOption}>
              <ButtonSelector 
                key={index}
                option={val}
                onPress={() => captureChosenVote(val)} 
                selected={false}></ButtonSelector>
              <Text style={styles.voteCounter}>
                2
              </Text>
            </View>
          )
        })

        function captureChosenVote(val: string){
          let chosenOption : string = val;
          let voter : number = user;
          let newData: {[key: string]: number }  = {} 
        
          for (const [option, user_ids] of Object.entries(activeGroupPoll.options)){ 
            if (val == option){
              chosenOption= val
            }
          }

          if (activeGroupPoll.type == "Location") {
            newData[chosenOption]  = voter;
            updateLocationPollWithNewVote(activeGroupPoll?.id, newData)
          } else if (activeGroupPoll.type == "Activity"){
            newData[chosenOption]  = voter;
            updateActivityPollWithNewVote(activeGroupPoll?.id, newData)
          } else if(activeGroupPoll.type == "Date") {
            let dateoption = chosenOption.toString();
            newData[chosenOption] = voter;
          };
        }
        
        return getOptions
      } else {
        <Text>No current poll</Text>
      }
    }

    //   function captureChosenVote(val: string){
    //     let chosenOption : string = val;
    //     let voters : number[] = []
    //     for (const [option, user_ids] of Object.entries(activeGroupPoll?.options)){
    //       user_ids.forEach(id => {
    //         voters.push(id)
    //       });
    //     for (const [option, user_ids] of Object.entries(activeGroupPoll.options)){ 
    //       if (val == option){
    //         chosenOption= val
    //       }
    //     }
    //     let newData: {[key: string]: [value: number] }  = {} 
    //     newData[chosenOption]  = voters;
    //     updatePollWithNewVote(activeGroupPoll?.id, newData)
    //     console.log(newData)
    //   }
    // }
      
  
    

    function AllGroupView(){
      return(
        <>
          <Image source={require('../assets/GroupLogo1.png')}/>
          <ScrollView style={styles.scroll}>{allUsersGroupsByName}</ScrollView> 
          <BigPlus onPress={() => (setGroupView('addgroupview'))}/>
        </>
      ) 
    }

    function AddNewOptionPollView(){
      return (
        <>
          <NewOptionScreen user={user} singleGroupName={singleGroup.groupName} singleGroupId={singleGroup.id} setState={setGroupView}/>
        </>
      )
    }

    function AddEventView(){
      return (
        <>
          <NewEvent singleGroupName={singleGroup.groupName} singleGroupId={singleGroup.id} setState={setGroupView}></NewEvent>
        </>
      )
    }
    
    function SingleGroupView(){
      return(
        <>
          <View style={styles.header}>
            <BackArrow onPress={() => setGroupView("allgroups")}></BackArrow>
            <ScreenHeaderText>{singleGroup.groupName}</ScreenHeaderText>
            <BurgerIcon></BurgerIcon>
          </View>
          <InfoBox header='Next Event' boxHeight='60%' smallPlus={<SmallPlus onPress={()=>addNewEvent()} />}>
            <SingleGroupDetails/>
          </InfoBox>
          <InfoBox header={activeGroupPoll ? activeGroupPoll.event.eventName : "No poll"} smallPlus={<SmallPlus onPress={() => addNewOption()}/>}>
            <View>
              <SingleGroupPollDetails/>
            </View>
          </InfoBox>
        </>
      )
    }

    function AddGroupView(){
    return(
      <AddGroupScreen user={user}/>
    )
    }

    return (
        <SafeAreaView style={styles.container}>
          {groupView === "allgroups" ? <AllGroupView/> : ""}
          {groupView==="singlegroup"? <SingleGroupView/>: ""}
          {groupView === "addgroupview" ? <AddGroupView/>: ""}
          {groupView === "newEvent" ? <AddEventView/>: ""}
          {groupView === "loading" ? "" : ""}
          {groupView === "addOption" ? <AddNewOptionPollView/> : ""}
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
    color: 'white'
  },
  scroll: {
    flex: 1,
    width:'90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent:'space-between',
    width:"100%",
  justifyContent: 'space-around',
  },
  voteCounter: {
    color: "#FF914D",
    fontSize: 36,
    alignItems:'center',
    marginLeft: 15,
  },
  pollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 30,
    paddingTop: 5
  }
});
