// fichero javascript para app

let personas = [];
let cursos = [];
let url = "";
//Utilizalo para guardar los datos recividos de la petidion y poder utilizarlos cuando quieras
//Este es para conectar al servidor
const endPoint = 'http://localhost:8080/apprest/api/';

    //Este url(endpoint) seria para llamar a datos de un archivo, simulando la conexion a base de datos
        //const endPoint = 'http://127.0.0.1:5500/js/data/personas.json';
window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');
    console.trace('init');
    initGallery();
    
    pintarLista(  );
    limpiarSelectores();
    resetBotones();
    

   
}
function sexoSeleccionado(){
    console.trace('sexoSeleccionado');
    let sexo = document.getElementById("selector").value;
     console.debug(sexo);
    if(sexo == 't'){
        pintarLista( personas );
    }else{
        const personasFiltradas = personas.filter( el => el.sexo == sexo) ;
        pintarLista( personasFiltradas );
        
        
    }//sexoSeleccionado
    limpiarSelectores('sexoselec');
    
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
    };//let persona

    console.debug('persona a guardar %o', persona);
    url = endPoint + "personas/"
    ajax('POST',url, persona)
    .then( data => {

        pintarLista();
        limpiarSelectores();
        resetBotones();

    })
    .catch( error => {
        console.warn('promesa rejectada');
        alert('No puedes introducir dos usuarios con el mismo nombre');
    });
} //guardar
function seleccionar(idRecibido){
    console.trace('seleccionar %o', idRecibido);

    //Preparar botones
    document.getElementById('botonNuevo').disabled = true;
    document.getElementById('botonGuardar').disabled = true;
    document.getElementById('botonModificar').disabled = false;
    
    let personaSeleccionada = personas.find( el => el.id == idRecibido);
   
    console.debug('click seleccionar persona %o', personaSeleccionada);
   
    //rellernar formulario
    document.getElementById('idForm').value = personaSeleccionada.id;
    document.getElementById('nombreForm').value = personaSeleccionada.nombre;
    document.getElementById('avatarForm').value = personaSeleccionada.avatar;

    //seleccionar Avatar
    const avatares = document.querySelectorAll('#gallery img');
    avatares.forEach( el => {
        el.classList.remove('selected');
        if ( personaSeleccionada.avatar == el.dataset.path ){
            el.classList.add('selected');
        }
    });//avatares.forEach

    document.nombreForm.sexoForm.value = personaSeleccionada.sexo;

    let listaCursosAlumno = document.getElementById('listaCurContrarados');
    listaCursosAlumno.innerHTML = '';
    personaSeleccionada.cursos.forEach( el => {

        listaCursosAlumno.innerHTML += `<li>
                                            ${el.nombreCurso}
                                            <i class="fas fa-trash" onclick="eliminarCurso(event,${personaSeleccionada.id},${el.idCurso})"></i>
                                        </li>`;

    });//personaSeleccionada.cursos.forEach
}//seleccionar


