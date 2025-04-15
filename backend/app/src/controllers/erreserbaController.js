import dbConnection from '../database/database.js';
import schedule from 'node-schedule';
import { checkNotifikazioak } from './notifikazioController.js';
import e from 'express';

// Controllera hasieratzen denean exekutatzen duen kodea, DBtik notifikazioren bat bidali gabe dagoen checkeatzen du
const scheduledJobs = new Map();

(async () => {
  try {
    const egoera = "programatuta"
    const [results] = await dbConnection.query("SELECT * FROM abisuak WHERE egoera = ?",[egoera]);

    if(results.length != 0){
      console.log("Bete gabeko notifikazioak aurkitu dira");
      results.forEach(
        function(result){
          let ordua = new Date(result.ordua);
          //Bakarrik kargatuko dira data oraindik ailegatu ez bada, bestela galdutzat emango dira
          if ((Date.now() - ordua)<0){
            let mota = result.mota;
            let idErreserba = result.idErreserba;
            switch (mota){
              case '10':
                const job10 = schedule.scheduleJob(ordua,() => checkNotifikazioak(idErreserba,10));
                gehituJob(idErreserba,job10);
              case '5':
                const job5 = schedule.scheduleJob(ordua,() => checkNotifikazioak(idErreserba,5));
                gehituJob(idErreserba,job5);
              case '0':
                const job0 = schedule.scheduleJob(ordua,() => checkNotifikazioak(idErreserba,0));
                gehituJob(idErreserba,job0);  
            } 
          }
        });
    }else{
      console.log("Ez daude bete gabeko notifikaziorik datu basean");
    }
  } catch (error) {
    console.error('Errorea notifikazioak kargatzen DBtik:', error);
    throw error;
  }
})();





const gehituJob = (idErreserba, job) => {
  scheduledJobs.set(idErreserba, job);
};

const deuseztatuJob = (idErreserba) => {
  const job = scheduledJobs.get(idErreserba);
  if (job) {
    job.cancel();
    scheduledJobs.delete(idErreserba);
  }
};

const getJob = (idErreserba) => {
  return scheduledJobs.get(idErreserba);
};



export const getErreserbak = async (req, res) => {
  try {
    const [results] = await dbConnection.query("SELECT * FROM erreserba");
    
    if(results.length === 0){
      res.status(404).json({ error: 'erreserbak ez dira existitzen' });
    }
    else{
      res.status(200).json(results); 
    }

  } catch (error) {
    res.status(500).json({ error: 'errorea erreserbak eskuratzean' });
  }
};

export const getErreserba = async (req, res) => {
  const id = parseInt(req.params.iderreserba);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
  }
  
  const sqlQuery = `SELECT * FROM erreserba WHERE idErreserba = ?`;
  
  try {
    const [results] = await dbConnection.query(sqlQuery, id);
    if (results.length === 0) {
      return res.status(404).json({ error: 'erreserba not found' });
    }
    else{
      res.status(200).json(results);
    }

  } catch (error) {
    res.status(500).json({ error: 'errorea erreserba eskuratzean' });
  }
};


