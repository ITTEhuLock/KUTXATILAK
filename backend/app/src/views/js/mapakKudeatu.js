import * as g from './gela.js';




export async function ibilbideaBistaratu2() {
 const gridp6 = await g.getWalkableSpots();
const mapaContainer = document.getElementById('ibilbidea');
const rows = gridp6.length;
console.log(gridp6);
const cols =  gridp6[0] ? gridp6[0].length : 0;
console.log(cols, rows);
for (let y = 0; y < rows; y++) {
    
    for (let x = 0; x < cols; x++) {
        console.log(y, x);
        const celda = document.createElement('div');
        celda.classList.add('celda');
        if(gridp6[y][x] == 1)
            celda.classList.add('oztopo');
        else {
            const button = document.createElement('button');
            button.classList.add('ibilbidea-button');
            button.innerText = ".";
            celda.classList.add('ibilbidea');
            button.addEventListener('click', (event) => {
                event.preventDefault();
                document.getElementById('kokapena').value = `${x},${y}`;
                console.log(`Clicked cell at (${x}, ${y})`);
            });
            celda.appendChild(button);
        }
        mapaContainer.appendChild(celda);
    }
}



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


              });
              ibilbideaBistaratu2();
   }



document.addEventListener('DOMContentLoaded', () => {

  loadMapa();

});
document.getElementById('berria').addEventListener('submit', (event) => {
    event.preventDefault(); 
    gelaSortu();
    window.location.reload();
});

export async function gelaSortu(){
    const gridp6 = await g.getWalkableSpots();
    const width = gridp6[0].length;
    const height = gridp6.length;
    const form = document.getElementById('berria');
    const data = {
        kodea: form.kodea.value,
        x: parseInt(form.kokapena.value.split(",")[0])*100/width,
        y: parseInt(form.kokapena.value.split(",")[1])*100/height,
        solairua: form.solairua.value,
        eraikina: form.eraikina.value,  
        mota: form.mota.value 
      
    }
    const ge = await g.createNewGela(data);
    if(!ge){
        alert("Errorea gela sortzean");
        return;
    }
}