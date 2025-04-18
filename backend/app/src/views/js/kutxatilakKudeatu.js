import * as k from './kutxatila.js';


window.addEventListener('DOMContentLoaded', () => {
    loadKutxatilak();
});
const toggle = document.getElementById('newButton');
toggle.addEventListener('click', () => {
document.getElementById('berria').hidden = !document.getElementById('berria').hidden;

});
document.getElementById('berriaForm').addEventListener('submit', (event) => {
kutxatilaSortu(event);
});

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
    await k.kutxatilaSortu(event);
    document.getElementById('berriaForm').reset();
    window.location.reload();
}