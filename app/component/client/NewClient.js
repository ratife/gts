
import React,{ useState } from 'react';
import { FlatList,StyleSheet, Text, View,Image,Button,TextInput,Alert,Platform, PermissionsAndroid  } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import Geolocation from 'react-native-geolocation-service';

//import RNLocation from 'react-native-location';

var db = openDatabase({name : "gasytsara", location : "/www/gasytsara.db"});
/*
RNLocation.configure({
  distanceFilter: null
 });

*/
export default function NewClient({ props,route,navigation }){
  var client = null;
  if(route.params)
    client = route.params.client;
    
  const [id, setId] = useState(client!=null?client.id:"");
  const [name, setName] = useState(client!=null?client.name:"");
  const [adresse, setAdresse] = useState(client!=null?client.address:"");
  const [phone, setPhone] = useState(client!=null?client.phone:"");
  const [longitude, setLongitude] = useState(client!=null?client.longitude:"");
  const [latitude, setLatitude] = useState(client!=null?client.latitude:"");
  

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
       authorizationLevel: 'whenInUse',
     });
    }
  
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }
  requestPermissions();
  
  let loadGPSLocation = async () => {

    console.log('loading location .... ');

    Geolocation.getCurrentPosition(
      (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    /*
    let permission = await RNLocation.checkPermission({
     // ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    });
    console.log(permission);
    if(permission){
      console.log("AAAA");
      location = await RNLocation.getLatestLocation({timeout: 100})
      console.log(location);
      setLongitude(location.longitude);
      setLatitude(location.latitude);
    }
    else{
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      });
      console.log("BBBBB");
      console.log(permission);
      location = await RNLocation.getLatestLocation({timeout: 100});
      setLongitude(location.longitude);
      setLatitude(location.latitude);
    }*/
  }

  let register_client = () => {

    if (!name) {
      Alert.alert('Please fill name');
      return;
    }
    if (!phone) {
      Alert.alert('Please fill Contact Number');
      return;
    }
    if (!adresse) {
      Alert.alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      var sql = 'INSERT INTO clients (name, phone, address,longitude,latitude) VALUES (?,?,?,?,?)';
     
      if(id!="")
        sql = 'update clients set name=?, phone=?, address=?,longitude=?,latitude=? where id = '+id;
      tx.executeSql(
        sql,
        [name, phone, adresse,longitude,latitude],
        (tx, results) => {
          console.log(" insertion bien effectué");
          setName("");
          setAdresse("");
          setPhone("");
          navigation.navigate('Client');
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

  return (
    <View style={{padding: 10}}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Votre nom ici!"
        defaultValue={name}
        onChangeText={name => setName(name)}
      />
      <TextInput
        style={styles.textInputStyle}
        placeholder="Adresse"
        defaultValue={adresse}
        onChangeText={adresse => setAdresse(adresse)}
      />
      <TextInput
        style={styles.textInputStyle}
        placeholder="Téléphone"
        defaultValue={phone.toString()}
        onChangeText={phone => setPhone(phone)}
      />
      <Text>Longitude : {longitude} </Text>
      <Text>Latitude : {latitude}</Text>
      <Button 
          title="Localisation"
          onPress={loadGPSLocation}
        />
      <Button 
          title="Save"
          onPress={register_client}
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
