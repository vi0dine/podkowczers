import LoginFormStyles from "./LoginForm.styles";
import {Button, Form, Icon, Input, Item} from "native-base";
import {PURPLE, RED, WHITE} from "../../../variables";
import {Text, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {useFormik} from "formik";
import {useNavigation} from '@react-navigation/native';
import {authUser} from "../../../redux/Users/Users.actions";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const schema = yup.object().shape({
        email: yup.string().email('Podaj prawidłowy adres email.').required('Email nie może być pusty'),
        password: yup.string().required('Hasło nie może być puste.')
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
        <View style={LoginFormStyles.formContainer}>
            <Form style={LoginFormStyles.form}>
                <Item
                    regular
                    style={formik.errors.email ? LoginFormStyles.errorInput : LoginFormStyles.input}>
                    <Icon name='mail' style={formik.errors.email ? LoginFormStyles.errorInputIcon : LoginFormStyles.inputIcon} />
                    <Input
                        style={formik.errors.email ? LoginFormStyles.errorInputText : LoginFormStyles.inputText}
                        value={formik.values.email}
                        onChangeText={(email) => formik.setFieldValue('email', email)}
                        placeholder={"Email"}
                        placeholderTextColor={formik.errors.email ? WHITE : PURPLE}
                    />
                </Item>
                {
                    formik.errors.email && (
                        <View style={LoginFormStyles.errorMessageContainer}>
                            <Text style={LoginFormStyles.errorMessageText}>{ formik.errors.email }</Text>
                        </View>
                    )
                }
                <Item
                    regular
                    style={formik.errors.password ? LoginFormStyles.errorInput : LoginFormStyles.input}>
                    <Icon
                        name='key'
                        style={formik.errors.password ? LoginFormStyles.errorInputIcon : LoginFormStyles.inputIcon}
                    />
                    <Input
                        style={formik.errors.password ? LoginFormStyles.errorInputText : LoginFormStyles.inputText}
                        secureTextEntry={true}
                        value={formik.values.password}
                        onChangeText={(password) => formik.setFieldValue('password', password)}
                        placeholder={"Hasło"}
                        placeholderTextColor={formik.errors.password ? WHITE : PURPLE}
                    />
                </Item>
                {
                    formik.errors.password && (
                        <View style={LoginFormStyles.errorMessageContainer}>
                            <Text style={LoginFormStyles.errorMessageText}>{ formik.errors.password }</Text>
                        </View>
                    )
                }
                <Button
                    style={LoginFormStyles.submitButton}
                    title={'login'}
                    onPress={() => formik.submitForm()}
                >
                    <Text
                        style={LoginFormStyles.submitButtonText}>
                        ZALOGUJ
                    </Text>
                </Button>
            </Form>
        </View>
    );
};

export default LoginForm;