import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";
import Constants from 'expo-constants';

const RandomSeatFormStyles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Constants.statusBarHeight + 20,
        marginBottom: 80
    },
    overviewContainer: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.4,
        shadowColor: MUSTARD,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 20,
    },
    seatCounterTitleContainer: {
        width: Dimensions.get('window').width,
        paddingLeft: 10
    },
    seatCounterTitle: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 24,
    },
    seatCounterContainer: {
        marginTop: 20,
        width: Dimensions.get('window').width*0.6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    seatCounterIconContainer: {
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MUSTARD
    },
    seatCounterIcon: {
        color: PURPLE
    },
    counterTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 36,
        lineHeight: 48
    },
    submitButton: {
        marginTop: 25,
        padding: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width*0.8,
        backgroundColor: RED
    },
    submitButtonText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 26
    }
});

export default RandomSeatFormStyles;