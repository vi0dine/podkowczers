import {StyleSheet } from "react-native";
import {MAIN_FONT, MUSTARD, RED, WHITE} from "../../../variables";

const TicketItemStyles = StyleSheet.create({
    ticketBox: {
        flexDirection: 'row',
        margin: 7,
        backgroundColor: RED,
        borderRadius: 10
    },
    ticketIconContainer: {
        padding: 10
    },
    ticketIcon: {
        color: MUSTARD
    },
    ticketInfoContainer: {
        flexDirection: 'column',
    },
    ticketConcert: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 16
    },
    ticketPlace: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 12
    },
    ticketReservedAt: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 10
    }
});

export default TicketItemStyles;