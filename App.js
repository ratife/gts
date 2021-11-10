import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

import HomeScreen from './app/component/HomeScreen';
import Client from './app/component/client/Client';

import Dashbord from './app/component/Dashbord';
import NewClient from './app/component/client/NewClient';
import ViewClient from './app/component/client/ViewClient';

import Stock from './app/component/stock/Stock';
import NewStock from './app/component/stock/NewStock';
import ViewStock from './app/component/stock/ViewStock';

import Vente from './app/component/vente/Vente';
import NewVente from './app/component/vente/NewVente';
import ViewVente from './app/component/vente/ViewVente';

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Tongasoa eto @ Gasy Tsara' }}
        />
        <Stack.Screen name="Dashbord" component={Dashbord} />
        <Stack.Screen name="Client" component={Client} />
        <Stack.Screen name="NewClient" component={NewClient} /> 
        <Stack.Screen name="ViewClient" component={ViewClient} /> 
        <Stack.Screen name="Stock" component={Stock} /> 
        <Stack.Screen name="NewStock" component={NewStock} />
        <Stack.Screen name="ViewStock" component={ViewStock} />

        <Stack.Screen name="Vente" component={Vente} />
        <Stack.Screen name="NewVente" component={NewVente} />
        <Stack.Screen name="ViewVente" component={ViewVente} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
