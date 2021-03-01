import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const ForgotPassword = () => {
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
                    }}>Forgot Password</Text>

                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="white"
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
                    }}>
                        <Text style={{ textAlign: 'center' }}>Send Mail</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>

        </>
    )
}


export default ForgotPassword;