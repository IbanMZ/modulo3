// fichero javascript para app

let personas = [];
//Utilizalo para guardar los datos recividos de la petidion y poder utilizarlos cuando quieras
//Este es para conectar al servidor
//const endPoint = 'http://localhost:8080/apprest/api/personas/';
    //Este url(endpoint) seria para llamar a datos de un archivo, simulando la conexion a base de datos
const endPoint = 'http://127.0.0.1:5500/js/data/personas.json';
window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');
    
    const promesa = ajax("GET", endPoint, undefined);
    promesa
    .then( data => {
            console.trace('promesa resolve'); 
            personas = data;
            pintarLista( personas );

    }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
    });

    document.getElementById("inombre").value = '';
    

 
}
function sexoSeleccionado(){

    let sexo = document.getElementById("selector").value;
     console.debug(sexo);
    if(sexo == 't'){
        pintarLista( personas );
    }else{
        const personasFiltradas = personas.filter( el => el.sexo == sexo) ;
        pintarLista( personasFiltradas );
        console.info(personasFiltradas);
    }
}
                 
            
  
function pintarLista(personasFiltradas){
   //Scarlo por pantalla
   console.info(personasFiltradas);
   listaAlumnos.innerHTML = '';
for(let i=0; i < personasFiltradas.length; i++ ){
  let alumno = personasFiltradas[i];
  let insertaralumno = document.getElementById('listaAlumnos');
 
  
  listaAlumnos.innerHTML += `<li><img src="${alumno.avatar}">${alumno.nombre}</li>`;
}

$(document).ready(function(){
  
  $("input").keyup(function(){



        let nombreFiltrado = document.getElementById("inombre").value.toLowerCase();
    
        console.debug(nombreFiltrado);
        const filtroPorNombre = personas.filter( el => el.nombre.toLowerCase().includes(nombreFiltrado) ) ;
        pintarLista( filtroPorNombre );
        console.info(filtroPorNombre);;
  });
  
});

}
