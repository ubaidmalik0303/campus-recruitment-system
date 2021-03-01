import React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ChooseLogin = (props) => {
    return (
        <>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginVertical: 40, fontSize: 26, fontWeight: 'bold' }}>Login As</Text>
                </View>
                <TouchableOpacity style={styles.adminbutton} onPress={() => props.navigation.navigate('Login As Admin')} >
                    <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.companybutton} onPress={() => props.navigation.navigate('Login As Company')}>
                    <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Company</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.studentbutton} onPress={() => props.navigation.navigate('Login As Student')} >
                    <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Student</Text>
                </TouchableOpacity>
                <Text style={{
                   marginTop: 10,
                   textAlign: 'right' 
                }} onPress={() => props.navigation.navigate('Choose Signup')}>Signup?</Text>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 20,
    },
    adminbutton: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    companybutton: {
        marginVertical: 5,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    studentbutton: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: 'skyblue',
        borderRadius: 5,
    }
})

export default ChooseLogin;