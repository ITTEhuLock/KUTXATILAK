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

export const deleteKutxatila = async (event) => {
    event.preventDefault();
    const idKutxatila = event.target.id.split("ezabatu")[1];
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

export const editKutxatilaEgoera = async (event) => { 
 
    event.preventDefault();
    const idKutxatila = event.target.id.split("egoera")[1];
    const egoeraZaharra = document.getElementById("egoera"+idKutxatila).textContent;
    const egoera = egoeraZaharra === "Irekita" ? "0" : "1";
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

export const editKutxatilaKodea = async (event) => {
    event.preventDefault();
    const idKutxatila = event.target.id;
    const kodea = document.getElementById("kodea"+idKutxatila).value;
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

export const editKutxatilaKokapena = async (event) => {
    event.preventDefault();
    const idKutxatila = event.target.id;
    const kokapena = document.getElementById("kokapena"+idKutxatila).value;
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