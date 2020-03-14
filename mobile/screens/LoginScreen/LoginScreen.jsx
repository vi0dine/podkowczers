import React from 'react';
import LoginScreenStyles from './LoginScreen.styles';
import {Text, TouchableOpacity, View, Image, KeyboardAvoidingView} from 'react-native';
import {Button, Container, Form, Input, Item, Content, Icon} from "native-base";
import * as yup from 'yup';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {authUser} from "../../redux/Users/Users.actions";
import {PURPLE, RED, WHITE} from "../../variables";

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit:({email, password}) => {
            dispatch(authUser(email, password, navigation))
        }
    });

    return (
        <Container style={LoginScreenStyles.mainContainer}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <Content padder>
                    <View style={LoginScreenStyles.logoContainer}>
                        <Image style={LoginScreenStyles.logo} source={require('../../assets/logo.png')}/>
                    </View>
                    <View style={LoginScreenStyles.formContainer}>
                        <Form style={LoginScreenStyles.form}>
                            <Item
                                regular
                                style={LoginScreenStyles.input}>
                                <Icon name='mail' style={{color: RED, opacity: .4, fontSize: 18, marginLeft: 5}} />
                                <Input
                                    style={{fontSize: 14}}
                                    value={formik.values.email}
                                    onChangeText={(email) => formik.setFieldValue('email', email)}
                                    placeholder={"Email"}
                                />
                            </Item>
                            <Item
                                regular
                                style={LoginScreenStyles.input}>
                                <Icon name='key' style={{color: RED, opacity: .4}} />
                                <Input
                                    style={{fontSize: 14}}
                                    secureTextEntry={true}
                                    value={formik.values.password}
                                    onChangeText={(password) => formik.setFieldValue('password', password)}
                                    placeholder={"Hasło"}
                                />
                            </Item>
                            <Button
                                style={LoginScreenStyles.submitButton}
                                title={'login'}
                                onPress={() => formik.submitForm()}
                            >
                                <Text
                                    style={LoginScreenStyles.submitButtonText}>
                                    ZALOGUJ
                                </Text>
                            </Button>
                        </Form>
                    </View>
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default LoginScreen;