import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";

const PostItemStyles = StyleSheet.create({
    postBox: {
        overflow: 'hidden',
        backgroundColor: RED,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: MUSTARD,
        borderStyle: 'solid',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    imageContainer: {
        borderRadius: 20
    },
    image: {
        height: 120,
        width: Dimensions.get('window').width*0.9,
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    video: {
        height: 120,
        width: Dimensions.get('window').width*0.9,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    content: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    dateContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    date: {
        fontFamily: MAIN_FONT,
        color: PURPLE,
        fontSize: 14
    },
    body: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 14
    }
});

export default PostItemStyles;