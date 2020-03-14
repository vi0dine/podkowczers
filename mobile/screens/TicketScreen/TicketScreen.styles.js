import {Dimensions, StyleSheet} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../variables";

const TicketScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.1,
    },
    qrCode: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').width*0.9,
        resizeMode: 'contain',
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width*0.9
    },
    concertContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15
    },
    iconContainer: {
        width: 45
    },
    icon: {
        color: MUSTARD,
    },
    concert: {
        paddingLeft: 10,
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 24
    },
    placeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    place: {
        paddingLeft: 10,
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 18
    },
    chairContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    sector: {
        paddingLeft: 10,
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 30
    },
    row: {
        paddingLeft: 10,
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 30
    },
    seat: {
        paddingLeft: 10,
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 30
    },
    seatLabel: {
        paddingLeft: 10,
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 16
    }
});

export default TicketScreenStyles;