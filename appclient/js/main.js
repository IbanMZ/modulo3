// fichero javascript para app

window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');
    // es importante esperar que todo este cragando para comenzar
    const listadoAlumnos = 
    [{
       "id": 1,

       "url": "img/avatar1.png",

       "nombre": "Alumno1",

       "sexo": "Hombre"
   },
   {
       "id": 2,
       "url": "img/avatar2.png",

       "nombre": "Alumno2",

       "sexo": "Hombre"
   },
   {
       "id": 3,

       "url": "img/avatar3.png",

       "nombre": "Alumno3",

       "sexo": "Mujer"
   },
   {
       "id": 4,

       "url": "img/avatar4.png",

       "nombre": "Alumno4",

       "sexo": "Mujer"
   }
]

  //Scarlo por pantalla
for(let i=0; i < listadoAlumnos.length; i++ ){
  let alumno = listadoAlumnos[i];
  let insertaralumno = document.getElementById('listaAlumnos');
  
  
  listaAlumnos.innerHTML += '<li><img src="' + alumno.url + '">' + alumno.nombre + '</li>';
}
  











}