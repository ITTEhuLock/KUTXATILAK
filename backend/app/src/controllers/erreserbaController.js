import dbConnection from '../database/database.js';
function getMySQLTimestamp() {
  const date = new Date();
  
  const pad = (num) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); 
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export const getErreserbas = async (req, res) => {
  try {
    const [results] = await dbConnection.query("SELECT * FROM erreserba");
    res.status(200).json(results);  
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
    res.status(200).json(results);
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
    getMySQLTimestamp(),
    erreserba.start_time,
    erreserba.end_time,
    erreserba.idKutxatila,
    erreserba.username
  ];
console.log(erreserbaObj);
  const sqlQuery = 'INSERT INTO erreserba (egoera, create_time, start_time, end_time, idKutxatila, username) VALUES (?, ?, ?, ?, ?, ?)';

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
      idErreserba
    ];
    const sqlQuery = 'UPDATE erreserba SET egoera = ?, start_time = ?, end_time = ? WHERE idErreserba = ?';
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
