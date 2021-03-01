import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                error,
                setError,
                loading,
                setLoading,
                registerstudent: async (name, email, password) => {
                    setLoading(true)
                    await AsyncStorage.setItem('ROLE', 'student')
                    await auth().createUserWithEmailAndPassword(email, password).then((user) => {
                        auth().currentUser.updateProfile({
                            displayName: name,
                        })
                        firestore().collection('student').doc(auth().currentUser.uid).set({
                            updated: false,
                            role: 'student',
                            name,
                            email,
                            uid: auth().currentUser.uid
                        })
                        setLoading(false)
                    }).catch((err) => {
                        setLoading(false)
                        setError(err.message)
                    })
                },
                registercompany: async (companyname, email, password) => {
                    setLoading(true)
                    await AsyncStorage.setItem('ROLE', 'company')
                    await auth().createUserWithEmailAndPassword(email, password).then((user) => {
                        auth().currentUser.updateProfile({
                            displayName: companyname
                        })
                        firestore().collection('company').doc(auth().currentUser.uid).set({
                            updated: false,
                            role: 'company',
                            companyname,
                            email,
                            uid: auth().currentUser.uid
                        })
                        setLoading(false)
                    }).catch((err) => {
                        setLoading(false)
                        setError(err.message)
                    })
                },
                loginuser: async (email, password, role) => {
                    setLoading(true)
                    await firestore().collection(role).where('email', '==', email).get().then((data) => {
                        if (!data.docs[0]) {
                            setLoading(false)
                            setError(`User Is Not Found In ${role}`)
                        } else {
                            AsyncStorage.setItem('ROLE', role)
                            auth().signInWithEmailAndPassword(email, password).then(() => {
                                setLoading(false)
                            }).catch((err) => {
                                setLoading(false)
                                setError(err.message)
                            })
                        }
                    }).catch((err) => {
                        setLoading(false)
                        setError(err)
                    })
                },
                adminlogin: async (email, password, role) => {
                    setLoading(true)
                    await AsyncStorage.setItem('ROLE', role)
                    await auth().signInWithEmailAndPassword(email, password).then(() => {
                        setLoading(false)
                    }).catch((err) => {
                        setLoading(false)
                        setError(err.message)
                    })
                },
                logout: async () => {
                    auth().signOut().then(() => {
                        AsyncStorage.removeItem('ROLE')
                    })
                }
            }}
        >
            { children}
        </AuthContext.Provider >
    )

}