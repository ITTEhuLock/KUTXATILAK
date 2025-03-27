import * as g from './gela.js';
import * as p from  './pausoa.js';
import * as i from './ibilbidea.js';	
export async function loadMenuak(){
    const menuposizioa = document.getElementById("menuposizioa");
    const menuondokoa = document.getElementById("menuondokoa");
    const gelak = await g.getGelak();
    gelak.forEach(gela => {
        const option = document.createElement("option");
        option.value = gela.idGela;
        option.text = gela.kodea;
        menuposizioa.appendChild(option);
        const option2 = document.createElement("option");
        option2.value = gela.idGela;
        option2.text = gela.kodea;
        menuondokoa.appendChild(option2);
        menuposizioa.appendChild(option);
    });

    const form = document.getElementById("berria");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        ibilbideaBilatu(form.menuposizioa.value, form.menuondokoa.value);
        ibilbideaSortu();
    });
}

export async function ibilbideaSortu(){
    const form = document.getElementById("berria");
    await i.createNewIbilbidea(localStorage.getItem("idUser"), form.menuposizioa.value, form.menuondokoa.value);
    form.reset();
    document.getElementById("berriaForm").hidden = true;
   

}

export async function ibilbideaBilatu(posizioa, ondokoa){
    console.log("posizioa", posizioa);
    console.log("ondokoa", ondokoa);
    const ibilbidea = await p.bideratzeAlgoritmoa(parseInt(posizioa), parseInt(ondokoa));
    console.log(ibilbidea);
    if(!ibilbidea)
        return;
    document.getElementById("berriaForm").hidden = true;
    document.getElementById("mapa").hidden = false;
     document.getElementById("mapa").innerHTML = "Ibilbidea: ";
    ibilbidea.forEach(  async (i) => {
        const ge = await g.getGela(i);
     

        document.getElementById("mapa").innerHTML += ge[0].kodea +"→ ";

    });
   }
