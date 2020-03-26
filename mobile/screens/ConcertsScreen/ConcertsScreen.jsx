import React, {useEffect} from 'react';
import {Container, Content} from "native-base";
import ConcertsScreenStyles from "./ConcertsScreen.styles";
import {Text, View, RefreshControl} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {fetchConcerts} from "../../redux/Concerts/Concerts.actions";
import ConcertItem from "../../components/Concerts/ConcertItem/ConcertItem.component";

const ConcertsScreen = () => {
    const dispatch = useDispatch();
    const concerts = useSelector(state => state.ConcertsState.concerts);
    const fetching = useSelector(state => state.ConcertsState.fetching);

    useEffect(() => {
        dispatch(fetchConcerts())
    }, []);

    return (
        <Container style={ConcertsScreenStyles.mainContainer}>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={ConcertsScreenStyles.content}
                refreshControl={<RefreshControl refreshing={fetching} onRefresh={() => dispatch(fetchConcerts())}/>}
            >
                <View style={ConcertsScreenStyles.titleContainer}>
                    <Text style={ConcertsScreenStyles.title}>Koncerty:</Text>
                </View>
                <View style={ConcertsScreenStyles.ConcertsContainer}>
                    {
                        concerts.length > 0 && concerts.map(concert => (
                            <ConcertItem key={concert.id} concert={concert} />
                        ))
                    }
                </View>
            </Content>
        </Container>
    );
};

export default ConcertsScreen;