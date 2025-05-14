import dbConnection from "../database/database.js";
export const checkErreserba = async (req, res) => {
    const info = req.body;
    const infoObj = [
        "2" , //hardkodeatuta dago, raspberry-aren id-a
        info.idUser
        
    ];
    const sqlQuery = `SELECT e.idErreserba, e.egoera AS egoera_erreserba, k.egoera AS egoera_kutxatila
FROM erreserba e
JOIN kutxatila k ON e.idKutxatila = k.idKutxatila
WHERE e.idKutxatila = ?
  AND e.idUser = ?
  AND e.egoera = 1;

`;
    try {
        const [results] = await dbConnection.query(sqlQuery, infoObj);
        if (results.length > 0) {

            res.status(200).json({ baimena: 'baimenduta', idErreserba: results[0].idErreserba });
            
        }
        else {
            res.status(404).json({ baimena: 'ezbaimenduta', message: 'ez da erreserbarik aurkitu' });
        }
    } catch (error) {
        res.status(500).json({ error: 'errorea erreserba egiaztatzean' });
    }
   
}
export const hasiErreserba = async (req,res) => {
    const info = req.body;
    const infoObj = [
        "5" , //hardkodeatuta dago, raspberry-aren id-a
        info.idErreserba
        
    ];
    if(isNaN(infoObj[1])){
        return res.status(400).json({ error: 'idErreserba ez da zenbaki bat' });
    }
    try{
        const now = new Date();
        now.setHours(now.getHours() + 2);
        const time = now.toISOString().slice(0, 19).replace('T', ' ');
        const updateObj = [
            time,
            infoObj[1]
        ];
        dbConnection.query(`UPDATE kutxatila SET egoera = 1 WHERE idKutxatila = ?`, [infoObj[0]]);
        dbConnection.query(`UPDATE erreserba SET fill_time = ? WHERE idErreserba = ?`, updateObj);
        return res.status(200).json({ message: "erreserba hasi da"});
    }catch(error){
        res.status(500).json({ error: 'errorea erreserba egiaztatzean' });
    }
}

export const amaituErreserba = async (req, res) => {
    const info = req.body;
    const infoObj = [
        "5" , //hardkodeatuta dago, raspberry-aren id-a
        info.idErreserba
        
    ];
    if(isNaN(infoObj[1])){
        return res.status(400).json({ error: 'idErreserba ez da zenbaki bat' });
    }
    try{
        const now = new Date();
        now.setHours(now.getHours() + 2);
        const time = now.toISOString().slice(0, 19).replace('T', ' ');
        const updateObj = [
            time,
            infoObj[1]
        ];
        dbConnection.query(`UPDATE kutxatila SET egoera = 0 WHERE idKutxatila = ?`, [infoObj[0]]);
        dbConnection.query(`UPDATE erreserba SET empty_time = ?, egoera = 2 WHERE idErreserba = ?`, updateObj);
        return res.status(200).json({ message: "erreserba hasi da"});
    }catch(error){
        res.status(500).json({ error: 'errorea erreserba egiaztatzean' });
    }

}