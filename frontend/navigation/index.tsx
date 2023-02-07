import * as React from 'react';
import { Settings, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, Pressable } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import AllGroups from '../screens/AllGroupsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EventsScreen from '../screens/EventsScreen';

const Tab = createBottomTabNavigator();



export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName: any;
    
                                if (route.name === 'Home') {
                                    iconName = focused ? 'ios-home': 'ios-home-outline';
                                    size = 40;
                                } else if (route.name === "Groups") {
                                    iconName = focused ? 'people' : 'people-outline'
                                    size = 40;
                                    // return (
                                    //     <Image source={require('../assets/GroupLogo1.png')}/>
                                    //     )
                                        
                                    } else if (route.name === "Events") {
                                        iconName = focused ? 'ios-calendar' : 'ios-calendar-outline'
                                        size = 40;
                                    } else if (route.name === 'Settings') {
                                        iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                                        size = 40;
                                    }
                                    return <Ionicons name={iconName} size={size} color={color} />;
                                    
                                },
                                tabBarActiveTintColor: '#25E698',
                                tabBarInactiveTintColor: '#FF914D'
                                
                                
                            } )}
            
        
            >
                            
                <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarShowLabel: false
                    }}
                
                />
                <Tab.Screen
                 name="Groups"
                 component={AllGroups}
                 options={{
                    tabBarShowLabel: false
                    }}
                 />
                <Tab.Screen 
                name="Events"
                 component={EventsScreen}
                 options={{
                    tabBarShowLabel: false
                    }}
                     />
                <Tab.Screen
                name="Settings"
                 component={SettingsScreen}
                 options={{
                    tabBarShowLabel: false
                    }}
                  />
            </Tab.Navigator>
        </NavigationContainer>

    )
}


