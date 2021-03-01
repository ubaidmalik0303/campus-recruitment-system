import React, { useContext, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../config/authprovider';

const AdminLogin = (props) => {

    const [password, setPassword] = useState('');
    const { adminlogin, error, setError, loading } = useContext(AuthContext);

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
        if (!password) {
            Alert.alert(
                'Error',
                'Please Fill Password.',
                [
                    { text: 'OK', onPress: () => setError(false) }
                ],
                { cancelable: false }
            );
        } else {
            adminlogin("admin@gmail.com", password, "admin")
        }
    }

    return (
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
                    marginTop: 10,
                    marginBottom: 40,
                    color: 'white'
                }}>Login</Text>

                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    paddingVertical: 5,
                }}>
                    <Icon name="user" size={40} color="white" />
                    <Text style={{
                        fontWeight: 'bold',
                        marginTop: 'auto',
                        marginLeft: 10,
                        fontSize: 26,
                        color: 'white'
                    }}>Admin</Text>
                </View>

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

export default AdminLogin;