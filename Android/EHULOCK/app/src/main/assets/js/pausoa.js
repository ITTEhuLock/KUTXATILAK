import {API_URL, gridp6} from './konstanteak.js';
import { getGelak, getGela } from './gela.js';
import PF from "https://esm.sh/pathfinding";



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

// A* algoritmoa erabili da
const finder = new PF.AStarFinder();


const path = finder.findPath(Math.floor(gela_h[0].x/100*grid.width), Math.floor(gela_h[0].y/100*grid.height), Math.floor(gela_a[0].x/100*grid.width), Math.floor(gela_a[0].y/100*grid.height), grid);
console.log(Math.floor(gela_h[0].x/100*grid.width), Math.floor(gela_h[0].y/100*grid.height), Math.floor(gela_a[0].x/100*grid.width), Math.floor(gela_a[0].y/100*grid.height))
if(path.length>0)
console.log("Ibilbidea aurkitu da");
else
console.log("Ibilbiderik ez da aurkitu");

return path;
}

    

function printGrid(grid) {
    const rows = grid.height;
    const cols = grid.width;

    let gridString = '';

    for (let y = 0; y < rows; y++) {
        let rowString = '';
        for (let x = 0; x < cols; x++) {
            // 1 ==> oztopo, 0 ==> ibilbide posiblea
            rowString += grid.getNodeAt(x, y).walkable ? '0' : '1';
        }
        gridString += rowString + '\n';
    }

    console.log(gridString);
}

