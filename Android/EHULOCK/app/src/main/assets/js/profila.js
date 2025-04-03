import * as u from './user.js';

export async function loadProfila(){
    const profila = document.getElementById('profila');
    const user = await u.getUser(localStorage.getItem('idUser'));
    const ongiEtorria = document.createElement('h1');
    ongiEtorria.textContent = user.username+"-ren kontua";

    profila.appendChild(ongiEtorria);


}

export async function profilaEzabatu(){
    const idUser = localStorage.getItem('idUser');
    await u.deleteUser(idUser);
    logout();
   
}

export async function logout(){
    localStorage.removeItem('idUser');
    window.location.href = '../index.html';
}

export async function pasahitzaAldatu(){
    if(document.getElementById('mezua'))
        document.getElementById('mezua').remove();
    const idUser = localStorage.getItem('idUser');
    const mezua = document.createElement('h1');
    mezua.id = 'mezua';
    const form = document.getElementById('pasahitzaForm');
    const user = await u.getUser(idUser);
    const pasahitzaZaharra = user.password;
    if(form.pasahitza.value == pasahitzaZaharra){
        
        mezua.textContent = 'Pasahitza berria zaharraren berdina da';
        document.getElementById('pasahitzaForm').appendChild(mezua);
        return;
    }
    const c = await u.changePassword(idUser, form.pasahitza.value);
    form.reset();
    if(c){
    mezua.textContent = 'Pasahitza aldatu da';
    document.getElementById('pasahitzaForm').appendChild(mezua);
}
}


window.addEventListener('DOMContentLoaded', () => {

    loadProfila();

});
document.getElementById('profilaLogout').addEventListener('click', () => {
    logout();
});
document.getElementById('pasahitzaForm').addEventListener('submit', (event) => {
    event.preventDefault();
    pasahitzaAldatu();
});

document.getElementById('profilaEzabatu').addEventListener('click', () => {
    profilaEzabatu();
});
document.getElementById('profilaEditatu').addEventListener('click', () => {
   document.getElementById('form').hidden = !document.getElementById('form').hidden;
   document.getElementById('profila').hidden = !document.getElementById('profila').hidden;
});
