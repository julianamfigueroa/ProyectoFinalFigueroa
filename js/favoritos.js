let arr_favoritos = [];
let l_divtemas; 
let l_div; 
let l_estrella; 
let btn_fav;
let p_temafav; 

let wstoragealbums = localStorage.getItem("albums");
wstoragealbums = JSON.parse(wstoragealbums);

fn_armafavoritos();
fn_armalista();


// Armado de array de favoritos
function fn_armafavoritos(){
    arr_favoritos = [];
    wstoragealbums = JSON.parse(localStorage.getItem("albums"));
    for (let x = 0; x < wstoragealbums.length; x++){
        for (let i = 0; i < wstoragealbums[x].temas.length; i++){ 
            if (wstoragealbums[x].temas[i].favorito == "S"){
                Favorito = {album:x, nomalbum:wstoragealbums[x].nombre, tema:i, nomtema:wstoragealbums[x].temas[i].nombre, puntaje:wstoragealbums[x].temas[i].puntaje}
                arr_favoritos.push(Favorito); 
            }
        }
    }
}

// Armado de tabla
function fn_armalista(_album){
    document.getElementById("listado").innerHTML = "";
    if (arr_favoritos.length == 0){
        document.getElementById("favoritos").innerHTML = `<h2 style="font-size:0.9em; color:#3b415a">Oops! Nada por aquí...</p>`;
    }
    else{
        for (let y of arr_favoritos) {  
            fn_creadiv(); // Por cada tema creo el l_div de la fila
            fn_nombretema(y.nomtema); //Nombre Tema
            fn_nrotema(y.tema); //Nro tema
            fn_nombrealbum(y.nomalbum);  //Album
            fn_nroalbum(y.album); //Nro Album
            fn_favorito(); //Favorito
            fn_puntaje(y.puntaje); //Puntaje
        }
        fn_botones();
    }
}

//----------------------  ARMADO DE LA LISTA DE FAVORITOS ----------------------
function fn_creadiv(){
    l_divtemas = document.createElement("div");
    l_divtemas.id = "contenedor_tema";
    l_divtemas.className = "style_tema";
    document.getElementById("listado").append(l_divtemas); 
}
function fn_nombretema(a){
    l_div = document.createElement("div");
    l_div.innerText = a; 
    l_div.className = "tema_nombre";
    l_divtemas.append(l_div);
}
function fn_nrotema(b){
    l_div = document.createElement("div");
    l_div.innerText = b; 
    l_div.className = "tema_nro";
    l_divtemas.append(l_div);
}
function fn_nombrealbum(c){
    l_div = document.createElement("div");
    l_div.innerText = c; 
    l_div.className = "tema_album";
    l_divtemas.append(l_div);  
}
function fn_nroalbum(d){
    l_div = document.createElement("div");
    l_div.innerText = d; 
    l_div.className = "album-nro";
    l_divtemas.append(l_div);  
}
function fn_favorito(){
    btn_fav = document.createElement("img");
    btn_fav.className = "tema_fav";
    btn_fav.src = "./img/ico/favon.png";
    btn_fav.value = "S";
    l_divtemas.append(btn_fav);
}
function fn_puntaje(f){
    for (let z = 0; z < f; z++) {
        l_estrella = document.createElement("img");
        l_estrella.className = "estrella";
        l_estrella.src = "./img/ico/staron.png";
        l_estrella.value = z + 1;
        l_divtemas.append(l_estrella); 
    }
    for (let i = f + 1; i <= (5); i++) {
        l_estrella = document.createElement("img");
        l_estrella.className = "estrella";
        l_estrella.src = "./img/ico/staroff.png";
        l_estrella.value = i;
        l_divtemas.append(l_estrella); 
    }
}


