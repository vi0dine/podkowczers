import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";

const ReservationOverviewStyles = StyleSheet.create({
    overviewContainer: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.4,
        flexDirection: 'column',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 20,
    },
    eventInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    eventInfoTitle: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 16,
    },
    eventInfoText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 14,
    },
    eventIconContainer: {
        flex: .4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventIcon: {
        fontSize: 50,
        color: MUSTARD
    },
    eventTextContainer: {
        flex: .6
    }
});

export default ReservationOverviewStyles;