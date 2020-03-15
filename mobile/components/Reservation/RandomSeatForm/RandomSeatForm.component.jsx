import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from "react-native";
import {Icon} from 'native-base';
import RandomSeatFormStyles from "./RandomSeatForm.styles";
import ReservationOverview from "../ReservationOverview/ReservationOverview.component";

const RandomSeatForm = ({id}) => {
    const [seatCount, setSeatCount] = useState(0);

    return (
        <View style={RandomSeatFormStyles.content}>
            <ReservationOverview id={id} />
            <View style={RandomSeatFormStyles.seatCounterTitleContainer}>
                <Text style={RandomSeatFormStyles.seatCounterTitle}>Wybierz liczbę miejsc:</Text>
            </View>
            <View style={RandomSeatFormStyles.seatCounterContainer}>
                <TouchableOpacity
                    style={RandomSeatFormStyles.seatCounterIconContainer}
                    onPress={() => {
                        if (seatCount > 0) setSeatCount(seatCount-1)
                    }}
                >
                    <Icon type={'FontAwesome5'} name={'minus'}  style={RandomSeatFormStyles.seatCounterIcon}/>
                </TouchableOpacity>
                <View style={RandomSeatFormStyles.counterTextContainer}>
                    <Text style={RandomSeatFormStyles.counterText}>{seatCount}</Text>
                </View>
                <TouchableOpacity
                    style={RandomSeatFormStyles.seatCounterIconContainer}
                    onPress={() => setSeatCount(seatCount+1)}
                >
                    <Icon type={'FontAwesome5'} name={'plus'}  style={RandomSeatFormStyles.seatCounterIcon}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={RandomSeatFormStyles.submitButton}
                onPress={() => {}}
            >
                <Text style={RandomSeatFormStyles.submitButtonText}>REZERWUJ</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RandomSeatForm;