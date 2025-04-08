import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { readFile } from 'fs/promises';
import dbConnection from '../database/database.js';


let messaging;
(async () => {
  try {
    const serviceAccount = JSON.parse(
      await readFile(new URL('../../../../ehulock-1a70c-firebase-adminsdk-fbsvc-1ce13df5fa.json', import.meta.url))
    );

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(serviceAccount)
      });
      messaging = getMessaging();
    } else {
      messaging = getMessaging(admin.app());
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
})();


const notifikazioaBidali = async (idErreserba, title, body) => {
    
    const sqlQuery = `SELECT u.token
FROM erreserba e
JOIN user u ON e.idUser = u.iduser
WHERE e.idErreserba = ?;
`;  
    console.log("NotifikazioaBidali");
    var registrationToken = null;
    try{
        const [results] = await dbConnection.query(sqlQuery, idErreserba);
        if (results.length === 0) {
            console.log("Erabiltzailea ez dauka tokena erregistratuta");
        }
        else{
            registrationToken = results[0].token;
            
        }
    }
    catch (error) {
        console.error('errorea tokena eskuratzean:',error );
    }
    if(registrationToken != null ){
        try {
            
            const message = {
            notification: {
                title: 'Erreserba amaitzeko zorian dago!!',
                body: '5 minutu dituzu kutxatila husteko'
            },
            token: registrationToken
            };
        
            const response = await messaging.send(message);
            return response;
            
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
    
};


export const checkNotifikazioak = async (idErreserba, title, body) =>{
  console.log("CheckNotifikazioaK");
  
  //Notifikazioa bidaltzeko baldintza
  const kutxSqlQuery = `SELECT egoera 
  FROM kutxatila k 
  WHERE k.idKutxatila = (SELECT idKutxatila FROM erreserba e WHERE e.idErreserba = ?);
  `;
  try {
    const [result] = await dbConnection.execute(kutxSqlQuery, [idErreserba]);
    //Notifikazioa bidali bakarrik kutxatila beteta badago
    if (result[0] && result[0].egoera == 1) {
      await notifikazioaBidali(idErreserba, min);
    }
    
  } catch (error) {
    console.error('errorea egoera eskuratzean:',error );
  }
};

