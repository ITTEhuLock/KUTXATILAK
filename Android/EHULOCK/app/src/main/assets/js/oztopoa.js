import {API_URL} from './konstanteak.js';


export const getOztopoak = async () => {
    try {
        const response = await fetch(`${API_URL}/oztopoak`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        console.error("Error in getOztopoak");
    } catch (error) {
        console.error("Error in getOztopoak");
    }
};

export const getOztopoa = async (idOztopoa) => {
    try {
        const response = await fetch(`${API_URL}/oztopoa/${idOztopoa}`);
        if (response.ok) {
            const data = await response.json();
            return data[0];
        }
        console.error("Error in getOztopoa");
    } catch (error) {
        console.error("Error in getOztopoa");
    }
};

export const getOztopoakSolairuka = async (solairua, eraikina) => {
    try {
        const response = await fetch(`${API_URL}/oztopoa/oztopoakSolairuka/${solairua}/${eraikina}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        console.error("Error in getOztopoakSolairuka");
    } catch (error) {
        console.error("Error in getOztopoakSolairuka");
    }
};

