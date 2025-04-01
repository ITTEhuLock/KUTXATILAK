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


export async function bideratzeAlgoritmoa(hasiera, amaiera) {
    const rows = await getBideraketa();
    const grafo = {};

    rows.forEach(row => {
        if (!grafo[row.posizioa]) grafo[row.posizioa] = new Set();
        if (!grafo[row.ondokoa]) grafo[row.ondokoa] = new Set();
        if (!grafo[row.aurrekoa]) grafo[row.aurrekoa] = new Set();

        grafo[row.posizioa].add(row.ondokoa);
        grafo[row.posizioa].add(row.aurrekoa);
        grafo[row.ondokoa].add(row.posizioa);
        grafo[row.aurrekoa].add(row.posizioa);
    });

    let queue = [[hasiera]];
    let bitartekoak = new Set();

    while (queue.length > 0) {
        let path = queue.shift();
        let node = path[path.length - 1];

        if (node === amaiera) return path;

        if (!bitartekoak.has(node)) {
            bitartekoak.add(node);
            (grafo[node] || []).forEach(albokoa => {
                if (!bitartekoak.has(albokoa)) {
                    queue.push([...path, albokoa]);
                }
            });
        }
    }

    return null;
}
