import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import BackArrow from '../components/BackArrow';
import BackgroundBox from '../components/BackgroundBox';
import BigButton from '../components/BigButton';
import ButtonSelector from '../components/ButtonSelector';
import InfoBox from '../components/InfoBox';
import SmallPlus from '../components/SmallPlus';
import { deleteFriendsByUserId, getFriendsByUserId, getUserDataByUserId, updateUserAddress, updateUserName, UserData } from '../services/UserServices';
import ScreenHeaderText from '../components/ScreenHeaderText';
import { getGroupData, getGroupDataByGroupId, updateGroupDataWithNewUsers, deleteMembersByGroupId, GroupData, updateGroupTitle } from '../services/GroupServices';
import { EventData, deleteEvent } from '../services/EventServices';

import LineBreak from '../components/LineBreak';
import SmallButton from '../components/SmallButton';

interface Props {
    user: number,
    groupId: number;
    groupName: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    parentUpcomingEvent?: EventData;


}



export default function SingleGroupSettings(props: Props) {

    const { user, groupId, groupName, setState, parentUpcomingEvent } = props;
    const isFocused = useIsFocused();

    const [currentView, updateCurrentView] = useState<String>("Settings");
    const [userDetails, setUserDetails] = useState<UserData>();
    const [members, setGroupMembers] = useState<UserData[]>([]);
    const [settingsUpdated, updateSettingsUpdated] = useState<boolean>(false);
    const [membersToRemove, updateMembersToRemove] = useState<Array<number>>([]);
    const [singleGroup, setSingleGroup] = useState<any>({})
    const [refreshing, setRefreshing] = useState(false);
    const [pastEvents, setPastEvents] = useState<EventData[]>()
    const [title, setTitle] = useState<string>("")
    const [upcomingEvent, setUpcomingEvent] = useState<EventData>()

    useEffect(() => {

        const newPastEvents: any[] = [];
        if (isFocused || settingsUpdated) {
            updateCurrentView("Settings");
            getGroupDataByGroupId(groupId)
                .then((group) => {
                    setSingleGroup(group);
                    setGroupMembers(group.users)
                    group.events.forEach(event => {
                        if (Date.parse(event.date) < Date.now()) {
                            newPastEvents.push(event);
                        }

                    })
                    setPastEvents(newPastEvents)
                }

                ).then(data => { console.log(data) })
            getUserDataByUserId(user)
                .then((user) => {
                    setUserDetails(user);
                })

            updateSettingsUpdated(false);
        }
    }, [isFocused, settingsUpdated, refreshing]);




    function SettingsView() {
        return (
            <>
                {/* <View style={{flex: 0.2,
                }}>
                    <BackArrow onPress={() => { setState("Single Group")}} />
                </View>
                <View style={{ flex: 0.8}}> */}

                <View style={styles.header}>
                    <BackArrow onPress={() => setState("Single Group")}></BackArrow>
                    <ScreenHeaderText>Settings</ScreenHeaderText>
                    <View></View>
                </View>
                <View style={styles.container} >

                    <View>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Edit Group")}>
                            <Text style={styles.settingElements} >Edit Group</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Past Events")}>
                            <Text style={styles.settingElements} >Past Events</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Leave Group")}>
                            <Text style={styles.settingElements} >Leave Group</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            updateCurrentView("Delete Event")
                        }}>
                            <Text style={styles.settingElements} >Delete Event</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ >
        )
    }


    function EditGroupView() {
        const [name, setName] = useState("");

        function setNewGroupTitle() {
            const payload: { [key: string]: any } = {}
            if (name) {
                payload["title"] = name;
                updateGroupTitle(groupId, payload);
                payload["title"] = "";
                updateCurrentView("Settings")
            }
        }
        const memberItems = members?.map((member, index) => {
            return (
                <ButtonSelector option={member.userName} key={member.id}
                    onPress={() => {
                        if (!membersToRemove.includes(member.id)) {
                            const newMembersToRemove = [...membersToRemove];
                            newMembersToRemove.push(member.id);
                            updateMembersToRemove(newMembersToRemove);
                            console.log(newMembersToRemove)
                        } else {
                            const index = membersToRemove.indexOf(member.id);
                            if (index !== -1) {
                                const newMembersToRemove = [...membersToRemove];
                                newMembersToRemove.splice(index, 1);
                                updateMembersToRemove(newMembersToRemove);
                            }
                        }
                    }}
                    selected={membersToRemove.includes(member.id)}
                ></ButtonSelector>
            )
        });

        return (
            <>
                <View style={styles.accountContainer} >
                    <View style={styles.header}>
                        <BackArrow onPress={() => { }}></BackArrow>
                        <ScreenHeaderText>Edit Group</ScreenHeaderText>
                        <View></View>
                    </View>
                    <View style={{ height: '60%'}}>

                        <BackgroundBox boxHeight='30%' >
                            <View style={{ width: 300, alignSelf: 'center' }}>
                                <Text style={styles.settingTitle}>Group Name</Text>
                                <TextInput
                                    style={styles.newGroupNameInput}
                                    defaultValue={groupName}
                                    onChangeText={(value) => setName(value)}
                                >
                                </TextInput>
                            </View>
                        </BackgroundBox>
                        <View>
                            <SmallButton title='Submit' onPress={() => {
                                setNewGroupTitle()
                            }} ></SmallButton>

                        </View>
                    </View>


                </View>
            </>
        )

    }

    function PastEvents() {



        const pastEventItems = pastEvents?.map((event, index) => {
            let eventDate = new Date(event.date).toLocaleString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
            });

            let eventTime = new Date(event.date).toLocaleTimeString("en-US", {
                hour: '2-digit',
                minute: '2-digit'
            });


            return (
                <View>


                    <View style={{ width: '90%' }}>
                        <View style={{ paddingVertical: 5 }}>
                            {index != 0 ? <LineBreak /> : ""}
                        </View>
                        <View key={index} >
                            <Text style={styles.eventName} >{event.eventName}</Text>
                            <Text style={{ paddingVertical: 1 }} >
                                <Text style={styles.eventCategory}>Date:</Text>
                                <Text>  {eventDate}</Text>
                            </Text>
                            <Text style={{ paddingVertical: 1 }}>
                                <Text style={styles.eventCategory}>Time:</Text>
                                <Text>  {eventTime}</Text>
                            </Text>
                            <Text style={{ paddingVertical: 1 }}>
                                <Text style={styles.eventCategory}>Activity:</Text>
                                <Text>  {event.activity}</Text>
                            </Text>
                            <Text style={{ paddingVertical: 1 }}>
                                <Text style={styles.eventCategory}>Location:</Text>
                                <Text>  {event.eventLocation}</Text>
                            </Text>

                        </View>
                    </View>
                </View>
            )
        });



        return (
            <View>
                <View style={{ flex: 0.2, alignSelf: 'flex-start', }}>
                    <BackArrow onPress={() => { updateCurrentView("Settings") }} />
                </View>
                <View style={{ flex: 0.8, marginBottom: '30%', alignItems: 'center', }}>
                    <InfoBox header='Past Events' boxHeight='70%' boxMarginTop='5%' >
                        <ScrollView style={{ padding: 10 }}>
                            {pastEventItems}
                        </ScrollView>
                    </InfoBox>
                </View>

            </View>
        )
    }

    function LeaveGroup() {


        return (

            <View>

                <View style={{ flex: 0.2 }}>
                    <BackArrow onPress={() => { updateCurrentView("Settings") }} />
                </View>
                <View style={{ alignItems: 'center', flex: 0.8 }}>

                    <BackgroundBox boxWidth={'80%'} boxHeight={250} boxMarginBottom={'5%'} boxMarginTop={'5%'}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>Are you sure you want to leave the group?</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ marginHorizontal: 5 }}>
                                    <SmallButton title={'Yes'} onPress={() => {
                                        deleteMembersByGroupId(groupId, [user]);
                                        setState("All Groups");
                                    }} />
                                </View>
                                <SmallButton title={'No'} onPress={() => { updateCurrentView("Settings") }} />
                            </View>
                        </View>
                    </BackgroundBox>
                </View>
            </View>


        )
    }

    function DeleteEvent() {

        let eventDate: string = ""
        let eventTime: string = ""
        if (parentUpcomingEvent != undefined) {
            eventDate = new Date(parentUpcomingEvent.date).toLocaleString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
            });

            eventTime = new Date(parentUpcomingEvent.date).toLocaleTimeString("en-US", {
                hour: '2-digit',
                minute: '2-digit'
            });

        }


        return (

            <View>
                <View style={{ flex: 0.2 }}>
                    <BackArrow onPress={() => { updateCurrentView("Settings") }} />
                </View>
                <View style={{ alignItems: 'center', flex: 0.8 }}>

                    <BackgroundBox boxWidth={'80%'} boxHeight={300} boxMarginBottom={'5%'} boxMarginTop={'5%'}>
                        <View style={{ padding: 15, alignSelf: 'center' }}>
                            {parentUpcomingEvent ?
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 24, paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>Are you sure you want to delete the following? {parentUpcomingEvent?.eventName}</Text>
                                    <View style={{ marginTop: 15 }}>
                                        {eventDate ? <Text style={styles.reviewText} ><Text style={{ color: "#1E1E1E", fontStyle: 'italic' }}>Date:</Text>  {eventDate}</Text> : ""}
                                        {eventTime ? <Text style={styles.reviewText} ><Text style={{ color: "#1E1E1E", fontStyle: 'italic' }}>Time:</Text>  {eventTime}</Text> : ""}
                                        {parentUpcomingEvent?.activity ? <Text style={styles.reviewText}><Text style={{ color: "#1E1E1E", fontStyle: 'italic' }}>Activity:</Text>  {parentUpcomingEvent?.activity}</Text> : ""}
                                        {parentUpcomingEvent?.eventLocation ? <Text style={styles.reviewText}><Text style={{ color: "#1E1E1E", fontStyle: 'italic' }}>Location:</Text>  {parentUpcomingEvent?.eventLocation}</Text> : ""}
                                    </View>
                                </View>
                                :
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 24, paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>No upcoming event.</Text>
                                </View>
                            }
                        </View>
                    </BackgroundBox>
                    <View style={{ flex: 0.2 }}>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ marginHorizontal: 5 }}>
                                <SmallButton title={'Yes'} onPress={() => {
                                    if (parentUpcomingEvent) {
                                        deleteEvent(parentUpcomingEvent?.id)
                                        setState("All Groups");
                                    }
                                    updateCurrentView("Settings")
                                }} />
                            </View>
                            <SmallButton title={'No'} onPress={() => { updateCurrentView("Settings") }} />
                        </View>
                    </View>
                </View>
            </View>


        )

    }



    return (
        <SafeAreaView >
            {currentView === "Settings" ? <SettingsView /> : ""}
            {currentView === "Edit Group" ? <EditGroupView /> : ""}
            {currentView === "Past Events" ? <PastEvents /> : ""}
            {currentView === "Leave Group" ? <LeaveGroup /> : ""}
            {currentView === "Delete Event" ? <DeleteEvent /> : ""}
            {currentView === "loading" ? "" : ""}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25242B',
    },
    settingElements: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FF914D',
        paddingTop: '8%',
        textAlign: 'center'
    },
    settingsContainer: {
        paddingTop: '10%',
        width: '100%',
        height: '100%'
    },
    groupMembers: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    membersButton: {
        alignSelf: 'flex-end',
        paddingBottom: '10%',
        paddingRight: '5%'
    },

    settingTitle: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 24
    },
    newGroupNameInput: {
        padding: 10,
        backgroundColor: 'white',
        width: '70%',
        fontSize: 20,
        color: 'black',
    },
    reviewText: {
        fontSize: 18,
        padding: 10,
    },
    eventCategory: {
        fontStyle: 'italic', color: '#1E1E1E'
    },
    eventName: {
        fontSize: 18, color: '#1E1E1E', paddingBottom: 8
    },
    header: {
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
        width: '100%',
        justifyContent: 'space-around',
        fontFamily: 'Ubuntu-Bold'
    }, accountContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: "100%",
        height: "100%"
    },

});



