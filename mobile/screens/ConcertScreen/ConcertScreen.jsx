import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, RefreshControl} from 'react-native';
import {Container, Content, Icon, DeckSwiper} from "native-base";
import ConcertScreenStyles from "./ConcertScreen.styles";
import {useDispatch, useSelector} from "react-redux";
import {apiURL} from "../../config/server";
import {fetchConcert} from "../../redux/Concerts/Concerts.actions";

const ConcertScreen = ({route}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const id = route.params.id;
    const concert = useSelector(state => state.ConcertsState.concerts.find(concert => concert.id === id));
    const fetching = useSelector(state => state.ConcertsState.fetching);

    useEffect(() => {
        dispatch(fetchConcert(id));
    }, []);

    return concert && (
        <Container style={ConcertScreenStyles.mainContainer}>
            <Content
                contentContainerStyle={ConcertScreenStyles.content}
                refreshControl={<RefreshControl refreshing={fetching} onRefresh={() => dispatch(fetchConcert(id))}/>}
            >
                <View style={ConcertScreenStyles.imagesContainer}>
                    <DeckSwiper
                        dataSource={concert.images}
                        renderItem={(item) => (
                            <Image
                                style={ConcertScreenStyles.image}
                                source={{uri: `${apiURL()}${item}`}}
                            />
                        )}
                    />
                </View>
                <View style={ConcertScreenStyles.nameContainer}>
                    <Text style={ConcertScreenStyles.name}>{concert.name}</Text>
                    {
                        concert.available_tickets_count > 0 && (
                            <TouchableOpacity
                                style={ConcertScreenStyles.ticketButton}
                                onPress={() => {
                                    navigation.navigate('Wydarzenia')
                                }}
                            >
                                <Icon type={'Entypo'} name={'ticket'} style={ConcertScreenStyles.ticketIcon} />
                                <Text style={ConcertScreenStyles.ticketText}>REZERWUJ</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View style={ConcertScreenStyles.descriptionContainer}>
                    <Text style={ConcertScreenStyles.description}>{concert.description}</Text>
                </View>
            </Content>
        </Container>
    );
};

export default ConcertScreen;