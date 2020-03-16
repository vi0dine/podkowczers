import React, {useEffect} from 'react';
import {View, Text} from "react-native";
import {Container, Content} from "native-base";
import HomeScreenStyles from "./HomeScreen.styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../redux/Posts/Posts.actions";
import PostItem from "../../components/Home/PostItem/PostItem.component";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.PostsState.posts);

    useEffect(() => {
        dispatch(fetchPosts())
    }, []);

    return posts && (
        <Container style={HomeScreenStyles.mainContainer}>
            <Content contentContainerStyle={HomeScreenStyles.content}>
                <View style={HomeScreenStyles.titleContainer}>
                    <Text style={HomeScreenStyles.title}>Aktualności: </Text>
                </View>
                <View style={HomeScreenStyles.postsContainer}>
                    {
                        posts.length > 0 && posts.map(post => (
                            <PostItem key={post.id} post={post} />
                        ))
                    }
                </View>
            </Content>
        </Container>
    );
};

export default HomeScreen;