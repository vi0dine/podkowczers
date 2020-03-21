import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";

const EventItemStyles = StyleSheet.create({
    eventBox: {
        backgroundColor: RED,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 7,
        padding: 5,
        borderRadius: 20
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    iconContainer: {
        padding: 5
    },
    icon: {
        color: PURPLE,
        fontSize: 26
    },
    concert: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 17,
    },
    placeContainer: {
        width: '85%'
    },
    place: {
        fontFamily: MAIN_FONT,
        color: `${MUSTARD}bf`,
        fontSize: 14
    },
    starts_at: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 11
    },
    ticketsInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: 10
    },
    ticketsIconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    ticketIcon: {
        color: WHITE,
        fontSize: 28,
        marginBottom: 5
    }
});

export default EventItemStyles;