import * as u from './user.js'
import { traducciones } from './hizkuntza.js';
if(document.getElementById('form'))
document.getElementById('form').addEventListener('submit',(event)=>{
    event.preventDefault();
    egiaztatu();

});
if(document.getElementById('Erregistratu'))
document.getElementById('Erregistratu').addEventListener('click',(event)=>{
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
  
        if(u.getRole(idUser) !== 'admin'){
            localStorage.removeItem("idUser");
            window.location.reload();
            return;
        }
    document.body.innerHTML = "";
    const div = document.createElement('div');
    const idioma = localStorage.getItem('idioma') || 'es';
    div.className = 'form-container2';
    const h1 = document.createElement('h1');
    h1.dataset.i18n = 'Kaixo';
    h1.textContent = traducciones[idioma]['titulo'] + ' ' + user.username + '!';

    const button = document.createElement('button');
    button.dataset.i18n = 'Joan';
    button.textContent = traducciones[idioma]['Joan']||'Joan hasiera orrira';
    button.addEventListener('click',(event)=>{
        event.preventDefault();
        window.location.href =  '/home.html';
    });
    const button2 = document.createElement('button');

   
    button2.textContent = traducciones[idioma]['saioa']||'Saioa itxi';
    
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
    if(document.getElementById('Erregistratu').textContent != traducciones[localStorage.getItem('idioma')].Erregistratu){
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
    const idioma = localStorage.getItem('idioma') || 'es';
    const idUser = await u.verifyUser(username, password);
    console.log(idUser);
    form.reset();
    console.log(idUser);
    if(!idUser){

        const mezua = document.createElement('h2');
        const idioma = localStorage.getItem('idioma') || 'es';
        mezua.dataset.i18n = 'Sartutako';
        mezua.textContent = traducciones[idioma]['Sartutako']||'Sartutako datuak ez dira zuzenak';
              
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
        mezua.dataset.i18n = 'aplikazioa';
        mezua.textContent = traducciones[idioma]['aplikazioa'];
        mezua.id = 'mezua';
        document.getElementById('formBerria').appendChild(mezua);
        return;
    }
    
    
}

export async function toggleErregistratu() {
   
    
    const posta = document.getElementById('posta');
    const erregistratu = document.getElementById('Erregistratu');
    const idioma = localStorage.getItem('idioma') || 'es';

    

    if (erregistratu.textContent === traducciones[idioma]['Erregistratu']) {
        posta.hidden = false;
       
        erregistratu.textContent = traducciones[idioma]['erre'] 
    } else {
        posta.hidden = true;
        erregistratu.textContent = traducciones[idioma]['Erregistratu'] || 'Erregistratu';
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
            const idioma = localStorage.getItem('idioma') || 'es';
            mezua.dataset.i18n = 'Izen';
            mezua.textContent = traducciones[idioma]['Izen']||'Izen edo posta horrekin dagoen erabiltzailea jada existizen da';
            document.getElementById('formBerria').appendChild(mezua);
            return;
        }
        const user = {
            username: username,
            password: password,
            email: email,
            
        }
        await u.createNewUser(user);
        bideratu(username,password);
        form.reset();
    
}

