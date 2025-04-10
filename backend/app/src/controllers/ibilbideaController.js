import dbConnection from "../database/database.js";

export const getUserrenIbilbideak = async (req, res) => {
    const idUser = req.params.idUser;
    const sql = `SELECT * FROM ibilbidea WHERE idUser = ${idUser}`;
    try {
        const result = await dbConnection.query(sql);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


export const createNewIbilbidea = async (req, res) => {
    if(!req.body.idUser|| req.body.idUser == null)
        res.status(400).json({ error: "idUser is required" });
    const ibilbideaObj = {
        idUser: req.body.idUser,
        jatorria: req.body.jatorria,
        helmuga: req.body.helmuga
    }
    
    const sql = `INSERT INTO ibilbidea (idUser, jatorria, helmuga) VALUES (${ibilbideaObj.idUser}, ${ibilbideaObj.jatorria}, ${ibilbideaObj.helmuga})`;
    try {
        await dbConnection.query(sql);
        res.status(201).json(true);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


export const deleteIbilbidea = async (req, res) => {
    const idIbilbidea = req.params.idIbilbidea;
    const sql = `DELETE FROM ibilbidea WHERE idIbilbidea = ${idIbilbidea}`;
    try {
        await dbConnection.query(sql);
        res.status(200).json(true);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }   
};