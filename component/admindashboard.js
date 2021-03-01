import React, { useState, useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import auth from '@react-native-firebase/auth';
import CompanyList from './companylist';
import StudentList from './studentlist';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { AuthContext } from '../config/authprovider';


const AdminDashboard = (props) => {

    const { logout, user } = useContext(AuthContext);
    const [wait, setWait] = useState(true);

    useState(() => {
        if (auth().currentUser) {
            setWait(false)
        }
    }, [])

    return (
        <>
            {wait ? <ActivityIndicator style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }} color="black" size="large" /> : <View style={{ height: '100%' }}>
                <View style={{ height: '85%' }}>
                    <Container height="100%">
                        <Tabs>
                            <Tab heading="Stundent">
                                <StudentList props={props.props} />
                            </Tab>
                            <Tab heading="Company">
                                <CompanyList props={props.props} />
                            </Tab>
                        </Tabs>
                    </Container>
                </View>
                <View style={{ height: '15%' }}>
                    <Footer style={{ height: '100%' }}>
                        <FooterTab>
                            <Button>
                                <Icon color="white" name="person" />
                            </Button>
                            <Button>
                                <Text style={{ marginTop: 'auto', marginBottom: 'auto', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Admin</Text>
                            </Button>
                            <Button onPress={() => logout()}>
                                <Icon name="power" />
                            </Button>
                        </FooterTab>
                    </Footer>
                </View>
            </View>}
        </>
    )
}


export default AdminDashboard;