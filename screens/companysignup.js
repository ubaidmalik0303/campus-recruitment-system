import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../config/authprovider';

const CompanySignup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { registercompany, error, setError, loading } = useContext(AuthContext);

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

    const register = () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert(
                'Error',
                'Please Fill All Fields',
                [
                    { text: 'OK', onPress: () => setError(false) }
                ],
                { cancelable: false }
            );
        } else {
            if (password !== confirmPassword) {
                Alert.alert(
                    'Error',
                    'Password Not Match',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );
            } else {
                registercompany(name, email, password)
            }
        }
    }


    return (
        <>
            <View style={{
                height: "100%",
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#08608c',
            }}>
                <ScrollView>

                    <Text style={{
                        textAlign: 'center',
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>Register As Company</Text>

                    <TextInput
                        placeholder="Company Name"
                        placeholderTextColor="white"
                        onChangeText={(text) => setName(text)}
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            marginTop: 20,
                            color: 'white',
                        }} />

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

                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        placeholderTextColor="white"
                        onChangeText={(text) => setConfirmPassword(text)}
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
                        onPress={() => register()}
                    >
                        {loading ? <ActivityIndicator color="black" size="small" /> : <Text style={{ textAlign: 'center' }}>Register</Text>}
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </>
    )
}

export default CompanySignup;