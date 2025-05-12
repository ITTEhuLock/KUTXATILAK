import * as g from './gela.js';
import * as p from  './pausoa.js';
import * as i from './ibilbidea.js';	
import { gridp6 } from './konstanteak.js';
import { aplicarTraduccion, traducciones } from "./hizkuntza.js";
export async function loadMenuak(){
    const menuposizioa = document.getElementById("menuposizioa");
    const menuondokoa = document.getElementById("menuondokoa");
    const gelak = await g.getGelak();
    
    const idioma = localStorage.getItem('idioma') || 'es';

    const def = document.createElement("option");
    def.value = 0;
    def.dataset.i18n = 'origen';
    def.text = traducciones[idioma]['origen']; 
    menuposizioa.appendChild(def);

    const def2 = document.createElement("option");
    def2.value = 0;
    def2.dataset.i18n = 'destino';
    def2.text = traducciones[idioma]['destino'];
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

const rows = gridp6.length;
const cols =  gridp6[0] ? gridp6[0].length : 0;

for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const celda = document.createElement('div');
        celda.classList.add('celda');
        mapaContainer.appendChild(celda);
    }
}


path.forEach(([x, y]) => {
    const point = document.createElement('div');
    point.classList.add('pathPoint');
    
   
    const cellWidth = mapaContainer.offsetWidth / cols;
    const cellHeight = mapaContainer.offsetHeight / rows;
    

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
  document.getElementById("bidaiak").style.display = "none";
  if(localStorage.getItem("idUser"))
    document.getElementById("history").hidden = false;

});
document.getElementById("history").addEventListener("click", async (event) => {
    event.preventDefault();
    document.getElementById("bidaiak").style.display = "block";
    loadHistoriala();
});


export async function loadHistoriala(){
    const userId = localStorage.getItem("idUser");
    if (!userId) {
        return;
    }
    const ibilbideak = await i.getUserrenIbilbideak(userId);
    const taula = document.createElement("table");
    taula.className = "taula";
    const l1 = taula.insertRow();
    l1.insertCell().innerText = "Jatorria";
    l1.insertCell().innerText = "Helmuga";
    l1.insertCell().innerText = "Ekintza";
    console.log(ibilbideak);
    ibilbideak[0].forEach(async(ibilbidea) => { 
        console.log(ibilbidea);
        const l = taula.insertRow();
        l.insertCell().innerText = await g.getGela(ibilbidea.jatorria).then(gela => gela[0].kodea);
        l.insertCell().innerText = await g.getGela(ibilbidea.helmuga).then(gela => gela[0].kodea);
        
        const ekintza = document.createElement("button");
        ekintza.innerText = "Ikusi";
        ekintza.addEventListener("click", async (event) => {
            event.preventDefault();
            document.getElementById("bidaiak").style.display = "none";
            ibilbideaBilatu(ibilbidea.jatorria, ibilbidea.helmuga);

        });
        const ezabatu = document.createElement("button");
        ezabatu.innerText = "Ezabatu";
        ezabatu.addEventListener("click", async (event) => {
            event.preventDefault();
            if(!await i.deleteIbilbidea(ibilbidea.idIbilbidea))
                return;
            confirm("Ibilbidea ezabatu nahi duzu?");
            window.location.reload();
        });
        const c = l.insertCell();
        c.appendChild(ekintza)
        c.appendChild(ezabatu);


    });
    const itxi = document.createElement("button");
    itxi.innerText = "Itxi";
    itxi.addEventListener("click", async (event) => {
        event.preventDefault();
        document.getElementById("bidaiak").style.display = "none";
    });
    itxi.className = "itxi";
    const content = document.querySelector(".modal-content");
    content.innerHTML = "";
    content.appendChild(itxi);
    content.appendChild(taula);
}
