/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigation from './config/navigation';
import { AuthProvider } from './config/authprovider';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
};


export default App;
