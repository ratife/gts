
import React from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert  } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"});

export default function ViewStock({props,route,navigation}){
  return(
    <View style={{padding: 10}}>

      <Text>id : {route.params.stock.id}</Text>
      <Text>Date : {route.params.stock.date_arrivage}</Text>
      <Text>Quantite :{route.params.stock.qte} {route.params.stock.unite} </Text>
      <Text>Livreur : {route.params.stock.livreur}</Text>

      <View style={{padding: 10}}>
        <Button 
                title="Editer"
                onPress={() =>{
                  navigation.navigate('NewStock',{"stock":route.params.stock});
                }}
            />
            
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
                            'DELETE FROM stocks where id = ?',
                            [route.params.stock.id],
                            (tx, results) => {
                              navigation.navigate('Stock');
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
