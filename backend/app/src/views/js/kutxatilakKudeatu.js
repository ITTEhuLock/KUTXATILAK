import * as k from './kutxatila.js';

export async function loadKutxatilak(){
    const hizkuntza = localStorage.getItem('idioma') || 'es'; 
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

  
    l1.insertCell().innerHTML = 'Id';
    
    const kodea = l1.insertCell();
    const egoera = l1.insertCell();
    const kokapena = l1.insertCell();
    const ekintza = l1.insertCell();

    const spankodea = document.createElement('span');
    spankodea.setAttribute('data-i18n', 'c');
    spankodea.textContent = 'Código';
    kodea.appendChild(spankodea);

    const spanegoera = document.createElement('span');
    spanegoera.setAttribute('data-i18n', 'e');
    spanegoera.textContent = 'Estado';
    egoera.appendChild(spanegoera);

    const spankokapena = document.createElement('span');
    spankokapena.setAttribute('data-i18n', 'l');
    spankokapena.textContent = 'Ubicación';
    kokapena.appendChild(spankokapena);

    const spanEkintza = document.createElement('span');
    spanEkintza.setAttribute('data-i18n', 'ekintza');
    spanEkintza.textContent = 'Acción';
    ekintza.appendChild(spanEkintza);

    
    
    kutxatilak.forEach(kutxatila => {
        const l = table.insertRow();
        const b = document.createElement('button');
        b.dataset.i18n = 'ezabatu';
        b.textContent = traducciones[hizkuntza]['ezabatu'] || 'Ezabatu';
        b.name = 'ezabatuButton';
        b.addEventListener('click', (event) => {
            event.preventDefault();
            kutxatilaEzabatu(kutxatila.idKutxatila);
        });
        const b2 = document.createElement('button');
        b2.dataset.i18n = parseInt(kutxatila.egoera) === 0 ? 'irekita' : 'itxita';
        b2.textContent = traducciones[hizkuntza][b2.dataset.i18n] || (parseInt(kutxatila.egoera) === 0 ? 'Irekita' : 'Itxita');
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
    aplicarTraduccion(hizkuntza);
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