export const createNewerreserba = async (req, res) => {
  const erreserba = req.body;

  if ( !erreserba.end_time || !erreserba.idKutxatila || !erreserba.idUser || !erreserba.start_time) {
    return res.status(400).json({
      ErrorCode: 204,
      Message: 'Fields cannot be empty',
    });
  }
  
  const start_time = new Date(erreserba.start_time);
  const end_time = new Date(erreserba.end_time);
  const abisu_ordua_0 = new Date(erreserba.end_time);
  const abisu_ordua_5 = new Date(end_time.getTime()- 5*60*1000);
  const abisu_ordua_10 = new Date(end_time.getTime()- 10*60*1000);
  start_time.setHours(start_time.getHours() + 2);
  end_time.setHours(end_time.getHours() + 2);
  
  const erreserbaObj = [
    "0",
    start_time.toISOString().slice(0, 19).replace('T', ' '),
    end_time.toISOString().slice(0, 19).replace('T', ' '),
    erreserba.idKutxatila,
    erreserba.idUser
  ];

  
  const sqlQuery = 'INSERT INTO erreserba (egoera, start_time, end_time, idKutxatila, idUser) VALUES (?, ?, ?, ?, ?)';

  try {
    const [result] = await dbConnection.execute(sqlQuery, erreserbaObj);
    const idErreserba = result.insertId;
    
    //Lana berriak programatu
    const job10 = schedule.scheduleJob(abisu_ordua_10,() => checkNotifikazioak(idErreserba,10));
    const job5 = schedule.scheduleJob(abisu_ordua_5,() => checkNotifikazioak(idErreserba,5));
    const job = schedule.scheduleJob(abisu_ordua_0,() => checkNotifikazioak(idErreserba,0));
    
    //Programazio berriak gorde
    gehituJob(`${idErreserba}_10`,job10);
    gehituJob(`${idErreserba}_5`,job5);
    gehituJob(`${idErreserba}_0`,job);

    //Datu-basean gorde
    const abisu0 = [
      "programatuta",
      "0",
      abisu_ordua_0.toISOString().slice(0, 19).replace('T', ' '),
      idErreserba
    ];

    const abisu5 = [
      "programatuta",
      "5",
      abisu_ordua_5.toISOString().slice(0, 19).replace('T', ' '),
      idErreserba
    ];

    const abisu10 = [
      "programatuta",
      "10",
      abisu_ordua_10.toISOString().slice(0, 19).replace('T', ' '),
      idErreserba
    ];

    await dbConnection.execute('INSERT INTO abisuak (egoera, mota, ordua, idErreserba) VALUES (?, ?, ?, ?)', abisu0);
    await dbConnection.execute('INSERT INTO abisuak (egoera, mota, ordua, idErreserba) VALUES (?, ?, ?, ?)', abisu5);
    await dbConnection.execute('INSERT INTO abisuak (egoera, mota, ordua, idErreserba) VALUES (?, ?, ?, ?)', abisu10);

    console.log("%d id-a duen erreserbaren lana gehitu da",idErreserba);
    res.status(201).json({ idErreserba });
  } catch (error) {
    res.status(500).json({ error: error.message});
    console.log("error:",error);
  }

  
  
};

