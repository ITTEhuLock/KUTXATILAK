import * as e from "./erreserba.js";
import * as k from "./kutxatila.js";
export async function loadErreserbak(){
    const erreserbakCont = document.getElementById('erreserbak');
    const erreserbak = await e.getErabiltzailearenErreserbak();
    if(!erreserbak){
        const abisua = document.createElement('h1');
        abisua.textContent = 'Ez daukazu erreserbarik';
        erreserbakCont.appendChild(abisua);
        return;
    }

    const taula = document.createElement('table');
    taula.className = 'taula';
    const l1 = taula.insertRow();
    
    l1.insertCell().textContent = 'Kutxatila';
    l1.insertCell().textContent = 'Hasiera';
    l1.insertCell().textContent = 'Amaiera';
    l1.insertCell().textContent = 'Egoera';
    l1.insertCell().textContent = 'Ekintza';

    
    erreserbak.forEach(async (erreserba) =>{
        console.log(erreserba.idKutxatila);
        const ku = await k.getKutxatila(erreserba.idKutxatila);
        const l = taula.insertRow();
        l.insertCell().textContent = ku.kodea+', '+ku.kokapena+' eraikinean';
        l.insertCell().textContent = erreserba.start_time.split('T')[0]+" "+erreserba.start_time.split('T')[1].split('.')[0];
        l.insertCell().textContent = erreserba.end_time.split('T')[0]+" "+erreserba.end_time.split('T')[1].split('.')[0];
        l.insertCell().textContent = parseInt(erreserba.egoera) === 0
        ? "Hasigabea"
        : parseInt(erreserba.egoera) === 1
        ? "Martxan"
        : "Amaituta";
        const eB = document.createElement('button');
        eB.name = 'ezabatuButton';
        eB.id = erreserba.idErreserba;
        eB.textContent = 'Ezabatu';
        eB.addEventListener('click', (event) => {
            event.preventDefault();
            erreserbaEzabatu(erreserba.idErreserba);
        });
        l.insertCell().appendChild(eB);

    
});
    
    erreserbakCont.appendChild(taula);

}

async function erreserbaEzabatu(idErreserba){
    await e.deleteErreserba(idErreserba);
    window.location.reload();
    
}

export async function erreserbaSortu(event){
    event.preventDefault();
    await e.createErreserba(event);
    document.getElementById('berriaForm').reset();
    window.location.reload();

   
}