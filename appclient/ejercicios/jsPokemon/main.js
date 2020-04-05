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
                            list-group-item-action" id =${i}>${pokemon.name}</button>`;
                
                    }// for
                    lista.innerHTML += `<button id ="pepe">pepe</button>`;
                }// his.readyState == 4 && this.status == 200
                
                
            };// onreadystatechange
        // preparamos la petición GET
        xhttp.open("GET", url , true);
        // enviar la peticion asincrona, meter el codigo en onreadystatechange
        xhttp.send();   
    }
