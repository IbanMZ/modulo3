// fichero javascript para app
const listadoAlumnos = 
    [{
       "id": 1,

       "url": "img/avatar1.png",

       "nombre": "Alumno1",

       "sexo": "Mujer"
   },
   {
       "id": 2,
       "url": "img/avatar2.png",

       "nombre": "Alumno2",

       "sexo": "Mujer"
   },
   {
       "id": 3,

       "url": "img/avatar3.png",

       "nombre": "Alumno3",

       "sexo": "Hombre"
   },
   {
       "id": 4,

       "url": "img/avatar4.png",

       "nombre": "Alumno4",

       "sexo": "Hombre"
   }
]

window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');
    // es importante esperar que todo este cragando para comenzar
   
    pintarLista( listadoAlumnos );
    /*const personasFiltradas = listadoAlumnos.filter( el => el.sexo == "Mujer" ) ;
    pintarLista( personasFiltradas );
    console.info(personasFiltradas);*/
    

 
}
function sexoSeleccionado(){
  let sexo = document.getElementById("selector").value;
  console.debug(sexo);
  if(sexo == 'Todos'){
    pintarLista( listadoAlumnos );
  }else{
  const personasFiltradas = listadoAlumnos.filter( el => el.sexo == sexo) ;
  pintarLista( personasFiltradas );
  console.info(personasFiltradas);
  }
}
  
function pintarLista(personasFiltradas){
   //Scarlo por pantalla
   listaAlumnos.innerHTML = '';
for(let i=0; i < personasFiltradas.length; i++ ){
  let alumno = personasFiltradas[i];
  let insertaralumno = document.getElementById('listaAlumnos');
  
  
  listaAlumnos.innerHTML += '<li><img src="' + alumno.url + '">' + alumno.nombre + '</li>';
}

$(document).ready(function(){
  
  $("input").keyup(function(){
    let nombreFiltrado = document.getElementById("inombre").value;
    console.debug(nombreFiltrado);
    const filtroPorNombre = listadoAlumnos.filter( el => el.nombre == nombreFiltrado ) ;
    pintarLista( filtroPorNombre );
    console.info(filtroPorNombre);
  });
  
});
}
