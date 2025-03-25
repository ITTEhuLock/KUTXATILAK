import * as e from "./erreserba.js";
import * as k from "./kutxatila.js";
export async function loadErreserbak(){
    const erreserbakCont = document.getElementById('erreserbak');
    const erreserbak = await e.getErreserbaById();

    const taula = document.createElement('table');
    taula.className = 'taula2';
    const l1 = taula.insertRow();
    
    const lerroaSortu = (izenburua, data) => {
        const l = taula.insertRow();
        l.insertCell().textContent = izenburua; 
        l.insertCell().textContent = data; 
    };

        
    erreserbak.forEach(async (erreserba) =>{
        console.log(erreserba.idKutxatila);
        const ku = await k.getKutxatila(erreserba.idKutxatila);
        
        lerroaSortu("Kutxatila",ku.kodea+', '+ku.kokapena+' eraikinean');
        lerroaSortu("Hasiera data",erreserba.start_time.split('T')[0]+" "+erreserba.start_time.split('T')[1].split('.')[0]);
        lerroaSortu("Amaiera data",erreserba.end_time.split('T')[0]+" "+erreserba.end_time.split('T')[1].split('.')[0]);
        localStorage.setItem("erreserbaEgoera",erreserba.egoera);
        lerroaSortu("Egoera",parseInt(erreserba.egoera) === 0
        ? "Hasigabea"
        : parseInt(erreserba.egoera) === 1
        ? "Martxan"
        : "Amaituta");
        
    });
    
    
    erreserbakCont.appendChild(taula);

}
export async function loadErreserbaLaburpena(){
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

    l1.insertCell().textContent = 'Hasiera';
    l1.insertCell().textContent = 'Amaiera';
    l1.insertCell().textContent = 'Ekintza';

    erreserbak.forEach(async (erreserba) =>{
        console.log(erreserba.idKutxatila);
        const l = taula.insertRow();
        l.insertCell().textContent = erreserba.start_time.split('T')[0]+" "+erreserba.start_time.split('T')[1].split('.')[0];
        l.insertCell().textContent = erreserba.end_time.split('T')[0]+" "+erreserba.end_time.split('T')[1].split('.')[0];
        const eB = document.createElement('button');
        eB.name = 'hedatuButton';
        eB.id = erreserba.idErreserba;
        eB.textContent = 'Hedatu';
        eB.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.setItem("idErreserba", erreserba.idErreserba);
            window.location.href = './erreserbaZehatza.html';
        });
        l.insertCell().appendChild(eB);

    });
    
    erreserbakCont.appendChild(taula);
}

export async function erreserbaEzabatu(idErreserba){
    console.log(idErreserba);
    await e.deleteErreserba(idErreserba);
    window.location.href = './erreserbakIkusi.html';
    
}

export async function erreserbaEditatu(event){
    event.preventDefault();
    await e.updateErreserba(event);
    document.getElementById('berriaForm').reset();
    window.location.reload();
}

export async function erreserbaSortu(event){
    event.preventDefault();
    await e.createErreserba(event);
    document.getElementById('berriaForm').reset();
    window.location.reload();

   
}

export async function getErreserbaLaburpena(){
    const erreserba = await e.getErreserbaAktiboa();
    if(!erreserba){
        const abisua = document.createElement('h1');
        abisua.textContent = 'Ez daukazu erreserbarik';
        document.getElementById('erreserbak').appendChild(abisua);
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

