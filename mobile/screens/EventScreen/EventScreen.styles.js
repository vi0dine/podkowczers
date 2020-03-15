import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../variables";
import Constants from 'expo-constants';

const EventScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        marginTop: Constants.statusBarHeight
    },
    imageContainer: {},
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.2
    },
    titleContainer: {
        paddingLeft: 10
    },
    title: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 25
    },
    descriptionContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
    },
    description: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 12,
        textAlign: 'justify'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MUSTARD,
        margin: 10,
        borderRadius: 20
    },
    buttonIcon: {
        color: PURPLE,
        fontSize: 26,
    },
    buttonText: {
        fontFamily: MAIN_FONT,
        color: PURPLE,
        fontSize: 14,
    },
    infoContainer: {
        padding: 10
    },
    place: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 16
    },
    starts_at: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 16
    },
    duration: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 16
    }
});

export default EventScreenStyles;