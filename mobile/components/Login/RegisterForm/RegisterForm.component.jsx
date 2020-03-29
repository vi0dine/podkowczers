import RegisterFormStyles from "./RegisterForm.styles";
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import {Button, Form, Icon, Input, Item} from "native-base";
import {PURPLE, RED, WHITE} from "../../../variables";
import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {useFormik} from "formik";
import {useNavigation} from '@react-navigation/native';
import {registerUser} from "../../../redux/Users/Users.actions";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [token, setToken] = useState(null);


    const schema = yup.object().shape({
        email: yup.string().email('Podaj prawidłowy adres email.').required('Email jest wymagany.'),
        password: yup.string().required('Hasło jest wymagane.').min(8, 'Hasło musi mieć minimum 8 znaków'),
        password_confirmation: yup.string().required('Potwierdź swoje hasło.')
            .oneOf([yup.ref('password'), null], 'Hasła nie są identyczne')
    });

    useEffect(() => {
        const notifications_token = getExpoToken();
        setToken(notifications_token);
    }, []);

    const getExpoToken = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            alert('Zgoda na powiadomienia jest wymagana!');
            return;
        }

        return await Notifications.getExpoPushTokenAsync()
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: schema,
        onSubmit: async ({email, password}) => {
            dispatch(registerUser(email, password, token, navigation))
        }
    });

    return (
        <View style={RegisterFormStyles.formContainer}>
            <Form style={RegisterFormStyles.form}>
                <Item
                    regular
                    style={formik.errors.email ? RegisterFormStyles.errorInput : RegisterFormStyles.input}>
                    <Icon
                        name='mail'
                        style={formik.errors.email ? RegisterFormStyles.errorInputIcon : RegisterFormStyles.inputIcon}
                    />
                    <Input
                        style={formik.errors.email ? RegisterFormStyles.errorInputText : RegisterFormStyles.inputText}
                        value={formik.values.email}
                        onChangeText={(email) => formik.setFieldValue('email', email)}
                        placeholder={"Email"}
                        placeholderTextColor={formik.errors.email ? WHITE : PURPLE}
                    />
                </Item>
                {
                    formik.errors.email && (
                        <View style={RegisterFormStyles.errorMessageContainer}>
                            <Text style={RegisterFormStyles.errorMessageText}>{ formik.errors.email }</Text>
                        </View>
                    )
                }
                <Item
                    regular
                    style={formik.errors.password ? RegisterFormStyles.errorInput : RegisterFormStyles.input}>
                    <Icon
                        name='key'
                        style={formik.errors.password ? RegisterFormStyles.errorInputIcon : RegisterFormStyles.inputIcon}
                    />
                    <Input
                        style={formik.errors.password ? RegisterFormStyles.errorInputText : RegisterFormStyles.inputText}
                        secureTextEntry={true}
                        value={formik.values.password}
                        onChangeText={(password) => formik.setFieldValue('password', password)}
                        placeholder={"Hasło"}
                        placeholderTextColor={formik.errors.password ? WHITE : PURPLE}

                    />
                </Item>
                {
                    formik.errors.password && (
                        <View style={RegisterFormStyles.errorMessageContainer}>
                            <Text style={RegisterFormStyles.errorMessageText}>{ formik.errors.password }</Text>
                        </View>
                    )
                }
                <Item
                    regular
                    style={formik.errors.password_confirmation ? RegisterFormStyles.errorInput : RegisterFormStyles.input}>
                    <Icon
                        name='key'
                        style={formik.errors.password_confirmation ? RegisterFormStyles.errorInputIcon : RegisterFormStyles.inputIcon}
                    />
                    <Input
                        style={formik.errors.password_confirmation ? RegisterFormStyles.errorInputText : RegisterFormStyles.inputText}
                        secureTextEntry={true}
                        value={formik.values.password_confirmation}
                        onChangeText={(password) => formik.setFieldValue('password_confirmation', password)}
                        placeholder={"Potwierdź hasło"}
                        placeholderTextColor={formik.errors.password_confirmation ? WHITE : PURPLE}
                    />
                </Item>
                {
                    formik.errors.password_confirmation && (
                        <View style={RegisterFormStyles.errorMessageContainer}>
                            <Text style={RegisterFormStyles.errorMessageText}>{ formik.errors.password_confirmation }</Text>
                        </View>
                    )
                }
                <Button
                    style={RegisterFormStyles.submitButton}
                    title={'register'}
                    onPress={() => formik.submitForm()}
                >
                    <Text
                        style={RegisterFormStyles.submitButtonText}>
                        ZAŁÓŻ KONTO
                    </Text>
                </Button>
            </Form>
        </View>
    );
};

export default RegisterForm;