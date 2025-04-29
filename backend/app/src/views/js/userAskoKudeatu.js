import * as u from './user.js';

export async function loadUsers(){
    const userDiv = document.getElementById('userDiv');
    const users = await u.getUsers();
    const table = document.createElement('table');
    table.className = 'taula';
    const l1 = table.insertRow();
    l1.insertCell().textContent = 'Erabiltzaile izena';
    l1.insertCell().textContent = 'Datuak';
    l1.insertCell().textContent = 'Egoera';
    l1.insertCell().textContent = 'Ekintza';

    users.forEach(user => {
        const l = table.insertRow();
        l.insertCell().textContent = user.username;
        l.insertCell().textContent = user.email;

        const b2 = document.createElement('button');
        console.log(user);
        parseInt(user.egoera) === 0 ? b2.textContent = 'Zigorturik':  b2.textContent = 'Zigor gabe' ;

        b2.addEventListener('click', async (event) => {
            event.preventDefault();
            await u.egoeraAldatu(user.idUser);
            window.location.reload();
        });

        l.insertCell().appendChild(b2);
       
        const b1 = document.createElement('button');
        b1.textContent = 'Ezabatu';
        b1.addEventListener('click', async (event) => {
            event.preventDefault();
            await u.deleteUser(user.idUser);
            window.location.reload();
        });

       
        l.insertCell().appendChild(b1);
       
    });

    userDiv.appendChild(table);

}

if(document.getElementById('userDiv'))
    document.addEventListener('DOMContentLoaded', () => {
        loadUsers();
    }
    );
 