export const updateErreserba = async (req, res) => {
  const erreserba = req.body;
  const start_time = new Date(erreserba.start_time);
  const end_time = new Date(erreserba.end_time);
  const abisu_ordua_0 = new Date(erreserba.end_time);
  const abisu_ordua_5 = new Date(end_time.getTime()- 5*60*1000);
  const abisu_ordua_10 = new Date(end_time.getTime()- 10*60*1000);
  start_time.setHours(start_time.getHours() + 2);
  end_time.setHours(end_time.getHours() + 2);
  const idErreserba = parseInt(req.body.idErreserba);
  
  if (isNaN(idErreserba)) {
    return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
  }
  try {
    
    
    const erreserbaObj = [
      erreserba.egoera,
      start_time.toISOString().slice(0, 19).replace('T', ' '),
      end_time.toISOString().slice(0, 19).replace('T', ' '),
      erreserba.idKutxatila,
      idErreserba
    ];
    const sqlQuery = 'UPDATE erreserba SET egoera = ?, start_time = ?, end_time = ?, idKutxatila = ? WHERE idErreserba = ?';
    await dbConnection.execute(sqlQuery, erreserbaObj);

    if (erreserba.end_time) {
      
      //Zegoen programazioa ezabatu
      deuseztatuJob(`${idErreserba}_10`);
      deuseztatuJob(`${idErreserba}_5`);
      deuseztatuJob(`${idErreserba}_0`);

      console.log("%d id-a duen erreserbaren lana ezabatu da",idErreserba);
      const end_time = new Date(erreserba.end_time);
      end_time.setHours(end_time.getHours());
      
      //Lana berriak programatu
      const job10 = schedule.scheduleJob(abisu_ordua_10,() => checkNotifikazioak(idErreserba,10));
      const job5 = schedule.scheduleJob(abisu_ordua_5,() => checkNotifikazioak(idErreserba,5));
      const job = schedule.scheduleJob(end_time,() => checkNotifikazioak(idErreserba,5));
      
      //Programazio berriak gorde
      gehituJob(`${idErreserba}_10`,job10);
      gehituJob(`${idErreserba}_5`,job5);
      gehituJob(`${idErreserba}_0`,job);

      //Datu-basean eguneratu(Denak aldi berean egin ahal izateko -> DELETE + Berriak egin UPDATE egin beharrean)
      await dbConnection.execute('DELETE FROM abisuak WHERE idErreserba = ?', [idErreserba]);

      const abisu0 = [
        "programatuta",
        "0",
        abisu_ordua_0.toISOString().slice(0, 19).replace('T', ' '),
        idErreserba
      ];
  
      const abisu5 = [
        "programatuta",
        "5",
        abisu_ordua_5.toISOString().slice(0, 19).replace('T', ' '),
        idErreserba
      ];
  
      const abisu10 = [
        "programatuta",
        "10",
        abisu_ordua_10.toISOString().slice(0, 19).replace('T', ' '),
        idErreserba
      ];
  
      await dbConnection.execute('INSERT INTO abisuak (egoera, mota, ordua, idErreserba) VALUES (?, ?, ?, ?)', abisu0);
      await dbConnection.execute('INSERT INTO abisuak (egoera, mota, ordua, idErreserba) VALUES (?, ?, ?, ?)', abisu5);
      await dbConnection.execute('INSERT INTO abisuak (egoera, mota, ordua, idErreserba) VALUES (?, ?, ?, ?)', abisu10);


    }

    res.status(200).json({ message: 'erreserba updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteErreserba = async (req, res) => {
  const idErreserba = parseInt(req.body.idErreserba);
  if (isNaN(idErreserba)) {
    return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
  }
  const sqlQuery = 'DELETE FROM erreserba WHERE idErreserba = ?';
  try {
    await dbConnection.execute(sqlQuery, [idErreserba]);
    //Zegoen programazioa ezabatu
    deuseztatuJob(`${idErreserba}_10`);
    deuseztatuJob(`${idErreserba}_5`);
    deuseztatuJob(`${idErreserba}_0`);

    //Datu basean kantzelatu
    await dbConnection.execute('DELETE FROM abisuak WHERE idErreserba = ?', [idErreserba]);
    console.log("%d id-a duen erreserbaren lana ezabatu da",idErreserba);
    
    res.status(200).json({ message: 'erreserba deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting erreserba' });
  }
};

export const getErabiltzailearenErreserbak = async (req, res) => {
  const idUser = parseInt(req.params.idUser);
  if (isNaN(idUser)) {
    return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
  }
  const sqlQuery = `SELECT * FROM erreserba WHERE idUser = ?`;
  try {
    const [results] = await dbConnection.query(sqlQuery, idUser);
    if (results.length === 0) {
      return res.status(404).json({ error: 'erreserba not found' });
    }
    else{
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).json({ error: 'errorea erreserba eskuratzean' });
  }
}

export const getKutxatilarenErreserbak = async (req, res) => {
  const idKutxatila = parseInt(req.params.idKutxatila);
  if (isNaN(idKutxatila)) {
    return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
  }
  const sqlQuery = `SELECT * FROM erreserba WHERE idKutxatila = ?`;
  try {
    const [results] = await dbConnection.query(sqlQuery, idKutxatila);
    if (results.length === 0) {
      return res.status(404).json({ error: 'erreserba not found' });
    }
    else{
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).json({ error: 'errorea erreserba eskuratzean' });
  }
};

export const getErreserbaAktiboa = async (req, res) => {
  const idUser = parseInt(req.params.idUser);
  if (isNaN(idUser)) {
    return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
  }
  try {
    const sqlQuery = `SELECT * FROM erreserba WHERE egoera = 1 and idUser = ?`;
    const [results] = await dbConnection.query(sqlQuery, idUser);
    if (results.length === 0) {
      return res.status(404).json({ error: 'erreserba not found' });
    }
    else{
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).json({ error: 'errorea erreserba eskuratzean' });
  }
};

export const checkAvailability = async (req, res) => {
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  console.log("start_time:",start_time);
  console.log("end_time:",end_time);
  const idKutxatila = parseInt(req.body.idKutxatila);
  const sqlQuery = `SELECT * FROM erreserba WHERE idKutxatila = ?
  AND (
      (start_time < ? AND end_time > ?)
      OR (start_time < ? AND end_time > ?)
      OR (start_time >= ? AND end_time <= ?))`;
  try {
    const [results] = await dbConnection.query(sqlQuery, [idKutxatila, start_time, end_time, start_time, end_time, start_time, end_time]);
    console.log(results);
    if (results.length === 0) {

      const sqlQuery2 = `SELECT * FROM kutxatila WHERE hasiera_ordua <= ? AND amaiera_ordua >= ? AND idKutxatila = ? AND egoera = 0`;
      const [results2] = await dbConnection.query(sqlQuery2, [start_time.split("T")[1], end_time.split("T")[1], idKutxatila]);
      console.log(results2);
      if (results2.length > 0) {
        return res.status(200).json({ available: true });
      }
     return res.status(200).json({ available: false });
    }
    return res.status(200).json({ available: false });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'errorea erreserba eskuratzean' });
  }
};
