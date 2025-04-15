import dbConnection from "../database/database.js";
export const checkErreserba = async (req, res) => {
    const info = req.body;
    const infoObj = [
        "5" , //hardkodeatuta dago, raspberry-aren id-a
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

            if(results[0].egoera_kutxatila == 0){     
                res.status(200).json({ baimena:'baimenduta' });
                const now = new Date();
                now.setHours(now.getHours() + 2);
                const fill_time = now.toISOString().slice(0, 19).replace('T', ' ');
                const updateObj = [
                    fill_time,
                    results[0].idErreserba
                ];
                dbConnection.query(`UPDATE kutxatila SET egoera = 1 WHERE idKutxatila = ?`, [infoObj[0]]);
                dbConnection.query(`UPDATE erreserba SET fill_time = ? WHERE idErreserba = ?`, updateObj);   
            }
            else{
                res.status(200).json({ baimena: 'baimenduta' });
                const now = new Date();
                now.setHours(now.getHours() + 2);
                const empty_time = now.toISOString().slice(0, 19).replace('T', ' ');
                const updateObj = [
                    empty_time,
                    results[0].idErreserba
                ];
                dbConnection.query(`UPDATE kutxatila SET egoera = 0 WHERE idKutxatila = ?`, [infoObj[0]]);
                dbConnection.query(`UPDATE erreserba SET egoera = 2, empty_time = ? WHERE idErreserba= ?`, updateObj);
            }
        }
        else {
            res.status(404).json({ baimena: 'ezbaimenduta', message: 'ez da erreserbarik aurkitu' });
        }
    } catch (error) {
        res.status(500).json({ error: 'errorea erreserba egiaztatzean' });
    }
   
}