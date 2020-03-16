import React, {useEffect, useState} from 'react';
import * as _ from 'lodash';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import ConcertItemStyles from "./ConcertItem.styles";
import {Icon} from "native-base";
import {useNavigation} from '@react-navigation/native';
import {apiURL} from "../../../config/server";

const FadeImage = (props) => {
    const opacity = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.Image
            {...props}
            style={{...props.style, opacity}}
        />
    );
};

const ConcertItem = ({concert}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={ConcertItemStyles.concertBox}
            onPress={() => {
                navigation.navigate('Concert', {id: concert.id})
            }}
        >
            <View style={ConcertItemStyles.imageContainer}>
                <FadeImage
                    style={ConcertItemStyles.image}
                    source={{uri: `${apiURL()}${concert.images[_.random(0, concert.images.length-1)]}`}}
                />
            </View>
            <View style={ConcertItemStyles.content}>
                <View style={ConcertItemStyles.infoContainer}>
                    <Text style={ConcertItemStyles.name}>{concert.name}</Text>
                </View>
                <View style={ConcertItemStyles.ticketsContainer}>
                    <Icon type={'Entypo'} name={'ticket'} style={ConcertItemStyles.ticketsIcon}/>
                    <Text style={ConcertItemStyles.ticketsCount}>{concert.available_tickets_count}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ConcertItem;