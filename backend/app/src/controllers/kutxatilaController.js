import dbConnection from '../database/database.js';

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
    if(!kutxatila.kodea || !kutxatila.kokapena || !kutxatila.hasiera_ordua || !kutxatila.amaiera_ordua){
        return res.status(400).json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty',
        });
    }
    const kutxatilaObj = [

        kutxatila.kodea,
        kutxatila.kokapena,
        kutxatila.hasiera_ordua,
        kutxatila.amaiera_ordua,
        "0"

    ];

    const sqlQuery = `INSERT INTO kutxatila (kodea, kokapena, hasiera_ordua, amaiera_ordua, egoera) VALUES (?, ?, ?, ?, ?)`;

    try {
        const result = await dbConnection.query(sqlQuery, kutxatilaObj);
        const idKutxatila = result.insertId;

        res.status(201).json({ idKutxatila });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const updateKutxatilaEgoera = async (req, res) => {
    const id = parseInt(req.body.idKutxatila);
    const kutxatila = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
      }
    if(!kutxatila.egoera){
        return res.status(400).json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty',
        });
    }
    const kutxatilaObj = [
        kutxatila.egoera,
        id
    ];
    
    const sqlQuery = `UPDATE kutxatila SET egoera = ? WHERE idKutxatila = ?`;
    try {
        await dbConnection.query(sqlQuery, kutxatilaObj);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'errorea kutxatila eguneratzean' });  
    }

}

export const updateKutxatilaKodea = async (req, res) => {
    const id = parseInt(req.body.idKutxatila);
    const kutxatila = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
      }
    if(!kutxatila.kodea){
        return res.status(400).json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty',
        });
    }
    const kutxatilaObj = [
        kutxatila.kodea,
        id
    ];
    
    const sqlQuery = `UPDATE kutxatila SET kodea = ? WHERE idKutxatila = ?`;
    try {
        await dbConnection.query(sqlQuery, kutxatilaObj);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'errorea kutxatila eguneratzean' });  
    }

};

export const updateKutxatilaKokapena = async (req, res) => {
    const kokapena = req.body.kokapena;
    const id = parseInt(req.body.idKutxatila);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
      }
    if(!kokapena){
        return res.status(400).json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty',
        });}

    const kutxatilaObj = [
        kokapena,
        id
    ];
    
    const sqlQuery = `UPDATE kutxatila SET kokapena = ? WHERE idKutxatila = ?`;
    try {
        await dbConnection.query(sqlQuery, kutxatilaObj);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'errorea kutxatila eguneratzean' });
    }
};

export const updateKutxatilaErabileraTartea = async (req, res) => {
    const hasiera_ordua = req.body.hasiera_ordua;
    const amaiera_ordua = req.body.amaiera_ordua;
    const id = parseInt(req.body.idKutxatila);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
      }
    if(!hasiera_ordua || !amaiera_ordua){
        return res.status(400).json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty',
        });}

    const kutxatilaObj = [
        hasiera_ordua,
        amaiera_ordua,
        id
    ];
    
    const sqlQuery = `UPDATE kutxatila SET hasiera_ordua = ?, amaiera_ordua = ?  WHERE idKutxatila = ?`;
    try {
        await dbConnection.query(sqlQuery, kutxatilaObj);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'errorea kutxatila eguneratzean' });
    }
};


export const deleteKutxatila = async (req, res) => {
    const id = parseInt(req.body.idKutxatila);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
    }
    const sqlQuery = `DELETE FROM kutxatila WHERE idKutxatila = ?`;
    try {
        await dbConnection.query(sqlQuery, [id]);
        res.status(200).json({ Message: 'Kutxatila deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}