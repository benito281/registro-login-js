import { showAlert } from './message.js';
import { userExist,
   validateUser, 
   validateUsername, 
   validateEmail, 
   comparePassword, 
   passwordLength } from './validations.js';

   /* Definimos nuestro array en donde guardaremos nuestros datos */
 let users = [];

 //Register
 const viewAlerts = document.querySelector("#alert"),
       viewAttempts = document.querySelector("#view-attempts"),
       username = document.querySelector("#username").value,
       password =document.querySelector("#user-password").value,
       passwordConfirm = document.querySelector("#password-confirm").value,
       email = document.querySelector("#user-email").value,
       passencript = window.btoa(passwordConfirm);

 //Login
 const userLogin = document.querySelector("#username-log").value, 
       passwordLogin = document.querySelector("#password-log").value,
       passdesencrit = window.btoa(passwordLogin);

//Buscamos los datos almacenados en el array para iniciar sesión
export function loginUser(event){
    event.preventDefault();
    let date = Date.now(),
    attempt = 0;
    users.find(function(item){
       if (userLogin === item[0]){
          item[4] = date;
       }
    })
    
    if(validateUser(userLogin, users , passdesencrit)){
        showAlert("success", "Bienvenido " + userLogin , viewAlerts);
        attempt = 1;
        setTimeout("location.href='http://www.google.com'", 3000);
     } else {
        showAlert("warning", "Numero de intentos: " + attempt, viewAttempts);
        showAlert("warning", "<b>El usuario y contraseña ingresados son incorrectos</b>", viewAlerts);
  
        if (attempt >= 3) {
           showAlert("danger", "<b>Usted a superado el numero de intentos </b>", viewAttempts);
           document.querySelector('#btnuserlogin').disabled = 'true';
           document.querySelector('#username-log').disabled = 'true';
           document.querySelector('##password-log').disabled = 'true';
        }
        
        attempt++;
     }
  
  }

  //Guardamos los datos del usuario en el Arreglo
 export function userRegister(e){
   e.preventDefault();
  
   if (userExist(username, users)) {
      showAlert("warning", "El nombre de usuario ya se encuentra registrado", viewAlerts);
   } 
    if (validateUsername(username)) {
      showAlert("warning", "El nombre de usuario no llega a cumplir con los requisitos", viewAlerts);
   } 
    if (!comparePassword(password, passwordConfirm)) {
      showAlert("warning", "Las contraseñas ingresadas no coinciden", viewAlerts);
   } 
    if (passwordLength(password)) {
      showAlert("warning", "La contraseña no llega cumplir con los requisitos", viewAlerts);
   } 
    if (Boolean(validateEmail(email, users))) {
      showAlert("warning", "El email no cumple los requisitos o ya está registrado", viewAlerts);
   } 
   else {     
      users.push([ username, passencript, email, Date.now(), '' ]) && showAlert("primary", "¡EUREKA! Los datos se registraron correctamente", viewAlerts);
      console.log(users);
   }
}