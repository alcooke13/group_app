import * as React from 'react';
import {StyleSheet, Settings, Text, View, Image } from 'react-native';
import { NavigationContainer, useIsFocused} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import AllGroups from '../screens/AllGroupsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EventsScreen from '../screens/EventsScreen';
import AddGroupScreen from '../screens/AddGroupScreen';

const Tab = createBottomTabNavigator();

interface Props {
    user: number
}

export default function Navigation(props: Props) {

    const { user } = props;

    return (
        <NavigationContainer>
            <Tab.Navigator     
                screenOptions={({ route }) => ({                
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: any;
                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-home' : 'ios-home-outline';
                            size = 48;
                            useIsFocused()
                        } else if (route.name === "Groups") {
                            iconName = focused ? 'people' : 'people-outline'
                            size = 48;
                            useIsFocused()
                            // return (

                            // This is to add our group logo, once we have resized and got a green logo, add this back in.
                            //     <Image source={require('../assets/GroupLogo1.png')}/>
                            //     )

                        } else if (route.name === "Events") {
                            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline'
                            size = 48;
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                            size = 48;
                            useIsFocused()
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#25E698',
                    tabBarInactiveTintColor: '#FF914D',
                    tabBarStyle:{backgroundColor: '#31303A', borderTopColor:'#31303A' , paddingTop: 8, paddingBottom: 8, minHeight: 64}
                })}
            >
                <Tab.Screen
                    name="Home"
                    children={()=><HomeScreen user={user}/>}
                />
                <Tab.Screen
                    name="Groups"
                    children={()=><AllGroups user={user}/>}
                />
                <Tab.Screen
                    name="Events"
                    children={()=><EventsScreen user={user}/>}
                />
                <Tab.Screen
                    name="Settings"
                    children={()=><SettingsScreen user={user}/>}
                />
            </Tab.Navigator>
        </NavigationContainer>

    )
}




