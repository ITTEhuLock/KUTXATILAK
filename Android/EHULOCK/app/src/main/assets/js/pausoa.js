import {API_URL} from './konstanteak.js';
export const getBideraketa = async () => {
    try{
    const response = await fetch(`${API_URL}/pausoa/bideraketak`);
    if (response.ok) {
        const data = await response.json();
        return data[0];
        }
        return false;
    }
    catch{
        console.log(error);
    }
}


export async function bideratzeAlgoritmoa(hasiera, amaiera){
    const rows = await getBideraketa();
   // console.log(rows);
    const grafo = {};
    rows.forEach(row => {
       
        if (!grafo[row.posizioa]) grafo[row.posizioa] = [];
        if (!grafo[row.ondokoa]) grafo[row.ondokoa] = [];
        grafo[row.posizioa].push(row.ondokoa);
        grafo[row.ondokoa].push(row.posizioa);
    });
   
   let queue = [[hasiera]];
   let bitartekoak = new Set();
    
   while (queue.length > 0) {
       let path = queue.shift();
       let node = path[path.length - 1];

       if (node === amaiera) return path;

       if (!bitartekoak.has(node)) {
           bitartekoak.add(node);
           (grafo[node] || []).forEach(albokoa => queue.push([...path, albokoa]));
       }
   }
   
   return null; 
}