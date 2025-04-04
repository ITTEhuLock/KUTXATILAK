import {API_URL, gridp6} from './konstanteak.js';
import { getGelak, getGela } from './gela.js';

import PF from "https://esm.sh/pathfinding";

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
    const gela_h = await getGela(hasiera);
    const gela_a = await getGela(amaiera);
    const grid = new PF.Grid(gridp6);
    const gelak = await getGelak();
    gelak.forEach(gela => {
        if(gela.x == null || gela.y == null)
            return;
        const node = grid.getNodeAt(Math.floor(gela.x/100*grid.width), Math.floor(gela.y/100*grid.height));
        node.walkable = true;
    });
console.log(grid);
printGrid(grid);
// Crear el algoritmo A*
const finder = new PF.AStarFinder();


const path = finder.findPath(Math.floor(gela_h[0].x/100*grid.width), Math.floor(gela_h[0].y/100*grid.height), Math.floor(gela_a[0].x/100*grid.width), Math.floor(gela_a[0].y/100*grid.height), grid);
console.log(Math.floor(gela_h[0].x/100*grid.width), Math.floor(gela_h[0].y/100*grid.height), Math.floor(gela_a[0].x/100*grid.width), Math.floor(gela_a[0].y/100*grid.height))
// Imprimir el camino encontrado
console.log("Camino encontrado:", path);

return path;
}

    

function printGrid(grid) {
    const rows = grid.height;
    const cols = grid.width;

    let gridString = '';

    for (let y = 0; y < rows; y++) {
        let rowString = '';
        for (let x = 0; x < cols; x++) {
            // 1 si el lugar es un obstáculo (no caminable), 0 si es caminable
            rowString += grid.getNodeAt(x, y).walkable ? '0' : '1';
        }
        gridString += rowString + '\n';
    }

    console.log(gridString);
}

function setArea(grid, startX, startY, width, height, gridSize, booleanoa) {
    console.log(startX, startY, width, height);
    // Convertimos los puntos de píxeles a coordenadas de la grilla
    const startGridX = Math.floor(startX );
    const startGridY = Math.floor(startY );
    console.log(`Inicio: ${startGridX}, ${startGridY}`);

    // Calculamos las dimensiones del área en términos de celdas de la grilla
    const numCols = Math.floor(width);
    const numRows = Math.floor(height);

    // Marcamos las celdas en el área como no caminables
    for (let x = startGridX; x < startGridX + numCols; x++) {
        for (let y = startGridY; y < startGridY + numRows; y++) {
                    console.log(gridSize);
                    const nx = Math.floor(x/100*gridSize);
                    const ny = Math.floor(y/100*gridSize);
                    console.log(`Marcando la celda ${nx}, ${ny} como ${booleanoa} caminable`);
                    grid.setWalkableAt(nx, ny, booleanoa);
        }
            
            
        
    }

}
