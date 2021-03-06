import React, { useContext, useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth'
import { Avatar } from 'react-native-elements';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { AuthContext } from '../config/authprovider';
import firestore from '@react-native-firebase/firestore';



const StudentList = (props) => {


    const [userData, setUserData] = useState([])

    const data = (data) => {
        setUserData(data.docs)
    }

    useEffect(() => {
        const getUsers = firestore().collection('student').onSnapshot(data)
        return getUsers;
    }, [])

    return (
        <>
            <View style={{ backgroundColor: '#08608c', padding: 10, height:"100%" }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginVertical: 10,
                }}>Stuednts:</Text>
                <ScrollView>
                    
                {userData.map((val, i) => {
                        return <TouchableOpacity key={i} onPress={() => props.props.navigation.navigate('Student Profile', {uid: val.data().uid})}>
                        <View style={{ borderRadius: 5, backgroundColor: 'white', padding: 5, marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar
                                    title={val.data().name[0]}
                                    rounded
                                    titleStyle={{
                                        backgroundColor: 'grey',
                                        paddingHorizontal: 10,
                                        borderRadius: 5,
                                    }}
                                    size="large"
                                />
                                <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{val.data().name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    })}

                </ScrollView>
            </View>
        </>

    )
}

export default StudentList;