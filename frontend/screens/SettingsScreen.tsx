import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import BackArrow from '../components/BackArrow';
import DatePollButton from '../components/DatePollButton';
import InfoBox from '../components/InfoBox';
import ScreenHeaderText from '../components/ScreenHeaderText';
import { getFriendsByUserId, UserData } from '../services/UserServices';

interface Props {
    user: number
}

export default function SettingsScreen(props: Props) {

  const { user } = props;
  const isFocused = useIsFocused();

  const [currentView, updateCurrentView] = useState<String>("Settings");
  const [friends, setFriends] = useState<UserData[]>();
  const friendsToRemove = useRef<Array<number>>([]);

  useEffect(() => {
    if (isFocused) {
        getFriendsByUserId(user)
        .then((userFriends) => {
            setFriends(userFriends);
        })
    }
  }, [isFocused]);


  function onPressAccountSetting(){
    return console.log("Account settings pressed")
  }
  function onPressContactsSetting(){
    return console.log("Contacts settings pressed")
  }
  function onPressNotificationSetting(){
    return console.log("Notification settings pressed")
  }

  const memberItems = friends?.map((friend, index) => {

    return(
        <DatePollButton dateOption={friend.userName} 
                        onPress={() => {
                            if (!friendsToRemove.current.includes(friend.id)) {
                                friendsToRemove.current.push(friend.id);
                            } else {
                                const index = friendsToRemove.current.indexOf(friend.id);
                                if (index !== -1) {
                                    friendsToRemove.current.splice(index, 1);
                                }
                            }
                        }} 
                        votedOn={friendsToRemove.current.includes(friend.id)}
                        key={index}></DatePollButton>
    )
  });



  function SettingsView() {
    return (
      <SafeAreaView style={styles.container}>
          <View>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressAccountSetting}>
              <Text style={styles.title1} >Account</Text>
            </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.7}onPress={onPressContactsSetting}>
            <Text style={styles.title} >Contacts</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressNotificationSetting}>
            <Text style={styles.title}>Notifications</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  function ContactsView() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <BackArrow onPress={() => updateCurrentView("Settings")}></BackArrow>
          </View>
        <View>
          <InfoBox header='Group Members'>
              <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.members}>
                      {memberItems}
                  </View>
              </ScrollView>
          </InfoBox>
        </View>
        <View>
        </View>
      </SafeAreaView>
    )
  }



  return (
      <SafeAreaView style={styles.container}>
        {currentView === "Settings" ? <SettingsView/> : ""}
        {currentView==="singlegroup"? <SingleGroupView/>: ""}
        {currentView === "addgroupview" ? <AddGroupView/>: ""}
        {currentView === "newEvent" ? <AddEventView/>: ""}
        {currentView === "loading" ? "" : ""}
      </SafeAreaView>
  )


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#25242B'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF914D',
    paddingTop: '8%',
    marginLeft: '7.5%'
    
  },
  title1: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF914D',
    paddingTop: '20%',
    marginLeft: '7.5%'
  },
});