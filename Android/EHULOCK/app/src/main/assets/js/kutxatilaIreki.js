import * as e from "./erreserba.js";
window.addEventListener('DOMContentLoaded', () => {
    getErreserbaLaburpena();
    try{
    Android.setUserId(idUser);
    }catch(e){
        console.log("Android ez dago martxan");
    }
});


export async function getErreserbaLaburpena(){
    const erreserba = await e.getErreserbaAktiboa(localStorage.getItem('idUser'));
    if(!erreserba){
        const abisua = document.createElement('h1');
        abisua.textContent = 'Ez daukazu erreserba aktiborik';
        document.getElementById('erreserba').appendChild(abisua);
        return;
    }
    const erreserbakDiv = document.getElementById('erreserba');
    const p1 = document.createElement('h3');
    const p2 = document.createElement('h3');

    p1.textContent = `Erreserba: ${erreserba.start_time.split("T")[1].split(".")[0]} - ${erreserba.end_time.split("T")[1].split(".")[0]}`;
    p2.textContent =`Kutxatila: ${erreserba.idKutxatila}`;
    erreserbakDiv.appendChild(p1);
    erreserbakDiv.appendChild(p2);
    document.getElementById('ireki').hidden = false;

};