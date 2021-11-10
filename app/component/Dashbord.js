
import React,{ useState,useEffect } from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert  } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

export default function Dashbord({navigation}){
  let [nbCli, setNbCli] = useState(0);
  let [nbVente, setNbVente] = useState(0);
  
    
  return (
    <View style={styles.container}>
      <Text>Nombre client : {nbCli}</Text>
      <Text>Nombre vente : {nbVente}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:16,
    marginBottom:100,
    height:50,
    width:300,
    paddingBottom:500,
    marginTop:500,
    borderRadius:30
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textInputStyle:{
    height:40,
    backgroundColor:'cyan'
  }
});
