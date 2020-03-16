import RegisterFormStyles from "./RegisterForm.styles";
import {Button, Form, Icon, Input, Item} from "native-base";
import {RED} from "../../../variables";
import {Text, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {useFormik} from "formik";
import {useNavigation} from '@react-navigation/native';
import {registerUser} from "../../../redux/Users/Users.actions";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const schema = yup.object().shape({
        email: yup.string().email('Podaj prawidłowy adres email.').required('Email jest wymagany.'),
        password: yup.string().required('Hasło jest wymagane.'),
        password_confirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Hasła nie są identyczne')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: schema,
        onSubmit:({email, password}) => {
            dispatch(registerUser(email, password, navigation))
        }
    });

    return (
        <View style={RegisterFormStyles.formContainer}>
            <Form style={RegisterFormStyles.form}>
                <Item
                    regular
                    style={RegisterFormStyles.input}>
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
                    style={RegisterFormStyles.input}>
                    <Icon name='key' style={{color: RED, opacity: .4}} />
                    <Input
                        style={{fontSize: 14}}
                        secureTextEntry={true}
                        value={formik.values.password}
                        onChangeText={(password) => formik.setFieldValue('password', password)}
                        placeholder={"Hasło"}
                    />
                </Item>
                <Item
                    regular
                    style={RegisterFormStyles.input}>
                    <Icon name='key' style={{color: RED, opacity: .4}} />
                    <Input
                        style={{fontSize: 14}}
                        secureTextEntry={true}
                        value={formik.values.password_confirmation}
                        onChangeText={(password) => formik.setFieldValue('password_confirmation', password)}
                        placeholder={"Potwierdź hasło"}
                    />
                </Item>
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