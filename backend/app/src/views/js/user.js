import { traducciones } from "./hizkuntza.js";
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

export async function createNewUser(user){
    user.role === undefined ? user.role = 'user' : user.role;
    const response = await fetch (`${API_URL}/user/add`,{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)   
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

    
    

export async function autentikatu(){
    const username = localStorage.getItem('idUser');
    const div = document.createElement('div');
    const button = document.createElement('button');
    button.textContent = traducciones[localStorage.getItem('idioma') || 'es'].saioahasi;
    button.addEventListener('click',async (event)=>{
        event.preventDefault();
        window.location.href = '../index.html';
    });
    const mezua = document.createElement('h1');
    mezua.textContent = traducciones[localStorage.getItem('idioma') || 'es'].saioahasi;
    div.appendChild(mezua);
    div.appendChild(button);
    console.log("username"+username);
    if(!username|| username == null || username == 'undefined'){
        document.body.innerHTML = '';
        document.body.appendChild(div);
        return;
    }

    const role = await getRole(username);
    console.log("rola:" +role);
    if(role !=='admin'){
        console.log("rola2:" +role);
        document.body.innerHTML = '';
        document.body.appendChild(div);
        return;
    }
    console.log('erabiltzailea ondo autentikatu da');
    return;
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/user/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error('Errorea erabiltzaileen zerrenda lortzean');
        return null;
    }
};

export async function egoeraAldatu(idUser){
    const response = await fetch (`${API_URL}/user/changeEgoera`,{
        method : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({idUser})
    });
        if(response.ok){
            return true;
        }
        else
            return false;
}