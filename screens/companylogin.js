import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../config/authprovider';
import AsyncStorage from '@react-native-community/async-storage';

const CompanyLogin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginuser, error, setError, loading } = useContext(AuthContext);

    if (error) {
        Alert.alert(
            'Error',
            error,
            [
                { text: 'OK', onPress: () => setError(false) }
            ],
            { cancelable: false }
        );
    }

    const login = () => {
        if (!email || !password) {
            Alert.alert(
                'Error',
                'Please Fill All Fields',
                [
                    { text: 'OK', onPress: () => setError(false) }
                ],
                { cancelable: false }
            );
        } else {
            loginuser(email, password, "company")
        }
    }

    const checkRole = async () => {
        try {
            const role = await AsyncStorage.getItem('ROLE')
            console.log(role)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkRole()
    }, [])

    return (
        <View style={{
            height: "100%",
            padding: 20,
            backgroundColor: '#08608c',
        }}>

            <ScrollView>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginTop: 30,
                    marginBottom: 20,
                    color: 'white'
                }}>Login As Company</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="white"
                    onChangeText={(text) => setEmail(text)}
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        marginTop: 20,
                        color: 'white',
                    }} />

                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    onChangeText={(text) => setPassword(text)}
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        marginTop: 20,
                        color: 'white',
                    }} />

                <TouchableOpacity style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 20,
                }}
                    onPress={() => login()}
                >
                    {loading ? <ActivityIndicator color="black" size="small" /> : <Text style={{ textAlign: 'center' }}>Login</Text>}
                </TouchableOpacity>

                <Text style={{
                    color: 'white',
                    marginTop: 10,
                    textAlign: 'right'
                }}
                    onPress={() => props.navigation.navigate('Forgot Password')}
                >Forgot Password?</Text>
            </ScrollView>

        </View>
    )

}

export default CompanyLogin;