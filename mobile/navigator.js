import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import {Icon} from 'native-base';
import EventsScreen from "./screens/EventsScreen/EventsScreen";
import ConcertsScreen from "./screens/ConcertsScreen/ConcertsScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import {MAIN_FONT} from "./variables";
import {Dimensions} from "react-native-web";
import TicketScreen from "./screens/TicketScreen/TicketScreen";
import EventScreen from "./screens/EventScreen/EventScreen";
import ReservationScreen from "./screens/ReservationScreen/ReservationScreen";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            headerMode={'none'}
        >
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    );
}

const EventsStack = createStackNavigator();

function EventsStackScreen() {
    return (
        <EventsStack.Navigator
            headerMode={'none'}
            mode={'modal'}
        >
            <EventsStack.Screen
                name="Wydarzenia"
                component={EventsScreen}
                options={{
                    unmountOnBlur: true
                }}
            />
            <EventsStack.Screen
                name="Event"
                component={EventScreen}
                options={{
                    unmountOnBlur: true
                }}
            />
            <EventsStack.Screen
                name="Reserve"
                component={ReservationScreen}
                options={{
                    unmountOnBlur: true
                }}
            />
        </EventsStack.Navigator>
    );
}

const ConcertsStack = createStackNavigator();

function ConcertsStackScreen() {
    return (
        <ConcertsStack.Navigator
            headerMode={'none'}
        >
            <ConcertsStack.Screen name="Koncerty" component={ConcertsScreen} />
        </ConcertsStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator
            headerMode={'none'}
            mode={"modal"}
            unmountInactiveRoutes={true}
        >
            <ProfileStack.Screen name="Profil" component={ProfileScreen} />
            <ProfileStack.Screen
                options={{
                    gestureEnabled: true,
                    gestureDirection: 'vertical'
                }}
                name="Ticket"
                component={TicketScreen}
            />
        </ProfileStack.Navigator>
    );
}

const LoginStack = createStackNavigator();

function LoginStackScreen() {
    return (
        <LoginStack.Navigator
            headerMode={'none'}
            tabBarVisible={'none'}
        >
            <LoginStack.Screen name="Login" component={LoginScreen} />
        </LoginStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const setIcon = (name, size, color) => {
    switch (name) {
        case 'Home':
            return <Icon type={'AntDesign'} name={'home'} size={size} style={{color: `${color}`}}/>;
        case 'Wydarzenia':
            return <Icon type={'AntDesign'} name={'calendar'} size={size} style={{color: `${color}`}}/>;
        case 'Koncerty':
            return <Icon type={'Entypo'} name={'note'} size={size} style={{color: `${color}`}}/>;
        case 'Profil':
            return <Icon type={'AntDesign'} name={'user'} size={size} style={{color: `${color}`}}/>;
    }
};

const MainStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return setIcon(route.name, size, color);
                },
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: '#FFC857',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    position:'absolute',
                    bottom: 0,
                    padding: 10,
                    width: Dimensions.get('window').width,
                    height: 55,
                    zIndex: 9999
                },
                labelStyle: {
                    fontFamily: MAIN_FONT
                },
                activeTintColor: '#984447',
                inactiveTintColor: 'rgba(152,68,71,0.40)',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
            />
            <Tab.Screen
                name="Wydarzenia"
                component={EventsStackScreen}
            />
            <Tab.Screen
                name="Koncerty"
                component={ConcertsStackScreen}
            />
            <Tab.Screen
                name="Profil"
                component={ProfileStackScreen}
                options={{
                    unmountOnBlur: true
                }}
            />
        </Tab.Navigator>
    );
};

const Root = createStackNavigator();

const RootStack = () => (
    <Root.Navigator
        headerMode={'none'}
        tabBarVisible={'none'}
    >
        <Root.Screen name="Login" component={LoginScreen} />
        <Root.Screen name="Main" component={MainStack} />
    </Root.Navigator>
);

export default RootStack;

