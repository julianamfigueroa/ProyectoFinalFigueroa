let wstoragealbums = []; 
let wstorageplaylist = [];
let arrplay = [];
let l_discoelegido; 
let l_index;
let l_contenedortema;
let l_divpadre;
let l_nrocd;
let l_parrafo;
let l_nro;
let l_titulo;
let l_newdiv;
let btn_cont_img;
let btn_fav;
let btn_add; 
let btn_addsong; 
let l_input;
let l_tema_fav;
let l_tema_puntuado;
let l_estrella; 
let l_album;
let l_tema;

// CONTENEDOR DE LAS TAPAS DE DISCOS
let id_container = document.getElementById("contenedor_img");
let id_titulo = document.getElementById("album_titulo");
let id_listado = document.getElementById("listado");
let id_contitu = document.getElementById("contenedor_titulos"); 
let id_playlist = document.getElementById("playlists");
let id_divalbum = document.getElementById("album");
let id_divfloat = document.getElementById("float");

// OCULTO EL DIV DE DISCOS/TEMAS
id_divalbum.classList.add("div_hide");
// OCULTO FLOTANTE DE PLAYLISTS
id_divfloat.classList.add("div_hide");

// Hago un array con los divs para identificar en cual estoy parado
let arr_idcd = ["cd01", "cd02", "cd03", "cd04", "cd05", "cd06", "cd07", "cd08", "cd09", "cd10"];
// --------------------------------------------------------------------------------------------------------------------------------


// -------------------------------- ARMADO DEL ALBUM --------------------------------
// Muestro los temas del Album elegido
function fn_armaalbum(id_album){
    l_nro = id_album;
    wstoragealbums = JSON.parse(localStorage.getItem("albums"));
    // Titulo
    id_titulo.innerText = wstoragealbums[l_nro].nombre;
    id_listado.innerHTML = "";
    if (l_nro != 9){ // Decimo disco no disponible aún 
        id_contitu.classList.remove("div_hide");
        for (let i = 0; i < wstoragealbums[l_nro].temas.length; i++) {  
            fn_creadiv(); 
            fn_get_nrotema( (i + 1) ); // Nro tema
            fn_get_nombretema(( wstoragealbums[l_nro].temas[i].nombre )); // Nombre de la Cancion
            fn_get_favorito( (wstoragealbums[l_nro].temas[i].favorito) ); // Favorito
            fn_get_puntaje( (wstoragealbums[l_nro].temas[i].puntaje) ); // Puntaje
            fn_btnplaylist(); 
            }
        fn_botones();}
    else{
        l_newdiv = document.createElement("div");
        l_newdiv.innerHTML = `<p>Disponible el 21 de Octubre...</p>`
        id_listado.append(l_newdiv);    }
}
// --------------------------------------------------------------------------------------------------------------------------------



// -------------------------------- FUNCIONES DEL ARMADO DEL ALBUM --------------------------------
function fn_creadiv(){
    l_contenedortema = document.createElement("div");
    l_contenedortema.id = "contenedor_tema";
    l_contenedortema.className = "style_tema";
    id_listado.append(l_contenedortema); 
}
function fn_get_nrotema(a){
    l_div = document.createElement("div");
    l_div.innerText = a; 
    l_div.className = "tema_nro";
    l_contenedortema.append(l_div); 
}
function fn_get_nombretema(c){
    l_div = document.createElement("div");
    l_div.innerText = c; 
    l_div.className = "tema_nombre";
    l_contenedortema.append(l_div); 
}
function fn_get_favorito(d){
    btn_fav = document.createElement("img");
    btn_fav.className = "tema_fav";
    d == "S" ? btn_fav.src = "./img/ico/favon.png" : btn_fav.src = "./img/ico/favoff.png";
    btn_fav.value = `${d}`;
    l_contenedortema.append(btn_fav);
}
function fn_get_puntaje(f){
    for (let m = 0; m < f; m++) {
        l_estrella = document.createElement("img");
        l_estrella.className = "estrella";
        l_estrella.src = "./img/ico/staron.png";
        l_estrella.value = m + 1;
        l_contenedortema.append(l_estrella);     }
    for (let n = f + 1; n <= (5); n++) {
        l_estrella = document.createElement("img");
        l_estrella.className = "estrella";
        l_estrella.src = "./img/ico/staroff.png";
        l_estrella.value = n;
        l_contenedortema.append(l_estrella);     } 
}
function fn_btnplaylist(){
    btn_add = document.createElement("img");
    btn_add.className = "tema_add";
    btn_add.src = "./img/ico/masoff.png";
    l_contenedortema.append(btn_add);
}
// --------------------------------------------------------------------------------------------------------------------------------



// -------------------------------- Funciones MOUSEOVER y MOUSEOUT Album (Color / ByN) --------------------------------
function fn_overalbum(){
    document.getElementById(l_album).style.backgroundImage = `url('./img/albums/ts${l_nrocd}.jpg')`;
    document.getElementById(l_album).style.transitionDuration = "0.3s";
    l_parrafo  = document.getElementById(`p${l_nrocd}`);
    l_parrafo.style.color = "#f7f6f8"; 
}
function fn_outalbum(){
    document.getElementById(l_album).style.backgroundImage = `url('./img/albums/ts${l_nrocd}b.jpg')`;
    document.getElementById(l_album).style.transitionDuration = "0.3s";
    l_parrafo.style.color = "#d6d2e2";
}
// --------------------------------------------------------------------------------------------------------------------------------




