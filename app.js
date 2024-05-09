let pagina = 1;

//primero crear funcion que contiene el fetch de la url
//para pasar los datos a json y ponerlos en una variable ej:data
const cargarpeliculas = async() => {
    //en este caso usamos try catch por que hay primero una respuesta del servidor de peliculas (status)
    try{
    const response  = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=39df36f174cd18dd7b516dfcf5edadae&language=es-MX&page=${pagina}`)

    if(response.status === 200){
        const data = await response.json();
        console.log(data.results);
    
        // siguiente: tomar data y con un iterador recorrer el objeto
  //creando una variable para la iteracion ej : pelicula

        let peliculas=""
        data.results.forEach(pelicula => {
            peliculas += `
            
            <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <h3 class="titulo">${pelicula.title}</h3>
            </div>
            ` 
        });
       //con document.getElem.. conectamos el js con el Dom para mostrar la iteracion
        document.getElementById('contenedor').innerHTML = peliculas
    
    }
    else if(response.status === 404){
        console.log('error pagina no encontrada')
    }else if(response.status === 401){
        console.log('error api no encontrada')
    }else{
        console.log('error desconocido')
    }
    }
    catch (err) {
        console.log(err)
    }
    
}
cargarpeliculas()


const Anterior = document.getElementById('anterior');
const Siguiente = document.getElementById('siguiente');

Siguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarpeliculas();
	}
});

Anterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarpeliculas();
	}
});