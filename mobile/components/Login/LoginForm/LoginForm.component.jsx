import LoginFormStyles from "./LoginForm.styles";
import {Button, Form, Icon, Input, Item} from "native-base";
import {RED} from "../../../variables";
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
        <View style={LoginFormStyles.formContainer}>
            <Form style={LoginFormStyles.form}>
                <Item
                    regular
                    style={LoginFormStyles.input}>
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
                    style={LoginFormStyles.input}>
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