import { API_URL } from "./konstanteak.js";
export const getErabiltzailearenErreserbak = async () => {
    const idUser = localStorage.getItem('idUser');
    const response = await fetch(`${API_URL}/erreserba/user/${idUser}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        console.error('Errorea erreserbak lortzean');
    }

};

export async function deleteErreserba (idErreserba) {
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
    event.preventDefault();
    const erreserba = {
        idUser: localStorage.getItem('idUser'),
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