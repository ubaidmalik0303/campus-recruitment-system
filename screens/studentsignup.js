import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../config/authprovider';


const StudentSignup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { registerstudent, error, setError, loading } = useContext(AuthContext);

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
                registerstudent(name, email, password)
            }
        }
    }

    return (
        <>
            {console.log(error)}
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
                    }}>Register As Student</Text>

                    <TextInput
                        placeholder="Full Name"
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


export default StudentSignup;