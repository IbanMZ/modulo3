// fichero javascript para app

window.addEventListener('load', init() );

    function init(){
         //Segunda parte
         console.debug('Llega al script');
        
   
        console.debug('Document 2 Load and Ready');
    //En teoria sacara a Bulbasaur
       
        const urlDetalles = 'https://pokeapi.co/api/v2/pokemon/1/';
        var xhttp = new XMLHttpRequest();
           //Los datos solo se podran manipular dentro de la funcion, porque es asincrona
           xhttp.onreadystatechange = function() {
                
                if (this.readyState == 4 && this.status == 200) {
                    
                    console.debug( this.responseText );

                   
                    const jsonData = JSON.parse(this.responseText);    
                    console.debug( jsonData );

                    // Datos de Bulbasaur, detalles no recoge datos de jsanData.result y el scrip peta, mismo problema que con el boton. 
                    let nombre = jsonData.name;
                    let numero = jsonData.order;
                    let imagen = jsonData.sprites.front_default;
                    let tipos = jsonData.types;
                    console.debug(nombre);
                    console.debug(numero);
                    console.debug(imagen);
                    console.debug(tipos[0].type.name);
                    
                    let detalleCard = document.getElementById('detallesCard');
                    detalleCard.innerHTML = '';
                    
                    detalleCard.innerHTML = `<div><img src="${imagen}" class="card-img-top" alt="ImagenAqui">
                                            <h5 class="card-title">Nombre: ${nombre} </h5></div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Tipo: ${tipos[0].type.name} Tipo2: ${tipos[1].type.name}</li>
                                                <li class="list-group-item">No. ${numero}</li>    
                                            </ul>
                    `;
                    
                }// his.readyState == 4 && this.status == 200
                    
            };// onreadystatechange

            // preparamos la petición GET
            xhttp.open("GET", urlDetalles , true);
            // enviar la peticion asincrona, meter el codigo en onreadystatechange
            xhttp.send();       
    }
