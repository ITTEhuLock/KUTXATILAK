export const checkErreserba = async (req, res) => {
    const info = req.body;
    const infoObj = [
        info.idKutxatila,
        info.idUser,
        info.start_time,
        info.end_time
    ];
    const sqlQuery = `SELECT * FROM erreserba WHERE idKutxatila = ? AND idUser = ? AND egoera = 0`;
    
   
}