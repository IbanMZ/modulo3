## Aplicación Alumnos-Cursos
### Aplicacion para administrar los alumnos de una academia y los cursos a los que están apuntados.

Este proyecto es una aplicación para administrar los alumnos de una academia y los cursos a los que están apuntados.
En la version 1 tenemos la parte de alumnos y en la parte 2 le añanimos las funcionalidades de los cursos.  

![Pantalla principal](https://github.com/IbanMZ/modulo3/blob/master/appclient/img/detalleAlumno.png)

- AppCliente
    * Introducción  
    
      La parte de cliente tiene dos partes principales. A la izquierda, esta el listado de alumnos. En el vemos su avatar, el nombre, a cuantos cursos está apuntado, y los botones de seleccionar y borrar el alumno. Ten en cuenta que un alumno con cursos no se puede borrar.  
      
      A la derecha, esta la parte de detalles, tambien dividido en dos partes. Al principio veremos un formulario vacio con unos botones, nuevo, modificar, guardar , cancelar y añadir curso. Si clickamos en nuevo da la opcion de meter un alumno nuevo, y de guardarlo con el boton guardar. Si utilizamos el boton seleccionar de la lista de alumnos(parte izquierda de la aplicación, aqui se mostraran los datos del alumno en el formulario y a la derecha de este, si el alumno esta apuntado a cursos, tambien se mostraran. En este punto puedes usar el boton Asignar Curso para abrir una ventana modal y asignar un curso,borrrar los cursos en los que está apuntando clicando la palelera al lado del propio curso, o modificar los datos del alumno. Hay que pulsar el boton modificar para guardar los cambion en el formulario. En la ventana modar, mencionada antes, se pueden ver los cursos exitentes, y filtrartol por nombre, siempre que se metan tres o  más letras. Solo se podran asignar cursos que no esten asignados al alumno en cuestion. 
      
      En la caberera, tenemos un buscador por nombre y un selector de sexos.  
      
    * Tecnología usada  
    
        * Html
        * CSS
        * Javascript
        * Json
        * Bootstrap
        * Font Awesome
        * Animate.Css  
        
    * Configuración  
    La direccion que utilicamos para llamar al servicio Rest se encuentra en la variable endPont, del archivo main.js. Este archivo se encuentra en la carpeta js.
    Las llamadas a los CSS esta en el "head" de index.html, en la carpeta appCliente, y las llamadas a los javascript-s estan al fondo del 
    "body" del mismo archivo.  
    
- AppRest
    * Introducción
    * Tecnología usada  
        * Java
        * Json
        * Hibernate
        * MySql
        
    * Configuración:
    
        * Los datos del log los introducimos en el archivo context.xml. Su ubicacion es  /modulo3/apprest/WebContent/META-INF, y los campos a rellenar serian estos:
        * url="jdbc:mysql://localhost:3306/alumnos"   
		  * username="debian-sys-maint"  
		  * password="o8lAkaNtX91xMUcV"   
    
    * Detalle API rest con llamadas(url-s y demas)
- Tags o Versiones
    * Version 1.0: Aqui podemos ver, añadir, modificar, y eliminar alumnos.
    * Version 2.0.1: Aqui, ademas de todo lo que se podía hacer en la version 1.0, implementamos el contador de cursos para cada alumno. Ademas, al seleccionar un alumno podemos ver los cursos que tiene, borrarlos o añadirle nuevos.
 
  
