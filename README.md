# Register-login-JS

Este es un proyecto sencillo de registro e inicio de sesión hecho con HTML, CSS y JavaScript puro. Es una versión renovada y con mejor diseño de un proyecto que hice hace unos años.

## 📸 Vistazos del proyecto

### Iniciar Sesión
![Iniciar Sesión](./img/iniciar-sesion.png)

### Crear Cuenta
![Crear Cuenta](./img/crear-cuenta.png)

## ✨ ¿Qué hace este proyecto?

* **Diseño limpio:** Usé Tailwind CSS para que se vea moderno, adaptable a celulares y con colores agradables.
* **Validaciones:** Revisa que el correo tenga un formato real, que la contraseña sea segura y que el usuario empiece con una letra.
* **Base de datos local:** Guarda los usuarios directamente en tu navegador usando `localStorage`. ¡Así que puedes probarlo sin necesidad de instalar nada extra!
* **Bloqueo por intentos:** Si alguien se equivoca de contraseña 3 veces seguidas, el botón de inicio de sesión se bloquea por 30 segundos (usando `sessionStorage`).
* **Alertas en pantalla:** Te avisa con cartelitos de colores si te registraste bien o si te faltó completar algún dato.

## 🛠️ Tecnologías que usé

* HTML
* Tailwind CSS (con CDN)
* JavaScript puro (Vanilla JS)
* FontAwesome (para los íconos)

## 🚀 Cómo probarlo en tu compu

1. Descarga o clona estos archivos.
2. Abre el archivo `signup.html` haciendo doble clic (se abrirá en tu navegador).
3. Créate una cuenta de prueba llenando los datos.
4. Luego ve a la página de inicio de sesión (`signin.html`) y entra con la cuenta que acabas de crear. ¡Listo!