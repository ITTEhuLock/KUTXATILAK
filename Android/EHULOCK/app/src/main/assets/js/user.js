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

export async function getUser(idUser){

    const response = await fetch (`${API_URL}/user/${idUser}`,{
        method : 'GET',
        headers: {'Content-Type': 'application/json'},

});
if(response.ok){
const data = await response.json();
return data[0];
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
    const response = await fetch (`${API_URL}/user/add`,{
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


export async function checkUser(username, email) {

    const response = await fetch (`${API_URL}/user/checkUser`,{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, email})
    });
    if(response.ok){
        const data = await response.json();
        return data.egoera;
    }
    else
        return null;
}

    
export async function deleteUser(idUser)   {
    const response = await fetch (`${API_URL}/user/delete/${idUser}`,{
        method : 'DELETE',
        headers: {'Content-Type': 'application/json'},
       
});
if(response.ok){
console.log('Erabiltzailea ezabatua');
}
else
console.error('Errorea erabiltzailea ezabatzean');
}

export async function changePassword(idUser, password){
    const response = await fetch (`${API_URL}/user/changePassword`,{
        method : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({idUser, password})
    });
        if(response.ok){
            return true;
        }
        else
            return false;
};