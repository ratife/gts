
import React from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert  } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"});

export default function ViewClient({props,route,navigation}){
  return(
    <View style={{padding: 10}}>
      <Text>id : {route.params.client.id}</Text>
      <Text>Name : {route.params.client.name}</Text>
      <Text>adresse :{route.params.client.address} </Text>
      <Text>Phone : {route.params.client.phone}</Text>
      <Text>Longitude : {route.params.client.longitude}</Text>
      <Text>Latitude : {route.params.client.latitude}</Text>

      <View style={{padding: 10}}>
        <Button 
                title="Editer"
                onPress={() =>{
                  navigation.navigate('NewClient',{"client":route.params.client});
                }}
            />
        <Text>{"\n"}</Text> 
        <Button 
                title="Voir les ventes"
                onPress={() =>{
                  navigation.navigate('Vente',{"client":route.params.client});
                }}
            />
            <Text>{"\n"}{"\n"}</Text><Text>{"\n"}{"\n"}</Text>
          <Button 
                title="Supprimer"
                onPress={() =>{
                  Alert.alert(
                    "Confirmation",
                    "Voulez vous vraiement supprimer ?",
                    [
                      {
                        text: "Non",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "Oui", onPress: () => {
                        db.transaction(function (tx) {
                          tx.executeSql(
                            'DELETE FROM clients where id = ?',
                            [route.params.client.id],
                            (tx, results) => {
                              navigation.navigate('Client');
                            }
                          ,(error)=>{console.log("Error = "+error.message)})
                        })
                      }}
                    ]
                  );
                }}
            />
      </View>
    </View>
    
  )
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
