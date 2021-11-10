
import React,{ useState,useEffect } from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert  } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

export default function Vente({ props,route, navigation }){
  let [listVentes, setListVentes] = useState([]);
  var sqlVente = 'SELECT v.*,c.name,c.address FROM ventes v left join clients c on c.id = v.client_id';
  if(route.params !=null){
    sqlVente += " where c.id="+route.params.client.id;
  }

  sqlVente += " order by v.id desc";
  useEffect(() => {
    var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"},
      function(a){ 
        db.transaction((tx) => {
          tx.executeSql(
            sqlVente,
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                setListVentes(temp);
            }
          ,(e)=>{console.log("ERROR :"+e.message); });
        });
      },(e)=>{console.log("ERROR :"+e.message); }
    );
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql(
          sqlVente,
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
              setListVentes(temp);
          }
        ,(e)=>{console.log("ERROR :"+e.message); });
      });
    });

    return unsubscribe;
    
  }, []);

  return (
    <View>
      <Button 
          title="Nouveau"
          onPress={() =>{
            navigation.navigate('NewVente');
          }
          }
        />
      <FlatList
        data={listVentes}
        renderItem={({item}) => (
          <Text 
            onPress={()=>{
              navigation.navigate('ViewVente',{vente:item});
            }}
          style={styles.item}> {item.name} : {item.qte} {item.unite==1?'Bouteille':'Bidon'} : Reste :{item.pu * item.qte - item.montant_paye} Ar ({item.date}) </Text> 
          
        )
         }
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
