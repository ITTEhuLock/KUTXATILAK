import * as u from './user.js';
import { aplicarTraduccion, traducciones } from "./hizkuntza.js";
export async function loadOngiEtorria(){
        const home = document.getElementById('home');
      
          const ongiEtorriDiv = document.createElement('div');
          ongiEtorriDiv.style.display = 'flex';
          ongiEtorriDiv.style.alignItems = 'center'; 
          ongiEtorriDiv.style.gap = '10px'; 
      
          const idioma = localStorage.getItem('idioma') || 'es';
          const ongiEtorria = document.createElement('h1');
          ongiEtorria.dataset.i18n = 'titulo';
          ongiEtorria.textContent = traducciones[idioma]['titulo']||'Ongi Etorri !';
          
      
          const user1 = document.createElement('h1');
          const user = await u.getUser(localStorage.getItem('idUser'));
          user1.textContent = user.username;
      
          
          ongiEtorriDiv.appendChild(ongiEtorria);
          ongiEtorriDiv.appendChild(user1);
      
          const irudia = document.createElement('img');
          irudia.src = '../pics/logo.png';
          irudia.className = 'irudia';
          irudia.style.marginBottom = '20px';
      
          home.appendChild(irudia);
          home.appendChild(ongiEtorriDiv); 
}

window.addEventListener('DOMContentLoaded', () => {
  
    loadOngiEtorria();
});