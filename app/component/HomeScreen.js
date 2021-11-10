import React,{ useEffect } from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert,GestureResponderEvent  } from 'react-native';


import { openDatabase } from 'react-native-sqlite-storage';

export default function HomeScreen({ props, navigation }) {
  useEffect(() => {
    var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"});
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='clients'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS clients', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS clients(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), phone VARCHAR(20), address VARCHAR(255),longitude REAL,latitude REAL)',
              []
            );
          }
        }
      );
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='stocks'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS stocks', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS stocks(id INTEGER PRIMARY KEY AUTOINCREMENT, date_arrivage VARCHAR(30), qte INT(15), unite VARCHAR(30), livreur VARCHAR(30))',
              []
            );
          }
        }
      );
     
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='ventes'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS ventes', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS ventes(id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(30), qte INT(15), unite VARCHAR(30), client_id INT(10),stock_id INT(10),pu INT(15),montant_paye INT(10))',
              []
            );
          }
        }
      );
    });
  }, []);
  return (
    <View>
          <Button 
              title="Tableau de bord"
              onPress={() =>{
                 navigation.navigate('Dashbord');
              }}
          />

          <Button 
              title="Client"
              onPress={() =>{
                 navigation.navigate('Client');
              }}
          />

          <Button 
              title="Stock"
              onPress={() =>{
                 navigation.navigate('Stock');
              }}
          />
          
          <Button 
              title="Vente"
              onPress={() =>{
                 navigation.navigate('Vente');

              }}
          />
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
