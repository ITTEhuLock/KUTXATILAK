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

export const getErreserbaById = async () => {
    const idErreserba = localStorage.getItem('idErreserba');
    const response = await fetch(`${API_URL}/erreserba/${idErreserba}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        console.error('Errorea erreserbak lortzean');
    }

};
export async function getErreserba(idErreserba){
    const response = await fetch(`${API_URL}/erreserba/${idErreserba}`);
    if(response.ok){
        const data = await response.json();
        return data[0];
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


export const updateErreserba = async () => {
     const erreserba = {
            idErreserba: localStorage.getItem("idErreserba"),
            idKutxatila: document.getElementById('idKutxatila').value,
            start_time: document.getElementById('start_time').value,
            end_time: document.getElementById('end_time').value,
            egoera: localStorage.getItem("erreserbaEgoera")

        }
    const response = await fetch(`${API_URL}/erreserba/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(erreserba)
    });
    if(response.ok){
        console.log('Erreserba editatua');
    }else{
        console.error('Errorea erreserba editatzean');
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

export async function getErreserbaAktiboa() {
    const idUser = localStorage.getItem('idUser');
    try {
        const response = await fetch(`${API_URL}/erreserba/aktiboa/${idUser}`);
        if (response.ok) {
            const data = await response.json();
            return data[0];
        }
        return false;
    } catch (error) {
        console.error('Aplikazioak errorea izan du erreserba aktiboa jasotzean: ', error);
        return false;
    }
};