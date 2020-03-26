import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../variables";

const ProfileScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.1,
    },
    iconContainer: {
        width: Dimensions.get('window').width*0.3,
        height: Dimensions.get('window').width*0.3,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: WHITE
    },
    icon: {
        color: PURPLE,
        fontSize: 80
    },
    emailContainer: {
        marginTop: 15,
    },
    email: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 18
    },
    coinsContainer: {
        marginTop: 15,
        marginBottom: 5,
        width: Dimensions.get('window').width*0.45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    coinsIcon: {
        fontSize: 40,
        color: RED
    },
    coinsText: {
        fontSize: 20,
        fontFamily: MAIN_FONT,
        color: WHITE,
    },
    ticketsContainer: {
        width: Dimensions.get('window').width*0.9,
        marginBottom: 115
    },
    ticketsTitleContainer: {
        padding: 10
    },
    ticketsTitle: {
        color: WHITE,
        fontFamily: MAIN_FONT,
        fontSize: 21
    },
    logoutButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 45,
        height: 45,
        padding: 5,
        borderRadius: 30,
        backgroundColor: RED,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutIcon: {
        color: WHITE
    }
});

export default ProfileScreenStyles;