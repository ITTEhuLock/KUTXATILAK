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
    const l1 = table.insertRow();
    l1.insertCell().textContent = 'Id';
    l1.insertCell().textContent = 'Kodea';
    l1.insertCell().textContent = 'Egoera';
    l1.insertCell().textContent = 'Kokapena';
    l1.insertCell().textContent = 'Ekintza';

    kutxatilak.forEach(kutxatila => {
        const l = table.insertRow();
        l.insertCell().innerHTML = kutxatila.idKutxatila;
        l.insertCell().textContent = kutxatila.kodea;
        l.insertCell().innerHTML = parseInt(kutxatila.egoera) === 0
        ? "<button name = 'egoeraButton' id = 'egoera"+kutxatila.idKutxatila+"'>Itxita</button>"
        : "<button name='egoeraButton' id = 'egoera"+kutxatila.idKutxatila+"'>Irekita</button>"

        l.insertCell().textContent = kutxatila.kokapena;
        l.insertCell().innerHTML = `<button name = "ezabatuButton" id = "ezabatu${kutxatila.idKutxatila}" >Ezabatu</button>`;
    });
    kutxatilakCont.appendChild(table);
    
    document.getElementsByName('ezabatuButton').forEach(k => {
        k.addEventListener('click', (event) => {
           kutxatilaEzabatu(event);
        });

    });
    document.getElementsByName('egoeraButton').forEach(k => {
        k.addEventListener('click', (event) => {
           egoeraEguneratu(event);
        });

    });

}

async function kutxatilaEzabatu(event){
    event.preventDefault();
    await k.deleteKutxatila(event);
    window.location.reload();
    
}

async function egoeraEguneratu(event) {
    event.preventDefault();
    await k.editKutxatilaEgoera(event);
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
    await k.kutxatilaSortu(event);
    document.getElementById('berriaForm').reset();
    window.location.reload();
}