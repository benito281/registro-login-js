//import { testing } from './test.js'; Funciona :)
import { loginUser, userRegister } from './users-functions.js';
$('.message a').click( function(){
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
 });


/* Realizamos nuestra funcion registrar usuario */
 document.getElementById("btnuserregister").addEventListener('click',userRegister);


 
 /* Validamos iniciar sesion */
 let attempt= 1;
 document.getElementById("btnuserlogin").addEventListener("click", loginUser );
  