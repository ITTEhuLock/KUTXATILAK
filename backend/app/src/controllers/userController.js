import dbConnection from '../database/database.js';


export const getUsers = async (req, res) => {
    try {
        const [results] = await dbConnection.query("SELECT * FROM user");
        
        if(results.length === 0){
        res.status(404).json({ error: 'erabiltzaileak ez dira existitzen' });
        }
        else{
        res.status(200).json(results); 
        }
    
    } catch (error) {
        res.status(500).json({ error: 'errorea erbiltzaileak eskuratzean' });
    }
}

export const getUser = async (req, res) => {
    const id = parseInt(req.params.idUser);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
      }
    const sqlQuery = `SELECT * FROM user WHERE idUser = ?`;
    try{
        const [results] = await dbConnection.query(sqlQuery, id);
        if (results.length === 0) {
            return res.status(404).json({ error: 'erabiltzailea ez da existitzen' });
        }
        else{
            res.status(200).json(results);
        }

    }
    catch (error) {
        res.status(500).json({ error: 'errorea erabiltzailea eskuratzean' });
    }
}

export const createNewUser = async (req, res) => {
    const user = req.body;

    if (!user.username || !user.password || !user.email || !user.role) {
        return res.status(400).json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty',
        });
    }

    const userObj = [
        user.username,
        user.password,
        user.email,
        user.role
       
    ];

    const sqlQuery = `INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)`;

    try {
        const [results] = await dbConnection.query(sqlQuery, userObj);
        const idUser = results.insertId;
        res.status(201).json({idUser} );
    } catch (error) {
        res.status(500).json({ error: 'errorea erabiltzailea sortzean' });
    }
}
    
export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.idUser);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'You must enter a valid id as a parameter' });
    }
    const sqlQuery = `DELETE FROM user WHERE idUser = ?`;
    try {
        const [results] = await dbConnection.query(sqlQuery, id);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'erabiltzailea ez da existitzen' });
        }
        else {
            res.status(200).json({ Message: 'User deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'errorea erabiltzailea ezabatzean' });
        console.log(error.message);
    }
}
export const changePassword = async (req, res) => {
    const idUser = parseInt(req.body.idUser);
    const password = req.body.password;
    const sqlQuery = `UPDATE user SET password = ? WHERE idUser = ?`;
    try {
        const [results] = await dbConnection.query(sqlQuery, [password, idUser]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'erabiltzailea ez da existitzen' });
        }
        else {
            res.status(200).json({ Message: 'Password changed successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const updateUser = async (req, res) => { 
    const user = req.body;
    if (!user.idUser || !user.username || !user.password || !user.email || !user.role) {
        return res.status(400).json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty',
        });
    }
    const userObj = [
        user.username,
        user.password,
        user.email,
        user.role,
        getMySQLTimestamp(),
        user.idUser
    ];
    const sqlQuery = `UPDATE user SET username = ?, password = ?, email = ?, role = ?, create_time = ? WHERE idUser = ?`;
    try {
        const [results] = await dbConnection.query(sqlQuery, userObj);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'erabiltzailea ez da existitzen' });
        }
        else {
            res.status(200).json({ Message: 'User updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'errorea erabiltzailea eguneratzean' });
    }
}

export const verifyUser = async (req, res) => {
    const username =req.body.username;
    const password = req.body.password;
    const token = req.body.token;
    const sqlQuery = `SELECT * FROM user WHERE username = ? AND password = ?`;
    try {
        const [results] = await dbConnection.query(sqlQuery, [username, password]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'erabiltzailea ez da existitzen' });
        }
        else {
            const tmpIdUser = results[0].idUser;
            if (token && results[0].token != token){
                const tokenObj = [
                    token,
                    tmpIdUser
                ];

                const [results] = await dbConnection.query(`UPDATE user SET token = ? WHERE idUser = ?`, tokenObj);
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'errorea tokena eguneratzean' });
                }
            }
            res.status(200).json({idUser: results[0].idUser });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Errorea:",error);
    }
}

export const getRole = async (req, res) => {
    const idUser = parseInt(req.params.idUser);
    const sqlQuery = `SELECT * from user WHERE idUser = ?`;
    try{
        const [results]= await dbConnection.query(sqlQuery,[idUser]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'erabiltzailea ez da existitzen' });
        }
        else {
            res.status(200).json({role: results[0].role});
        } 
        
    }

    catch (error){
        res.status(500).json({ error: 'errorea erabiltzailea egiaztatzean' });
    }

}

export const checkUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const sqlQuery = `SELECT * FROM user WHERE username = ? OR email = ?`;
    try {
        const [results] = await dbConnection.query(sqlQuery, [username, email]);
        if (results.length > 0) {
            return res.status(200).json({ egoera: false });
        }
        else { 
            return res.status(200).json({ egoera: true });
             }
    } catch (error) {
        res.status(500).json({ error: 'errorea erabiltzailea egiaztatzean' });
    }
}

export const changeEgoera = async (req, res) => {
    const idUser = parseInt(req.body.idUser);
    const sqlQuery = 'UPDATE user SET egoera = NOT egoera WHERE idUser = ?;';
    try {
        const [results] = await dbConnection.query(sqlQuery,idUser);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'erabiltzailea ez da existitzen' });
        }
        else {
            res.status(200).json({ Message: 'Egoera aldatu da' });
        }
    } catch (error) {
        res.status(500).json({ error:error.message });
        console.log(error.message);
    }
};

export const baimenduta = async (req, res) => {
    try {
        const idUser = parseInt(req.params.idUser);
        const sqlQuery = `SELECT CASE
        WHEN egoera = 0 THEN TRUE
        ELSE FALSE
    END AS baimenduta
FROM user
WHERE idUser = ?;`;
        const [results] = await dbConnection.query(sqlQuery, [idUser]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'erabiltzailea ez da existitzen' });
        }
        else {
            res.status(200).json({ egoera: Boolean(results[0].baimenduta) });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }   
}