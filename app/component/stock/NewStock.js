
import React,{ useState } from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import DatePicker from 'react-native-neat-date-picker';
import Select from '@redmin_delishaj/react-native-select';

var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"});

const dataUnity = [
  { text: 'Bouteille', value: 1 },
  { text: 'Bidon', value: 2 }
];


export default function NewStock({ props,route,navigation }){
  var stock = null;
  if(route.params)
     stock = route.params.stock;
  const [id, setId] = useState(stock!=null?stock.id:"");
  const [date_arrivage, setDateArrivage] = useState(stock!=null?new Date(stock.date_arrivage):new Date());
  const [qte, setQte] = useState(stock!=null?stock.qte:"");
  const [unite, setUnite] = useState(stock!=null?stock.unite:"");
  const [livreur, setLivreur] = useState(stock!=null?stock.livreur:"");
  
  let register_stock = () => {

    if (!date_arrivage) {
      Alert.alert('Please fill name');
      return;
    }
    if (!qte) {
      Alert.alert('Please fill Contact Number');
      return;
    }
    if (!unite) {
      Alert.alert('Please fill Address');
      return;
    }
    if (!livreur) {
      Alert.alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      var sql = 'INSERT INTO stocks (date_arrivage, qte, unite,livreur) VALUES (?,?,?,?)';
     
      if(id!="")
        sql = 'update stocks set date_arrivage=?, qte=?, unite=?,livreur=? where id = '+id;
      tx.executeSql(
        sql,
        [date_arrivage, qte, unite,livreur],
        (tx, results) => {
          console.log(" insertion bien effectué");
          
          navigation.navigate('Stock');
         /* Alert.alert(
            'Le client est bien enregistré',
            [
              {
                text: 'Ok',
                onPress: () =>{
                  
                },
              },
            ],
            { cancelable: false }
          );*/
        }
      ,(error)=>{console.log("Error = "+error.message)})

      
    })
  }

  const [showDatePicker, setShowDatePicker] = useState(false)

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }

  const onConfirm = ( date ) => {
    // You should close the modal in here
    setShowDatePicker(false)
    
    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    setDateArrivage(date.toString())
  }

  return (

    

    <View style={{padding: 10}}>
      
      <View><Button title={date_arrivage.toString()} onPress={openDatePicker}/></View>
      <DatePicker
        isVisible={showDatePicker}
        mode={'single'}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />

      <TextInput
        style={styles.textInputStyle}
        placeholder="Quantite"
        defaultValue={qte.toString()}
        onChangeText={qte => setQte(qte)}
      />

      <Text>Unite</Text>
      <Select
              data={dataUnity}
              onSelect={value => setUnite(value)}
              value={unite}
            />

                
      <TextInput
        style={styles.textInputStyle}
        placeholder="Livreur"
        defaultValue={livreur}
        onChangeText={livreur => setLivreur(livreur)}
      />
      <Button 
          title="Save"
          onPress={register_stock}
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
    backgroundColor:'cyan',
  }
})
