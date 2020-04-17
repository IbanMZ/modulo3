// fichero javascript para app

let personas = [];
//Utilizalo para guardar los datos recividos de la petidion y poder utilizarlos cuando quieras
//Este es para conectar al servidor
const endPoint = 'http://localhost:8080/apprest/api/personas/';
    //Este url(endpoint) seria para llamar a datos de un archivo, simulando la conexion a base de datos
        //const endPoint = 'http://127.0.0.1:5500/js/data/personas.json';
window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');

    initGallery();
    
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
                 
function guardar(){
    console.trace("Guardar");
    
    let id = document.getElementById('idForm').value;
    let nombre = document.getElementById('nombreForm').value;
    let avatar = `${document.getElementById('avatarForm').value}`;
    //let sexo = document.getElementsByName('sexoForm').value;
    let sexo = document.nombreForm.sexoForm.value;
    let persona = {
        "id" : id,
        "nombre" : nombre,
        "avatar" : avatar,
        "sexo"  : sexo
    };

    console.debug('persona a guardar %o', persona);

    ajax('POST',endPoint, persona)
    .then( data => {

            // conseguir de nuevo todos los alumnos
            ajax("GET", endPoint, undefined)               
            .then( data => {
                    console.trace('promesa resolve'); 
                    
                    personas = data;
                    pintarLista( personas );
        
            }).catch( error => {
                    console.warn('promesa rejectada');
                    alert(error);
            });

    })
    .catch( error => {
        console.warn('promesa rejectada');
        alert(error);
    });

    //Esto lo usamos con variable local, no con metodo POST
   // personas.push(persona);
   // pintarLista(personas);

}
function seleccionar(idRecibido){
    console.trace('seleccionar %o', idRecibido);
    
    //el indice daba problemas al filtrar, asi que lo he cambiado por el id
    let personaSeleccionada = personas.filter( el => el.id == idRecibido);
   
       
    
    console.debug('click seleccionar persona %o', personaSeleccionada);
   
    //rellernar formulario
    document.getElementById('idForm').value = personaSeleccionada[0].id;
    document.getElementById('nombreForm').value = personaSeleccionada[0].nombre;
    document.getElementById('avatarForm').value = personaSeleccionada[0].avatar;

    //seleccionar Avatar
    const avatares = document.querySelectorAll('#gallery img');
    avatares.forEach( el => {
        el.classList.remove('selected');
        if ( personaSeleccionada[0].avatar == el.dataset.path ){
            el.classList.add('selected');
        }
    });

    
    document.nombreForm.sexoForm.value = personaSeleccionada.sexo;
}


