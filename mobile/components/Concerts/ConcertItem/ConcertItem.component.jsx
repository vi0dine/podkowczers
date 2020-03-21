import React, {useEffect, useState} from 'react';
import * as _ from 'lodash';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import ConcertItemStyles from "./ConcertItem.styles";
import {Icon} from "native-base";
import {useNavigation} from '@react-navigation/native';
import {apiURL} from "../../../config/server";

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
                <Image
                    style={ConcertItemStyles.image}
                    source={{uri: `${apiURL()}${concert.images[0]}`}}
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