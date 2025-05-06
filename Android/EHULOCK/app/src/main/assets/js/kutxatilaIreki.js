import * as e from "./erreserba.js";
import * as u from "./user.js";
import * as k from "./kutxatila.js";
window.addEventListener('DOMContentLoaded', () => {
    getErreserbaLaburpena();
   
    try{
    Android.setUserId(idUser);
    Android.askForNFCActivation();
    }catch(e){
        console.log("Android ez dago martxan");
    }
});


export async function getErreserbaLaburpena(){
    if (!await baimenduta()) return
    const erreserba = await e.getErreserbaAktiboa(localStorage.getItem('idUser'));
    if(!erreserba){
        const abisua = document.createElement('h1');
        abisua.textContent = 'Ez daukazu erreserba aktiborik';
        abisua.dataset.i18n = 'edea';
        const idioma = localStorage.getItem('idioma') || 'es';
        aplicarTraduccion(idioma);

        document.getElementById('erreserba').appendChild(abisua);
        return;
    }
    const erreserbakDiv = document.getElementById('erreserba');
    const p1 = document.createElement('h4');
    const p2 = document.createElement('h3');
    console.log(erreserba.start_time.split(' ')[0]);

    p1.textContent = `Erreserba: ${erreserba.start_time.split(' ')[1]} - ${erreserba.end_time.split(' ')[1]}`; 
    const kutxatila = await k.getKutxatila(erreserba.idKutxatila);
    p2.textContent =`Kutxatila: ${kutxatila.kodea}`;
    erreserbakDiv.appendChild(p1);
    erreserbakDiv.appendChild(p2);
    document.getElementById('ireki').hidden = false;

};

async function baimenduta(){
    if(await u.baimenduta(localStorage.getItem('idUser'))) return true;

    const mezua = document.createElement('h1');
    mezua.textContent = 'Zigortuta zaude, ezin duzu kutxatilen zerbitzua erabili';

    document.body.appendChild(mezua);
    document.getElementById('eB').remove();
    
    return false;
   
    
}