import React, {useState, useEffect} from 'react';
import {View, Text, Image, Animated} from "react-native";
import {Container, Content, DeckSwiper, Icon} from "native-base";
import PostScreenStyles from "./PostScreen.styles";
import {useDispatch, useSelector} from "react-redux";
import {Video} from "expo-av";
import moment from "moment";

const PostScreen = ({route}) => {
    const id = route.params.id;
    const post = useSelector(state => state.PostsState.posts.find(post => post.id === id));
    const [arrowsOpacity] = useState(new Animated.Value(0));

    React.useEffect(() => {
        if (post.attachments.media.length > 1) {
            Animated.sequence([
                Animated.delay(500),
                Animated.timing(
                    arrowsOpacity,
                    {
                        toValue: 1,
                        duration: 1000,
                    }
                ),
                Animated.timing(
                    arrowsOpacity,
                    {
                        toValue: 0.2,
                        duration: 1000,
                    }
                )
            ]).start();
        }
    }, []);


    return post && (
        <Container style={PostScreenStyles.mainContainer}>
            <Content contentContainerStyle={PostScreenStyles.content}
                     showsVerticalScrollIndicator={false}
            >
                <View style={PostScreenStyles.attachmentsContainer}>
                    {
                        post.attachments.media[0].type === 'video_inline' ? (
                            <Video
                                source={{uri: post.attachments.media[0].src}}
                                rate={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                useNativeControls
                                style={PostScreenStyles.video}
                            />
                        ) : (
                            <>
                            <DeckSwiper
                                dataSource={post.attachments.media}
                                renderItem={item => (
                                    <Image
                                        source={{uri: item.src}}
                                        style={PostScreenStyles.image}
                                    />
                                )}
                            />
                                <Animated.View style={[PostScreenStyles.leftArrowContainer, {opacity: arrowsOpacity}]}>
                                    <Icon type={'MaterialIcons'} name={'chevron-left'} />
                                </Animated.View>
                                <Animated.View style={[PostScreenStyles.rightArrowContainer, {opacity: arrowsOpacity}]}>
                                    <Icon type={'MaterialIcons'} name={'chevron-right'} />
                                </Animated.View>
                            </>
                        )
                    }
                </View>
                <View style={PostScreenStyles.bodyContainer}>
                    <Text style={PostScreenStyles.body}>{post.body}</Text>
                </View>
                <View style={PostScreenStyles.dateContainer}>
                    <Text style={PostScreenStyles.date}>{moment(post.created_at).format('LL')}</Text>
                </View>
            </Content>
        </Container>
    );
};

export default PostScreen;