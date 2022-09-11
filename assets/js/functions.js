/* Validamos los campos de contraseña y contraseña confirmada */
 export function validatePasswords(password, passwordConfirm) {
    password = password.toLowerCase(); 
    passwordConfirm = passwordConfirm.toLowerCase();
    if (password.length <= 7) return false;
    if (password == passwordConfirm) return false;
    return true;
}
/* Validamos el nombre de usuario, si comienza con numero o es menor a 6*/
export function validateUserName(username){
  username = username.toLowerCase();
  if (!/^[1-9]\d*$/.test(username) === false) return false;
  return true;
}

/* Con la función validateEmail verificamos de que exista y que tenga los caracteres correcto */
export function validateEmail(email, users) {
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email) === false) return false;
  if (users.find(function(item){ return item[2] === email }) !== undefined) return false;
  return true;
}

 /* Validamos el usuario */
 export function validateUser(userlog, users, passlog){
  return users.find(function(item){
    return item[0] === userlog && item[1] === passlog
  });
}
