import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../variables";

const EventsScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.05,
    },
    titleContainer: {
        width: Dimensions.get('window').width*0.9,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    title: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 20
    },
    eventsContainer: {
        width: Dimensions.get('window').width*0.9,
        marginBottom: 95
    }
});

export default EventsScreenStyles;