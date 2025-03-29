import * as e from "./erreserba.js";
import * as k from "./kutxatila.js";

export async function loadErreserbaLaburpena(){
    const erreserbakCont = document.getElementById('erreserbak');
    const erreserbak = await e.getErabiltzailearenErreserbak(localStorage.getItem("idUser"));
    if(!erreserbak){
        const abisua = document.createElement('h1');
        abisua.textContent = 'Ez daukazu erreserbarik';
        erreserbakCont.appendChild(abisua);
        return;
    }

    const taula = document.createElement('table');
    taula.className = 'taula';
    const l1 = taula.insertRow();

    l1.insertCell().textContent = 'Hasiera';
    l1.insertCell().textContent = 'Amaiera';
    l1.insertCell().textContent = 'Ekintza';

    erreserbak.forEach(async (erreserba) =>{
        console.log(erreserba.idKutxatila);
       
        const l = taula.insertRow();
        l.insertCell().textContent = erreserba.start_time.split('T')[0] + " " + erreserba.start_time.split('T')[1].substring(0, 5);
        l.insertCell().textContent = erreserba.end_time.split('T')[0] + " " + erreserba.end_time.split('T')[1].substring(0, 5);
        const c = l.insertCell();
        const eB = document.createElement('button');
        eB.name = 'hedatuButton';
        eB.id = erreserba.idErreserba;
        eB.textContent = 'Hedatu';
        eB.addEventListener('click', (event) => {
            console.log(erreserba.idErreserba)
            event.preventDefault();
            /*localStorage.setItem("idErreserba", erreserba.idErreserba); // ???
            window.location.href = './erreserbaZehatza.html';*/
            loadZehaztapenak(event);
            
        });
        if(parseInt(erreserba.egoera) === 1){
            const iB = document.createElement('button');
            iB.textContent = 'Ireki';
            iB.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = './kutxatilaIreki.html';
            });

            c.appendChild(iB);

        }
        c.appendChild(eB);

    });
    
    erreserbakCont.appendChild(taula);
}

export async function erreserbaEzabatu(idErreserba){
    console.log(idErreserba);
    await e.deleteErreserba(idErreserba);
    window.location.href = './erreserbakIkusi.html';
    
}

export async function erreserbaEditatu(idErreserba, egoera){
    await e.updateErreserba(idErreserba, egoera);
    document.getElementById('berriaForm2').reset();
    window.location.reload();
}

export async function erreserbaSortu(event){
    event.preventDefault();
        const form = document.getElementById('berriaForm');
        const erreserba = {
            idUser: localStorage.getItem('idUser'),
            idKutxatila: form.menua.value,
            start_time: form.start_time.value,
            end_time: form.end_time.value
    
        }
    await e.createErreserba(erreserba);
    form.reset();
    window.location.reload();

   
}

export async function getErreserbaLaburpena(){
    const erreserba = await e.getErreserbaAktiboa(localStorage.getItem('idUser'));
    if(!erreserba){
        const abisua = document.createElement('h1');
        abisua.textContent = 'Ez daukazu erreserba aktiborik';
        document.getElementById('erreserba').appendChild(abisua);
        return;
    }
    const erreserbakDiv = document.getElementById('erreserba');
    const p1 = document.createElement('h3');
    const p2 = document.createElement('h3');

    p1.textContent = `Erreserba: ${erreserba.start_time.split("T")[1].split(".")[0]} - ${erreserba.end_time.split("T")[1].split(".")[0]}`;
    p2.textContent =`Kutxatila: ${erreserba.idKutxatila}`;
    erreserbakDiv.appendChild(p1);
    erreserbakDiv.appendChild(p2);
    document.getElementById('ireki').hidden = false;

};



export async function loadZehaztapenak(event){
    event.preventDefault();
    const zehaztapenak = document.getElementById('zehaztapenak');
    const zehaztapenakCont = document.querySelector('.modal-content');
    const t = document.querySelector('.taula2');
    if(t)
    t.remove();
    zehaztapenak.style.display = 'flex';
    const idErreserba = event.target.id;
    const erreserba = await e.getErreserba(idErreserba);
    
    const taula = document.createElement('table');
    taula.className = 'taula2';
    const l1 = taula.insertRow();
    
    const lerroaSortu = (izenburua, data) => {
        const l = taula.insertRow();
        l.insertCell().textContent = izenburua; 
        l.insertCell().textContent = data; 
    };

        
   
        console.log(erreserba.idKutxatila);
        const ku = await k.getKutxatila(erreserba.idKutxatila);
        
        lerroaSortu("Kutxatila",ku.kodea+', '+ku.kokapena+' eraikinean');
        lerroaSortu("Hasiera data",erreserba.start_time.split('T')[0]+" "+erreserba.start_time.split('T')[1].split('.')[0]);
        lerroaSortu("Amaiera data",erreserba.end_time.split('T')[0]+" "+erreserba.end_time.split('T')[1].split('.')[0]);
        lerroaSortu("Egoera",parseInt(erreserba.egoera) === 0
        ? "Hasigabea"
        : parseInt(erreserba.egoera) === 1
        ? "Martxan"
        : "Amaituta");

    const edit = document.getElementById('berriaForm2');
    edit.addEventListener('submit', (event) => {
        event.preventDefault();
        erreserbaEditatu(erreserba.idErreserba, erreserba.egoera);
            });
    const ezabatu = document.getElementById('ezabatuButton');
    ezabatu.addEventListener('click', (event) => {
        event.preventDefault();
        erreserbaEzabatu(erreserba.idErreserba);
            });
    zehaztapenakCont.appendChild(taula);
    }
    

    
