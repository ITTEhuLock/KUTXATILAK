import dbConnection from '../database/database.js';


export const getGelak = async (req, res) => {
    try {
        const gelak = await dbConnection.query('SELECT * FROM gela');
        res.status(200).json(gelak);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getGela = async (req, res) => {
    try {
        const gela = await dbConnection.query('SELECT * FROM gela WHERE idGela = ?', [req.params.idGela]);
        res.status(200).json(gela);
    } catch (error) {
        res.status(500).json({ message: 'Error in getGela' });
    }
};


export const getKoordenatuak = async (req, res) => {
    try {
        const koordenatuak = await dbConnection.query('SELECT x,y FROM gela');
        res.status(200).json(koordenatuak);
    } catch (error) {
        res.status(500).json({ message: 'Error in getKoordenatuak' });
    }
};
export const createNewGela = async (req, res) => {
    try {
        const { kodea, x, y, solairua, eraikina, mota } = req.body;
        const query = 'INSERT INTO gela (kodea, x, y, solairua, eraikina, mota) VALUES (?, ?, ?, ?, ?, ?)';
        await dbConnection.query(query, [kodea, x, y, solairua, eraikina, mota]);
        res.status(201).json({ message: 'Gela created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};