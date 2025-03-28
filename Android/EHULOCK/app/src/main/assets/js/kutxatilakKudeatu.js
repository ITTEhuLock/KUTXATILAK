import * as k from './kutxatila.js';

export async function loadKutxatilak(){
    const kutxatilak = await k.getKutxatilak();
    const kutxatilakCont = document.getElementById('kutxatilak');
    console.log(kutxatilak);
    if(!kutxatilak || kutxatilak === null){
        const mezua = document.createElement('h2');
        mezua.textContent = 'Ez dago kutxatilarik';
        kutxatilakCont.appendChild(mezua);
        return;
    }

    const table = document.createElement('table');
    table.className = 'taula';
    const l1 = table.insertRow();
    l1.insertCell().textContent = 'Id';
    l1.insertCell().textContent = 'Kodea';
    l1.insertCell().textContent = 'Egoera';
    l1.insertCell().textContent = 'Kokapena';
    l1.insertCell().textContent = 'Ekintza';

    kutxatilak.forEach(kutxatila => {
        const l = table.insertRow();
        const b = document.createElement('button');
        b.textContent = 'Ezabatu';
        b.name = 'ezabatuButton';
        b.addEventListener('click', (event) => {
            event.preventDefault();
            kutxatilaEzabatu(kutxatila.idKutxatila);
        });
        const b2 = document.createElement('button');
        b2.textContent = parseInt(kutxatila.egoera) === 0? 'Irekita' : 'Itxita';
        b2.name = 'egoeraButton';
        b2.addEventListener('click', (event) => {
            event.preventDefault();
            egoeraEguneratu(kutxatila.idKutxatila, kutxatila.egoera);
        });
        l.insertCell().innerHTML = kutxatila.idKutxatila;
        l.insertCell().textContent = kutxatila.kodea;
        l.insertCell().appendChild(b2);

        l.insertCell().textContent = kutxatila.kokapena;
        l.insertCell().appendChild(b);
    });
    kutxatilakCont.appendChild(table);

}

async function kutxatilaEzabatu(idKutxatila){

    await k.deleteKutxatila(idKutxatila);
    window.location.reload();
    
}

async function egoeraEguneratu(idKutxatila, egoera) {
    await k.editKutxatilaEgoera(idKutxatila, egoera);
    window.location.reload();
    
}
/*
async function kodeaEguneratu(event) {
    event.preventDefault();
    await k.editKutxatilaKodea(event);
    window.location.reload();
    
}

async function kokapenaEguneratu(event) {
    event.preventDefault();
    await k.editKutxatilaKokapena(event);
    window.location.reload();
    
}*/

export async function kutxatilaSortu(event){
    event.preventDefault();
        const form = document.getElementById("berriaForm");
        const kutxatila = {
            kodea: form.kodea.value,
            kokapena: form.kokapena.value,
            hasiera_ordua: form.start_time.value,
            amaiera_ordua: form.end_time.value
        }
    await k.kutxatilaSortu(kutxatila);
    form.reset();
    window.location.reload();
}

export async function loadOpenKutxatilak(){
    const kutxatilak = await k.getKutxatilaByEgoera(0);
<<<<<<< HEAD
    const kutxatilakCont = document.getElementById('menua');
=======
    const berriaForm = document.getElementById('berriaForm');
    const menuaDiv = document.getElementById('menuaDiv');
>>>>>>> 8ab2a28302a3cd55f67f7ddf4a1a959cf698fb96
    console.log(kutxatilak);
    if(!kutxatilak){
        const mezua = document.createElement('h2');
        mezua.textContent = 'Ez dago kutxatila irekirik momentu honetan';
        berriaForm.appendChild(mezua);
        return;
    }

<<<<<<< HEAD

    const menua = document.getElementById('menua');
    const select = document.createElement('select');
    kutxatilak.forEach(kutxatila => {
        const option = document.createElement('option');
        option.value = kutxatila.idKutxatila;
        option.textContent = kutxatila.kodea+', '+kutxatila.kokapena+' eraikinean';
        select.appendChild(option);
    });
    menua.appendChild(select);

}
=======
    const menua = document.createElement('select');
    menua.id = 'menua';
    
    
    kutxatilak.forEach(kutxatila => {
        const option = document.createElement('option');
        option.value = kutxatila.idKutxatila;
        option.textContent = kutxatila.kodea;
        menua.appendChild(option);
    });
    
    menuaDiv.appendChild(menua);
}
>>>>>>> 8ab2a28302a3cd55f67f7ddf4a1a959cf698fb96
