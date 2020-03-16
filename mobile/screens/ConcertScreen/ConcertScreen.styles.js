import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../variables";
import Constants from 'expo-constants';

const ConcertScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        marginTop: Constants.statusBarHeight
    },
    imagesContainer: {
        width: Dimensions.get('window').width,
        height: 250
    },
    image: {
        width: Dimensions.get('window').width,
        height: 250,
        resizeMode: 'cover'
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    ticketButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: RED
    },
    ticketIcon: {
        color: MUSTARD
    },
    ticketText: {
        color: WHITE,
        fontSize: 8,
        fontFamily: MAIN_FONT,
        marginTop: 3
    },
    name: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 21
    },
    descriptionContainer: {
        padding: 10,
        marginBottom: 55
    },
    description: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 12
    }
});

export default ConcertScreenStyles;