// -------------------------------- FUNCIONES PLAYLISTS --------------------------------
// Armado de las Playlists actuales
function fn_get_playlist(){
    document.getElementById("playlist_close").addEventListener("click", function(){
        id_divfloat.classList.add("div_hide");
    });
    id_playlist.innerHTML = "";
    id_playlist.innerHTML = `<p class="playlist" id ="newplay">Crear Nueva Playlist</p>`;
    wstorageplaylist = JSON.parse(localStorage.getItem("playlists"));
    if (wstorageplaylist != null){
        for (let i = 0; i < wstorageplaylist.length; i++){
            let xx = document.createElement("p");
            xx.className ="addsong";
            xx.innerText = wstorageplaylist[i].nombre;
            id_playlist.append(xx);}
    }
    fn_agrega_cancion();
}

// Agregado de la nueva Playlist al json
function fn_btn_newplaylist(){
    let btn_newplaylist = document.getElementById("newplay");
    btn_newplaylist.addEventListener("click", function(){
        let new_input = document.createElement("input");
        new_input.className = "playlist";
        new_input.id = "playinput";
        id_playlist.append(new_input);
        l_input = document.getElementById("playinput");
        l_input.addEventListener("change", function(){
            Playlist = {nombre:l_input.value, temas:[]};
            wstorageplaylist = JSON.parse(localStorage.getItem("playlists"));
            if (wstorageplaylist != null){arrplay = wstorageplaylist; }
                let a = (arrplay.findIndex(a => a.nombre === l_input.value));
                if ( a  == -1){
                    arrplay.push(Playlist); 
                    wstorageplaylist = JSON.stringify(arrplay);
                    localStorage.setItem("playlists", wstorageplaylist);
                    Toastify({ 
                        text: "Playlist creada!", gravity:"bottom", position:"center", duration: 2500,
                        style:{
                            fontSize: "0.8em", fontFamily: "Arial", background:"#74c69d", color:"black"} 
                    }).showToast();

                    fn_get_playlist();
                    fn_btn_newplaylist();}
                else{ 
                    Toastify({ 
                        text: "Ya existe esa Playlist", gravity:"bottom", position:"center", duration: 2500,
                        style:{
                            fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white" } 
                    }).showToast();}
            });
    });
}

// Agregado de la Canción a la Playlist
function fn_agrega_cancion(){
    btn_addsong = document.querySelectorAll(".addsong");
    for (let x of btn_addsong){
        x.addEventListener("click", function(e){
            wstorageplaylist = JSON.parse(localStorage.getItem("playlists"));
            let s = wstorageplaylist.findIndex(s => s.nombre === e.target.innerText);
            let a = (wstorageplaylist[s].temas.findIndex(a => a === l_tema));
                if ( a  == -1){
                    wstorageplaylist[s].temas.push(l_tema);
                    wstorageplaylist = JSON.stringify(wstorageplaylist);
                    localStorage.setItem("playlists", wstorageplaylist);
                    Toastify({ 
                        text: "Canción agregada a la Playlist!", gravity:"bottom", position:"center", duration: 2500,
                        style:{
                            fontSize: "0.8em", fontFamily: "Arial", background:"#74c69d", color:"black" } 
                    }).showToast();}
                else{ 
                    Toastify({ 
                        text: "Ya se encuentra en la Playlist", gravity:"bottom", position:"center", duration: 2500,
                        style:{
                            fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white" } 
                    }).showToast();}
        });
    }
}
// --------------------------------------------------------------------------------------------------------------------------------



// -------------------------------- EVENTOS --------------------------------
// SI ELIGE UN DISCO, SE MUESTRA EL CLICEKADO Y LO ARMO
id_container.addEventListener("mousedown", function(e){
    id_divalbum.classList.add("div_hide");  
    id_divfloat.classList.add("div_hide");
    // Si clickeó en un disco, habilito el div
    if (e.target.className == "cont_img"){
        id_divalbum.classList.remove("div_hide"); 
    };
    // Lo relleno con los datos del disco
    l_discoelegido = e.target.id; 
    if ( (arr_idcd.includes)(l_discoelegido) ){
        l_index = arr_idcd.indexOf(l_discoelegido);
        l_album = arr_idcd[l_index];
        document.getElementById(l_album).addEventListener("click", fn_armaalbum(l_index));
        if (l_index == 9){
            id_contitu.classList.add("div_hide");
        }
    };
})
// -------------------------------------------------------------------------

// MOUSEOVER SOBRE LAS IMG (Color / ByN) - Llamado a las fn
btn_cont_img = document.querySelectorAll(".cont_img");
for (let x of btn_cont_img){
    x.addEventListener("mouseover", function(e){
    // Si se paró con el mouse sobre un disco, muestro la imagen que corresponde
    l_nrocd = "";
    l_cd = e.target.id; 
    l_nrocd = arr_idcd.indexOf(l_cd);
    l_album = arr_idcd[l_nrocd];
    l_nrocd = l_nrocd + 1; 
    document.getElementById(l_album).addEventListener("mouseover", fn_overalbum());
    //
    x.addEventListener("mouseout", function(e){
        l_nrocd = "";
        l_cd = e.target.id; 
        l_nrocd = arr_idcd.indexOf(l_cd);
        l_album = arr_idcd[l_nrocd];
        l_nrocd = l_nrocd + 1; 
        if (l_album != null){ document.getElementById(l_album).addEventListener("mouseout", fn_outalbum());}
    })
})
}
// -------------------------------------------------------------------------

// -------------- Eventos en los botones -------------- 
function fn_botones(){

    // Favorito o No Favorito
    btn_fav = document.querySelectorAll(".tema_fav");
    for (let x of btn_fav){
        x.addEventListener("click",function(e){
			wstoragealbums = JSON.parse(localStorage.getItem("albums"));
			if (e.target.value == "N"){
				l_divpadre = e.target.parentNode;
				l_tema_fav = l_divpadre.querySelector(".tema_nro").textContent;
				x.value = "S";
				x.src = "./img/ico/favon.png";
				wstoragealbums[l_nro].temas[(l_tema_fav - 1)].favorito = "S";
                Toastify({  
                    text: "Agregada a Favoritos", gravity:"bottom", position:"center", duration: 2500,
                    style:{
                        fontSize: "0.8em", fontFamily: "Arial", background:"#e5989b", color:"black"} 
                }).showToast();}
			else{
				l_divpadre = e.target.parentNode;
				l_tema_fav = l_divpadre.querySelector(".tema_nro").textContent;
				x.value = "N";
				x.src = "./img/ico/favoff.png";
				wstoragealbums[l_nro].temas[(l_tema_fav - 1)].favorito = "N";
                Toastify({ 
                    text: "Eliminada de Favoritos", gravity:"bottom", position:"center", duration: 2500,
                    style:{
                        fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white"} 
                    }).showToast();}
            wstoragealbums = JSON.stringify(wstoragealbums);
            localStorage.setItem("albums", wstoragealbums);
		});
		x.addEventListener("mouseover",function(e){
			x.src = "./img/ico/favon.png";;
        });		
		x.addEventListener("mouseout",function(e){
			e.target.value == "N" ? x.src = "./img/ico/favoff.png" : x.src = "./img/ico/favon.png";
        });
    }

    // Puntaje
    btn_fav = document.querySelectorAll(".estrella");
    for (let x of btn_fav){
        x.addEventListener("click",function(e){
            wstoragealbums = JSON.parse(localStorage.getItem("albums"));
            l_divpadre = e.target.parentNode;
            l_tema_puntuado = l_divpadre.querySelector(".tema_nro").textContent;
            wstoragealbums[l_nro].temas[(l_tema_puntuado - 1)].puntaje = e.target.value;
            wstoragealbums = JSON.stringify(wstoragealbums);
            localStorage.setItem("albums", wstoragealbums);
        });
        x.addEventListener("mouseover",function(e){
            l_divpadre = e.target.parentNode;
            let hnas_star =  l_divpadre.querySelectorAll(".estrella");
            for( let i = 0; i < e.target.value; i++){
                hnas_star[i].src = "./img/ico/staron.png";
            }
        })	
        x.addEventListener("mouseout",function(e){
            wstoragealbums = JSON.parse(localStorage.getItem("albums"));
            l_divpadre = e.target.parentNode;
            l_tema_puntuado = l_divpadre.querySelector(".tema_nro").textContent;
            let pp = wstoragealbums[l_nro].temas[(l_tema_puntuado - 1)].puntaje;
            let hnas_star =  l_divpadre.querySelectorAll(".estrella");
            for (let z = 0; z < pp; z++) {
                hnas_star[z].src = "./img/ico/staron.png";}
            for (let i = pp; i < (5); i++) {
                hnas_star[i].src = "./img/ico/staroff.png";}
            });
    }

    // Playlist
    btn_add = document.querySelectorAll(".tema_add");
    for (let x of btn_add){
        x.addEventListener("click",function(e){
			wstoragealbums = JSON.parse(localStorage.getItem("albums"));
            id_divfloat.classList.remove("div_hide");
            l_divpadre = e.target.parentNode;
            l_tema = l_divpadre.querySelector(".tema_nombre").innerText;
            fn_get_playlist();
            fn_btn_newplaylist();
		});
		x.addEventListener("mouseover",function(e){
			x.src = "./img/ico/mason.png";
        });		
		x.addEventListener("mouseout",function(e){
			x.src = "./img/ico/masoff.png";
        });
    }
}



// Link a Playlists y Favoritos
document.getElementById("aplay").addEventListener("click", function(){
    window.location.assign("playlists.html");
});
document.getElementById("afav").addEventListener("click", function(){
    window.location.assign("favoritos.html");
});
document.getElementById("adiscos").addEventListener("click", function(){
    window.location.assign("main.html#discografia");
});

