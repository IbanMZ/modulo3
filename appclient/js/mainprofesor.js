// fichero javascript para app

let personas = [];
let cursos = [];
let url = "";
//Utilizalo para guardar los datos recividos de la petidion y poder utilizarlos cuando quieras
//Este es para conectar al servidor
const endPoint = 'http://localhost:8080/apprestmodulo3/api/';

    //Este url(endpoint) seria para llamar a datos de un archivo, simulando la conexion a base de datos
        //const endPoint = 'http://127.0.0.1:5500/js/data/personas.json';
window.addEventListener('load', init() );
/**
 * Inicializa, mira los metodos para saber que hace cada uno.
 */
function init(){
    console.debug('Document Load and Ready');
    console.trace('init');
    initGallery();
    
    pintarLista(  );
    
    limpiarSelectores();
    resetBotones();
       
}

/**
 * Filtra las personas por sexo para luego ejecutar la funcion pintarLista
 */
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
    
/**
 * 
 * Recupera los valores del formulario y los guarda con un metodo POST
 */
function guardar(){
    console.trace("Guardar");

    let id = document.getElementById('idForm').value;
    let nombre = document.getElementById('nombreForm').value;
    let avatar = `${document.getElementById('avatarForm').value}`;
    //let sexo = document.getElementsByName('sexoForm').value;
    let sexo = document.nombreForm.sexoForm.value;
    let rol = 2;
    let persona = {
        "id" : id,
        "nombre" : nombre,
        "avatar" : avatar,
        "sexo"  : sexo,
        "idRol" : rol
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

/**
 * Saca los datos de ese profesor en el formulario
 * @param {*} idRecibido 
 */
function seleccionar(idRecibido){
    console.trace('seleccionar %o', idRecibido);

    //Preparar botones
    document.getElementById('botonNuevo').disabled = true;
    document.getElementById('botonGuardar').disabled = true;
    document.getElementById('botonModificar').disabled = false;
    document.getElementById('botonModal').disabled = false;
    
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

    let listaCursosProfesor = document.getElementById('listaCurContrarados');
    listaCursosProfesor.innerHTML = '';
    personaSeleccionada.cursos.forEach( el => {

        listaCursosProfesor.innerHTML += `<li>
                                            ${el.nombreCurso}
                                            <i class="fas fa-trash aflotar" onclick="eliminarCurso(event,${personaSeleccionada.id},${el.idCurso})"></i>
                                        </li>`;

    });//personaSeleccionada.cursos.forEach
}//seleccionar

/**
 * Bloquea los botones relacionados con modificar, vacia el formulario y selecciona imagen y sexo por defecto.
 * Habilita el boton guardar.
 */
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

/**
 * Recibe el id del elemento a eliminar, pregunta si esta seguro, y manda el id en metoro DELETE
 * @param {*} idRecibido 
 */
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
        limpiarSelectores();
        resetBotones();

        })//
        .catch( error => {
            console.warn('promesa rejectada %o', error);
            console.debug(error);
            alert(error.informacion);
        });// ajax('DELETE', url, undefined)
      
    }//if ( confirm(mensaje) )

} 

/**
 * Recoje los datos del formulario y los envia por un PUT
 */
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

            // conseguir de nuevo todos los profesores
            url = endPoint + "personas/?rol=2";
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


  /**
   * Saca la lista de profesores, si llegan datos a personasFiltradas, saca esos datos, si no, saca a todos los profesores 
   * @param {*} personasFiltradas 
   */
