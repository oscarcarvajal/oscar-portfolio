//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
 

const firstName = document.querySelector('#firstName');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    //When app is open
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Validate form
    firstName.addEventListener('blur', validarFormulario);
    email.addEventListener('blur', validarFormulario);
    message.addEventListener('blur', validarFormulario);

    //Reset Form
    btnReset.addEventListener('click', resetearFormulario);

    //send email

    formulario.addEventListener('submit', enviarEmail);
}


//funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//Validat form
function validarFormulario(e) {
    
    if (e.target.type === 'email') {
       
        if (er.test(e.target.value)) {
            //Delete the errors
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
 
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email is not valid');
        }
    }
    if (e.target.value.length > 0) {
        //Delete the errors 
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        
 
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('All Fields are required');
    }
 
   if(firstName.value !== '' && er.test(email.value) && message.value !== '') {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
   }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'text-center', 'mt-3', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

//Send Email
function enviarEmail(e) {
    e.preventDefault();
    console.log('enviando');

    //Show Spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //After 3s hide spinner
    setTimeout( () => {
        spinner.style.display = 'none';

        //Message email send
        const parrafo =document.createElement('p');
        parrafo.textContent = 'Email has been sent';
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold')
        
        //Insert parragraph before spinner
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove();//Delete send email
            resetearFormulario();
        }, 5000);
    }, 3000);    
}
function resetearFormulario(){
    formulario.reset();

    iniciarApp();

}

