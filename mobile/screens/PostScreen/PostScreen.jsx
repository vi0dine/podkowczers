import React from 'react';
import {View, Text, Image} from "react-native";
import {Container, Content, DeckSwiper} from "native-base";
import PostScreenStyles from "./PostScreen.styles";
import {useDispatch, useSelector} from "react-redux";
import {Video} from "expo-av";
import moment from "moment";

const PostScreen = ({route}) => {
    const id = route.params.id;
    const post = useSelector(state => state.PostsState.posts.find(post => post.id === id));

    return post && (
        <Container style={PostScreenStyles.mainContainer}>
            <Content contentContainerStyle={PostScreenStyles.content}>
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
                                style={PostScreenStyles.video}
                            />
                        ) : (
                            <DeckSwiper
                                dataSource={post.attachments.media}
                                renderItem={item => (
                                    <Image
                                        source={{uri: item.src}}
                                        style={PostScreenStyles.image}
                                    />
                                )}
                            />
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