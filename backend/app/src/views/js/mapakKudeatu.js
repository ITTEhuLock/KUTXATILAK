import * as g from './gela.js';
import { gridp6 } from './konstanteak.js';
import * as p from  './pausoa.js';



export async function ibilbideaBistaratu2() {
const mapa = document.getElementById('mapa');

const mapaContainer = document.getElementById('ibilbidea');
mapaContainer.style.left = mapa.offsetLeft + 'px';
mapaContainer.style.top = mapa.offsetTop + 'px';
mapaContainer.style.width = mapa.offsetWidth + 'px';
mapaContainer.style.height = mapa.offsetHeight + 'px';

const rows = gridp6.length;
const cols =  gridp6[0] ? gridp6[0].length : 0;

for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const celda = document.createElement('div');
        celda.classList.add('celda');
        if(gridp6[y][x] == 1)
            celda.classList.add('oztopo');
        else 
            celda.classList.add('ibilbidea');
    
        mapaContainer.appendChild(celda);
    }
}



   }


   export async function loadMapa(){
        const grid = gridp6;
       const botoiak = document.getElementById("botoiak");
       const gelak = await g.getGelak();
       const mapa = document.getElementById("mapa");
       const mapaW = mapa.width;
       const mapaH = mapa.height;
       gelak.forEach(async (gela) => {
            if(gela.x == null || gela.y == null)
                return;
           const button = document.createElement("button");
            button.id = gela.idGela;
           button.className = "koordenatua";
            const x = gela.x*mapaW/100;
            const y = gela.y*mapaH/100;
           button.style.left = x+"px";
           button.style.top = y+"px";
           button.innerText = gela.kodea;
           botoiak.appendChild(button);

           button.addEventListener("click", async (event) => {
            event.preventDefault();
            const inpPos = document.getElementById("inputposizioa");
            const inpOnd = document.getElementById("inputondokoa");
            const menuPos = document.getElementById("menuposizioa");
            const menuOnd = document.getElementById("menuondokoa");
            if (inpPos.hidden){
                inpPos.hidden = false;
                inpPos.value = gela.kodea;
                menuPos.value = gela.idGela;
                menuPos.hidden = true;
            }
            else if (inpOnd.hidden){
                inpOnd.hidden = false;
                inpOnd.value = gela.kodea;
                menuOnd.value = gela.idGela;
                menuOnd.hidden = true;
            }
            
            
           
            
  
           });

              });
              ibilbideaBistaratu2();
   }



document.addEventListener('DOMContentLoaded', () => {

  loadMapa();

});

