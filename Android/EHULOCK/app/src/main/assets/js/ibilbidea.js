import { API_URL } from "./konstanteak.js";


export async function getUserrenIbilbideak  (idUser)  {
    try {
        const response = await fetch(API_URL + `/ibilbidea/user/${idUser}`);
        const data = await response.json();
        if (response.ok) {
            return data;
    

                
        } else {
            console.log("Errorea:", data.error);
            return null;
        }
    }
    catch (error) {
        console.log("Errorea:", error);
        return null;
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


export async function deleteIbilbidea(idIbilbidea) {
    try {
        const response = await fetch(`${API_URL}/ibilbidea/delete/${idIbilbidea}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("errorea");
    }
}