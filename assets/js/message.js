/* Mostrar mensaje o alerta*/
export function showAlert(type, message) {
  const colors = {
    success: "bg-green-100 text-green-700 border border-green-300",
    error: "bg-red-100 text-red-700 border border-red-300",
    info: "bg-shamrock-100 text-shamrock-700 border border-shamrock-300",
  };

  const alertBox = `
    <div class="flex items-center justify-between p-4 mb-4 rounded-xl transition duration-300 ${colors[type]}">
      <p class="font-medium">
        ${message}
      </p>

      <button onclick="this.parentElement.remove()" class="ml-4 hover:opacity-70">
                ✖
            </button>
        </div>
    `;

  document.getElementById("alert-message").innerHTML += alertBox;

  setTimeout(() => {
    document.getElementById("alert-message").innerHTML = "";
  }, 3000);
}
