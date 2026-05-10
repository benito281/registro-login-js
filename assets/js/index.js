import { showAlert } from "./message.js";

/* Formulario de registro */
const formRegister = document.querySelector("#form-register");

if (formRegister) {
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  /* Entradas */
  let email = document.querySelector("#email-user-register").value;
  let username = document.querySelector("#user-name-register").value;
  let password = document.querySelector("#password-user-register").value;
  let confirmPassword = document.querySelector("#password-user-confirm-register").value;
 
  /* Se hace minusculas */
  username = username.toLowerCase();
  password = password.toLowerCase(); 
  confirmPassword = confirmPassword.toLowerCase();
  email = email.toLowerCase(); 

  /* Ayuda a saber si paso las validaciones */
  const validations = [];

   if(username.trim() === "") {
        validations.push({
            type : "error",
            message: "El nombre de usuario es obligatorio"
        });
    }
    if (!/^[a-zA-Z_-][a-zA-Z0-9_-]{2,}$/.test(username) === false) {
        validations.push({
            type : "error",
            message : "El nombre de usuario debe comenzar con una letra y tener mínimo 3 caracteres"
        });
    }
    if(email.trim() === "") {
        validations.push({
            type : "error",
            message : "El correo es obligatorio"
        });
    }
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email) === false){
         validations.push({
            type : "error",
            message : "El correo no es valido"
         });
    }

    if(password.length < 7) {
        validations.push({
            type : "error",
            message : "La contraseña debe tener mínimo 7 caracteres"
        });
    }

    if(password !== confirmPassword) {
        validations.push({
            type : "error",
            message : "Las contraseñas no coinciden"
        });
    }
    if (validations.length > 0){
        for (let index = 0; index < validations.length; index++) {
            const element = validations[index];
            showAlert(element.type, element.message)
        }
        return;
    }
    else {
        let users = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(users)) users = [];
        console.log(users);

        const exists = users.find(function (item) {
            return item.email === email;
        });

        if (exists !== undefined) {
            showAlert("error", "Se encuentra una cuenta registrada con el correo asignado");
        } else { 
            users.push({ email, username, password });
            localStorage.setItem('users', JSON.stringify(users));
            showAlert("success", "Usuario registrado correctamente");
        }
    }

});
}


/* Formulario de login */
const formLogin = document.querySelector("#form-login");
const loginButton = document.querySelector("#login");
const loginAttemptsKey = "loginAttempts";
const loginLockUntilKey = "loginLockUntil";
const maxLoginAttempts = 3;
const loginLockDuration = 30000;

function updateLoginButtonState() {
  if (!loginButton) {
    return;
  }

  const lockUntil = Number(sessionStorage.getItem(loginLockUntilKey) || 0);
  const now = Date.now();

  if (lockUntil > now) {
    const remainingSeconds = Math.ceil((lockUntil - now) / 1000);
    loginButton.disabled = true;
    loginButton.textContent = `Bloqueado (${remainingSeconds}s)`;
    return;
  }

  loginButton.disabled = false;
  loginButton.textContent = "Iniciar sesión";
  sessionStorage.removeItem(loginLockUntilKey);
}

updateLoginButtonState();

if (formLogin) {
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const lockUntil = Number(sessionStorage.getItem(loginLockUntilKey) || 0);
  if (lockUntil > Date.now()) {
    showAlert("error", "Has superado el número de intentos. Espera un momento e inténtalo de nuevo.");
    updateLoginButtonState();
    return;
  }
  
  /* Entradas */
  let email = document.querySelector("#email-user-login").value;
  let password = document.querySelector("#password-user-login").value;

  /* Se hace minusculas */
  email = email.toLowerCase();
  password = password.toLowerCase();

  /* Validaciones */
  const validations = [];

  if (email.trim() === "") {
    validations.push({
      type: "error",
      message: "El correo es obligatorio",
    });
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)) {
    validations.push({
      type: "error",
      message: "El correo no es válido",
    });
  }

  if (password.trim() === "") {
    validations.push({
      type: "error",
      message: "La contraseña es obligatoria",
    });
  }

  /* Si hay errores, mostrar alertas y retornar */
  if (validations.length > 0) {
    for (let index = 0; index < validations.length; index++) {
      const element = validations[index];
      showAlert(element.type, element.message);
    }
    return;
  }

  /* Buscar usuario en localStorage */
  let users = JSON.parse(localStorage.getItem("users"));
  if (!Array.isArray(users)) users = [];

  const userFound = users.find(function (item) {
    return item.email === email && item.password === password;
  });

  if (userFound === undefined) {
    const currentAttempts = Number(sessionStorage.getItem(loginAttemptsKey) || 0) + 1;
    sessionStorage.setItem(loginAttemptsKey, String(currentAttempts));

    showAlert("error", "Correo o contraseña incorrectos");

    if (currentAttempts >= maxLoginAttempts) {
      const lockUntilTime = Date.now() + loginLockDuration;
      sessionStorage.setItem(loginLockUntilKey, String(lockUntilTime));
      sessionStorage.removeItem(loginAttemptsKey);
      updateLoginButtonState();

      setTimeout(() => {
        updateLoginButtonState();
      }, loginLockDuration);
      return;
    }
  } else {
    sessionStorage.removeItem(loginAttemptsKey);
    sessionStorage.removeItem(loginLockUntilKey);
    updateLoginButtonState();
    showAlert("success", "Sesión iniciada correctamente");
    /* Redirigir a Google después de 1.5 segundos */
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 1500);
  }
});
}