//----------------------  FUNCIONES DE LOS BOTONES  ----------------------
function fn_botones(){
    document.getElementById("titulo_nombre").addEventListener("click", function(){
        fn_armafavoritos();
        arr_favoritos = arr_favoritos.sort(fn_ordena1);
        fn_armalista();
    });
    document.getElementById("titulo_album").addEventListener("click", function(){
        fn_armafavoritos();
        arr_favoritos = arr_favoritos.sort(fn_ordena2);
        fn_armalista();
    });
    
    // Favorito o No Favorito
    p_temafav = document.querySelectorAll(".tema_fav");
    for (let x of p_temafav){
        x.addEventListener("click",function(e){
			wstoragealbums = localStorage.getItem("albums");
			wstoragealbums = JSON.parse(wstoragealbums);	
            let l_divpadre = e.target.parentNode;
            let n1 = l_divpadre.querySelector(".tema_nro").textContent;
            let n2 = l_divpadre.querySelector(".album-nro").textContent;
            wstoragealbums[n2].temas[(n1)].favorito = "N";
            wstoragealbums = JSON.stringify(wstoragealbums);
            localStorage.setItem("albums", wstoragealbums);
            wstoragealbums = JSON.parse(localStorage.getItem("albums"));
            l_divpadre.remove();
            Toastify({ 
                text: "Eliminada de Favoritos", gravity:"bottom", position:"center", duration: 2500,
                style:{
                    fontSize: "0.8em", fontFamily: "Arial", background:"#e63946", color:"white"} 
            }).showToast();
            fn_armafavoritos();
            if (arr_favoritos.length == 0){
                document.getElementById("favoritos").innerHTML = `<h2 style="font-size:0.9em; color:#3b415a">Oops! Nada por aquí...</p>`;
            }
		});
		x.addEventListener("mouseover",function(e){
			x.src = "./img/ico/favoff.png";
        });
		x.addEventListener("mouseout",function(e){
			x.src = "./img/ico/favon.png";
        });
    }

    // Puntaje
    btn_fav = document.querySelectorAll(".estrella");
    for (let z of btn_fav){
        z.addEventListener("click",function(e){
			wstoragealbums = localStorage.getItem("albums");
			wstoragealbums = JSON.parse(wstoragealbums);
            let l_divpadre = e.target.parentNode;
            let n1 = l_divpadre.querySelector(".tema_nro").textContent;
            let n2 = l_divpadre.querySelector(".album-nro").textContent;
            wstoragealbums[n2].temas[(n1)].puntaje = e.target.value;
            wstoragealbums = JSON.stringify(wstoragealbums);
            localStorage.setItem("albums", wstoragealbums);
            wstoragealbums = JSON.parse(localStorage.getItem("albums"));
		});
		z.addEventListener("mouseover",function(e){
            let l_divpadre = e.target.parentNode;
            let arr_estrellas =  l_divpadre.querySelectorAll(".estrella");
            for( let i = 0; i < e.target.value; i++){
                arr_estrellas[i].src = "./img/ico/staron.png";
            }
        });	
		z.addEventListener("mouseout",function(e){
            wstoragealbums = localStorage.getItem("albums");
			wstoragealbums = JSON.parse(wstoragealbums);	
            let l_divpadre = e.target.parentNode;
            let n1 = l_divpadre.querySelector(".tema_nro").textContent;
            let n2 = l_divpadre.querySelector(".album-nro").textContent;
            let xy = wstoragealbums[n2].temas[(n1)].puntaje;
            let arr_estrellas =  l_divpadre.querySelectorAll(".estrella");
            for (let z = 0; z < xy; z++) {
                arr_estrellas[z].src = "./img/ico/staron.png";
            }
            for (let i = xy; i < (5); i++) {
                arr_estrellas[i].src = "./img/ico/staroff.png";
            }
        });
    }   
}

// Reordena lista
function fn_ordena1(x, y){
    if (x.nomtema < y.nomtema) {return -1;}
    if (x.nomtema > y.nomtema) {return 1;}
    return 0;
}
function fn_ordena2(x, y){
    if (x.nomalbum < y.nomalbum) {return 1;}
    if (x.nomalbum > y.nomalbum) {return -1;}
    return 0;
}


