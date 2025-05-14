export const API_URL = 'http://192.168.137.1:3000';


  export function formatData(dataString) {
    const dataArray = dataString.split("\n"); // Dividir cada fila por un salto de línea
    const formattedData = dataArray.map(row => 
        row.split('').map(Number) // Convertir cada fila en un array de números
    );
   // console.log(formattedData);
    return formattedData;
}

