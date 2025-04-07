import * as g from './gela.js';
import * as p from  './pausoa.js';
import * as i from './ibilbidea.js';	
import { gridp6 } from './konstanteak.js';
export async function loadMenuak(){
    const menuposizioa = document.getElementById("menuposizioa");
    const menuondokoa = document.getElementById("menuondokoa");
    const gelak = await g.getGelak();
    const def = document.createElement("option");
    def.value = 0;
    def.text = "Jatorria";
    menuposizioa.appendChild(def);
    const def2 = document.createElement("option");
    def2.value = 0;
    def2.text = "Helmuga";
    menuondokoa.appendChild(def2);
    gelak.forEach(gela => {
        const option = document.createElement("option");
        option.value = gela.idGela;
        option.text = gela.kodea;
        menuposizioa.appendChild(option);
        const option2 = document.createElement("option");
        option2.value = gela.idGela;
        option2.text = gela.kodea;
        menuondokoa.appendChild(option2);
        menuposizioa.appendChild(option);
    });

    const form = document.getElementById("berria");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        ibilbideaBilatu(form.menuposizioa.value, form.menuondokoa.value);
        ibilbideaSortu();
    });
}

export async function ibilbideaSortu(){
    const form = document.getElementById("berria");
    if(localStorage.getItem("idUser") == null ||localStorage.getItem("idUser") == undefined || !localStorage.getItem("idUser")){
        return;
    }
    await i.createNewIbilbidea(localStorage.getItem("idUser"), form.menuposizioa.value, form.menuondokoa.value);
    form.reset();
    document.getElementById("berriaForm").hidden = true;
   

}


export async function ibilbideaBilatu(posizioa, ondokoa){
    console.log("posizioa", posizioa);
    console.log("ondokoa", ondokoa);
    
    const ibilbidea = await p.bideratzeAlgoritmoa(parseInt(posizioa), parseInt(ondokoa));
    console.log(ibilbidea);
    if(!ibilbidea)
        return;
    document.getElementById("berriaForm").hidden = true;
    ibilbideaBistaratu2(ibilbidea);
   }



export async function ibilbideaBistaratu2(path) {
const mapa = document.getElementById('mapa');

const mapaContainer = document.getElementById('ibilbidea');
mapaContainer.style.left = mapa.offsetLeft + 'px';
mapaContainer.style.top = mapa.offsetTop + 'px';
mapaContainer.style.width = mapa.offsetWidth + 'px';
mapaContainer.style.height = mapa.offsetHeight + 'px';

const rows = gridp6.length; // Número de columnas de tu cuadrícula
const cols =  gridp6[0] ? gridp6[0].length : 0;; // Número de filas de tu cuadrícula


for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const celda = document.createElement('div');
        celda.classList.add('celda');
        mapaContainer.appendChild(celda);
    }
}

// Dibuja el camino sobre el mapa
path.forEach(([x, y]) => {
    const point = document.createElement('div');
    point.classList.add('pathPoint');
    
    // Calcular las posiciones absolutas de los puntos dentro del mapa
    const cellWidth = mapaContainer.offsetWidth / cols;
    const cellHeight = mapaContainer.offsetHeight / rows;
    
// Ajusta las posiciones de los puntos considerando el tamaño total de la imagen del mapa
    point.style.left = `${x * cellWidth}px`;
    point.style.top = `${y * cellHeight}px`;
    mapaContainer.appendChild(point);
});

   }

   export async function loadMapa(){
      
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
   }


document.getElementById("garbitu").addEventListener("click", async (event) => {
    event.preventDefault();
    const form = document.getElementById("berria");
    form.menuondokoa.hidden = false;    
    form.menuposizioa.hidden = false;
    form.inputondokoa.hidden = true;
    form.inputposizioa.hidden = true;
    form.reset();
});
      
document.addEventListener('DOMContentLoaded', () => {
  loadMenuak();
  loadMapa();
});