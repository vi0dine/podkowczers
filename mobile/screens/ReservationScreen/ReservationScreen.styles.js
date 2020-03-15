import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../variables";
import Constants from 'expo-constants';

const ReservationScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK
    },
    content: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 20,
        width: Dimensions.get('window').width*0.6,
        height: Dimensions.get('window').height*0.15,
        backgroundColor: MUSTARD
    },
    buttonText: {
        fontFamily: MAIN_FONT,
        color: PURPLE,
        fontSize: 16,
    }
});

export default ReservationScreenStyles;