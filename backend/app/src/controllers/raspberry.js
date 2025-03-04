import dbConnection from "../database/database.js";
export const checkErreserba = async (req, res) => {
    const info = req.body;
    const infoObj = [
        "1" , //hardkodeatuta dago, raspberry-aren id-a
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
                
            res.status(200).json({ message: 'IREKI' });
            }
            else{
                res.status(200).json({ message: 'ITXI' });
            }
        }
        else {
            res.status(404).json({ error: 'Erreserba ez da egokia' });
        }
    } catch (error) {
        res.status(500).json({ error: 'errorea erreserba egiaztatzean' });
    }
   
}