import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Footer, FooterTab, Button, Icon, Divider } from 'native-base';
import { Avatar } from 'react-native-elements';
import { AuthContext } from '../config/authprovider';
import CompanyList from './companylist';
import firestore from '@react-native-firebase/firestore';


const StudentDashboard = (props) => {

    const { logout } = useContext(AuthContext);
    const [wait, setWait] = useState(true);
    const [updated, setUpdated] = useState(false);
    const [loading, setloading] = useState(false);
    const [qualification, setQualification] = useState('')
    const [field, setField] = useState('')
    const [skill, setSkill] = useState('')
    const [no_matric, setNomatric] = useState('')
    const [no_inter, setNoInter] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [email, setEmail] = useState('')
    const [adress, setAdress] = useState('')
    const [currentUserName, SetCurrentusername] = useState('')



    const update = async () => {
        setloading(true)
        if (!qualification || !field || !skill || !no_matric || !no_inter || !phoneno || !email || !adress) {
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
                await firestore().collection('student').doc(auth().currentUser.uid).update({
                    updated: true,
                    qualification,
                    field,
                    skill,
                    no_inter,
                    no_matric,
                    phoneno,
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
            }


        }
    }

    const onSnapshot = (doc) => {
        setUpdated(doc.data().updated)
        SetCurrentusername(doc.data().name)
        setWait(false)
    }

    useEffect(() => {
        const get = firestore().collection('student').doc(auth().currentUser.uid).onSnapshot(onSnapshot)
        return get;
    }, [])


    return (
        <>
            {wait ? <ActivityIndicator style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }} size="large" color="black" /> : updated ? <View style={{
                height: '100%',
                backgroundColor: '#08608c',
            }}>
                <View style={{ height: '85%' }}>
                    <CompanyList props={props.props} />
                </View>
                <View style={{ height: '15%' }}>
                    <Footer style={{ height: '100%' }}>
                        <FooterTab>
                            <Button>
                                <Icon color="white" name="person" />
                            </Button>
                            <Button>
                                <Text style={{ marginTop: 'auto', marginBottom: 'auto', color: 'white', fontWeight: 'bold', fontSize: 16 }}>{currentUserName}</Text>
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
                                    <Text>Qualification: </Text>
                                    <TextInput placeholder="Matric" onChangeText={(text) => setQualification(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                                <View style={{ width: '49%', marginLeft: 'auto' }}>
                                    <Text>Field: </Text>
                                    <TextInput placeholder="Scince" onChangeText={(text) => setField(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 5, }}>
                                <View style={{ width: '100%', marginLeft: 'auto' }}>
                                    <Text>Skills: </Text>
                                    <TextInput placeholder="IT, Mobile Repairing" onChangeText={(text) => setSkill(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 5, }}>
                                <View style={{ width: '49%' }}>
                                    <Text>No In Matric: </Text>
                                    <TextInput placeholder="300" onChangeText={(text) => setNomatric(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                                <View style={{ width: '49%', marginLeft: 'auto' }}>
                                    <Text>No In Inter: </Text>
                                    <TextInput placeholder="400" onChangeText={(text) => setNoInter(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 5, }}>
                                <View style={{ width: '100%', marginLeft: 'auto' }}>
                                    <Text>Phone No: </Text>
                                    <TextInput placeholder="03009000000" onChangeText={(text) => setPhoneno(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
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

export default StudentDashboard;