import * as u from './user.js';

export async function loadOngiEtorria(){
    const home = document.getElementById('home');
    const ongiEtorria = document.createElement('h1');
    const user = await u.getUser(localStorage.getItem('idUser'));
    ongiEtorria.textContent = 'Ongi etorri, '+user.username;
    const irudia = document.createElement('img');
    irudia.src = '../pics/logo.png';
    irudia.className = 'irudia';
    irudia.style.marginBottom = '20px';
    home.appendChild(irudia);
    
    home.appendChild(ongiEtorria);
}