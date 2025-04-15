export async function loadFooter() {

    const footer = document.getElementById('footer');
    const buttonHome = document.createElement('button');
    const buttonBerria = document.createElement('button');
    const buttonIreki = document.createElement('button');
    const buttonMapa = document.createElement('button');
    const buttonProfila = document.createElement('button');
    const buttonHizkuntza = document.createElement('button');


    const irudiaHome = document.createElement('img');
    const irudiaBerria = document.createElement('img');
    const irudiaIreki = document.createElement('img');
    const irudiaProfila = document.createElement('img');
    const irudiaMapa = document.createElement('img');
    const irudiaHizkuntza = document.createElement('img');
    

    irudiaHome.className = 'irudia';
    irudiaBerria.className = 'irudia';
    irudiaIreki.className = 'irudia';
    irudiaProfila.className = 'irudia';
    irudiaMapa.className = 'irudia';
    irudiaHizkuntza.className = 'irudia';

    irudiaHome.src = '../pics/home.svg';
    irudiaBerria.src = '../pics/berria.svg';
    irudiaIreki.src = '../pics/unlock.svg';
    irudiaProfila.src = '../pics/profila.svg';
    irudiaMapa.src = '../pics/pin.png';
    irudiaHizkuntza.src= '../pics/hizkuntza.png'

    buttonMapa.addEventListener('click', () => {
        window.location.href = './mapak.html';
    });
    buttonHome.addEventListener('click', () => {
        window.location.href = './home.html';
    });
    buttonBerria.addEventListener('click', () => {
        window.location.href = './erreserbakIkusi.html';
    });
    buttonIreki.addEventListener('click', () => {
        window.location.href = './kutxatilaIreki.html';
    });
    buttonProfila.addEventListener('click', () => {
        window.location.href = './profila.html';
    });
    buttonHizkuntza.addEventListener('click', () => {
        window.location.href = './hizkuntza.html';
    });
    
    buttonHome.appendChild(irudiaHome);
    buttonBerria.appendChild(irudiaBerria);
    buttonIreki.appendChild(irudiaIreki);
    buttonMapa.appendChild(irudiaMapa);
    buttonProfila.appendChild(irudiaProfila);
    buttonHizkuntza.appendChild(irudiaHizkuntza);


   

   footer.appendChild(buttonHome);
   footer.appendChild(buttonIreki);
   footer.appendChild(buttonBerria);
   footer.appendChild(buttonMapa);
   footer.appendChild(buttonProfila);
   footer.appendChild(buttonHizkuntza);
   
   return;

 
}

export async function loadHeader(){
    const header = document.getElementById('header');

    const buttonLogo = document.createElement('button');
    const buttonBirkargatu = document.createElement('button');
    const irudiaLogo = document.createElement('img');
    const irudiaBirkargatu = document.createElement('img');
    irudiaLogo.src = '../pics/logo.png';
    irudiaLogo.className = 'irudia';
    buttonLogo.appendChild(irudiaLogo);
    irudiaBirkargatu.src = '../pics/birkargatu.svg';
    irudiaBirkargatu.className = 'irudia';
    buttonBirkargatu.appendChild(irudiaBirkargatu);
    buttonBirkargatu.addEventListener('click', () => {
        window.location.reload();
    });
    buttonLogo.addEventListener('click', () => {
        window.location.href = './home.html';
    });
    header.appendChild(buttonLogo);
    header.appendChild(buttonBirkargatu);
    
}

document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
    loadHeader();
});