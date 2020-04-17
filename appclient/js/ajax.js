/**
 * llamada ajax en vanilla javascript
 * @param {*} metodo 
 * @param {*} url 
 * @param {*} datos 
 * @return Promise
 */
function ajax( metodo, url, datos ){

    return new Promise( (resolve, reject ) => {

        console.debug(`promesa ajax metodo ${metodo} - ${url}` );
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 ) {

                if ( this.status == 200 || this.status == 201 ){
                    console.debug(this.responseText);
                    if(this.responseText != ""){
                    const jsonData = JSON.parse(this.responseText);    
                    console.debug( jsonData );

                    resolve(jsonData);
                    }
                    else{
                        console.debug('txibato');
                        resolve();
                    }
                }else{
                    
                    reject( Error( this.status ));
                }               
            }// readyState == 4

        };// onreadystatechange

        xhttp.open( metodo , url , true);
        //Enviamos cabecera, si no el Post falla
        xhttp.setRequestHeader('Content-Type', 'application/json');
        //Los datos hay que mandarlos en String, y esa funcion los pasa de formato json a string
        xhttp.send( JSON.stringify(datos) );
       
    });
}