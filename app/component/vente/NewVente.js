
import React,{ useState,useEffect } from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import DatePicker from 'react-native-neat-date-picker';

import Select from '@redmin_delishaj/react-native-select';

import ModalSelector from 'react-native-modal-selector';

const dataUnity = [];
dataUnity[1] = 'Bouteille';
dataUnity[2] = 'Bidon';

const dataPU = [];
dataPU[4800] = '4 800 Ar';
dataPU[4700] = '4 700 Ar';
dataPU[96000] = '96 000 Ar';
dataPU[94000] = '94 000 Ar';
dataPU[4900] = '4 900 Ar';
dataPU[5000] = '5 000 Ar';
dataPU[5100] = '5 100 Ar';
dataPU[5200] = '5 200 Ar';
dataPU[5300] = '5 300 Ar';
dataPU[5400] = '5 400 Ar';
dataPU[5500] = '5 500 Ar';
dataPU[5600] = '5 600 Ar';
dataPU[6000] = '6 000 Ar';






var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"});

export default function NewVente({ props,route,navigation }){
  var vente = null;
  if(route.params)
    vente = route.params.vente;
  const [id, setId] = useState(vente!=null?vente.id:"");
  const [date, setDate] = useState(vente!=null?new Date(vente.date):new Date());
  const [qte, setQte] = useState(vente!=null?vente.qte:"");
  const [unite, setUnite] = useState(vente!=null?vente.unite:"1");
  const [client_id, setClientId] = useState(vente!=null?vente.client_id:"");
  const [stock_id, setStockId] = useState(vente!=null?vente.stock_id:"");

  const [pu, setPu] = useState(vente!=null?vente.pu:"4800");
  const [montant_paye, setMontantPaye] = useState(vente!=null?vente.montant_paye:"");

  const [dataClient,setDataClient] = useState([]);
  const [dataStock,setDataStock] = useState([]);

  //useEffect(function(){
 
    var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"},
          function(a){ 
            db.transaction((tx) => {
             tx.executeSql(
                'SELECT * FROM clients order by name asc',
                [],
                (tx, results) => {
                  var data = [];
                  for (let i = 0; i < results.rows.length; ++i){
                    var client = results.rows.item(i);
                    data[client.id] = client.name + ' ('+client.address+')';
                  }
                  setDataClient(data);
                     
                }
              ,(e)=>{console.log("ERROR :"+e.message); });
              tx.executeSql(
                'SELECT * FROM stocks order by date_arrivage desc',
                [],
                (tx, results) => {
                  var data = [];
                  for (let i = 0; i < results.rows.length; ++i){
                    var stock = results.rows.item(i);
                    data[stock.id] = stock.date_arrivage + ' ('+stock.livreur+')';
                  }
                  setDataStock(data);
                }
              ,(e)=>{console.log("ERROR :"+e.message); });
            });
            
          },(e)=>{console.log("ERROR :"+e.message); }
        );
  //});

  let register_vente = () => {

    if (!date) {
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

    var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"},
    function(){
    db.transaction(function (tx) {
      var sql = 'INSERT INTO ventes (date, qte, unite,client_id,stock_id,pu,montant_paye) VALUES (?,?,?,?,?,?,?)';
     
      if(id!="")
        sql = 'update ventes set date=?, qte=?, unite=?,client_id=?,stock_id=?,pu=?,montant_paye=? where id = '+id;

      tx.executeSql(
        sql,
        [date, qte, unite,client_id,stock_id,pu,montant_paye],
        (tx, results) => {
          console.log(" insertion bien effectué");
          
          navigation.navigate('Vente');
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

    })});
  }
  
  const  getLabelKey = (list)=>{
    var ret = [];
    list.forEach((element,index) => {
      ret.push({'key':index,'label':element});
    });
    return ret;
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
    setDate(date.toString())
  }

  
  let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
            // etc...
            // Can also add additional custom keys which are passed to the onChange callback
            { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
        ];

  return (

    

    <View style={{padding: 10}}>
      
      <View><Button title={date.toString()} onPress={openDatePicker}/></View>
      <DatePicker
        isVisible={showDatePicker}
        mode={'single'}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />

      <Text>Quantite</Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Quantite"
        defaultValue={qte.toString()}
        onChangeText={qte => setQte(qte)}
      />

      <Text>Unite {unite}</Text>
      <ModalSelector
                data={getLabelKey(dataUnity)}
                initValue={unite.toString()}
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ 
                  setUnite(option.key);
                  }}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                    editable={false}
                    placeholder="select the unity"
                    value={dataUnity[unite]} />

            </ModalSelector>
      
      <Text>Prix unitaire</Text>
      <ModalSelector
                data={getLabelKey(dataPU)}
                initValue={pu.toString()}
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ 
                  setPu(option.key);
                  }}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                    editable={false}
                    placeholder="Select prix unitaire"
                    value={dataPU[pu]} />

            </ModalSelector>
      

      <Text>Client</Text>
      <ModalSelector
                data={getLabelKey(dataClient)}
                initValue={client_id.toString()}
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ 
                  setClientId(option.key);
                  }}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                    editable={false}
                    placeholder="Select client"
                    value={dataClient[client_id]} />

            </ModalSelector>
      
      <Text>Stock</Text>

      <ModalSelector
                data={getLabelKey(dataStock)}
                initValue={stock_id.toString()}
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ 
                  setStockId(option.key);
                  }}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                    editable={false}
                    placeholder="Select STOCK"
                    value={dataStock[stock_id]} />

            </ModalSelector>
      

      <Text>Payé</Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="montant_paye"
        defaultValue={montant_paye.toString()}
        onChangeText={qte => setMontantPaye(qte)}
      />
      <Text>{"\n"}{"\n"}</Text>
      <Button 
          title="Save"
          onPress={register_vente}
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
