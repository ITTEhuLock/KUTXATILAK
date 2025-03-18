import { API_URL } from "./konstanteak.js";
export async function verifyUser(username, password){
    
        const response = await fetch (`${API_URL}/user/verifyUser`,{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})

    });
        if(response.ok){
            const data = await response.json();
            return data.idUser;
        }
        else
            return null;
};


export async function getRole(idUser){
    const response = await fetch (`${API_URL}/user/role/${idUser}`,{
        method : 'GET',
        headers: {'Content-Type': 'application/json'},
    });
        if(response.ok){
            const data = await response.json();
            return data.role;
        }
        else
            return false;
};

export async function createNewUser(username, password, email){
    const response = await fetch (`${API_URL}/user/createNewUser`,{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, email, role:'user'})   
    });
        if(response.ok){
            const data = await response.json();
            return data.idUser;
        }
        else
            return null;
    };