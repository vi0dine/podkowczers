import React, {useState} from 'react';
import LoginScreenStyles from './LoginScreen.styles';
import {Text, TouchableOpacity, View, Image, KeyboardAvoidingView} from 'react-native';
import {Button, Container, Form, Input, Item, Content, Icon, Spinner} from "native-base";
import LoginForm from "../../components/Login/LoginForm/LoginForm.component";
import RegisterForm from "../../components/Login/RegisterForm/RegisterForm.component";
import {useSelector} from "react-redux";
import {MUSTARD} from "../../variables";
const LoginScreen = () => {
    const [registering, setRegistering] = useState(false);
    const processing = useSelector(state => state.UserState.processing);
    const authenticating = useSelector(state => state.UserState.authenticating);

    return (
        <Container style={LoginScreenStyles.mainContainer}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                    {
                        processing || authenticating ? (
                            <View style={LoginScreenStyles.loader}>
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Spinner color={MUSTARD} />
                                    {
                                        processing ?
                                            <Text style={LoginScreenStyles.loadingText}>TRWA TWORZENIE KONTA...</Text> :
                                            <Text style={LoginScreenStyles.loadingText}>LOGOWANIE</Text>
                                    }
                                </View>
                            </View>
                        ) : (
                            <Content padder>
                                <View style={LoginScreenStyles.logoContainer}>
                                    <Image style={LoginScreenStyles.logo} source={require('../../assets/logo.png')}/>
                                </View>
                                {registering ? (
                                    <RegisterForm/>
                                ) : (
                                    <LoginForm/>
                                )}
                                <TouchableOpacity style={LoginScreenStyles.switchContainer} onPress={() => setRegistering(!registering)}>
                                    <Text style={LoginScreenStyles.switchText}>{registering ? 'Wróć do logowania' : 'Nie masz konta?'}</Text>
                                </TouchableOpacity>
                            </Content>
                        )
                    }
            </KeyboardAvoidingView>
        </Container>
    );
};

export default LoginScreen;