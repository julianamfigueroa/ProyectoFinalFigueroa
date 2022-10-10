let arr_albums = [];
let new_cancion;
let l_albums = [];
let l_temas = [];

l_bd = localStorage.getItem("albums");
l_bd = JSON.parse(l_bd);

if (l_bd == null){
    class Album{
        constructor(id_album, nombre, temas){
            this.id_album = id_album;
            this.nombre = nombre;
            this.temas = temas; 
        }
    }
    class Tema{
        constructor(id_cancion, nombre, puntaje, favorito){
            this.id_cancion = id_cancion;
            this.nombre = nombre;
            this.puntaje = puntaje;
            this.favorito = favorito; 
        }
    }
    
    fetch("https://julianamfigueroa.github.io/json/albums.json")
        .then( respuesta => respuesta.json())
        .then( informacionRespuesta =>{ arr_albums = informacionRespuesta; arma_json();});

    function arma_json (){
        for (let i = 0; i < arr_albums.length ; i++){
            l_temas = [];
            for (let x = 0; x < arr_albums[i][2].length ; x++){
                new_cancion = new Tema((x+1), (arr_albums[i][2][x]), 0, "N");
                l_temas.push(new_cancion);
            }
            let new_album = new Album((i+1), (arr_albums[i][1]), l_temas);
            l_albums.push(new_album);
        }

        let arr_json = JSON.stringify(l_albums);
        localStorage.setItem("albums", arr_json);
    }     
}

