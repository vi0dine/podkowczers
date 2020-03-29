import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";
import Constants from 'expo-constants';

const SeatButtonStyles = StyleSheet.create({
    button: {
        flex: 1,
        margin: 3,
        maxHeight: Dimensions.get('window').height*0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: MUSTARD
    },
    reserved: {
        flex: 1,
        margin: 3,
        maxHeight: Dimensions.get('window').height*0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: WHITE
    },
    selectedButton: {
        flex: 1,
        margin: 3,
        maxHeight: Dimensions.get('window').height*0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
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