// <View style={styles.header}>
//                     <BackArrow onPress={() => updateCurrentView("Settings")}></BackArrow>
//                     <ScreenHeaderText>Settings</ScreenHeaderText>
//                     <View></View>
//                 </View>
//                 <View style={styles.eventCategory} >
//                     <View style={{ }}>
//                         <BackgroundBox boxHeight={'20%'}>
//                             <View style={{ alignItems: 'center' }}>
//                                 <Text style={styles.settingTitle}>Group Name</Text>
//                                 <TextInput
//                                     style={styles.newGroupNameInput}
//                                     defaultValue={groupName}
//                                     onChangeText={(value) => setName(value)}
//                                 >
//                                 </TextInput>

//                                 <View style={{ marginTop: '10%' }}>

//                                     <SmallButton title='Submit' onPress={() => {
//                                         setNewGroupTitle()
//                                     }} ></SmallButton>
//                                 </View>
//                             </View>
//                         </BackgroundBox>
//                     </View>

//                     <View style={{}}>

//                         <InfoBox header='Contacts'
//                             boxHeight='70%'
//                         // smallPlus={<SmallPlus onPress={() => { }} />} 
//                         >
//                             <ScrollView>
//                                 <View style={styles.groupMembers}>
//                                     <ScrollView showsVerticalScrollIndicator={false} snapToStart={false}>

//                                         {memberItems}
//                                     </ScrollView>
//                                 </View>
//                             </ScrollView>
//                         </InfoBox>

//                             <View style={styles.membersButton}>
//                                 <BigButton
//                                     title='Remove Selected'
//                                     onPress={() => {
//                                         console.log(membersToRemove)
//                                         deleteMembersByGroupId(groupId, membersToRemove)
//                                         setRefreshing(true);
//                                         setTimeout(() => {
//                                             setRefreshing(false);
//                                         }, 1000);

//                                     }}></BigButton>
//                             </View>
//                         </View>
//                     </View>