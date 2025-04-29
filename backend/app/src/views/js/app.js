export async function loadFooter() {
    const footer = document.getElementById('footer');
    const buttonHome = document.createElement('button');
    const buttonIreki = document.createElement('button');
    const buttonMapa = document.createElement('button');
    const buttonProfila = document.createElement('button');
    const buttonUsers = document.createElement('button');
    const irudiaHome = document.createElement('img');
    const irudiaIreki = document.createElement('img');
    const irudiaProfila = document.createElement('img');
    const irudiaMapa = document.createElement('img');
    const irudiaUsers = document.createElement('img');
    irudiaHome.className = 'irudia';
    irudiaIreki.className = 'irudia';
    irudiaProfila.className = 'irudia';
    irudiaMapa.className = 'irudia';
    irudiaUsers.className = 'irudia';

    irudiaHome.src = '../pics/home.svg';
    irudiaIreki.src = '../pics/unlock.svg';
    irudiaProfila.src = '../pics/profila.svg';
    irudiaMapa.src = '../pics/pin.png';
    irudiaUsers.src = '../pics/users.svg';
    buttonMapa.addEventListener('click', () => {
        window.location.href = './mapakAdmin.html';
    });
    buttonHome.addEventListener('click', () => {
        window.location.href = './home.html';
    });

    buttonIreki.addEventListener('click', () => {
        window.location.href = './kutxatilakAdmin.html';
    });
    buttonProfila.addEventListener('click', () => {
        window.location.href = './profila.html';
    });
    
    buttonUsers.addEventListener('click', () => {
        window.location.href = './userAdmin.html';
    });

    buttonHome.appendChild(irudiaHome);
    buttonUsers.appendChild(irudiaUsers);
    buttonIreki.appendChild(irudiaIreki);
    buttonMapa.appendChild(irudiaMapa);
    buttonProfila.appendChild(irudiaProfila);


   

   footer.appendChild(buttonHome);
   footer.appendChild(buttonIreki);
   
   footer.appendChild(buttonMapa);
    footer.appendChild(buttonUsers);
   footer.appendChild(buttonProfila);
   
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
    loadHeader();
    loadFooter();
});