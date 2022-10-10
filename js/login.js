let arr_users = [];
let l_btnnew;
let l_ingresa;
let l_graba;
let index;
let l_user;
let l_pass; 
let l_divnewusr; 
let l_mailnew;
let l_usernew;
let l_passnew; 
let Usuario;
let l_bd;
let json;

l_bd = localStorage.getItem("usuarios");
l_bd = JSON.parse(l_bd);

l_user = document.getElementById("usuario");
l_pass = document.getElementById("pass");
l_ingresa = document.getElementById("ingresa");
l_btnnew = document.getElementById("new");
l_divnewusr = document.getElementById("divnewusr");
l_mailnew = document.getElementById("newmail");
l_usernew = document.getElementById("newuser");
l_passnew = document.getElementById("newpass");
l_graba = document.getElementById("confirma"); 

// OCULTO EL DIV PARA CREAR USUARIOS NUEVOS
l_divnewusr.classList.add("div_hide");

// Valido si existe el usuario ingresado
l_user.addEventListener("change", function(){
    if (l_bd != null){
        let x = (l_bd.findIndex(x => x.username === l_user.value));
        if ( x  == -1){ 
            Toastify({ 
                text: "Usuario inexistente", position:"center", duration: 3000,
                style:{ fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white"} 
            }).showToast();
            l_user.value = "";
        }
    }
    else{ 
        Toastify({ 
            text: "Usuario inexistente", position:"center", duration: 3000,
            style:{ fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white"} 
        }).showToast();
    }
});

// Valido usuario - contraseña ingresados 
l_ingresa.addEventListener("click", function(){
    l_bd = localStorage.getItem("usuarios");
    l_bd = JSON.parse(l_bd);
    if (l_bd != null){
        let x = l_bd.findIndex(x => x.username === l_user.value);
        if ( (l_bd[x].password)  != (l_pass.value)){ 
            Toastify({ 
                text: "Contraseña incorrecta", position:"center", duration: 3000,
                style:{ fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white" } 
            }).showToast();
            l_pass.value = "";
        }
        else{
            l_user.value = "";
            l_pass.value = "";
            Toastify({ 
                text: "Bienvenido! Ingresando...", position:"center", duration: 3000, 
                style:{ fontSize: "0.9em", fontFamily: "Arial", background:"#a2d2ff", color:"black" } 
            }).showToast();
            setTimeout(function(){window.location.replace("main.html")} , 2300);
        }
    }
    else{ 
        Toastify({ 
            text: "Usuario inexistente", position:"center", duration: 3000,
            style:{ fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white" } 
        }).showToast();
        l_user.value = "";
        l_pass.value = "";}
});

// Muestro div para Registrarse - Nuevo usuario
l_btnnew.addEventListener("click", function(){
    l_divnewusr.classList.remove("div_hide");
});

// Valido si ya existe ese mail
l_mailnew.addEventListener("change", function(){
    if (l_bd != null){
        let x = (l_bd.findIndex(x => x.email === l_mailnew.value));
        if ( x  != -1){ 
            Toastify({ 
                text: "Correo electrónico ya registrado", position:"center", duration: 3000,
                style:{ fontSize: "0.8em", fontFamily: "Arial", background:"#f4a261", color:"white" } 
            }).showToast();
            l_mailnew.value = "";
        }  
    }
});

// Valido si ya existe ese usuario
l_usernew.addEventListener("change", function(){
    if (l_bd != null){
        let x = (l_bd.findIndex(x => x.username === l_usernew.value));
        if ( x  != -1){ 
            Toastify({ 
                text: "Nombre de usuario ya utilizado", position:"center", duration: 3000,
                style:{ fontSize: "0.8em", fontFamily: "Arial", background:"#f4a261", color:"white" } 
            }).showToast();
            l_usernew.value = "";
        }  
    }
});

// Grabo al nuevo usuario
l_graba.addEventListener("click", function(){
    if (l_mailnew.value == "" || l_usernew.value == "" || l_passnew.value == ""){ 
        Toastify({ 
            text: "Complete los datos solicitados", position:"center", duration: 3000,
            style:{ fontSize: "0.8em", fontFamily: "Arial", background:"#81b29a", color:"white" } 
        }).showToast();
    }
    else{
        Usuario = {email:l_mailnew.value, username:l_usernew.value, password:l_passnew.value};
        if (l_bd != null){arr_users = l_bd; }
        arr_users.push(Usuario); 
        l_bd = JSON.stringify(arr_users);
        localStorage.setItem("usuarios", l_bd);
        l_divnewusr.classList.add("div_hide");
        l_mailnew.value = ""; l_usernew.value = ""; l_passnew.value = "";
        l_bd = localStorage.getItem("usuarios");
        l_bd = JSON.parse(l_bd);
    }
});
