import { showMessage } from './message.js';
import { validatePasswords, 
  validateUserName,
  validateEmail,  
  validateUser} from './functions.js'

$('.message a').click( function(){
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
 });
  
 /* Definimos nuestro array en donde guardaremos nuestros datos */
 let users = [];

//Intentos
 let attempt = 0;

 //Div para mostrar mensajes e intententos
const viewAlerts = document.querySelector("#alert"),
viewAttempts = document.querySelector("#view-attempts")

//Formularios
const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');

//Registro de usuarios
 document.querySelector("#btnuserregister").addEventListener('click', function(e){
    e.preventDefault();
    const username = registerForm['username'].value;
    const password = registerForm['user-password'].value;
    const passwordConfirm = registerForm['password-confirm'].value;
    const email = registerForm['user-email'].value;
    const passencript = window.btoa(passwordConfirm);
    if (validateUserName(username) === false) {
      showMessage('warning','El nombre de usuario no debe comenzar con un numero', viewAlerts);
    }
    if (!validatePasswords(password, passwordConfirm) === false) {
      showMessage('warming','La contraseña es muy debil o es distinta a confirmar contraseña', viewAlerts);
    }
    if(validateEmail(email, users) === false) {
      showMessage('danger', 'El formato del email es incorrecto o ya se encuentra en uso', viewAlerts);
    }
    else {
      users.push([username, passencript, email, Date.now()]);
      showMessage('primary', '¡EUREKA!, Se ha registrado correctamente', viewAlerts);
    }
 });

 /* Validamos iniciar sesion */
 document.querySelector("#btnuserlogin").addEventListener("click", function(e){
    e.preventDefault();

    const usernameLog = loginForm['username-log'].value;
    const passwordLog = loginForm['password-log'].value;
    const passwordCompare = window.btoa(passwordLog);

    if (validateUser(usernameLog, users, passwordCompare)) {
      showMessage('primary','Bienvenido ' + usernameLog, viewAlerts);
      attempt = 1;
      setTimeout("location.href='http://www.google.com'", 3000);
    }
    else{
      attempt++;
      showMessage("warning", "<b>El usuario y contraseña ingresados son incorrectos</b>", viewAlerts);
      showMessage("warning", "Numero de intentos: " + attempt , viewAttempts);
      if (attempt >= 3) {
        showMessage("danger", "<b>Usted a superado el numero de intentos </b>", viewAttempts);
        loginForm['username-log'].disabled = 'true';
        loginForm['password-log'].disabled = 'true';
     }
    }
 });
  