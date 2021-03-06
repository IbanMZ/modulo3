// fichero javascript para app

window.addEventListener('load', init() );

    function init(){
    //Akordau 2 funtziño bikozuzela, bata listiantzat da besti pokemonan detalliantzat
        console.debug('Document Load and Ready');
    //En teoria sacara 20 pokemons
        const url = 'https://pokeapi.co/api/v2/pokemon/';
        
        var xhttp = new XMLHttpRequest();
           //Los datos solo se podran manipular dentro de la funcion, porque es asincrona
           xhttp.onreadystatechange = function() {
                
                if (this.readyState == 4 && this.status == 200) {
                    
                    console.debug( this.responseText );

                   
                    const jsonData = JSON.parse(this.responseText);    
                    console.debug( jsonData );

                    // array con personas
                    const pokemons = jsonData.results;
                  
                    
                    let lista = document.getElementById('listapokemons');
                    lista.innerHTML = '';
                    
                    for(let i=0; i < pokemons.length; i++ ){
                        const pokemon = pokemons[i];
                        
                        lista.innerHTML += `<button type="button" class="list-group-item 
                            list-group-item-action" onclick="funciondetalle('${i +1}')">${pokemon.name}</button>`;
                
                    }// for
                   
                }// his.readyState == 4 && this.status == 200
                
                
            };// onreadystatechange
        // preparamos la petición GET
        xhttp.open("GET", url , true);
        // enviar la peticion asincrona, meter el codigo en onreadystatechange
        xhttp.send(); 
        
        
        
    }

    function funciondetalle(numero){
        
        const urlDetalles = `https://pokeapi.co/api/v2/pokemon/${numero}/`;
        console.debug(urlDetalles);
        var xhttp = new XMLHttpRequest();
           //Los datos solo se podran manipular dentro de la funcion, porque es asincrona
           xhttp.onreadystatechange = function() {
                
                if (this.readyState == 4 && this.status == 200) {
                    
                    console.debug( this.responseText );

                   
                    const jsonData = JSON.parse(this.responseText);    
                    console.debug( jsonData );

                    // Datos del Pokemon 
                    let nombre = jsonData.name;
                    let numero = jsonData.order;
                    let imagen = jsonData.sprites.front_default;
                    let tipos = jsonData.types;
                    if(tipos.length == 2){
                        let detalleCard = document.getElementById('detallesCard');
                        detalleCard.innerHTML = '';
                        
                        detalleCard.innerHTML = `<div><img src="${imagen}" class="card-img-top" alt="ImagenAqui">
                                                <h5 class="card-title">Nombre: ${nombre} </h5></div>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Tipo: ${tipos[1].type.name} ${tipos[0].type.name}</li>
                                                    <li class="list-group-item">No. ${numero}</li>    
                                                </ul>
                                                `;
                    }else{
                        let detalleCard = document.getElementById('detallesCard');
                        detalleCard.innerHTML = '';
                        
                        detalleCard.innerHTML = `<div><img src="${imagen}" class="card-img-top" alt="ImagenAqui">
                                                <h5 class="card-title">Nombre: ${nombre} </h5></div>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Tipo: ${tipos[0].type.name}</li>
                                                    <li class="list-group-item">No. ${numero}</li>    
                                                </ul>
                                                `;
                    }
                    
                   
                    
                }// his.readyState == 4 && this.status == 200
                    
            };// onreadystatechange

            // preparamos la petición GET
            xhttp.open("GET", urlDetalles , true);
            // enviar la peticion asincrona, meter el codigo en onreadystatechange
            xhttp.send();
    }
    