/* Hacemos nuestra funcion getHtmlAlert y showAlert para mostrar nuestra alerta */
function getHtmlAlert(type, message){
    return ` <div class="alert alert-${ type }" role="alert">
                ${ message }
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                </button>
             </div>`
 }
 
export function showMessage(type, message, divElement){
    divElement.innerHTML += getHtmlAlert(type, message);
 }
