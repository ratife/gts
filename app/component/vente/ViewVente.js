
import React from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert  } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"});

export default function ViewVente({props,route,navigation}){
  return(
    <View style={{padding: 10}}>

      <Text>id : {route.params.vente.pu * route.params.vente.qte } {route.params.vente.id}</Text>
      <Text>Date : {route.params.vente.date}</Text>
      <Text>Quantite :{route.params.vente.qte} {route.params.vente.unite==1?'Bouteille':'Bidon' } </Text>
      <Text>Client :{route.params.vente.name} {route.params.vente.adresse} </Text>
      <Text>PAYER  : {route.params.vente.montant_paye} AR</Text>
      <Text>RESTE A PAYER  : {route.params.vente.pu * route.params.vente.qte - route.params.vente.montant_paye} AR</Text>
      <View style={{padding: 10}}>
        <Button 
                title="Editer"
                onPress={() =>{
                  navigation.navigate('NewVente',{"vente":route.params.vente});
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
                            'DELETE FROM ventes where id = ?',
                            [route.params.vente.id],
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
