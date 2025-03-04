import {dbConnection} from '../database/database.js';

export const getKutxatilak = async (req, res) => {
    try {
        const [results] = await dbConnection.query("SELECT * FROM kutxatila");
        
        if(results.length === 0){
        res.status(404).json({ error: 'kutxatilak ez dira existitzen' });
        }
        else{
        res.status(200).json(results); 
        }
    
    } catch (error) {
        res.status(500).json({ error: 'errorea kutxatilak eskuratzean' });
    }
}

export const getKutxatila = async (req, res) => {
    const id = parseInt(req.params.idKutxatila);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
      }
    const sqlQuery = `SELECT * FROM kutxatila WHERE idKutxatila = ?`;
    try{
        const [results] = await dbConnection.query(sqlQuery, id);
        if (results.length === 0) {
            return res.status(404).json({ error: 'kutxatila ez da existitzen' });
        }
        else{
            res.status(200).json(results);
        }

    }
    catch (error) {
        res.status(500).json({ error: 'errorea kutxatila eskuratzean' });
    }
}

export const createNewKutxatila = async (req, res) => {
    const kutxatila = req.body;
    if(!kutxatila.kodea || !kutxatila.kokapena){
        return res.status(400).json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty',
        });
    }
    const kutxatilaObj = [

        kutxatila.kodea,
        kutxatila.kokapena,
        "0"

    ];

    const sqlQuery = `INSERT INTO kutxatila (kodea, kokapena, egoera) VALUES (?, ?, ?)`;

    try {
        await dbConnection.query(sqlQuery, kutxatilaObj);
        const idKutxatila = result.insertId;

        res.status(201).json({ idKutxatila });
    } catch (error) {
        res.status(500).json({ error: 'errorea kutxatila sortzean' });
    }

}