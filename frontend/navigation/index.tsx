import * as React from 'react';
import {StyleSheet, Settings, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import AllGroups from '../screens/AllGroupsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EventsScreen from '../screens/EventsScreen';

const Tab = createBottomTabNavigator();




export default function Navigation() {
    return (
        <NavigationContainer >
            <Tab.Navigator     
                screenOptions={({ route }) => ({                
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: any;
                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-home' : 'ios-home-outline';
                            size = 48;
                        } else if (route.name === "Groups") {
                            iconName = focused ? 'people' : 'people-outline'
                            size = 48;
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
                    component={HomeScreen}
                />
                <Tab.Screen
                    name="Groups"
                    component={AllGroups}
                />
                <Tab.Screen
                    name="Events"
                    component={EventsScreen}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>

    )
}




