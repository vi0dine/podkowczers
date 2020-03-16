import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { Video } from 'expo-av';
import PostItemStyles from "./PostItem.styles";
import moment from "moment";
import {useNavigation} from '@react-navigation/native';

const PostItem = ({post}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={PostItemStyles.postBox}
            onPress={() => {
                navigation.navigate('Post', {id: post.id})
            }}
        >
            <View style={PostItemStyles.imageContainer}>
                {
                    post.attachments.media[0].type === 'video_inline' ? (
                        <Video
                            source={{uri: post.attachments.media[0].src}}
                            rate={0.7}
                            isMuted={true}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={PostItemStyles.image}
                        />
                    ) : (
                        <Image
                            style={PostItemStyles.image}
                            source={{uri: `${post.attachments.media[0].src}`}}
                        />
                    )
                }
            </View>
            {
                post.body && (
                    <View style={PostItemStyles.content}>
                        <View style={PostItemStyles.bodyContainer}>
                            <Text style={PostItemStyles.body}>{post.body}</Text>
                        </View>
                        <View style={PostItemStyles.dateContainer}>
                            <Text style={PostItemStyles.date}>{moment(post.created_at).format('LL')}</Text>
                        </View>
                    </View>
                )
            }
        </TouchableOpacity>
    );
};

export default PostItem;