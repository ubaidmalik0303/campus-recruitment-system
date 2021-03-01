import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TextInput, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
import { Avatar } from 'react-native-elements';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { AuthContext } from '../config/authprovider';
import StudentList from './studentlist';
import firestore from '@react-native-firebase/firestore';



const CompanyDashboard = (props) => {


    const { logout } = useContext(AuthContext);
    const [wait, setWait] = useState(true);
    const [updated, setUpdated] = useState(false);
    const [loading, setloading] = useState(false);
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [lookingfor, setLookingfor] = useState('')
    const [email, setEmail] = useState('')
    const [adress, setAdress] = useState('')
    const [currentCompanyName, setCurrentcompanyName] = useState('')


    const update = async () => {
        setloading(true)
        if (!name || !type || !lookingfor || !email || !adress) {
            Alert.alert(
                'Error',
                'Please Fill All Fields',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
            setloading(false)
        } else {
            try {
                await firestore().collection('company').doc(auth().currentUser.uid).update({
                    updated: true,
                    companyname: name,
                    type,
                    lookingfor,
                    newemail: email,
                    adress,
                })
                setloading(false)
            } catch (err) {
                Alert.alert(
                    'Error',
                    'Update Failed',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
                setloading(false)
            }


        }
    }

    const onSnapshot = (doc) => {
        setUpdated(doc.data().updated)
        setCurrentcompanyName(doc.data().companyname)
        setWait(false)
    }

    useEffect(() => {
        const get = firestore().collection('company').doc(auth().currentUser.uid).onSnapshot(onSnapshot)
        return get;
    }, [])

    return (
        <>
            {wait ? <ActivityIndicator style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }} size="large" color="black" /> : updated ? <View style={{
                height: '100%',
                backgroundColor: '#08608c',
            }}>
                <View style={{ height: '85%' }}>
                    <StudentList props={props.props} />
                </View>
                <View style={{ height: '15%' }}>
                    <Footer style={{ height: '100%' }}>
                        <FooterTab>
                            <Button>
                                <Icon color="white" name="person" />
                            </Button>
                            <Button>
                                <Text style={{ marginTop: 'auto', marginBottom: 'auto', color: 'white', fontWeight: 'bold', fontSize: 16 }}>{currentCompanyName}</Text>
                            </Button>
                            <Button onPress={() => logout()}>
                                <Icon name="power" />
                            </Button>
                        </FooterTab>
                    </Footer>
                </View>
            </View> : <View style={styles.container}>
                    <View style={styles.card} >
                        <ScrollView>
                            <Text style={{ fontSize: 20, color: '#C43B1E', textAlign: 'center', marginBottom: 30, fontWeight: 'bold' }}>Update Information</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '49%' }}>
                                    <Text>Company Name: </Text>
                                    <TextInput placeholder="abc Co." onChangeText={(text) => setName(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                                <View style={{ width: '49%', marginLeft: 'auto' }}>
                                    <Text>Type: </Text>
                                    <TextInput placeholder="Car Manufacture" onChangeText={(text) => setType(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 5, }}>
                                <View style={{ width: '100%', marginLeft: 'auto' }}>
                                    <Text>Looking For: </Text>
                                    <TextInput placeholder="Engineer" onChangeText={(text) => setLookingfor(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 5, }}>
                                <View style={{ width: '100%', marginLeft: 'auto' }}>
                                    <Text>Email: </Text>
                                    <TextInput placeholder="abc@abc.com" onChangeText={(text) => setEmail(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 5, }}>
                                <View style={{ width: '100%', marginLeft: 'auto' }}>
                                    <Text>Adress: </Text>
                                    <TextInput placeholder="1 street" onChangeText={(text) => setAdress(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.LoginBtn} onPress={() => update()}>
                                {loading === true ? <ActivityIndicator size="small" color="white" />
                                    : <Text style={{ color: 'white', textAlign: 'center' }} >Update</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.LogoutBtn} onPress={() => logout()}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#08608c',
        padding: 20,
    },
    card: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    LoginBtn: {
        backgroundColor: '#C43B1E',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    LogoutBtn: {
        backgroundColor: 'skyblue',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})


export default CompanyDashboard;