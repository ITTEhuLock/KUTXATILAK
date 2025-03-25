// Función para obtener las opciones dinámicas del dropdown
export async function loadDropdownOptions() {
    try {
        const response = await fetch(`${API_URL}/`); // Cambia la URL si es necesario
        if (response.ok) {
            const data = await response.json();
            
            // Obtener el elemento select
            const dropdown = document.getElementById('dropdown');
            
            // Limpiar opciones previas (excepto la inicial)
            dropdown.innerHTML = '<option value="">-- Seleccionar --</option>';
            
            // Agregar opciones dinámicamente basadas en los valores de 'egoera'
            const uniqueEgoera = [...new Set(data.map(kutxatila => kutxatila.egoera))];

            uniqueEgoera.forEach(egoera => {
                const option = document.createElement('option');
                option.value = egoera;
                option.textContent = egoera;
                dropdown.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error al cargar opciones del dropdown:', error);
    }
}

// Cargar las opciones cuando la página se cargue
document.addEventListener('DOMContentLoaded', loadDropdownOptions);
