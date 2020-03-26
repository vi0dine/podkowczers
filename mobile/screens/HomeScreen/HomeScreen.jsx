import React, {useEffect} from 'react';
import * as _ from 'lodash';
import {View, Text, RefreshControl} from "react-native";
import {Container, Content} from "native-base";
import HomeScreenStyles from "./HomeScreen.styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../redux/Posts/Posts.actions";
import PostItem from "../../components/Home/PostItem/PostItem.component";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.PostsState.posts);
    const fetching = useSelector(state => state.PostsState.fetching);

    useEffect(() => {
        dispatch(fetchPosts())
    }, []);

    return posts && (
        <Container style={HomeScreenStyles.mainContainer}>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={HomeScreenStyles.content}
                refreshControl={<RefreshControl refreshing={fetching} onRefresh={() => dispatch(fetchPosts())} />}
            >
                <View style={HomeScreenStyles.titleContainer}>
                    <Text style={HomeScreenStyles.title}>Aktualności: </Text>
                </View>
                <View style={HomeScreenStyles.postsContainer}>
                    {
                        posts.length > 0 && _.sortBy(posts, 'created_at').reverse().map(post =>
                            {
                                if (post.body || post.attachments.media.length > 0) {
                                    return <PostItem key={post.id} post={post} />
                                }
                            }
                        )
                    }
                </View>
            </Content>
        </Container>
    );
};

export default HomeScreen;