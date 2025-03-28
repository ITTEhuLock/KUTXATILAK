import {API_URL} from './konstanteak.js';

export const getGelak = async () => {  
    try {
        const response = await fetch(`${API_URL}/gela`);
        if (response.ok) {
        const data = await response.json();
        return data[0];
        }
        return false;
    }
    catch{
        console.log(error);
    }
};
export const getGela = async (idGela) => {
    try{
        const response = await fetch(`${API_URL}/gela/${idGela}`);
    
    if (response.ok) {
        const data = await response.json();
        return data[0];
        }
        return false;
    } catch (error) {
        console.error('errorea ', error);
        return false;
    }
};