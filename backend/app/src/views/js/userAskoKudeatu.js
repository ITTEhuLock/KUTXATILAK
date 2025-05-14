import * as u from './user.js';
import { aplicarTraduccion, traducciones } from "./hizkuntza.js";
export async function loadUsers(){
    const hizkuntza = localStorage.getItem('idioma') || 'es'; 
    const userDiv = document.getElementById('userDiv');
    const users = await u.getUsers();
    const table = document.createElement('table');
    table.className = 'taula';
    const l1 = table.insertRow();

    const ErabiltzaileIzena = l1.insertCell();
    const Datuak = l1.insertCell();
    const egoera = l1.insertCell();
    const Ekintza = l1.insertCell();


    const spanErabiltzaileIzena = document.createElement('span');
    spanErabiltzaileIzena.setAttribute('data-i18n', 'erabizn');
    spanErabiltzaileIzena.textContent = 'Erabiltzaile Izena';
    ErabiltzaileIzena.appendChild(spanErabiltzaileIzena);

    const spanegoera = document.createElement('span');
    spanegoera.setAttribute('data-i18n', 'e');
    spanegoera.textContent = 'Estado';
    egoera.appendChild(spanegoera);

    const spanDatuak = document.createElement('span');
    spanDatuak.setAttribute('data-i18n', 'datuak');
    spanDatuak.textContent = 'Datuak';
    Datuak.appendChild(spanDatuak);

    const spanEkintza = document.createElement('span');
    spanEkintza.setAttribute('data-i18n', 'ekintza');
    spanEkintza.textContent = 'Acción';
    Ekintza.appendChild(spanEkintza);

    users.forEach(user => {
        const l = table.insertRow();
        l.insertCell().textContent = user.username;
        l.insertCell().textContent = user.email;

        const b2 = document.createElement('button');
        console.log(user);
        b2.dataset.i18n = parseInt(user.egoera) === 1 ? 'zigorturik' : 'zigorgabe';
        b2.textContent = traducciones[hizkuntza][b2.dataset.i18n] || (parseInt(user.egoera) === 1 ? 'Zigorturik' : 'Zigor gabe');
        b2.addEventListener('click', async (event) => {
            event.preventDefault();
            await u.egoeraAldatu(user.idUser);
            window.location.reload();
        });

        l.insertCell().appendChild(b2);
       
        const b1 = document.createElement('button');
        b1.dataset.i18n = 'ezabatu';
        b1.textContent = traducciones[hizkuntza]['ezabatu'] || 'Ezabatu';
        b1.addEventListener('click', async (event) => {
            event.preventDefault();
            await u.deleteUser(user.idUser);
            window.location.reload();
        });

       
        l.insertCell().appendChild(b1);
       
    });

    userDiv.appendChild(table);
    aplicarTraduccion(hizkuntza);
}

if(document.getElementById('userDiv'))
    document.addEventListener('DOMContentLoaded', () => {
        loadUsers();
        document.getElementById('berria').addEventListener('click', async (event) => {
            event.preventDefault();
            if(document.getElementById('berriaDiv').style.display == 'block'){
                document.getElementById('berriaDiv').style.display = 'none';
                document.getElementById('berriaDiv').style.transform = 'display(0)';
            }
            else{
                document.getElementById('berriaDiv').style.display = 'block';
                document.getElementById('berriaDiv').style.transform = 'display(0.8)';
            }
           
        });
        document.getElementById('berriaForm').addEventListener('submit', async (event) => {
            event.preventDefault();
             await erabiltzaileaSortu();
            window.location.reload();

    });
   } );
 
export async function erabiltzaileaSortu() {
    const form = document.getElementById('berriaForm');
    const user = {
        username: form.erabiltzailea.value,
        email: form.posta.value,
        password: form.pasahitza.value,
        egoera: 0,
        role: form.rola.value
    }
   await u.createNewUser(user);
    return;
    
}
    