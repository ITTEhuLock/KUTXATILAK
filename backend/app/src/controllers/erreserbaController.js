import dbConnection from '../database/database.js';


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

  if (!erreserba.egoera || !erreserba.end_time || !erreserba.idKutxatila || !erreserba.username || !erreserba.start_time) {
    return res.status(400).json({
      ErrorCode: 204,
      Message: 'Fields cannot be empty',
    });
  }

  const erreserbaObj = [
    erreserba.egoera,
    erreserba.start_time,
    erreserba.end_time,
    erreserba.idKutxatila,
    erreserba.username
  ];
console.log(erreserbaObj);
  const sqlQuery = 'INSERT INTO erreserba (egoera, start_time, end_time, idKutxatila, username) VALUES (?, ?, ?, ?, ?)';

  try {
    const [result] = await dbConnection.execute(sqlQuery, erreserbaObj);
    const iderreserba = result.insertId;
    res.status(201).json({ iderreserba });
  } catch (error) {
    res.status(500).json({ error: 'Error creating erreserba' });
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
      idErreserba,
      erreserba.fill_time,
      erreserba.empty_time
    ];
    const sqlQuery = 'UPDATE erreserba SET egoera = ?, start_time = ?, end_time = ?, erreserba.fill_time = ?, errserba.empty_time = ? WHERE idErreserba = ?';
    await dbConnection.execute(sqlQuery, erreserbaObj);
    res.status(200).json({ message: 'erreserba updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating erreserba' });
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
    res.status(200).json({ message: 'erreserba deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting erreserba' });
  }
};