function nuevo(){
    const avatares = document.querySelectorAll('#gallery img');
    console.trace(avatares);
    console.trace('nuevo');
    limpiarSelectores();
    pintarLista();

    //Preparar botones
    document.getElementById('botonNuevo').disabled = true;
    document.getElementById('botonGuardar').disabled = false;
    document.getElementById('botonModificar').disabled = true;
    
    document.getElementById('idForm').value = '';
    document.getElementById('nombreForm').value = '';
    document.getElementById('avatarForm').value = 'avatar7.png';

    avatares.forEach( el => {
        el.classList.remove('selected');     
    });
    
    console.trace( avatares[6]);
    avatares[6].classList.add('selected');

    document.nombreForm.sexoForm.value  = 'h';
}//nuevo
function eliminar(idRecibido){
    
    console.trace('eliminar');
    let personaSeleccionada = personas.filter( el => el.id == idRecibido);
    
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada[0].nombre} ?`;
    if ( confirm(mensaje) ){

      const url = endPoint + "personas/" + personaSeleccionada[0].id;
      ajax('DELETE', url, undefined)
      .then( data => {
       
        pintarLista(  );
        limpiarSelectores();

        })//
        .catch( error => {
            console.warn('promesa rejectada %o', error);
            console.debug(error);
            alert(error.informacion);
        });// ajax('DELETE', url, undefined)
      
    }//if ( confirm(mensaje) )

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

     url = endPoint + "personas/" + persona.id;
    ajax('PUT',url, persona)
    .then( data => {

            // conseguir de nuevo todos los alumnos
            url = endPoint + "personas/";
            ajax("GET", url, undefined)               
            .then( data => {
                    console.trace('promesa resolve'); 
                    personas = data;
                    pintarLista( personas );
                    limpiarSelectores();
                    resetBotones();
        
            }).catch( error => {
                    console.warn('promesa rejectada');
                    alert(error);
            });//ajax("GET", url, undefined)

    })
    .catch( error => {
        console.warn('promesa rejectada');
        alert('No puedes introducir dos usuarios con el mismo nombre');
    });//ajax('PUT',url, persona)
    limpiarSelectores();
}  //modificar


  
function pintarLista(personasFiltradas){
   //Scarlo por pantalla
   console.trace("pintarLista");
   console.info(personasFiltradas);
   listaAlumnos.innerHTML = '';
   
  if(personasFiltradas == null){
      url = endPoint + "personas/";
        const promesa = ajax("GET", url, undefined);
        promesa
        .then( data => {
                console.trace('promesa resolve'); 
                personas = data;
                for(let i=0; i < personas.length; i++ ){
                    
                    let alumno = personas[i];
                    let nCursos = alumno.cursos.length;

                    let insertaralumno = document.getElementById('listaAlumnos');
                    
                    
                    listaAlumnos.innerHTML += `<li class="list-group-item"><img src="img/${alumno.avatar}">${alumno.nombre} 
                                                    cursos: ${nCursos}
                                                    <i class="fas fa-pencil-ruler" onclick="seleccionar(${alumno.id})"></i>
                                                    <i class="fas fa-trash" onclick="eliminar(${alumno.id})"></i>
                                                </li>`;                                 
            }
                

        }).catch( error => {
                console.warn('promesa rejectada');
                alert(error);
        });
    }else{
   
        for(let i=0; i < personasFiltradas.length; i++ ){
                    
                let alumno = personasFiltradas[i];
                let nCursos = alumno.cursos.length;
                let insertaralumno = document.getElementById('listaAlumnos');
                
                
                listaAlumnos.innerHTML += `<li class="list-group-item"><img src="img/${alumno.avatar}">${alumno.nombre}
                                                cursos: ${nCursos}
                                                <i class="fas fa-pencil-ruler" onclick="seleccionar(${alumno.id})"></i>
                                                <i class="fas fa-trash" onclick="eliminar(${alumno.id})"></i>
                                            </li>`;                                 
        }
    }

}



$(document).ready(function(){
  //$("input").keyup(function(){ afectava a los input del formulario
  $("#inombre").keyup(function(){



        let nombreFiltrado = document.getElementById("inombre").value.toLowerCase();
    
        console.debug(nombreFiltrado);
        const filtroPorNombre = personas.filter( el => el.nombre.toLowerCase().includes(nombreFiltrado) ) ;
        pintarLista( filtroPorNombre );
        limpiarSelectores('nombrefil');
  });
  $("#icurso").keyup(function(){



    let cursoFiltrado = document.getElementById("icurso").value.toLowerCase().trim();

    console.debug(cursoFiltrado);
    
    pintarModal( cursoFiltrado );
    
});
});

/**
 * Carga todas las imagen de los avatares
 */
function initGallery(){
    console.trace('initGallery');
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
    console.trace('limpiarLista');
    document.getElementById('idForm').value = '';
    document.getElementById('nombreForm').value = '';
    document.getElementById('avatarForm').value = '';
    document.nombreForm.sexoForm.value = 'h';
    const avatares = document.querySelectorAll('#gallery img');
    avatares.forEach( el => {
        el.classList.remove('selected');
        });
    
}
function limpiarSelectores(opcion){
    if(opcion == 'sexoselec' ){
        console.trace('resetBuscador');
        document.getElementById('inombre').value = ''; 
    }else if(opcion == 'nombrefil' ){
        console.trace('resetSexo');
        document.getElementById("selector").value = 't';
    }else{
        console.trace('resetBuscadorSexo');
        document.getElementById("selector").value = 't'; 
        document.getElementById('inombre').value = '';
    }
}


function resetBotones(){
    console.trace('ResetBotones');
    document.getElementById('botonNuevo').disabled = false;
    document.getElementById('botonGuardar').disabled = true;
    document.getElementById('botonModificar').disabled = true;
    limpiarLista();
    
}
/********************************************************/
//Ventana modal
/******************************************************/
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("botonModal");

        // Get the <span> element that closes the modal
        var span = document.getElementById("cerrarBoton");

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
        modal.style.display = "block";
        console.trace('BotonModal');
        pintarModal();
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        document.getElementById('icurso').value = ''; 
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.getElementById('icurso').value = ''; 
            }
        }
/**************************************************************/
function pintarModal(cursoFiltrado){
    console.trace("pintarModal" + cursoFiltrado);
    let url = "";
    if(cursoFiltrado == undefined){
        url = endPoint + "cursos/";
    }
    else{
        url = endPoint + "cursos/?filtro=" + cursoFiltrado;
    }

    listaCursos.innerHTML = '';
   
  
        const promesa = ajax("GET", url, undefined);
        promesa
        .then( data => {
                console.trace('promesa resolve'); 
                cursos = data;
                for(let i=0; i < cursos.length; i++ ){
                    
                    let curso = cursos[i];
                    let insertarModal = document.getElementById('listaModal');
                    
                    ///${curso.fotoCurso} falla, tamaño? mañana mira codigo de ander
                    listaCursos.innerHTML += `<li class="list-group-item">
                                            <img src="img/${curso.fotoCurso}" alt="imagen">-${curso.nombreCurso}-${curso.precio}
                                            <span onClick="asignarCurso( 0, ${curso.idCurso})" >[x] Asignar</span>
                                            </li>`;                                 
            }
        }).catch( error => {
                console.warn('promesa rejectada');
                alert(error);
        });
}
function asignarCurso( idPersona = 0, idCurso ){
    idPersona = document.getElementById('idForm').value;
    console.log('AsignarCurso');
   
    document.getElementById("myModal").style.display = 'none';

    console.debug(`click asignarCurso idPersona=${idPersona} idCurso=${idCurso}`);

    const url = endPoint + "personas/" + idPersona + "/cursos/" + idCurso;
    ajax('POST', url, undefined)
    .then( data => {
        alert(data.informacion);
        //<li class="animated bounceIn"> 
        const curso = data.data;
        let lista = document.getElementById('listaCurContrarados');        
        lista.innerHTML += `<li>  
                                ${curso.nombreCurso}
                                <i class="fas fa-trash" onclick="eliminarCurso(event, ${idPersona},${curso.idCurso})"></i>    
                            </li>`;
        pintarLista();
        
        
    })
    .catch( error => alert(error.informacion));
}
function eliminarCurso(event, idPersona, idCurso ){

    console.debug(`click eliminarCurso idPersona=${idPersona} idCurso=${idCurso}`);

    const url = endPoint + "personas/" +  idPersona + "/cursos/" + idCurso;
    ajax('DELETE', url, undefined)
    .then( data => {
        alert('Curso Eliminado');

        //  event.target.parentElement.style.display = 'none';
       event.target.parentElement.classList.add('animated', 'bounceOut');
        
       pintarLista();
    })
    .catch( error => alert(error));

}