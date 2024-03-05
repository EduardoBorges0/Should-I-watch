async function api() {
    const key = 'd772cb944227d8e6315f1bd304b54b0a';
    const input = document.getElementById('input-film').value;
     const container = document.getElementById('movieContainer');
    container.innerHTML = '';
    let api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`);
    const response = await api.json();
    console.log(response)
    for (let i = 0; i < response.results.length; i++) {
        const firstMovie = response.results[i];
        const container = document.getElementById('movieContainer');
        const movieItem = document.createElement('div'); // Utilizando uma div como contêiner do filme
        const img = document.createElement('img');
        const a = document.createElement('a');
        const p_star = document.createElement('p');
        const btn = document.createElement('button');
        movieItem.className = 'movie-item'; // Adicionando a classe ao contêiner do filme

        img.src = `https://image.tmdb.org/t/p/w500/${firstMovie.poster_path}`;
        img.alt = 'Poster do Filme';
        img.id = 'moviePoster';
        a.innerText = firstMovie.title;
        a.href = '#'
        a.id = 'link_film'
        p_star.innerHTML = `&#11088;${firstMovie.vote_average.toFixed(2)}`
        a.addEventListener('click', function(event) {
            event.preventDefault();
            const textoDoLink = event.target.innerText;
            page_film(textoDoLink, firstMovie);
        });
        img.addEventListener('click', function(event) {
            event.preventDefault();
            const textoDoLink = event.target.innerText;
            page_film(textoDoLink, firstMovie);
        });
        movieItem.appendChild(img);
        movieItem.appendChild(a);
        movieItem.appendChild(p_star)
        container.appendChild(movieItem);
 }
}
async function search(e) {
    e.preventDefault();
    const key = 'd772cb944227d8e6315f1bd304b54b0a';
    const input = document.getElementById('input-film').value;


    const container = document.getElementById('movieContainer');
    container.innerHTML = '';

    let api_search = await fetch (`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${key}`)
    const response = await api_search.json()


    if (response.results.length === 0) {
        location.reload();
    }

    for (let i = 0; i < response.results.length; i++) {
        const firstMovie = response.results[i];
        const movieItem = document.createElement('div'); // Utilizando uma div como contêiner do filme
        const img = document.createElement('img');
        const a = document.createElement('a');
        const p_star = document.createElement('p');
        movieItem.className = 'movie-item'; // Adicionando a classe ao contêiner do filme

        img.src = `https://image.tmdb.org/t/p/w500/${firstMovie.poster_path}`;
        img.alt = 'Poster do Filme';
        img.id = 'moviePoster';
        a.innerText = firstMovie.title;
        a.id = 'link_film'
        a.href = '#'
        p_star.innerHTML = `&#11088;${firstMovie.vote_average.toFixed(2)}`
        a.addEventListener('click', function(event) {
            event.preventDefault();
            const textoDoLink = event.target.innerText;
            page_film(textoDoLink, firstMovie);
        });
        img.addEventListener('click', function(event) {
            event.preventDefault();
            const textoDoLink = event.target.innerText;
            page_film(textoDoLink, firstMovie);
        });
        movieItem.appendChild(img);
        movieItem.appendChild(a);
        movieItem.appendChild(p_star)
        container.appendChild(movieItem);
    }
}
async function page_film(textoDoLink, movieData){
const key = 'd772cb944227d8e6315f1bd304b54b0a';

const container = document.getElementById('movieContainer');
container.innerHTML = '';
console.log('Texto do link clicado:', movieData.title);
console.log('Dados do filme:', movieData);

let api_search = await fetch (`https://api.themoviedb.org/3/search/movie?query=${movieData.title}&api_key=${key}`)
let response = api_search.json()


        const movieItem = document.createElement('div'); // Utilizando uma div como contêiner do filme
        const img = document.createElement('img');
        const a = document.createElement('a');
        const p_star = document.createElement('p');
        const p_direct = document.createElement('p');
        const p_popularity = document.createElement('p');
        movieItem.className = 'movie-item'; // Adicionando a classe ao contêiner do filme

        img.src = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
        img.alt = 'Poster do Filme';
        img.id = 'moviePoster';
        a.innerText = movieData.title;
        a.id = 'link_film'
        a.href = '#'
        p_direct.innerText = movieData.overview;
        p_popularity.innerText = `${Math.round(movieData.popularity)} popularity points`;
        p_star.innerHTML = `&#11088;${movieData.vote_average.toFixed(2)}`
        movieItem.appendChild(img);
        movieItem.appendChild(a);
        movieItem.appendChild(p_popularity)
        movieItem.appendChild(p_direct)
        movieItem.appendChild(p_star)

        container.appendChild(movieItem);
}


document.addEventListener('DOMContentLoaded', () => {
    api();
    document.getElementById('form').addEventListener('submit', search);
});