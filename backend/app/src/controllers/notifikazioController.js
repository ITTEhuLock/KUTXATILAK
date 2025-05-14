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


const notifikazioaBidali = async (idErreserba, mins) => {
  let titles = ["10 minutu geratzen dira erreserba amaitzeko!!","5 minutu geratzen dira erreserba amaitzeko!!","Erreserba amaitu da!!"];
  let bodies = ["Gogoratu kutxatila hustu behar duzula erreserba tartea amaitu baino lehen","Gogoratu kutxatila hustu behar duzula erreserba tartea amaitu baino lehen","Kutxatila hustu lehenbailehen"];
  console.log(mins);

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
            var title, body;
            if (mins == '10') {
              title = titles[0];
              body = bodies[0];
            } 
            else if (mins == '5') {
              title = titles[1];
              body = bodies[1];
            } 
            else if (mins == '0') {
              title = titles[2];
              body = bodies[2];
            }
            console.log(title);
            console.log(body);
            const message = {
            notification: {
                title: title,
                body: body
            },
            token: registrationToken
            };
        
            const response = await messaging.send(message);
            var Obj = [
              'beteta',
              idErreserba,
              mins
            ];
            await dbConnection.query('UPDATE abisuak SET egoera = ? WHERE idErreserba = ? AND mota = ?',Obj);
           

            return response;
            
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
    
};


export const checkNotifikazioak = async (idErreserba, mins) =>{
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
      await notifikazioaBidali(idErreserba, mins);
    }
    
  } catch (error) {
    console.error('errorea egoera eskuratzean:',error );
  }
};

