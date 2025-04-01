import dbConnection from '../database/database.js';

export const getBideraketa  = async (req,res) => {
    try {
        const bideraketaPausoak = await dbConnection.query('SELECT posizioa, ondokoa, aurrekoa  FROM pausoa');
        res.status(200).json(bideraketaPausoak);
        console.log(bideraketaPausoak);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};