function nuevo(){
    const avatares = document.querySelectorAll('#gallery img');
    console.trace(avatares);
    console.trace('nuevo');
    document.getElementById('idForm').value = '';
    document.getElementById('nombreForm').value = '';
    document.getElementById('avatarForm').value = 'avatar7.png';

    avatares.forEach( el => {
        el.classList.remove('selected');     
    });
    
    console.trace( avatares[6]);
    avatares[6].classList.add('selected');

    document.nombreForm.sexoForm.value  = 'h';
    
    
}
function eliminar(idRecibido){
    let personaSeleccionada = personas.filter( el => el.id == idRecibido);
    console.debug('click eliminar persona %o', personaSeleccionada);
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada[0].nombre} ?`;
    if ( confirm(mensaje) ){

      const url = endPoint + personaSeleccionada[0].id;
      ajax('DELETE', url, undefined)
      .then( data => {
        console.debug('txibato');
        // conseguir de nuevo todos los alumnos
        ajax("GET", endPoint, undefined)               
        .then( data => {
                console.trace('promesa resolve'); 
                console.debug(data);
                personas = data;
                pintarLista( personas );
    
        }).catch( error => {
                console.warn('promesa rejectada');
                alert(error);
        });

})
.catch( error => {
    console.warn('promesa rejectada');
    alert(error);
});
      
      
       

       // personas = personas.filter( el => el.id != personaSeleccionada.id) (a las bravas)
       
       /*si hacemos personas= personas.splice(indice, 1), al parecer carga el valor a borrar,
         lo borra, pero luego guarda en personas el valor cargado,
         util para guardar el valor borrado en otra variable en un paso*/

       // personas.splice(indice,1);
       // pintarLista(personas);
        

    }

} 
function modificar(){
    console.trace('Modificar');

    let id = document.getElementById('idForm').value;
    let nombre = document.getElementById('nombreForm').value;
    let avatar = `${document.getElementById('avatarForm').value}`;
    //let sexo = document.getElementsByName('sexoForm').value;
    let sexo = document.nombreForm.sexoForm.value;
    let persona = {
        "id" : id,
        "nombre" : nombre,
        "avatar" : avatar,
        "sexo"  : sexo
    };

    const url = endPoint + persona.id;
    ajax('PUT',url, persona)
    .then( data => {

            // conseguir de nuevo todos los alumnos
            ajax("GET", endPoint, undefined)               
            .then( data => {
                    console.trace('promesa resolve'); 
                    personas = data;
                    pintarLista( personas );
        
            }).catch( error => {
                    console.warn('promesa rejectada');
                    alert(error);
            });

    })
    .catch( error => {
        console.warn('promesa rejectada');
        alert(error);
    });




   /* personas.map(function(el){
        if(el.id ==  document.getElementById('idForm').value){
          el.nombre = document.getElementById('nombreForm').value;
          el.avatar = document.getElementById('avatarForm').value;
          el.sexo = document.nombreForm.sexoForm.value;
        }
        console.debug(el);
        return el;
      });
      pintarLista(personas);*/
}  


  
function pintarLista(personasFiltradas){
   //Scarlo por pantalla
   console.trace("pintarLista");
   console.info(personasFiltradas);
   listaAlumnos.innerHTML = '';
for(let i=0; i < personasFiltradas.length; i++ ){
  let alumno = personasFiltradas[i];
  let insertaralumno = document.getElementById('listaAlumnos');
 
  
  listaAlumnos.innerHTML += `<li class="list-group-item"><img src="img/${alumno.avatar}">${alumno.nombre}
                                
                                <i class="fas fa-pencil-ruler" onclick="seleccionar(${alumno.id})"></i>
                                <i class="fas fa-trash" onclick="eliminar(${alumno.id})"></i>
                            </li>`;
                            /*<i class="fas fa-pencil-ruler" onclick="seleccionar(${i})"></i>
                                <i class="fas fa-trash" onclick="eliminar(${i})"></i>*/
}
limpiarLista();
}



$(document).ready(function(){
  //$("input").keyup(function(){ afectava a los input del formulario
  $("#inombre").keyup(function(){



        let nombreFiltrado = document.getElementById("inombre").value.toLowerCase();
    
        console.debug(nombreFiltrado);
        const filtroPorNombre = personas.filter( el => el.nombre.toLowerCase().includes(nombreFiltrado) ) ;
        pintarLista( filtroPorNombre );
        console.info(filtroPorNombre);;
  });
  
});

/**
 * Carga todas las imagen de los avatares
 */
function initGallery(){
    let divGallery =  document.getElementById('gallery');
    for ( let i = 1; i <= 7 ; i++){
        divGallery.innerHTML += `<img onclick="selectAvatar(event)" 
                                      class="avatar" 
                                      data-path="avatar${i}.png"
                                      src="img/avatar${i}.png">`;
    }
}

function selectAvatar(evento){
    console.trace('click avatar');
    const avatares = document.querySelectorAll('#gallery img');
    //eliminamos la clases 'selected' a todas las imagenes del div#gallery
    avatares.forEach( el => el.classList.remove('selected') );
    // ponemos clase 'selected' a la imagen que hemos hecho click ( evento.target )
    evento.target.classList.add('selected');

    let iAvatar = document.getElementById('avatarForm');
    //@see: https://developer.mozilla.org/es/docs/Learn/HTML/como/Usando_atributos_de_datos
    iAvatar.value = evento.target.dataset.path;

}

function limpiarLista(){
    console.log('LimpiarLista!!!')
    document.getElementById('idForm').value = '';
    document.getElementById('nombreForm').value = '';
    document.getElementById('avatarForm').value = '';
    document.nombreForm.sexoForm.value = 'h';
    const avatares = document.querySelectorAll('#gallery img');
    avatares.forEach( el => {
        el.classList.remove('selected');
        });

}





