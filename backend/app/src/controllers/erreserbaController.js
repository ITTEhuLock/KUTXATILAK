import dbConnection from '../database/database.js';
import schedule from 'node-schedule';
import { checkNotifikazioak } from './notifikazioController.js';

const scheduledJobs = new Map();

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
  //5 minutuko abisu denbora kalkulatu
  const end_time = new Date(erreserba.end_time);
  const abisu_ordua = new Date(end_time.getTime()- 5*60*1000);
  console.log("abisu ordua:",abisu_ordua.toISOString());
  const erreserbaObj = [
    "0",
    erreserba.start_time,
    erreserba.end_time,
    erreserba.idKutxatila,
    erreserba.idUser
  ];

  
  const sqlQuery = 'INSERT INTO erreserba (egoera, start_time, end_time, idKutxatila, idUser) VALUES (?, ?, ?, ?, ?)';

  try {
    const [result] = await dbConnection.execute(sqlQuery, erreserbaObj);
    const idErreserba = result.insertId;
    console.log()
    const job = schedule.scheduleJob(abisu_ordua,() => checkNotifikazioak(idErreserba));
    gehituJob(idErreserba,job);
    console.log("%d id-a duen erreserbaren lana gehitu da",idErreserba);
    res.status(201).json({ idErreserba });
  } catch (error) {
    res.status(500).json({ error: error.message});
    console.log("error:",error);
  }

  
  
};

export const updateErreserba = async (req, res) => {
  const erreserba = req.body;
  const idErreserba = parseInt(req.body.idErreserba);
  if (isNaN(idErreserba)) {
    return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
  }
  try {
    const erreserbaObj = [
      erreserba.egoera,
      erreserba.start_time,
      erreserba.end_time,
      erreserba.fill_time || null,
      erreserba.empty_time || null,
      erreserba.idKutxatila,
      idErreserba
    ];
    const sqlQuery = 'UPDATE erreserba SET egoera = ?, start_time = ?, end_time = ?,fill_time = ?,empty_time = ?, idKutxatila = ? WHERE idErreserba = ?';
    await dbConnection.execute(sqlQuery, erreserbaObj);

    if (erreserba.end_time) {
      
      deuseztatuJob(idErreserba);
      console.log("%d id-a duen erreserbaren lana ezabatu da",idErreserba);
      const end_time = new Date(erreserba.end_time);
      const abisu_ordua = new Date(end_time.getTime() - 5 * 60 * 1000);
      console.log("abisu ordua:",abisu_ordua.toISOString());
      const job = schedule.scheduleJob(abisu_ordua, () => checkNotifikazioak(idErreserba));
      gehituJob(idErreserba, job);
      console.log("%d id-a duen erreserbaren lana gehitu da",idErreserba);
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
    deuseztatuJob(idErreserba);
    console.log("%d id-a duen erreserbaren lana ezabatu da",idErreserba);
    await dbConnection.execute(sqlQuery, [idErreserba]);
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
  const idKutxatila = parseInt(req.body.idKutxatila);
  const sqlQuery = `SELECT * FROM erreserba WHERE start_time >= ? AND end_time AND idKutxatila = ?`;
  try {
    const [results] = await dbConnection.query(sqlQuery, [start_time, end_time, idKutxatila]);
    if (results.length === 0) {
      return res.status(200).json({ available: true });
    }
    else{
      return res.status(200).json({ available: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'errorea erreserba eskuratzean' });
  }
};
