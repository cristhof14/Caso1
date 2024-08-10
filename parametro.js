const urlActual = window.location.href;
const urlObj = new URL(urlActual);
const parametros = urlObj.searchParams;
let carpetaNombre = null;

if (parametros.toString()) {
    carpetaNombre = parametros.values().next().value;
}

if (!carpetaNombre || carpetaNombre.length !== 3) {
    carpetaNombre = generarCadenaAleatoria();
    urlObj.search = '';
    urlObj.search = `?${carpetaNombre}`;
    window.location.href = urlObj.href;
} else {
    crearCarpeta(carpetaNombre);
}

function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}

function crearCarpeta(carpetaNombre) {
    $.ajax({
        url: 'crearCarpeta.php',
        type: 'POST',
        data: { nombreCarpeta: carpetaNombre },
        success: function(response) {
            console.log('Carpeta creada con éxito:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error al crear la carpeta:', error);
        }
    });
}

const dropArea = document.getElementById('drop-area');
const Form = document.getElementById('form');

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (let file of files) {
        console.log('Archivo seleccionado:', file.name);
    }
}

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = Form.querySelector('#archivo');
    const files = fileInput.files;
    if (files.length > 0) {
        for (let file of files) {
            console.log('Subir archivo:', file.name);
        }
    } else {
        alert('Por favor, seleccione al menos un archivo.');
    }
});
