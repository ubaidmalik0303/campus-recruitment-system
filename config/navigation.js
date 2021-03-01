import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'
import ChooseLogin from '../screens/chooselogin';
import ChooseSignup from '../screens/choosesignup';
import AdminLogin from '../screens/adminlogin';
import StudentLogin from '../screens/studentlogin';
import CompanyLogin from '../screens/companylogin';
import CompanySignup from '../screens/companysignup';
import StudentSignup from '../screens/studentsignup';
import ForgotPassword from '../screens/forgotpassword';
import Dashboard from '../screens/dashboard';
import StudentProfile from '../screens/stundentprofile';
import CompanyProfile from '../screens/companyprofile';
import { AuthContext } from './authprovider';

const Navigation = () => {

    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitialising] = useState(true);

    const Stack = createStackNavigator();

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitialising(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    if (initializing) return null;


    return (
        <NavigationContainer>
            {user ? <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Student Profile" component={StudentProfile} />
                <Stack.Screen name="Company Profile" component={CompanyProfile} />
            </Stack.Navigator> : <Stack.Navigator>
                    <Stack.Screen name="Welcome" component={ChooseLogin} />
                    <Stack.Screen name="Choose Signup" component={ChooseSignup} />
                    <Stack.Screen name="Login As Company" component={CompanyLogin} />
                    <Stack.Screen name="Login As Admin" component={AdminLogin} />
                    <Stack.Screen name="Login As Student" component={StudentLogin} />
                    <Stack.Screen name="Register As Student" component={StudentSignup} />
                    <Stack.Screen name="Register As Comapny" component={CompanySignup} />
                    <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                </Stack.Navigator>}
        </NavigationContainer>
    )
}


export default Navigation;