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