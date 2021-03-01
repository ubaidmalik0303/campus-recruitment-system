import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { AuthContext } from '../config/authprovider';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';



const StudentProfile = (props) => {

    const { logout, isError, setError, logoutloading, user } = useContext(AuthContext);
    const [wait, setWait] = useState(true);
    const [profileData, setProfileData] = useState(null)
    const [role, setRole] = useState('')


    const dataRequest = (doc) => {
        setProfileData(doc.data())
        setWait(false)
    }

    const checkRole = async () => {
        try {
            const role = await AsyncStorage.getItem('ROLE')
            setRole(role)
            console.log(role)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteUser = async (uid) => {
        await props.navigation.goBack()
        await firestore().collection('student').doc(uid).delete()
    }

    useEffect(() => {
        checkRole()
    }, [])

    useEffect(() => {
        const db = firestore().collection('student').doc(props.route.params.uid).onSnapshot(dataRequest)
        return db;
    }, [props.route.params.uid])



    return (
        <>
            {wait ? <ActivityIndicator style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }} size="large" color="black" /> : <><View style={styles.container}>
                <View style={styles.top}>
                </View>
                <View style={styles.body}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '30%', marginTop: -70, marginLeft: 0 }}>
                            <Avatar
                                rounded
                                size="large"
                                title={profileData.name[0]}
                                titleStyle={{
                                    backgroundColor: 'grey',
                                    paddingHorizontal: 10,
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                        <View style={{ width: '50%', position: 'relative', zIndex: -1 }}>
                            <View style={{ marginLeft: -30, marginTop: -56, backgroundColor: 'white', padding: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{profileData.name}</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.detailcards}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 2 }}>Student Information: </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '100%' }}>
                                    <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Qualification:</Text> {profileData.qualification}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
                                <View style={{ width: '100%' }}>
                                    <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Field:</Text> {profileData.field}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
                                <View style={{ width: '100%' }}>
                                    <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Skills:</Text> {profileData.skill}</Text>
                                </View>
                            </View>
                            <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>Numberes In Matric:</Text>
                            <Text>{profileData.no_matric}</Text>
                            <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>Numberes In Intermediate:</Text>
                            <Text>{profileData.no_inter}</Text>
                        </View>
                        <View style={styles.detailcards}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>More Information: </Text>
                            <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>Phone No:</Text>
                            <Text>{profileData.phoneno}</Text>
                            <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>Email:</Text>
                            <Text>{profileData.email}</Text>
                            <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>Adress:</Text>
                            <Text>{profileData.adress}</Text>
                        </View>
                        {role === 'admin' ? <TouchableOpacity onPress={() => deleteUser(profileData.uid)} style={{
                            backgroundColor: 'red',
                            padding: 5,
                            borderRadius: 5,
                            marginTop: 10,
                        }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Delete User</Text>
                        </TouchableOpacity> : null}
                    </ScrollView>
                </View>

            </View></>}
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 12,
    },
    top: {
        flex: 1,
    },
    body: {
        flex: 6,
        backgroundColor: '#08608c',
        padding: 30,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    detailcards: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
})


export default StudentProfile;