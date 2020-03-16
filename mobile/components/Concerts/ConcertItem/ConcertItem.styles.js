import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";

const ConcertItemStyles = StyleSheet.create({
    concertBox: {
        backgroundColor: RED,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 7,
        borderRadius: 20
    },
    imageContainer: {
        borderRadius: 20
    },
    image: {
        height: 120,
        width: Dimensions.get('window').width*0.9,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    content: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 16
    },
    ticketsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    ticketsIcon: {
        color: MUSTARD,
        paddingRight: 10,
        fontSize: 20
    },
    ticketsCount: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 14
    }
});

export default ConcertItemStyles;