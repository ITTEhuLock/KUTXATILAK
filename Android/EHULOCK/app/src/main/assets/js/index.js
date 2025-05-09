export async function loadHeader(){

    const buttonHizkuntza = document.createElement('button');
    const imgHizkuntza = document.createElement('img');
    imgHizkuntza.src = './pics/ikurriña.png';
    imgHizkuntza.alt = 'Hizkuntza';
    imgHizkuntza.className = 'irudia';
    buttonHizkuntza.appendChild(imgHizkuntza);
    

    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    if (idiomaGuardado === 'eu') {
        imgHizkuntza.src = './pics/ikurriña.png';
    } else {
        imgHizkuntza.src = './pics/castellano.png';
    }

    buttonHizkuntza.addEventListener('click', () => {
        let idiomaActual = localStorage.getItem('idioma') || 'es';
        let nuevoIdioma = idiomaActual === 'eu' ? 'es' : 'eu';
    
        localStorage.setItem('idioma', nuevoIdioma);
        aplicarTraduccion(nuevoIdioma); 
    
        imgHizkuntza.src = nuevoIdioma === 'eu' 
            ? './pics/ikurriña.png' 
            : './pics/castellano.png';
    });
    header.appendChild(buttonHizkuntza);
    return;


}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
});