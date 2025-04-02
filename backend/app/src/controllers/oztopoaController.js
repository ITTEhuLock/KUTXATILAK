import dbConnection from '../database/database.js';

export const getOztopoak = async (req, res) => {
    try {
        const oztopoak = await dbConnection.query('SELECT * FROM oztopoa');
        res.status(200).json(oztopoak);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOztopoa = async (req, res) => {
    try {
        const oztopoa = await dbConnection.query('SELECT * FROM oztopoa WHERE idOztopoa = ?', [req.params.idOztopoa]);
        res.status(200).json(oztopoa);
    } catch (error) {
        res.status(500).json({ message: 'Error in getOztopoa' });
    }
};

export const getOztopoakSolairuka = async (req, res) => {
    try {
        const oztopoakSolairuka = await dbConnection.query('SELECT * FROM oztopoa WHERE solairua = ? and eraikina = ?', [req.params.solairua, req.params.eraikina]);
        res.status(200).json(oztopoakSolairuka);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

