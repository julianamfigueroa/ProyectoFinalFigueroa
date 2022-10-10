let l_pl; 
let l_tema;
let click_tema;
let tema_clickeado;
let l_index;

let wstorageplay = JSON.parse(localStorage.getItem("playlists"));

let id_container = document.getElementById("contenedor_playlists");
let id_listado   = document.getElementById("listado");
let l_elimina_play  = document.getElementById("elimina_play");
let id_divfloat1 = document.getElementById("float1");
let l_aceptar1   = document.getElementById("aceptar1");
let l_cancelar1  = document.getElementById("cancelar1");
let id_divfloat2 = document.getElementById("float2");
let l_aceptar2   = document.getElementById("aceptar2");
let l_cancelar2  = document.getElementById("cancelar2");
id_divfloat1.classList.add("div_hide");
id_divfloat2.classList.add("div_hide");



fn_armalista();


// -------------------------------- FUNCIONES --------------------------------

// Listado de Playlists
function fn_armalista(){
    id_container.innerHTML = "";
    wstorageplay = JSON.parse(localStorage.getItem("playlists"));
    if ((wstorageplay != null)){
        if (wstorageplay.length > 0){
            l_pl = document.createElement("h3");
            l_pl.innerHTML = "Tus Playlists"
            id_container.append(l_pl);
            for (let y of wstorageplay) {  
                l_pl = document.createElement("p");
                l_pl.innerText = y.nombre; 
                l_pl.className = "playlists_p";
                id_container.append(l_pl); 
            }
            fn_playelegida();}
        else{
            document.getElementById("contenedor_playlists").innerHTML = `<h2 style="font-size:0.9em; color:#3b415a">Oops! Nada por aquí...</p>`;
        }
    }
    else{
        document.getElementById("contenedor_playlists").innerHTML = `<h2 style="font-size:0.9em; color:#3b415a">Oops! Nada por aquí...</p>`;
    }
}


// Canciones de la Playlist elegida
function fn_playelegida(){
    let elegida = document.querySelectorAll(".playlists_p");
    for (let x of elegida){
        x.addEventListener("click",function(e){
            id_divfloat1.classList.add("div_hide");
            id_divfloat2.classList.add("div_hide"); 
            wstorageplay = JSON.parse(localStorage.getItem("playlists"));
            l_index = (wstorageplay.findIndex(l_index => l_index.nombre === e.target.innerText));
            fn_armacanciones(); 
        })
    }
}


// Lista de Temas
function fn_armacanciones(){
    tema_clickeado = "";
    id_listado.innerHTML = "";
    wstorageplay = JSON.parse(localStorage.getItem("playlists"));
    if (wstorageplay[l_index] != null){
        if(wstorageplay[l_index].temas.length > 0){
            l_pl = document.createElement("h4");
            l_pl.innerHTML = "Lista de Temas"
            id_listado.append(l_pl);
            for (let y of wstorageplay[l_index].temas) {  
                l_tema = document.createElement("p");
                l_tema.innerText = y; 
                l_tema.className = "cancion";
                id_listado.append(l_tema); 
            }
            click_tema = document.querySelectorAll(".cancion");
            for (let x of click_tema){
                x.addEventListener("click",function(e){;
                    id_divfloat1.classList.add("div_hide"); 
                    id_divfloat2.classList.add("div_hide"); 
                    tema_clickeado = (wstorageplay[l_index].temas.findIndex(tema_clickeado => tema_clickeado === e.target.innerText));
                    id_divfloat1.classList.remove("div_hide"); 
                })
            }
            fn_elimina_tema();
        }
        else{
            id_listado.innerHTML = `<p style="font-size:0.9em; color:#3b415a">Oops! Nada por aquí...</p>`;
        }
    }
    else{
        id_listado.innerHTML = `<p style="font-size:0.9em; color:#3b415a">Oops! Nada por aquí...</p>`;
    }
    fn_btn_eliminapl();
}


// Botón para Eliminar Playlist
function fn_btn_eliminapl(){
    l_pl = document.createElement("p");
    l_pl.innerText = "Eliminar Playlist"; 
    l_pl.id = "elimina_play";
    l_pl.className = "elimina_play";
    id_listado.append(l_pl);
    fn_elimina_playlist();
}


// Ventana Emergente : Eliminar Playlist
function fn_elimina_playlist(){
    wstorageplay = JSON.parse(localStorage.getItem("playlists"));
    document.getElementById("elimina_play").addEventListener("click", function(){
        id_divfloat1.classList.add("div_hide"); 
        id_divfloat2.classList.remove("div_hide");  
        l_aceptar2.addEventListener("click",function(e){       
            if (l_index > -1){
                wstorageplay.splice(l_index,1);
                wstorageplay = JSON.stringify(wstorageplay);
                localStorage.setItem("playlists", wstorageplay);
                wstorageplay = JSON.parse(localStorage.getItem("playlists"));
                id_divfloat2.classList.add("div_hide"); 
                Toastify({ 
                    text: "Playlist eliminada", gravity:"bottom", position:"center", duration: 2500,
                    style:{
                        fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white"} 
                    }).showToast();
                l_index = -1;
                id_listado.innerHTML = "";
                fn_armalista();
                }        
        });
        l_cancelar2.addEventListener("click",function(e){
            id_divfloat2.classList.add("div_hide"); 
        });
})
}


// Ventana Emergente : Eliminar tema de la Playlist
function fn_elimina_tema(){
    l_aceptar1.addEventListener("click",function(e){
        if ((tema_clickeado != "" && tema_clickeado > 0) || tema_clickeado === 0){
            wstorageplay = JSON.parse(localStorage.getItem("playlists"));
            wstorageplay[l_index].temas.splice(tema_clickeado,1);
            wstorageplay = JSON.stringify(wstorageplay);
            localStorage.setItem("playlists", wstorageplay);
            wstorageplay = JSON.parse(localStorage.getItem("playlists"));
            tema_clickeado = "";
            id_divfloat1.classList.add("div_hide"); 
            Toastify({ 
                text: "Canción eliminada", gravity:"bottom", position:"center", duration: 2500,
                style:{
                    fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white"} 
                }).showToast();
            fn_armacanciones();
        }    
    });

    l_cancelar1.addEventListener("click",function(e){
        id_divfloat1.classList.add("div_hide"); 
    });
}

