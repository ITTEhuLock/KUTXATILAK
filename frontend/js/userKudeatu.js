import * as u from './user.js'

export async function egiaztatu() {
   if(document.getElementById('mezua'))
       document.getElementById('mezua').remove();
    const form = document.getElementById('form');
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
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