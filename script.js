document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos guardados desde localStorage
    const datosGuardados = JSON.parse(localStorage.getItem('datosGuardados')) || [];

    // Función para guardar datos
    window.guardarDatos = function() {
        const form = document.getElementById('registrationForm');
        const confirmationMessage = document.getElementById('confirmationMessage');
        
        // Obtener los datos del formulario
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Guardar los datos en el arreglo
        datosGuardados.push(data);

        // Guardar los datos en localStorage
        localStorage.setItem('datosGuardados', JSON.stringify(datosGuardados));

        // Mostrar mensaje de confirmación
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);

        // Limpiar el formulario
        form.reset();
    };

    // Función para buscar datos
    window.buscarDatos = function() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const fichaContainer = document.getElementById('fichaContainer');
        const fichaContent = document.getElementById('fichaContent');

        // Buscar en los datos guardados
        const encontrado = datosGuardados.find(data => data.nombre.toLowerCase().includes(searchInput));
        
        if (encontrado) {
            fichaContent.innerHTML = Object.entries(encontrado).map(([key, value]) => `<strong>${key.replace(/-/g, ' ').toUpperCase()}:</strong> ${value}`).join('<br>');
            fichaContainer.style.display = 'block';
        } else {
            fichaContent.innerHTML = '<strong>No se encontraron datos para el nombre ingresado.</strong>';
            fichaContainer.style.display = 'block';
        }
    };
});
