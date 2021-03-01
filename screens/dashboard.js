import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import StudentDashboard from '../component/studentdashboard';
import AdminDashboard from '../component/admindashboard';
import CompanyDashboard from '../component/companydashboard';
import AsyncStorage from '@react-native-community/async-storage';



const Dashboard = (props) => {

    const [initializing, setInitializing] = useState(true)
    const [role, setRole] = useState(null)

    const checkRole = async () => {
        try {
            const role = await AsyncStorage.getItem('ROLE')
            setRole(role)
            if(initializing) setInitializing(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkRole()
    }, [])

    if(initializing) return null

    return (
        <>
            {role ? role === 'admin' ? <AdminDashboard props={props} /> : role === 'student' ? <StudentDashboard props={props} /> : <CompanyDashboard props={props} /> : null}
        </>
    )
}


export default Dashboard;