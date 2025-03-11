import { API_URL } from "./konstanteak.js";
export const getErabiltzailearenErreserbak = async () => {
    const idUser = 1; // Hardcoded user id
    const response = await fetch(`${API_URL}/erreserba/user/${idUser}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        console.error('Errorea erreserbak lortzean');
    }

};

export const deleteErreserba = async (event) => {
    const idErreserba = event.target.id;
    const response = await fetch(`${API_URL}/erreserba/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idErreserba })
    });
    if(response.ok){
        console.log('Erreserba ezabatua');
    }else{
        console.error('Errorea erreserba ezabatzean');
    }
}

export const createErreserba = async (event) => {
    console.log("Erreserba sortzen");
    event.preventDefault();
    const erreserba = {
        idUser: 1, // Hardcoded user id
        idKutxatila: document.getElementById('idKutxatila').value,
        start_time: document.getElementById('start_time').value,
        end_time: document.getElementById('end_time').value

    }
    const response = await fetch(`${API_URL}/erreserba/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(erreserba)
    });
    if(response.ok){
        console.log('Erreserba sortua');
    }else{
        console.error('Errorea erreserba sortzean');
    }
};