// Crear Listener para activar funcion de modo oscuro.

document.getElementById("darkmode").addEventListener("click", function() {
    var body = document.body;
    var section1 = document.getElementById("acerca-de");
    var section2 = document.getElementById("proyectos");
    var section3 = document.getElementById("contacto");
    var header = document.getElementById("headers");
    var button = document.getElementById("darkmode");

    button.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
    body.classList.toggle("dark-mode");
    section1.classList.toggle("dark-mode");
    section2.classList.toggle("dark-mode");
    section3.classList.toggle("dark-mode");
});


// Crear proceso de formulario

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    // Iniciar variables de formulario

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Por favor espere..."

    // Servicio de API para enviar una solicitud.

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Algo salió mal!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});