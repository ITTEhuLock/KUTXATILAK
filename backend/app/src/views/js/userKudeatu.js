import * as u from './user.js'
import { traducciones } from './hizkuntza.js';
if(document.getElementById('form'))
document.getElementById('form').addEventListener('submit',(event)=>{
    event.preventDefault();
    egiaztatu();

});
if(document.getElementById('erregistratu'))
document.getElementById('erregistratu').addEventListener('click',(event)=>{
    event.preventDefault();
    toggleErregistratu();
});


document.addEventListener('DOMContentLoaded', async () => {
    const idUser = localStorage.getItem("idUser");
    if(!idUser|| idUser == undefined || idUser == null)
        return;
    const user = await u.getUser(idUser);
    if(!user || user == undefined || user == null){
        localStorage.removeItem("idUser");
        window.location.reload();
        return; 
    }
  
    document.body.innerHTML = "";
    const div = document.createElement('div');
    div.className = 'form-container';
    const h1 = document.createElement('h1');
    h1.textContent = 'Kaixo, ' + user.username + '!';
    const button = document.createElement('button');
    button.textContent = 'Joan hasiera orrira';
    button.addEventListener('click',(event)=>{
        event.preventDefault();
        window.location.href =  './home.html';
    });
    const button2 = document.createElement('button');

    button2.textContent = 'Saioa itxi';
    button2.addEventListener('click',(event)=>{
        event.preventDefault();
        localStorage.removeItem("idUser");
        window.location.reload();
    });
    button2.style.margin = '10px';

    div.appendChild(h1);
    div.appendChild(button);
    div.appendChild(document.createElement('br'));
    div.appendChild(button2);
    document.body.appendChild(div);
    
});



export async function egiaztatu() {
    if(document.getElementById('erregistratu').textContent != traducciones[localStorage.getItem('idioma')].Erregistratu){
        erregistratu();
        return;
    }
   if(document.getElementById('mezua'))
       document.getElementById('mezua').remove();
   const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
   bideratu(username, password);

}

async function bideratu(username,password) {
    const idUser = await u.verifyUser(username, password);
    console.log(idUser);
    form.reset();
    console.log(idUser);
    if(!idUser){
        const mezua = document.createElement('h2');
        mezua.textContent = 'Sartutako datuak ez dira zuzenak';
        mezua.id = 'mezua';
        document.getElementById('formBerria').appendChild(mezua);
        return;
    }
    
    localStorage.setItem("idUser", idUser);
    const role = await u.getRole(idUser);
    
    if(role === 'admin'){
        window.location.href = './home.html';
    }
    else {
       const mezua = document.createElement('h2');
        mezua.textContent = 'Aplikazio hau administrarientzat soilik da.';
        mezua.id = 'mezua';
        document.getElementById('formBerria').appendChild(mezua);
        return;
    }
    
}

export async function toggleErregistratu() {
   
    
    const posta = document.getElementById('posta');
    const erregistratu = document.getElementById('erregistratu');
    if(erregistratu.textContent == "Erregistratu"|| erregistratu.textContent == "Registrarse"){
        posta.hidden = false;
        erregistratu.textContent = traducciones[localStorage.getItem('idioma')].erre;
    }
    else{
        posta.hidden = true;
        erregistratu.textContent = traducciones[localStorage.getItem('idioma')].Erregistratu;
        
    }
    
  
       

    
}

export async function erregistratu() {
    const form = document.getElementById('form');
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
    const email = document.getElementById('email').value;
    const egoera = await u.checkUser(username, email);
    if(!egoera){
        const mezua = document.createElement('h2');
        mezua.textContent = traducciones[localStorage.getItem('idioma')].Izen;
        document.getElementById('formBerria').appendChild(mezua);
        return;
    }
    await u.createNewUser(username, password, email);
    bideratu(username,password);
    form.reset();

}

