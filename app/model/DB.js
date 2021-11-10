import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

const DB = null;

function initConnexion(callback){
  SQLite.openDatabase({
    name: "gasytsara.db",
    createFromLocation: "~gasytsara.db",
    location: "Library",
  }).then((db) => {
    DB = db;
    callback();
  });
}

function getClts(){
  DB.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM clients WHERE projectID=?",
      [],
      (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {          
          return results.rows.raw();
        }
        else{
          tx.executeSql('DROP TABLE IF EXISTS clients', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS clients(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), phone INT(15), address VARCHAR(255))',
              []
            );
        }
      }
    );
  })
  .catch((error) => {
      console.log(error);
    })
  .then(() => {
    db.close().catch((error) => {
      console.log(error);
    });
  });
}
export const getClients = () => {
  if(DB==null){
    initConnexion(getClts);
  }
  return getClts();
}
  
export const saveClient = (name,adress,phone)=>{
  if(DB==null){
    initConnexion();
  }
  getClients();
  let singleInsert = DB.ExecuteQuery("INSERT INTO clients (nom,adress,phone) VALUES ( ?, ?, ?)", [name, adress, phone]);
  console.log(singleInsert);
}
/*
export const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'gasytsara.db', location: 'default'}, ()=>console.log("Connexion SQLITE success"), ()=>console.log("Connexion  SQLITE error"));
};

export const getClient = async () => {
  let db = getDBConnection();
  db.attach( "second", "second", () => console.log("Database attached successfully"), () => console.log("ERROR"))
}*/

/*


function DB(){
  SQLite.openDatabase({name: 'my.db', location: 'Shared'}, ()=>console.log("success SQLITE"), ()=>console.log("error SQLITE"));
}
export default DB;
*/