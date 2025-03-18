import * as u from './user.js'

export async function egiaztatu() {
    if(document.getElementById('erregistratu').textContent != "Erregistratu"){
        erregistratu();
        return;
    }
   if(document.getElementById('mezua'))
       document.getElementById('mezua').remove();
   
   bideratu();

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
        window.location.href = './administraria.html';
    }
    else {
        window.location.href = './erreserbakIkusi.html';
    }
    
}

export async function toggleErregistratu() {
   
    
    const posta = document.getElementById('posta');
    const erregistratu = document.getElementById('erregistratu');
    if(erregistratu.textContent == "Erregistratu"){
        posta.hidden = false;
        erregistratu.textContent = "Erregistratuta zaude? Hasi saioa"
    }
    else{
        posta.hidden = true;
        erregistratu.textContent = "Erregistratu";
        
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
        mezua.textContent = 'Izen edo posta horrekin dagoen erabiltzailea jada existizen da';
        document.getElementById('formBerria').appendChild(mezua);
        return;
    }
    await u.createNewUser(username, password, email);
    bideratu(username,password);
    form.reset();

}