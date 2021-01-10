console.log("conectado");

class Usuario {
    constructor(mail, password) {
        this.mail = mail;
        this.password = password;
    }
}

class UI {
    addUser(usuario) {
        const insertUser = document.getElementById("ingresos");
        const element = document.createElement('div');
        element.innerHTML = `
            <div class = 'card text-center mb-4' id = "remove">
                <div class = "card-body">
                    <strong>Correo</strong>: ${usuario.mail}                     
                    <strong>Password</strong>: ${usuario.password}
                    <a href="#" class = "btn btn-danger" name ="delete" >Delete</a>
                </div>
            </div>
        `;
        insertUser.appendChild(element);
    }

    resetForm() {
        document.getElementById('form-control').reset();
    }

    deleteUser(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            let ui = new UI();
            ui.showMessage('Usuario eliminado correctamente', 'danger');
        }
    }

    showMessage(messasge, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(messasge));
        //mostrando en DOM
        const container = document.querySelector("#Contenedor");
        const app = document.querySelector("#App");
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000);
    }
}

// *************DOM EVENTS********************

// capturar email y pass
document.getElementById("form-control")
    .addEventListener("submit", function (e) {
        //guardo los input en constantes
        const correo = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        //quito que al apretar submit se borre todo por defecto y resetee la pagina
        e.preventDefault();

        
        // creando el nuevo user
        const usuario = new Usuario(correo, pass);
        console.log(usuario);
        // creamos una nueva UI para poder usarla
        const ui = new UI();

        if(correo === "" || pass === ""){
            ui.showMessage('Favor rellenar todos los campos', "warning")  
            return ui;  
        }
        //se envia el usuario a la clase UI
        ui.addUser(usuario);
        // ahora reseteo el form
        ui.resetForm();
        //mostramos el mensaje que se inserto o elimino
        ui.showMessage('Usuario creado correctamente', 'success');


    });

//vamos a borrar un elemento
document.getElementById("ingresos")
    .addEventListener("click", function (e) {
       
        const ui = new UI();
        ui.deleteUser(e.target);
    });