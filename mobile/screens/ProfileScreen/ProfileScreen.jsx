import React, {useEffect} from 'react';
import {Container, Content, Icon} from "native-base";
import {View, Text, TouchableOpacity, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, logoutUser} from "../../redux/Users/Users.actions";
import ProfileScreenStyles from "./ProfileScreen.styles";
import TicketItem from "../../components/Profile/TicketItem/TicketItem.component";

const ProfileScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.UserState);

    useEffect(() => {
        dispatch(fetchUser(user.id));
    }, []);

    return (
        <Container style={ProfileScreenStyles.mainContainer}>
            <Content
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={user.processing} onRefresh={() => {dispatch(fetchUser(user.id))}} />}
                contentContainerStyle={ProfileScreenStyles.content}
            >
                <View style={ProfileScreenStyles.iconContainer}>
                    <Icon type={'AntDesign'} name={'user'} style={ProfileScreenStyles.icon}/>
                </View>
                <View style={ProfileScreenStyles.emailContainer}>
                    <Text style={ProfileScreenStyles.email}>{user.email}</Text>
                </View>
                <View style={ProfileScreenStyles.coinsContainer}>
                    <View style={ProfileScreenStyles.coinsIconContainer}>
                        <Icon type={'MaterialCommunityIcons'} name={'coins'} style={ProfileScreenStyles.coinsIcon}/>
                    </View>
                    <View>
                        <Text style={ProfileScreenStyles.coinsText}>{user.coins} &nbsp; MONET</Text>
                    </View>
                </View>
                <View style={ProfileScreenStyles.ticketsContainer}>
                    <View style={ProfileScreenStyles.ticketsTitleContainer}>
                        <Text style={ProfileScreenStyles.ticketsTitle}>Moje bilety:</Text>
                    </View>
                    {
                        user.tickets.map(ticket => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))
                    }
                </View>
                <TouchableOpacity style={ProfileScreenStyles.logoutButton} onPress={() => dispatch(logoutUser(navigation))}>
                    <Icon
                        type={'FontAwesome'}
                        name={'power-off'}
                        style={ProfileScreenStyles.logoutIcon}
                    />
                </TouchableOpacity>
            </Content>
        </Container>
    );
};

export default ProfileScreen;