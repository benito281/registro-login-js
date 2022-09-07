 /* Validamos los campos de contraseña y contraseña confirmada */
 export function comparePassword(password, passwordConfirm) {
    password = password.toLowerCase(); 
    passwordConfirm = passwordConfirm.toLowerCase();
   
    if(password == passwordConfirm) return true;
}

/* Validamos la longitud de la contraseña y la convertimos en minusculas */
export function passwordLength(password){
  password = password.toLowerCase(); 
  if (password.length <= 7) return false;
}

export function userExist(username, users){
   return Boolean( users.find( function(item){
       return item[0] == username;
    }));
 }

/* Validamos el nombre de usuario */
 export function validateUsername(username){
   username = username.toLowerCase();
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) return true;
   if(username.length == 0) return true;
   if(username.length < 6) return true;
   if(!isNaN(username[0])) return true;

   return false;

}
/* Con la function validateEmail verificamos de que exista y que tenga los caracteres correcto */
export function validateEmail(email, users) {
   if (users.find(function(item){
      return item[2] == email;
   }) !== undefined) return false;
   if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)){
      return true;
   } else {
       return false;
   }
}
 /* Validamos el usuario */
 export function validateUser(userlog, users, passlog){
    return users.find(function(item){
    return item[0] === userlog && item[1] === passlog
    })
 }
 