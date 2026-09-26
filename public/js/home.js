async function getMovies() {
    
    const responce = await fetch('/data/movie.json')
    const data = await responce.json()

    console.log(data)
}


getMovies()