function pintarLista(personasFiltradas){
   //Scarlo por pantalla
   console.trace("pintarLista");
   console.info(personasFiltradas);
   listaProfesores.innerHTML = '';
   
  if(personasFiltradas == null){
      url = endPoint + "personas/?rol=2";
      
        const promesa = ajax("GET", url, undefined);
        promesa
        .then( data => {
                console.trace('promesa resolve'); 
                personas = data;
                for(let i=0; i < personas.length; i++ ){
                    
                    let profesor = personas[i];
                    let nCursos = profesor.cursos.length;

                    let insertarprofesor = document.getElementById('listaProfesores');
                    
                    
                    listaProfesores.innerHTML += `<li class="list-group-item"><img src="img/${profesor.avatar}">${profesor.nombre} 
                                                    <i class="fas fa-trash aflotar" onclick="eliminar(${profesor.id})"></i>                                
                                                    <i class="fas fa-pencil-ruler aflotar" onclick="seleccionar(${profesor.id})"></i>
                                                    <i class="aflotar">Cursos: ${nCursos}</i>
                                                </li>`;                                 
            }
                

        }).catch( error => {
                console.warn('promesa rejectada');
                alert(error);
        });
    }else{
   
        for(let i=0; i < personasFiltradas.length; i++ ){
                    
                let profesor = personasFiltradas[i];
                let nCursos = profesor.cursos.length;
                let insertarprofesor = document.getElementById('listaProfesor');
                
                
                listaProfesores.innerHTML += `<li class="list-group-item"><img src="img/${profesor.avatar}">${profesor.nombre} 
                                                    <i class="fas fa-trash aflotar" onclick="eliminar(${profesor.id})"></i>                                
                                                    <i class="fas fa-pencil-ruler aflotar" onclick="seleccionar(${profesor.id})"></i>
                                                    <i class="aflotar">Cursos: ${nCursos}</i>
                                                </li>`;                                 
        }
    }

}


/**
 * Lo uso para los input de os filtros
 */
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

/**
 * 
 * @param {Selecciona la imagen del avatar} evento 
 */
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

/**
 * Vacia el formulario y resetea la imagen y el radiobutton
 */
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
        document.getElementById('listaCurContrarados').innerHTML='';
}

/**
 * 
 * @param {Si se usa el selector de sexy, limpia el imput del buscador, si se usa el imput, resetea el
 * selector a Todos, si llega de otro sitio, resetea los dos.
 * } opcion 
 */
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

/**
 * Resetea los botones del formulario 
 */
function resetBotones(){
    console.trace('ResetBotones');
    document.getElementById('botonNuevo').disabled = false;
    document.getElementById('botonGuardar').disabled = true;
    document.getElementById('botonModificar').disabled = true;
    document.getElementById('botonModal').disabled = true;

    
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

/**
 * Saca la lista de cursos en la ventana modal. Si llega un String de cursoFiltrado, lo envia en el Metodo Get, si no
 * hace el GET sin enviar nada.
 * @param {*} cursoFiltrado 
 */
function pintarModal(cursoFiltrado){
    console.trace("pintarModal" + cursoFiltrado);
    let url = "";
    if(cursoFiltrado == undefined){
        url = endPoint + "cursos/";
    }
    else{
        url = endPoint + "cursos/?filtro=" + cursoFiltrado;
    }
    tablaCursos.innerHTML = '';
    //listaCursos.innerHTML = '';
   
  
        const promesa = ajax("GET", url, undefined);
        promesa
        .then( data => {
                console.trace('promesa resolve'); 
                cursos = data;
                for(let i=0; i < cursos.length; i++ ){
                    
                    let curso = cursos[i];
                    let insertarModal = document.getElementById('listaModal');

                    tablaCursos.innerHTML += `<tr>
                                                <td><img src="img/${curso.fotoCurso}" alt="imagen" ></img></td>
                                                <td>${curso.nombreCurso}</td>
                                                <td>${curso.precio}€</td>
                                                <td>${curso.expNombre}</td>
                                                <td><button type="button" class="btn btn-secondary aflotar" onClick="asignarCurso( 0, ${curso.idCurso})">Asignar</button></td>
                                            </tr>`;
                    
                    
                   /* listaCursos.innerHTML += `<li class="list-group-item">
                                            <img src="img/${curso.fotoCurso}" alt="imagen">-${curso.nombreCurso}-${curso.precio}€- Profesor: ${curso.expNombre}
                                            
                                            <button type="button" class="btn btn-secondary aflotar" onClick="asignarCurso( 0, ${curso.idCurso})">Asignar</button>
                                            </li>`;*/
                                                                         
            }
        }).catch( error => {
                console.warn('promesa rejectada');
                alert(error);
        });
}

/**
 * Manda por POST los Id-s para guaradarlos
 * @param {*} idPersona 
 * @param {*} idCurso 
 */
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
                                <i class="fas fa-trash aflotar" onclick="eliminarCurso(event, ${idPersona},${curso.idCurso})"></i>    
                            </li>`;
        pintarLista();
        
        
    })
    .catch( error => alert(error.informacion));
}

/**
 * Recibe los id-s de la persona y el curso que hay que desasignarle, y lo realica con un metodo DELETE
 * El event se usa para dejar de mostrarlo en el navegador
 * @param {*} event 
 * @param {*} idPersona 
 * @param {*} idCurso 
 */
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