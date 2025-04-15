import { API_URL } from "./konstanteak.js";


export async function getUserrenIbilbideak  (idUser)  {
    try {
        const response = await fetch(API_URL + `/ibilibidea/user/${idUser}`);
       
        const data = await response.json();
        if(response.ok)
            return data;
        else    
            return false;

    } catch (error) {
        console.log(error);
    }
};

export async function createNewIbilbidea(idUser, jatorria, helmuga) {
    try {
        const response = await fetch(`${API_URL}/ibilbidea/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUser: idUser,
                jatorria: jatorria,
                helmuga: helmuga
            })
        });

    } catch (error) {
        console.log("errorea");
    }
};


