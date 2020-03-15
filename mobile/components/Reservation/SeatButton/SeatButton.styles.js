import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";
import Constants from 'expo-constants';

const SeatButtonStyles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        width: Dimensions.get('window').width/30,
        height: Dimensions.get('window').height/20,
        backgroundColor: MUSTARD
    },
    reserved: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: Dimensions.get('window').width/30,
        height: Dimensions.get('window').height/20,
        backgroundColor: WHITE
    },
    selectedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: Dimensions.get('window').width/30,
        height: Dimensions.get('window').height/20,
        backgroundColor: RED
    },
    buttonText: {
        fontFamily: MAIN_FONT,
        color: PURPLE,
        fontSize: 6
    },
    selectedButtonText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 6
    }
});

export default SeatButtonStyles;