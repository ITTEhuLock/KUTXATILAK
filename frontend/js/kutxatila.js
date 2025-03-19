import {API_URL} from './konstanteak.js';

export const getKutxatilak = async () => {  
    try {
        const response = await fetch(`${API_URL}/kutxatila`);
        if (response.ok) {
        const data = await response.json();
        return data;
        }
        return false;
    } catch (error) {
        console.error('Aplikazioak errorea izan du kutxatilak jasotzean: ', error);
        return false;
    }
};

export async function getKutxatila(idKutxatila){
    try{
        const response = await fetch(`${API_URL}/kutxatila/${idKutxatila}`);
    
    if (response.ok) {
        const data = await response.json();
        return data[0];
        }
        return false;
    } catch (error) {
        console.error('errorea ', error);
        return false;
    }
};;

export async function deleteKutxatila(idKutxatila) {
   try {
        await fetch(`${API_URL}/kutxatila/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idKutxatila})
        });
    } catch (error) {
        console.error('Errorea izan da kutxatila ezabatzean: ', error);
    }
};

export async function editKutxatilaEgoera (idKutxatila, egoeraZaharra) { 
 
    const egoera = egoeraZaharra === 1 ? "0" : "1";
    try {
        await fetch(`${API_URL}/kutxatila/updateEgoera`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idKutxatila, egoera})
        });
    } catch (error) {
        console.error('Errorea izan da kutxatila egoera eguneratzean: ', error);
    }
};

export async function editKutxatilaKodea (idKutxatila, kodea) {
   
    try {
        await fetch(`${API_URL}/kutxatila/updateKodea`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idKutxatila, kodea})
        });
    } catch (error) {
        console.error('Errorea izan da kutxatila kodea eguneratzean: ', error);
    }
};

export async function editKutxatilaKokapena (idKutxatila, kokapena) {
   
    try {
        await fetch(`${API_URL}/kutxatila/updateKokapena`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idKutxatila, kokapena})
        });
    } catch (error) {
        console.error('Errorea izan da kutxatila kokapena eguneratzean: ', error);
    }
};

export const kutxatilaSortu = async (event) => {
    event.preventDefault();
    const kodea = document.getElementById("kodea").value;
    const kokapena = document.getElementById("kokapena").value;
    try {
        await fetch(`${API_URL}/kutxatila/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({kodea, kokapena})
        });
    } catch (error) {
        console.error('Errorea izan da kutxatila sortzean: ', error);
    }
};