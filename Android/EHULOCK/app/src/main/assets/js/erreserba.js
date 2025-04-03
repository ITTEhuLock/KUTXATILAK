import { API_URL } from "./konstanteak.js";
export async function getErabiltzailearenErreserbak  (idUser) {
    const response = await fetch(`${API_URL}/erreserba/user/${idUser}`);
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


export async function updateErreserba (erreserba) {
    
const availability = await checkAvailability(erreserba.start_time, erreserba.end_time, erreserba.idKutxatila);
    if(!availability)
        return false;

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
return true;
}

export async function createErreserba (erreserba)  {
   const availability = await checkAvailability(erreserba.start_time, erreserba.end_time, erreserba.idKutxatila);
    if(!availability)
        return false;

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
return true;
};

export async function getErreserbaAktiboa(idUser) {
    
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

async function checkAvailability(start_time, end_time, idKutxatila) {
    const response = await fetch(`${API_URL}/erreserba/checkAvailability`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ start_time, end_time, idKutxatila })
    });
    if (response.ok) {
        const data = await response.json();
        return data.availability;
    }
    return false;
}