import * as e from "./erreserba.js";
import * as k from "./kutxatila.js";


window.addEventListener('DOMContentLoaded', () => {
  loadErreserbaLaburpena();
  loadOpenKutxatilak();
  loadToggle();
    document.getElementById('zehaztapenak').style.display = 'none';

});



let currentIndex = 0;
export async function loadToggle(){
        const toggle = document.getElementById('newButton');
        const texts = ["Erreserba berria sortu", "Itxi"];
       
        toggle.addEventListener('click', () => {
            document.getElementById('berria').hidden = !document.getElementById('berria').hidden;
            currentIndex = (currentIndex + 1) % texts.length;
            toggle.textContent = texts[currentIndex];
        
        });
        document.getElementById('berriaForm').addEventListener('submit', (event) => {
            erreserbaSortu(event);
        });

        document.getElementById('editatuButton').addEventListener('click', (event) => { 
            document.getElementById('berria2').hidden = false;
            document.getElementById('berria').hidden = true;
        });
}




export async function loadOpenKutxatilak(i){
    const kutxatilak = await k.getKutxatilaByEgoera(0);

    console.log(kutxatilak);
    if(!kutxatilak){
        const mezua = document.createElement('h2');
        mezua.textContent = 'Ez dago kutxatila irekirik momentu honetan';
        berriaForm.appendChild(mezua);
        return;
    }

    var menua;
    if(i == 0)
    menua = document.getElementById('menuaDiv2')
    else
    menua = document.getElementById('menuaDiv');
    const select = document.createElement('select');
    if(i==0)
        select.id = 'menua2';
    else
        select.id = 'menua';
    kutxatilak.forEach(kutxatila => {
        const option = document.createElement('option');
        option.value = kutxatila.idKutxatila;
        option.textContent = kutxatila.kodea+', '+kutxatila.kokapena+' eraikinean';
        select.appendChild(option);

    });
  
        menua.appendChild(select);
   
}


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
            loadZehaztapenak(erreserba.idErreserba);
            
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

export async function erreserbaEditatu(erreserba){
    const u = await e.updateErreserba(erreserba);
    if(!u){
        const mezua = document.createElement('h1');
        mezua.textContent = 'Aukeratu duzun tarterako kutxatila ez dago eskuragarri';
        document.getElementById('berriaForm2').appendChild(mezua);
        return;
    }
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
    const a = await e.createErreserba(erreserba);
    if(!a){
        const mezua = document.createElement('h1');
        mezua.textContent = 'Aukeratu duzun tarterako kutxatila ez dago eskuragarri';
        document.getElementById('berriaForm').appendChild(mezua);
        return;
    }
    form.reset();
    window.location.reload();

   
}




export async function loadZehaztapenak(idErreserba){
   
    loadOpenKutxatilak(0);
    const zehaztapenak = document.getElementById('zehaztapenak');
    const zehaztapenakCont = document.querySelector('.modal-content');
    const t = document.querySelector('.taula2');
    if(t)
    t.remove();
    zehaztapenak.style.display = 'flex';
    
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
        const data = {
            idErreserba: erreserba.idErreserba,
            start_time: edit.start_time2.value,
            end_time: edit.end_time2.value,
            idKutxatila: edit.menua2.value,
            egoera: erreserba.egoera
        };

        
        erreserbaEditatu(data);
            });
    const ezabatu = document.getElementById('ezabatuButton');
    ezabatu.addEventListener('click', (event) => {
        event.preventDefault();
        erreserbaEzabatu(erreserba.idErreserba);
            });
    const itxi = document.getElementById('itxi');
    itxi.addEventListener('click', () => {

        document.getElementById('menuaDiv2').innerHTML = "";
        document.getElementById('zehaztapenak').style.display = 'none';
    });
    zehaztapenakCont.appendChild(taula);
    }



    

    
